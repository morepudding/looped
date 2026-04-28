import { useState, useEffect } from 'react';
import { CARTRIDGES, PROFILES, SCENARIOS } from '../cartridges';
import { DialogueViewer } from './DialogueViewer';
import type { Profile } from '../types';

type Tab = 'casting' | 'dialogues';

export function DevDashboard({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState<Tab>('dialogues');
  const [selectedProfileId, setSelectedProfileId] = useState<string>(PROFILES[0].id);
  const [currentCastingSeed, setCurrentCastingSeed] = useState<number>(Math.floor(Math.random() * 1000000));

  const profile = PROFILES.find(p => p.id === selectedProfileId)!;
  const scenario = SCENARIOS[profile.scenarioId];

  const getBasePrompt = (p: Profile) => {
    const cartridge = CARTRIDGES.find(c => c.profile.id === p.id);
    return cartridge?.castingPrompt || p.name;
  };

  useEffect(() => {
    setCurrentCastingSeed(Math.floor(Math.random() * 1000000));
  }, [selectedProfileId]);

  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(getBasePrompt(profile))}?width=1080&height=1920&nologo=true&seed=${currentCastingSeed}`;

  return (
    <div className="dev-dashboard" style={{ padding: '20px', background: '#1a1a1a', color: 'white', height: '100vh', overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '1.3rem' }}>Director's Room 🎬</h1>
        <button onClick={onBack} style={{ padding: '10px 20px', cursor: 'pointer', background: '#444', color: 'white', border: 'none', borderRadius: '4px' }}>Quitter</button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 20, background: '#333', borderRadius: 10, padding: 4 }}>
        {([['dialogues', '💬 Dialogues'], ['casting', '🎨 Casting']] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{
              flex: 1, padding: '10px', border: 'none', borderRadius: 8, cursor: 'pointer',
              fontSize: '.9rem', fontWeight: 600,
              background: tab === key ? '#646cff' : 'transparent',
              color: tab === key ? '#fff' : '#888',
              transition: 'all .15s'
            }}
          >{label}</button>
        ))}
      </div>

      {/* Character selector */}
      <div style={{ marginBottom: 20, background: '#333', padding: '12px 15px', borderRadius: 8 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {PROFILES.map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedProfileId(p.id)}
              style={{
                padding: '8px 16px',
                background: selectedProfileId === p.id ? '#646cff' : '#444',
                color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer',
                fontSize: '.9rem', fontWeight: selectedProfileId === p.id ? 700 : 400
              }}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {tab === 'dialogues' && scenario && (
        <DialogueViewer scenario={scenario} />
      )}

      {tab === 'casting' && (
        <>
          <div style={{ background: '#222', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
            <h3>Casting : Trouvons le visage de {profile?.name}</h3>
            <p style={{ color: '#aaa', marginBottom: '20px' }}>Trouvez le visage idéal. Notez le Seed pour que je puisse générer tout le reste.</p>

            <div style={{ maxWidth: '400px', margin: '0 auto' }}>
              <div style={{
                width: '100%',
                aspectRatio: '9/16',
                borderRadius: '8px',
                border: '4px solid #444',
                background: '#111',
                overflow: 'hidden'
              }}>
                <img
                  key={currentCastingSeed}
                  src={imageUrl}
                  alt="Casting"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
                  }}
                />
              </div>

              <div style={{ marginTop: '15px', padding: '10px', background: '#000', borderRadius: '4px', border: '1px solid #646cff' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#646cff' }}>SEED : {currentCastingSeed}</span>
              </div>

              <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                <button
                  onClick={() => setCurrentCastingSeed(Math.floor(Math.random() * 1000000))}
                  style={{
                    flex: 1,
                    padding: '15px',
                    background: '#646cff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 'bold'
                  }}
                >
                  Visage Suivant 🔄
                </button>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '40px', padding: '20px', border: '1px dashed #444', borderRadius: '8px', color: '#888' }}>
            <p>💡 <strong>Mode d'emploi :</strong></p>
            <ol style={{ textAlign: 'left', display: 'inline-block', marginTop: '10px' }}>
              <li>Cliquez sur <strong>Visage Suivant</strong> pour voir différentes propositions.</li>
              <li>Une fois le visage trouvé, donnez-moi le <strong>SEED</strong> ici.</li>
              <li>Je lancerai le "Tournage complet" en arrière-plan pour remplir tes dossiers !</li>
            </ol>
          </div>
        </>
      )}
    </div>
  );
}
