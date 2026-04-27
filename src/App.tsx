import { useState } from 'react';
import type { Profile, Choice } from './types';
import { PROFILES } from './data/profiles';
import { SCENARIOS } from './data/scenarios';
import { DevDashboard } from './components/DevDashboard';
import './App.css';

type View = 'feed' | 'chat' | 'home' | 'settings-main' | 'settings-wifi' | 'dev';

interface Message {
  sender: 'girl' | 'player' | 'system';
  text: string;
  isPhysical?: boolean;
}

function App() {
  const [view, setView] = useState<View>('feed');
  const [activeProfile, setActiveProfile] = useState<Profile | null>(null);
  const [currentStepId, setCurrentStepId] = useState<string | null>(null);
  const [history, setHistory] = useState<Message[]>([]);
  const [interestScore, setInterestScore] = useState(5);
  const [unlockedIds, setUnlockedIds] = useState<string[]>([PROFILES[0].id]);
  const [isTyping, setIsTyping] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const [userInput, setUserInput] = useState("");
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [isFastMode, setIsFastMode] = useState(false);

  const currentStep = activeProfile && currentStepId 
    ? SCENARIOS[activeProfile.scenarioId].steps[currentStepId] 
    : null;

  const getDelay = (ms: number) => isFastMode ? 0 : ms;

  const imageUrl = currentStep?.visualPrompt
    ? `https://image.pollinations.ai/prompt/${encodeURIComponent(currentStep.visualPrompt)}?width=1080&height=1600&nologo=true&seed=${activeProfile?.masterSeed || 42}`
    : null;
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = `https://images.unsplash.com/photo-1595959183082-c8c7009f33a0?w=500&q=80`;
  };

  const handleMatch = (profile: Profile) => {
    if (!unlockedIds.includes(profile.id)) return;

    const scenario = SCENARIOS[profile.scenarioId];
    if (scenario) {
      setActiveProfile(profile);
      setView('chat');
      setIsTyping(true);
      setImageError(null);
      setInterestScore(5); 
      setCurrentStepId(scenario.startStepId);
      
      const firstStep = scenario.steps[scenario.startStepId];
      let delay = 1000;
      firstStep.girlMessages.forEach((msg, index) => {
        setTimeout(() => {
          setHistory(prev => [...prev, { sender: 'girl', text: msg, isPhysical: firstStep.isPhysical }]);
          if (index === firstStep.girlMessages.length - 1) setIsTyping(false);
        }, getDelay(delay));
        delay += 1500;
      });
    }
  };

  const handleChoice = (choice: Choice) => {
    if (!activeProfile || !currentStepId || isTyping) return;

    const scenario = SCENARIOS[activeProfile.scenarioId];
    const step = scenario.steps[currentStepId];
    
    setHistory(prev => [...prev, { sender: 'player', text: choice.text, isPhysical: step.isPhysical }]);
    const newScore = Math.max(0, Math.min(10, interestScore + (choice.interestDelta || 0)));
    setInterestScore(newScore);
    setIsTyping(true);

    setTimeout(() => {
      if (choice.reactionMessages && choice.reactionMessages.length > 0) {
        let reactionDelay = 0;
        choice.reactionMessages.forEach((msg, idx) => {
          setTimeout(() => {
            setHistory(prev => [...prev, { sender: 'girl', text: msg, isPhysical: step.isPhysical }]);
            if (idx === choice.reactionMessages!.length - 1) {
              processNextSteps(choice, newScore, scenario);
            }
          }, getDelay(reactionDelay));
          reactionDelay += 1500;
        });
      } else {
        processNextSteps(choice, newScore, scenario);
      }
    }, getDelay(800));
  };

  const handleTextInput = () => {
    if (!currentStep || !userInput.trim() || isTyping) return;

    const isCorrect = userInput.trim().toLowerCase() === currentStep.expectedAnswer?.toLowerCase();
    
    setHistory(prev => [...prev, { 
      sender: 'player', 
      text: userInput, 
      isPhysical: currentStep.isPhysical 
    }]);

    setUserInput("");
    setIsTyping(true);

    setTimeout(() => {
      if (isCorrect) {
        setWrongAttempts(0);
        const choice = currentStep.choices[0]; 
        const newScore = Math.min(10, interestScore + (choice.interestDelta || 0));
        setInterestScore(newScore);

        if (choice.reactionMessages && choice.reactionMessages.length > 0) {
          let reactionDelay = 0;
          choice.reactionMessages.forEach((msg, idx) => {
            setTimeout(() => {
              setHistory(prev => [...prev, { sender: 'girl', text: msg, isPhysical: currentStep.isPhysical }]);
              if (idx === choice.reactionMessages!.length - 1) {
                processNextSteps(choice, newScore, SCENARIOS[activeProfile!.scenarioId]);
              }
            }, getDelay(reactionDelay));
            reactionDelay += 1500;
          });
        } else {
          processNextSteps(choice, newScore, SCENARIOS[activeProfile!.scenarioId]);
        }
      } else {
        setWrongAttempts(prev => prev + 1);
        const wrongMsg = currentStep.wrongAnswerMessages?.[wrongAttempts % (currentStep.wrongAnswerMessages?.length || 1)] || "C'est pas ça...";
        setHistory(prev => [...prev, { sender: 'girl', text: wrongMsg, isPhysical: currentStep.isPhysical }]);
        setIsTyping(false);
        setInterestScore(prev => Math.max(0, prev - 0.5));
      }
    }, getDelay(1000));
  };

  const processNextSteps = (choice: Choice, newScore: number, scenario: any) => {
    if (newScore === 0) {
      setHistory(prev => [...prev, { sender: 'system', text: "❌ Intérêt à zéro... Elle t'a ghosté." }]);
      setIsTyping(false);
      setTimeout(() => reset(), getDelay(3000));
      return;
    }

    if (choice.nextStepId === 'END') {
      const isPhysicalEnd = currentStepId && scenario.steps[currentStepId].isPhysical;
      setHistory(prev => [...prev, { 
        sender: 'girl', 
        text: newScore >= 8 ? "gagné ! ❤️" : "match terminé.", 
        isPhysical: isPhysicalEnd 
      }]);
      setCurrentStepId(null);
      setIsTyping(false);
    } else {
      const nextStep = scenario.steps[choice.nextStepId];
      setCurrentStepId(choice.nextStepId);
      let delay = 1000;
      nextStep.girlMessages.forEach((msg, index) => {
        setTimeout(() => {
          setHistory(prev => [...prev, { sender: 'girl', text: msg, isPhysical: nextStep.isPhysical }]);
          if (index === nextStep.girlMessages.length - 1) setIsTyping(false);
        }, getDelay(delay));
        delay += 1500;
      });
    }
  };

  const reset = () => {
    setView('feed');
    setActiveProfile(null);
    setCurrentStepId(null);
    setHistory([]);
    setIsTyping(false);
  };

  const lastGirlMessage = [...history].reverse().find(m => m.sender === 'girl')?.text || "";

  return (
    <div className="app-container">
      {/* Simulation de la barre d'état iPhone */}
      <div className="status-bar">
        <span className="time">14:02</span>
        <div className="status-icons">
          <button 
            className={`dev-btn ${isFastMode ? 'active' : ''}`} 
            onClick={() => setIsFastMode(!isFastMode)}
            title="Mode Rapide (Dev)"
          >
            {isFastMode ? '⏩' : '▶️'}
          </button>
          <span>📶</span>
          <span>🪫</span>
        </div>
      </div>

      <main>
        {view === 'feed' ? (
          <div className="feed-container">
            <header className="app-header">
              <h1>LoveLoop</h1>
            </header>
            <div className="feed">
              {PROFILES.map(profile => (
                <div key={profile.id} className={`profile-card ${unlockedIds.includes(profile.id) ? '' : 'locked'}`}>
                  <div className="card-image-container">
                    <img src={profile.image} alt={profile.name} onError={handleImageError} />
                  </div>
                  <div className="profile-info">
                    <h2>{profile.name}, {profile.age}</h2>
                    <p>{profile.description}</p>
                    <button onClick={() => handleMatch(profile)}>Matcher</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : view === 'dev' ? (
          <DevDashboard onBack={() => setView('home')} />
        ) : view === 'home' ? (
          <div className="iphone-home">
            <div className="app-grid">
              <div className="app-icon-container" onClick={() => setView(activeProfile ? 'chat' : 'feed')}>
                <div className="app-icon loveloop-icon">❤️</div>
                <span className="app-label">LoveLoop</span>
              </div>
              <div className="app-icon-container" onClick={() => setView('settings-main')}>
                <div className="app-icon settings-icon">⚙️</div>
                <span className="app-label">Réglages</span>
              </div>
              <div className="app-icon-container" onClick={() => setView('dev')}>
                <div className="app-icon dev-icon" style={{ background: '#000', fontSize: '1.5rem' }}>🎬</div>
                <span className="app-label">Director</span>
              </div>
              <div className="app-icon-container" onClick={() => alert("Application non disponible")}>
                <div className="app-icon messages-icon">💬</div>
                <span className="app-label">Messages</span>
              </div>
            </div>
            <div className="iphone-dock">
              <div className="app-icon phone-icon">📞</div>
              <div className="app-icon safari-icon">🌐</div>
              <div className="app-icon mail-icon">✉️</div>
              <div className="app-icon music-icon">🎵</div>
            </div>
          </div>
        ) : view === 'settings-main' ? (
          <div className="phone-settings ios-style">
            <div className="ios-header"><h2>Réglages</h2></div>
            <div className="ios-settings-list">
              <div className="ios-group">
                <div className="ios-item" onClick={() => setView('settings-wifi')}>
                  <span className="ios-icon" style={{backgroundColor: '#007aff'}}>📶</span>
                  <span className="ios-label">Wi-Fi</span>
                  <span className="ios-value">Non connecté</span>
                  <span className="ios-chevron">›</span>
                </div>
                <div className="ios-item">
                  <span className="ios-icon" style={{backgroundColor: '#007aff'}}>🔵</span>
                  <span className="ios-label">Bluetooth</span>
                  <span className="ios-value">Oui</span>
                  <span className="ios-chevron">›</span>
                </div>
              </div>
            </div>
          </div>
        ) : view === 'settings-wifi' ? (
          <div className="phone-settings ios-style">
            <div className="ios-header has-back">
              <button className="ios-back-btn" onClick={() => setView('settings-main')}>‹ Réglages</button>
              <h2>Wi-Fi</h2>
            </div>
            <div className="ios-settings-list">
              <div className="ios-group">
                <div className="ios-item no-chevron"><span className="ios-label">Wi-Fi</span><div className="ios-toggle active"></div></div>
              </div>
              <div className="ios-section-title">RÉSEAUX</div>
              <div className="ios-group">
                <div className="ios-item"><span className="ios-label">Bbox-A45E2</span><span className="ios-wifi-icons">🔒 📶</span></div>
                <div className="ios-item"><span className="ios-label">WiFi-de-Lea</span><span className="ios-wifi-icons">🔒 📶📶📶</span></div>
                <div className="ios-item"><span className="ios-label">iPhone_de_Kevin</span><span className="ios-wifi-icons">🔒 📶📶</span></div>
              </div>
            </div>
          </div>
        ) : currentStep?.isPhysical ? (
          <div className="vn-container">
            <div className="vn-background-layer">
              <img src={imageUrl || ""} alt="Scene" onError={handleImageError} />
              <div className="vn-overlay"></div>
            </div>
            <div className="vn-ui">
              <div className="vn-interest-container">
                <div className="interest-bar-bg"><div className="interest-bar-fill" style={{ width: `${(interestScore / 10) * 100}%` }}></div></div>
              </div>
              <div className="vn-dialogue-box">
                <div className="vn-speaker-name">{activeProfile?.name}</div>
                <div className="vn-text">{isTyping ? "..." : lastGirlMessage}</div>
              </div>
              {!isTyping && currentStepId && (
                <div className="vn-choices">
                  {currentStep.choices.map((choice, i) => (
                    <button key={i} onClick={() => handleChoice(choice)} className="vn-choice-btn">{choice.text}</button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="chat-container">
            <header className="chat-nav">
              <button onClick={reset} className="ios-back-btn">‹ Retour</button>
              <span className="nav-title">LoveLoop</span>
            </header>
            <div className="chat-header">
              <div className="header-left">
                <img src={activeProfile?.image} alt={activeProfile?.name} className="mini-avatar" />
                <div className="header-info">
                  <span>{activeProfile?.name}</span>
                  <span className="status-badge online">● En ligne</span>
                </div>
              </div>
              <div className="interest-container">
                <div className="interest-bar-bg"><div className="interest-bar-fill" style={{ width: `${(interestScore / 10) * 100}%` }}></div></div>
              </div>
            </div>
            <div className="messages">
              {history.map((msg, i) => (
                <div key={i} className={`message ${msg.sender}`}><div className="bubble">{msg.text}</div></div>
              ))}
              {isTyping && <div className="message girl"><div className="bubble typing"><span>.</span><span>.</span><span>.</span></div></div>}
            </div>
            <div className="controls">
              {currentStepId && !isTyping && (
                currentStep?.inputType === 'text' ? (
                  <div className="input-field-container">
                    <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder="Nom du WiFi..." onKeyPress={(e) => e.key === 'Enter' && handleTextInput()} />
                    <button onClick={handleTextInput}>Envoyer</button>
                  </div>
                ) : (
                  <div className="choices-grid">
                    {currentStep.choices.map((choice, i) => (
                      <button key={i} onClick={() => handleChoice(choice)} className="choice-btn">{choice.text}</button>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </main>

      <div className="home-indicator-container" onClick={() => setView('home')}>
        <div className="home-indicator"></div>
      </div>
    </div>
  );
}

export default App;
