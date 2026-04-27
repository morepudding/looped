import { useState, useEffect } from 'react';
import { PROFILES } from '../data/profiles';
import { SCENARIOS } from '../data/scenarios';
import type { Profile, Scenario, Step } from '../types';

// Prompt de base pour chaque profil si l'URL est cassée ou mal formatée
const BASE_PROMPTS: Record<string, string> = {
  neighbor: "Young French woman, messy ginger hair, green eyes, freckles, cute face, realistic photography",
  teacher: "32 year old professional woman, strict look, glasses, classroom background, realistic photography",
  colleague: "27 year old office woman, casual business wear, coffee shop background, realistic photography"
};

export function DevDashboard({ onBack }: { onBack: () => void }) {
  const [selectedProfileId, setSelectedProfileId] = useState<string>(PROFILES[0].id);
  const [masterSeed, setMasterSeed] = useState<number | null>(null);
  const [seedOptions, setSeedOptions] = useState<number[]>([]);
  const [isSaving, setIsSaving] = useState<string | null>(null);

  // Générer 10 seeds au hasard au début ou quand on change de profil
  useEffect(() => {
    const newSeeds = Array.from({ length: 10 }, () => Math.floor(Math.random() * 1000000));
    setSeedOptions(newSeeds);
    setMasterSeed(null); // Reset le choix
  }, [selectedProfileId]);

  const profile = PROFILES.find(p => p.id === selectedProfileId);
  const scenario = profile ? SCENARIOS[profile.scenarioId] : null;

  const getBasePrompt = (p: Profile) => {
    const prompt = BASE_PROMPTS[p.id] || p.name;
    console.log(`[DevDashboard] Generating base prompt for ${p.id}: ${prompt}`);
    return prompt;
  };

  const handleImageLoadError = (seed: number, pId: string) => {
    console.error(`[DevDashboard] Failed to load image for ${pId} with seed ${seed}`);
  };

  const handleImageLoadSuccess = (seed: number) => {
    console.log(`[DevDashboard] Successfully loaded image for seed ${seed}`);
  };

  return (
    <div className="dev-dashboard" style={{ padding: '20px', background: '#1a1a1a', color: 'white', height: '100vh', overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Director's Room 🎬</h1>
        <button onClick={onBack} style={{ padding: '10px 20px', cursor: 'pointer', background: '#444', color: 'white', border: 'none', borderRadius: '4px' }}>Quitter</button>
      </div>

      <div style={{ marginBottom: '30px', background: '#333', padding: '15px', borderRadius: '8px' }}>
        <h3>1. Choisir un Personnage</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          {PROFILES.map(p => (
            <button 
              key={p.id} 
              onClick={() => setSelectedProfileId(p.id)}
              style={{ 
                padding: '10px', 
                background: selectedProfileId === p.id ? '#646cff' : '#444',
                color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'
              }}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {!masterSeed ? (
        <div style={{ marginBottom: '30px', background: '#333', padding: '15px', borderRadius: '8px' }}>
          <h3>2. Sélectionner l'Ancrage du Visage</h3>
          <p style={{ color: '#aaa', marginBottom: '15px' }}>Cliquez sur la photo qui définit le mieux le visage de {profile?.name}.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
            {profile && seedOptions.map((seed) => {
              const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(getBasePrompt(profile))}?width=400&height=400&nologo=true&seed=${seed}`;
              return (
                <div 
                  key={seed} 
                  onClick={() => {
                    console.log(`[DevDashboard] Master seed selected: ${seed}`);
                    setMasterSeed(seed);
                  }}
                  style={{ cursor: 'pointer', border: '2px solid transparent', transition: '0.2s', textAlign: 'center' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#646cff'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}
                >
                  <img 
                    src={url} 
                    alt={`Seed ${seed}`}
                    style={{ width: '100%', borderRadius: '4px', aspectRatio: '1/1', objectFit: 'cover', background: '#222' }}
                    onLoad={() => handleImageLoadSuccess(seed)}
                    onError={(e) => {
                      handleImageLoadError(seed, profile.id);
                      (e.target as HTMLImageElement).src = `https://via.placeholder.com/400?text=Error+Seed+${seed}`;
                    }}
                  />
                  <p style={{ marginTop: '5px', fontSize: '0.8rem' }}>Seed: {seed}</p>
                </div>
              );
            })}
          </div>
          <button 
            onClick={() => setSeedOptions(Array.from({ length: 10 }, () => Math.floor(Math.random() * 1000000)))}
            style={{ marginTop: '20px', padding: '10px 20px', background: '#444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            🔄 Regénérer 10 autres options
          </button>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: '30px', background: '#2e7d32', padding: '15px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3>Ancrage Validé ! (Seed: {masterSeed})</h3>
              <p>Toutes les images ci-dessous utilisent désormais ce visage pour {profile?.name}.</p>
            </div>
            <button onClick={() => setMasterSeed(null)} style={{ background: '#c62828', border: 'none', padding: '10px 20px', color: 'white', borderRadius: '4px', cursor: 'pointer' }}>Changer d'ancrage</button>
          </div>

          <div className="steps-gallery">
            <h3>3. Valider les images du Scénario</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))', gap: '20px' }}>
              {scenario && Object.values(scenario.steps).map((step: Step) => (
                <StepItem 
                  key={step.id} 
                  step={step} 
                  masterSeed={masterSeed} 
                  profileId={selectedProfileId}
                  onSave={handleSaveImage}
                  isSaving={isSaving}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function StepItem({ step, masterSeed, profileId, onSave, isSaving }: { 
  step: Step, 
  masterSeed: number, 
  profileId: string,
  onSave: (url: string, filename: string) => void,
  isSaving: string | null
}) {
  const [variationOffset, setVariationOffset] = useState(0);

  if (!step.visualPrompt) return null;

  const getUrl = (vSeed: number) => 
    `https://image.pollinations.ai/prompt/${encodeURIComponent(step.visualPrompt || '')}?width=1080&height=1600&nologo=true&seed=${vSeed}`;

  return (
    <div style={{ background: '#222', padding: '15px', borderRadius: '8px', border: '1px solid #444' }}>
      <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <strong>Étape: {step.id}</strong>
        <button onClick={() => setVariationOffset(prev => prev + 1000)} style={{ fontSize: '0.8rem', padding: '5px 10px', background: '#444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>🔄 Nouvelles Variations</button>
      </div>
      <p style={{ fontSize: '0.75rem', color: '#888', marginBottom: '10px', height: '40px', overflow: 'hidden', lineClamp: 2 }}>{step.visualPrompt}</p>
      
      <div style={{ display: 'flex', gap: '15px' }}>
        {[0, 5000].map((offset, idx) => {
          const finalSeed = masterSeed + variationOffset + offset;
          const url = getUrl(finalSeed);
          const filename = `${profileId}/step_${step.id}_v${idx + 1}.png`;
          const isThisSaving = isSaving === filename;

          return (
            <div key={idx} style={{ flex: 1 }}>
              <img 
                src={url} 
                alt="variation" 
                style={{ width: '100%', borderRadius: '4px', border: '1px solid #333', background: '#111' }} 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://via.placeholder.com/1080x1600?text=Erreur+Chargement";
                }}
              />
              <button 
                onClick={() => onSave(url, filename)}
                disabled={!!isSaving}
                style={{ 
                  width: '100%', 
                  marginTop: '10px', 
                  padding: '8px',
                  background: isThisSaving ? '#ffa000' : '#646cff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: isSaving ? 'not-allowed' : 'pointer'
                }}
              >
                {isThisSaving ? '⏳ Sauvegarde...' : `📥 Valider & Enregistrer`}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
