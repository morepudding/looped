import { useState } from 'react';

const characterDesc = 'young ginger woman, light freckles, green eyes, slim build, natural beauty';

const EXCLUSIVE_PROMPTS: Record<string, { id: string, title: string, prompt: string }[]> = {
  'neighbor': [
    { id: 'morning', title: 'Réveil', prompt: `Raw photo, 3/4 shot, ${characterDesc}, lying in white sheets, messy hair, soft morning sunlight through curtains, shot on 35mm film` },
    { id: 'shower', title: 'Douche', prompt: `Raw photo, profile shot, ${characterDesc}, head tilted back eyes closed, water cascading over shoulders, steam rising, warm golden bathroom light from the side, shot on Canon EOS R5 85mm f1.4` },
    { id: 'gym', title: 'Gym', prompt: `Raw photo, ${characterDesc}, leaning against gym rack, black sports bra, catching her breath, soft sweat glow, natural gym lighting, shot on 35mm film` },
    { id: 'sofa', title: 'Sofa', prompt: `Raw photo, ${characterDesc}, lounging on velvet sofa, silk shirt, golden hour light through window, intimate mood, shot on Canon EOS R5 85mm f1.4` },
    { id: 'beach_v1', title: 'Plage (Portrait)', prompt: `Raw photo, close-up, ${characterDesc}, smiling at camera, wind-blown hair, warm sunset golden hour light, beach and waves background, shot on Canon EOS R5 85mm f1.4` },
    { id: 'beach_back', title: 'Plage (Horizon)', prompt: `Raw photo, view from behind, ${characterDesc}, walking towards the ocean, looking at the horizon, long red hair blowing in the wind, warm sunset golden hour light, beach background, cinematic depth of field, shot on Canon EOS R5 85mm f1.4` }
  ]
};

export function ExclusivePhotos({ profileId, profileName, masterSeed }: { profileId: string, profileName: string, masterSeed: number | null }) {
  const apiKey = import.meta.env.VITE_POLLINATIONS_API_KEY;
  const prompts = EXCLUSIVE_PROMPTS[profileId] || [];

  const getUrl = (prompt: string, seed: number) => {
    // On utilise le modèle flux comme recommandé par le skill
    const baseUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1080&height=1440&nologo=true&seed=${seed}&model=flux`;
    return apiKey ? `${baseUrl}&key=${apiKey}&private=true` : baseUrl;
  };

  if (prompts.length === 0) {
    return (
      <div style={{ background: '#222', padding: '20px', borderRadius: '8px' }}>
        <h2>Photos Exclusives - {profileName} 📸</h2>
        <p style={{ color: '#aaa', marginTop: '20px' }}>Pas de photos exclusives configurées pour ce personnage pour le moment. (Uniquement Léa pour l'instant).</p>
      </div>
    );
  }

  return (
    <div style={{ background: '#222', padding: '20px', borderRadius: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Photos Exclusives - {profileName} 📸</h2>
        {apiKey ? (
          <span style={{ color: '#4caf50', fontSize: '0.8rem', padding: '4px 8px', border: '1px solid #4caf50', borderRadius: '12px' }}>✨ API Pollinations Détectée</span>
        ) : (
          <span style={{ color: '#f44336', fontSize: '0.8rem', padding: '4px 8px', border: '1px solid #f44336', borderRadius: '12px' }}>⚠️ Clé API Pollinations Manquante</span>
        )}
      </div>

      {!masterSeed && (
        <div style={{ background: '#4a3000', padding: '10px', borderRadius: '4px', marginTop: '15px', border: '1px solid #ff9800' }}>
          <p style={{ color: '#ffa000', margin: 0 }}>⚠️ Attention: Vous n'avez pas validé l'ancrage (seed) du visage dans l'onglet Scénarios. Les photos générées auront un visage aléatoire.</p>
        </div>
      )}
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
        {prompts.map(item => {
          // Si on n'a pas fixé de seed pour le visage, on en prend un au hasard
          const seed = masterSeed || Math.floor(Math.random() * 1000000);
          const url = getUrl(item.prompt, seed);
          
          return (
            <div key={item.id} style={{ background: '#333', padding: '15px', borderRadius: '8px', border: '1px solid #444' }}>
              <h4 style={{ marginBottom: '10px', color: '#fff' }}>{item.title}</h4>
              <p style={{ fontSize: '0.75rem', color: '#888', marginBottom: '10px', height: '40px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{item.prompt}</p>
              <img 
                src={url} 
                alt={item.title} 
                style={{ width: '100%', borderRadius: '4px', aspectRatio: '1080/1440', objectFit: 'cover', background: '#111' }} 
              />
              <button 
                onClick={() => window.open(url, '_blank')}
                style={{ 
                  width: '100%', 
                  marginTop: '10px', 
                  padding: '8px',
                  background: '#646cff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                🔍 Ouvrir en grand
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}