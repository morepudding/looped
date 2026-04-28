import { useState, useRef, useEffect } from 'react';
import { PROFILES } from '../data/profiles';
import { SCENARIOS } from '../data/scenarios';
import type { Profile, Step } from '../types';

const BASE_PROMPTS: Record<string, string> = {
  neighbor: "Young French woman, messy ginger hair, green eyes, freckles, cute face, realistic photography",
  teacher: "32 year old professional woman, strict look, glasses, classroom background, realistic photography",
  colleague: "27 year old office woman, casual business wear, coffee shop background, realistic photography"
};

const ERROR_PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600'%3E%3Crect width='400' height='600' fill='%23300'/%3E%3Ctext x='50%25' y='50%25' fill='%23a44' text-anchor='middle' dominant-baseline='middle' font-size='14'%3EErreur%3C/text%3E%3C/svg%3E";

function randSeed() {
  return Math.floor(Math.random() * 1000000);
}

function btnStyle(bg: string, fontSize = '0.9rem'): React.CSSProperties {
  return { padding: '10px 18px', background: bg, color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize };
}

// Simple single-image loader — one at a time, no queue needed
// pollinations sometimes fires onerror on redirect steps then onload on the final image.
// Fix: delay onerror by 3s so onload can cancel it if the image arrives.
function SingleImage({ src, alt, style }: { src: string; alt: string; style?: React.CSSProperties }) {
  const [bust, setBust] = useState(0);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState(false);
  const url = bust === 0 ? src : `${src}&_t=${bust}`;

  useEffect(() => {
    setOk(false);
    setErr(false);
    const timer = setTimeout(() => setErr(true), 90000);
    return () => clearTimeout(timer);
  }, [url]);

  return (
    <div style={{ position: 'relative', ...style }}>
      {!ok && !err && (
        <div style={{ position: 'absolute', inset: 0, background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', fontSize: '0.9rem', borderRadius: '12px' }}>
          ⏳ Génération en cours...
        </div>
      )}
      <img
        key={url}
        src={url}
        alt={alt}
        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px', display: ok ? 'block' : 'none' }}
        referrerPolicy="no-referrer"
        onLoad={() => { setOk(true); setErr(false); }}
        onError={() => setErr(true)}
      />
      {err && (
        <div style={{ position: 'absolute', inset: 0, background: '#1a0000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', borderRadius: '12px' }}>
          <span style={{ color: '#a44', fontSize: '0.85rem' }}>❌ Image non disponible</span>
          <button onClick={() => { setOk(false); setErr(false); setBust(Date.now()); }} style={btnStyle('#444', '0.8rem')}>
            🔄 Réessayer
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Phase 2 : Face Swiper ───────────────────────────────────────────────────
function FaceSwiper({ profile, onSelect }: { profile: Profile; onSelect: (seed: number) => void }) {
  const [seed, setSeed] = useState(randSeed);
  const [count, setCount] = useState(1);
  const touchStartX = useRef<number | null>(null);

  const prompt = BASE_PROMPTS[profile.id] || profile.name;
  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=800&height=1200&nologo=true&seed=${seed}`;

  const handleLeft = () => { setSeed(randSeed()); setCount(c => c + 1); };
  const handleRight = () => onSelect(seed);

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 60) delta < 0 ? handleLeft() : handleRight();
    touchStartX.current = null;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', padding: '20px' }}>
      <p style={{ color: '#aaa', margin: 0 }}>Profil #{count} — seed: {seed}</p>

      <div
        style={{ width: 'min(480px, 90vw)', aspectRatio: '2/3', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.6)', position: 'relative' }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <SingleImage key={url} src={url} alt="Candidat visage" style={{ width: '100%', height: '100%' }} />
      </div>

      <div style={{ display: 'flex', gap: '40px' }}>
        <button
          onClick={handleLeft}
          style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#c62828', border: 'none', color: 'white', fontSize: '1.8rem', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.4)' }}
          title="Passer"
        >✗</button>
        <button
          onClick={handleRight}
          style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#2e7d32', border: 'none', color: 'white', fontSize: '1.8rem', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.4)' }}
          title="Choisir comme ancrage"
        >✓</button>
      </div>

      <p style={{ color: '#666', fontSize: '0.8rem', margin: 0 }}>✗ passer &nbsp;&nbsp;|&nbsp;&nbsp; ✓ choisir</p>
    </div>
  );
}

// ─── Phase 3 : Step Reviewer ─────────────────────────────────────────────────
function StepReviewer({ steps, masterSeed, profileId, onReset }: {
  steps: Step[];
  masterSeed: number;
  profileId: string;
  onReset: () => void;
}) {
  const visualSteps = steps.filter(s => s.visualPrompt);
  const [index, setIndex] = useState(0);
  const [variationSeed, setVariationSeed] = useState(0);
  const touchStartX = useRef<number | null>(null);

  if (visualSteps.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#aaa' }}>
        <p>Aucune étape avec visuel dans ce scénario.</p>
        <button onClick={onReset} style={btnStyle('#444')}>← Changer d'ancrage</button>
      </div>
    );
  }

  const step = visualSteps[index];
  const finalSeed = masterSeed + variationSeed;
  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(step.visualPrompt!)}?width=800&height=1200&nologo=true&seed=${finalSeed}`;

  const prev = () => { setIndex(i => Math.max(0, i - 1)); setVariationSeed(0); };
  const next = () => { setIndex(i => Math.min(visualSteps.length - 1, i + 1)); setVariationSeed(0); };

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 60) delta < 0 ? next() : prev();
    touchStartX.current = null;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '400px' }}>
        <span style={{ color: '#aaa', fontSize: '0.85rem' }}>Étape <strong>{step.id}</strong></span>
        <span style={{ color: '#666', fontSize: '0.8rem' }}>{index + 1} / {visualSteps.length}</span>
        <button onClick={onReset} style={btnStyle('#555', '0.75rem')}>Changer ancrage</button>
      </div>

      <p style={{ color: '#666', fontSize: '0.72rem', maxWidth: '360px', textAlign: 'center', margin: 0, lineHeight: 1.4 }}>
        {step.visualPrompt}
      </p>

      <div
        style={{ width: 'min(480px, 90vw)', aspectRatio: '2/3', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.6)', position: 'relative' }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <SingleImage key={url} src={url} alt={`Étape ${step.id}`} style={{ width: '100%', height: '100%' }} />
      </div>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <button onClick={prev} disabled={index === 0} style={btnStyle(index === 0 ? '#2a2a2a' : '#444')}>← Précédente</button>
        <button onClick={() => setVariationSeed(s => s + 7777)} style={btnStyle('#555')}>🔄 Variation</button>
        <button onClick={next} disabled={index === visualSteps.length - 1} style={btnStyle(index === visualSteps.length - 1 ? '#2a2a2a' : '#444')}>Suivante →</button>
      </div>

      <p style={{ color: '#555', fontSize: '0.75rem', margin: 0 }}>seed: {finalSeed} · {profileId}</p>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export function DevDashboard({ onBack }: { onBack: () => void }) {
  const [selectedProfileId, setSelectedProfileId] = useState<string>(PROFILES[0].id);
  const [masterSeed, setMasterSeed] = useState<number | null>(null);

  const profile = PROFILES.find(p => p.id === selectedProfileId)!;
  const scenario = SCENARIOS[profile.scenarioId];
  const steps = scenario ? Object.values(scenario.steps) : [];

  return (
    <div style={{ background: '#1a1a1a', color: 'white', minHeight: '100vh', overflowY: 'auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #333' }}>
        <h2 style={{ margin: 0 }}>🎬 Director's Room</h2>
        <button onClick={onBack} style={btnStyle('#444')}>Quitter</button>
      </div>

      {/* Character picker */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid #333', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {PROFILES.map(p => (
          <button
            key={p.id}
            onClick={() => { setSelectedProfileId(p.id); setMasterSeed(null); }}
            style={btnStyle(selectedProfileId === p.id ? '#646cff' : '#333')}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Phase 2 or 3 */}
      {!masterSeed ? (
        <>
          <p style={{ textAlign: 'center', color: '#aaa', marginTop: '20px', fontSize: '0.9rem' }}>
            Choisir l'ancrage du visage pour <strong>{profile.name}</strong>
          </p>
          <FaceSwiper profile={profile} onSelect={setMasterSeed} />
        </>
      ) : (
        <StepReviewer
          steps={steps}
          masterSeed={masterSeed}
          profileId={selectedProfileId}
          onReset={() => setMasterSeed(null)}
        />
      )}
    </div>
  );
}
