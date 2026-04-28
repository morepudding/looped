import { useState, useEffect } from 'react';
import type { Profile, Choice, Cartridge, PhotoItem } from './types';
import { CARTRIDGES, PROFILES, getCartridgeByProfileId } from './cartridges';
import { DevDashboard } from './components/DevDashboard';
import './App.css';

type View = 'lock-screen' | 'feed' | 'chat' | 'home' | 'settings-main' | 'settings-wifi' | 'photos-home' | 'photos-album' | 'maps' | 'dev';

interface Message {
  sender: 'girl' | 'player' | 'system';
  text: string;
  isPhysical?: boolean;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  icon: string;
  app: View;
  action?: () => void;
}

function App() {
  const [view, setView] = useState<View>('lock-screen');
  const [activeCartridge, setActiveCartridge] = useState<Cartridge | null>(null);
  const [currentStepId, setCurrentStepId] = useState<string | null>(null);
  const [history, setHistory] = useState<Message[]>([]);
  const [interestScore, setInterestScore] = useState(5);
  const unlockedIds = CARTRIDGES.map(c => c.profile.id);
  const [isTyping, setIsTyping] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [isFastMode, setIsFastMode] = useState(false);
  const [albumPhaseReached, setAlbumPhaseReached] = useState(-1);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const activeProfile = activeCartridge?.profile || null;

  const pushNotification = (title: string, message: string, icon: string, app: View, action?: () => void) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newNotif = { id, title, message, icon, app, action };
    setNotifications(prev => [...prev, newNotif]);

    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 6000);
  };

  const handleSelectScenario = (cartridge: Cartridge) => {
    setActiveCartridge(cartridge);

    if (cartridge.startNotification) {
      const notif = cartridge.startNotification;
      pushNotification(notif.title, notif.message, notif.icon, 'feed', () => {
        handleMatch(cartridge.profile);
      });
    }

    handleMatch(cartridge.profile);
  };

  const currentStep = activeCartridge && currentStepId
    ? activeCartridge.scenario.steps[currentStepId]
    : null;

  // Album photo phases — driven by cartridge config
  useEffect(() => {
    if (!activeCartridge?.apps.photos || !currentStepId) return;
    const photoConfig = activeCartridge.apps.photos;

    for (let i = albumPhaseReached + 1; i < photoConfig.phases.length; i++) {
      const phase = photoConfig.phases[i];
      if (phase.triggerStepIds.includes(currentStepId)) {
        setAlbumPhaseReached(i);
        if (phase.notification) {
          pushNotification(phase.notification.title, phase.notification.message, phase.notification.icon, 'photos-home');
        }
        break;
      }
    }
  }, [currentStepId]);

  const getDelay = (ms: number) => isFastMode ? 0 : ms;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = `https://images.unsplash.com/photo-1595959183082-c8c7009f33a0?w=500&q=80`;
  };

  const handleMatch = (profile: Profile) => {
    if (!unlockedIds.includes(profile.id)) return;

    const cartridge = getCartridgeByProfileId(profile.id);
    if (!cartridge) return;

    const scenario = cartridge.scenario;
    setActiveCartridge(cartridge);
    setView('chat');
    setIsTyping(true);
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
  };

  const handleChoice = (choice: Choice) => {
    if (!activeCartridge || !currentStepId || isTyping) return;

    const scenario = activeCartridge.scenario;
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
                processNextSteps(choice, newScore, activeCartridge!.scenario);
              }
            }, getDelay(reactionDelay));
            reactionDelay += 1500;
          });
        } else {
          processNextSteps(choice, newScore, activeCartridge!.scenario);
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
      nextStep.girlMessages.forEach((msg: string, index: number) => {
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
    setActiveCartridge(null);
    setCurrentStepId(null);
    setHistory([]);
    setIsTyping(false);
    setAlbumPhaseReached(-1);
  };

  const lastGirlMessage = [...history].reverse().find(m => m.sender === 'girl')?.text || "";

  // Collect visible album photos from all reached phases
  const getAlbumPhotos = (): PhotoItem[] => {
    if (!activeCartridge?.apps.photos || albumPhaseReached < 0) return [];
    const photos: PhotoItem[] = [];
    for (let i = 0; i <= albumPhaseReached; i++) {
      photos.push(...activeCartridge.apps.photos.phases[i].photos);
    }
    return photos;
  };

  const wifiNetworks = activeCartridge?.apps.wifi
    || CARTRIDGES.find(c => unlockedIds.includes(c.profile.id))?.apps.wifi
    || [];

  const mapsConfig = activeCartridge?.apps.maps
    || CARTRIDGES.find(c => unlockedIds.includes(c.profile.id))?.apps.maps;

  const photoConfig = activeCartridge?.apps.photos;

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

      <div className="notification-center">
        {notifications.map(n => (
          <div key={n.id} className="ios-notification" onClick={() => setView(n.app)}>
            <div className="notif-icon">{n.icon}</div>
            <div className="notif-content">
              <div className="notif-title">{n.title}</div>
              <div className="notif-message">{n.message}</div>
            </div>
          </div>
        ))}
      </div>

      <main>
        {view === 'lock-screen' ? (
          <div className="lock-screen" onClick={() => setView('home')}>
            <div className="lock-content">
              <span className="lock-time">14:02</span>
              <span className="lock-date">Lundi 27 Avril</span>
            </div>
            <div className="lock-hint">Toucher pour déverrouiller</div>
          </div>
        ) : view === 'feed' ? (
          <div className="feed-container spark-app">
            <header className="spark-header">
              <div className="spark-logo">SPARK</div>
              <div className="spark-nav-icons">🔔 👤</div>
            </header>
            <div className="scenario-list">
              {CARTRIDGES.map(cartridge => {
                const p = cartridge.profile;
                const isReady = Object.keys(cartridge.scenario.steps).length > 2;
                return (
                  <div
                    key={p.id}
                    className={`scenario-card ${!isReady ? 'scenario-locked' : ''}`}
                    onClick={() => isReady && handleSelectScenario(cartridge)}
                  >
                    <div className="scenario-card-image">
                      <img src={p.image} alt={p.name} onError={handleImageError} />
                    </div>
                    <div className="scenario-card-body">
                      <div className="scenario-card-header">
                        <span className="scenario-card-title">{cartridge.scenario.title}</span>
                        {!isReady && <span className="scenario-badge-soon">Bientôt</span>}
                      </div>
                      <div className="scenario-card-desc">{p.name}, {p.age} — {p.description}</div>
                      <div className="scenario-ratings">
                        <div className="scenario-rating">
                          <span className="scenario-rating-label">Personnel</span>
                          <div className="scenario-dots">
                            {[1,2,3,4,5].map(n => (
                              <span key={n} className={`scenario-dot ${n <= cartridge.personalRating ? 'filled' : ''}`} style={{ background: n <= cartridge.personalRating ? '#ff6b8a' : 'rgba(255,255,255,.12)' }} />
                            ))}
                          </div>
                        </div>
                        <div className="scenario-rating">
                          <span className="scenario-rating-label">Chaleur</span>
                          <div className="scenario-dots">
                            {[1,2,3,4,5].map(n => (
                              <span key={n} className={`scenario-dot ${n <= cartridge.heatRating ? 'filled' : ''}`} style={{ background: n <= cartridge.heatRating ? '#ff9500' : 'rgba(255,255,255,.12)' }} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : view === 'dev' ? (
          <DevDashboard onBack={() => setView('home')} />
        ) : view === 'home' ? (
          <div className="iphone-home">
            <div className="app-grid">
              <div className="app-icon-container" onClick={() => setView(activeCartridge ? 'chat' : 'feed')}>
                <div className="app-icon spark-icon">✨</div>
                <span className="app-label">Spark</span>
              </div>
              <div className="app-icon-container" onClick={() => setView('settings-main')}>
                <div className="app-icon settings-icon">⚙️</div>
                <span className="app-label">Réglages</span>
              </div>
              <div className="app-icon-container" onClick={() => setView('photos-home')}>
                <div className="app-icon photos-icon">🖼️</div>
                <span className="app-label">Photos</span>
              </div>
              <div className="app-icon-container" onClick={() => setView('maps')}>
                <div className="app-icon maps-icon">🗺️</div>
                <span className="app-label">Plans</span>
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
                {wifiNetworks.map(network => (
                  <div key={network.name} className="ios-item">
                    <span className="ios-label">{network.name}</span>
                    <span className="ios-wifi-icons">{network.locked ? '🔒 ' : ''}{'📶'.repeat(network.signal)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : view === 'photos-home' ? (
          <div className="photos-app ios-style">
            <div className="ios-header"><h2>Albums</h2></div>
            <div className="albums-grid">
              <div className="album-item">
                <div className="album-thumb" style={{backgroundColor: '#eee'}}>📷</div>
                <span className="album-label">Récents</span>
                <span className="album-count">124</span>
              </div>
              {photoConfig && albumPhaseReached >= 0 && (
                <div className="album-item" onClick={() => setView('photos-album')}>
                  <div className="album-thumb" style={{backgroundColor: '#ffe3e3'}}>{photoConfig.icon}</div>
                  <span className="album-label">{photoConfig.name}</span>
                  <span className="album-count">{getAlbumPhotos().length}</span>
                </div>
              )}
            </div>
          </div>
        ) : view === 'photos-album' ? (
          <div className="photos-app ios-style">
            <div className="ios-header has-back">
              <button className="ios-back-btn" onClick={() => setView('photos-home')}>‹ Albums</button>
              <h2>{photoConfig?.name}</h2>
            </div>
            <div className="photos-grid">
              {getAlbumPhotos().map((photo, i) => (
                photo.type === 'image' ? (
                  <div key={i} className="photo-item">
                    <img src={photo.src} alt={photo.alt} />
                  </div>
                ) : (
                  <div key={i} className="photo-item photo-postit-item">
                    <div className="album-postit">
                      <span className="postit-mirrored">{photo.postitText}</span>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        ) : view === 'maps' ? (
          <div className="maps-app">
            <div className="maps-topbar">
              <button className="ios-back-btn maps-back-btn" onClick={() => setView('home')}>‹</button>
              <div className="maps-searchbar">
                <span className="maps-search-icon">🔍</span>
                <span className="maps-search-placeholder">Rechercher des lieux...</span>
              </div>
            </div>
            <div className="maps-canvas">
              <div className="maps-street-h" style={{ top: '20%' }} />
              <div className="maps-street-h" style={{ top: '45%' }} />
              <div className="maps-street-h" style={{ top: '70%' }} />
              <div className="maps-street-v" style={{ left: '15%' }} />
              <div className="maps-street-v" style={{ left: '45%' }} />
              <div className="maps-street-v" style={{ left: '75%' }} />
              <div className="maps-block" style={{ top: '22%', left: '17%', width: '26%', height: '21%' }} />
              <div className="maps-block" style={{ top: '22%', left: '47%', width: '26%', height: '21%' }} />
              <div className="maps-block" style={{ top: '47%', left: '17%', width: '26%', height: '21%' }} />
              <div className="maps-park" style={{ top: '47%', left: '47%', width: '26%', height: '21%' }} />
              {mapsConfig && <div className="maps-pin-marker">📍</div>}
            </div>
            {mapsConfig && (
              <div className="maps-bottom-sheet">
                <div className="maps-sheet-handle" />
                <div className="maps-pin-row">
                  <span className="maps-pin-emoji">📍</span>
                  <div className="maps-pin-details">
                    <div className="maps-pin-coords">{mapsConfig.coords}</div>
                    <div className="maps-pin-meta">Partagé par {mapsConfig.sharedBy} • à l'instant</div>
                  </div>
                </div>
                <div className="maps-actions">
                  <button className="maps-action-btn maps-action-primary">🚗 Itinéraire</button>
                  <button className="maps-action-btn">📤 Partager</button>
                  <button className="maps-action-btn">🔍 À proximité</button>
                </div>
              </div>
            )}
          </div>
        ) : currentStep?.isPhysical ? (
          <div className="vn-container">
            <div className="vn-background-layer">
              {currentStep.image && <img src={currentStep.image} alt="Scene" onError={handleImageError} />}
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
          <div className="chat-container spark-chat">
            <div className="chat-bg-layer">
              <img src={currentStep?.image || activeProfile?.image} alt="" />
            </div>
            <header className="chat-nav">
              <button onClick={reset} className="ios-back-btn">‹ Spark</button>
              <div className="chat-nav-profile">
                <div className="avatar-wrapper">
                  <img src={activeProfile?.image} alt={activeProfile?.name} className="mini-avatar" />
                  <span className="online-dot"></span>
                </div>
                <span className="nav-title">{activeProfile?.name}</span>
              </div>
              <div className="chat-nav-actions">📞 📹</div>
            </header>
            {currentStep?.image && (
              <div className="chat-scene-image">
                <img src={currentStep.image} alt="" />
                <div className="chat-scene-fade"></div>
                <div className="chat-scene-interest">
                  <div className="interest-bar-bg"><div className="interest-bar-fill" style={{ width: `${(interestScore / 10) * 100}%` }}></div></div>
                </div>
              </div>
            )}
            {!currentStep?.image && (
              <div className="interest-header">
                <div className="interest-bar-bg"><div className="interest-bar-fill" style={{ width: `${(interestScore / 10) * 100}%` }}></div></div>
              </div>
            )}
            <div className="messages">
              {history.map((msg, i) => (
                <div key={i} className={`message ${msg.sender}`}><div className="bubble">{msg.text}</div></div>
              ))}
              {isTyping && <div className="message girl"><div className="bubble typing"><span>.</span><span>.</span><span>.</span></div></div>}
            </div>
            {currentStep?.mirrorText && !isTyping && (
              <div className="postit-container">
                <div className="postit">
                  <span className="postit-mirrored">{currentStep.mirrorText}</span>
                </div>
              </div>
            )}
            <div className="controls">
              {currentStepId && !isTyping && currentStep && (
                currentStep.inputType === 'text' ? (
                  <div className="input-field-container">
                    <input
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder="Votre réponse..."
                      onKeyPress={(e) => e.key === 'Enter' && handleTextInput()}
                    />
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
