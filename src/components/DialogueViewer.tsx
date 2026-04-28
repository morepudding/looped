import { useState, useEffect, useCallback } from 'react';
import type { Scenario, Step, Choice } from '../types';

type Comments = Record<string, string[]>;

const STORAGE_KEY = 'ddr-dialogue-comments';

function loadComments(scenarioId: string): Comments {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY}-${scenarioId}`);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function saveComments(scenarioId: string, comments: Comments) {
  localStorage.setItem(`${STORAGE_KEY}-${scenarioId}`, JSON.stringify(comments));
}

function StepBadge({ step }: { step: Step }) {
  const badges: string[] = [];
  if (step.isPhysical) badges.push('🎭 face-à-face');
  if (step.inputType === 'text') badges.push('⌨️ défi texte');
  if (step.expectedAnswer) badges.push(`🎯 "${step.expectedAnswer}"`);
  if (!badges.length) return null;
  return (
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
      {badges.map((b, i) => (
        <span key={i} style={{
          fontSize: '.7rem', padding: '2px 8px', borderRadius: 6,
          background: 'rgba(255,255,255,.1)', color: '#ccc'
        }}>{b}</span>
      ))}
    </div>
  );
}

function DeltaBadge({ delta }: { delta: number }) {
  const color = delta > 0 ? '#30d158' : delta < 0 ? '#ff453a' : '#8e8e93';
  const text = delta > 0 ? `+${delta}` : `${delta}`;
  return (
    <span style={{
      fontSize: '.75rem', fontWeight: 700, color,
      background: `${color}22`, padding: '2px 8px', borderRadius: 10,
      flexShrink: 0
    }}>{text}</span>
  );
}

function ChoiceRow({ choice }: { choice: Choice }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 8,
      padding: '8px 10px', borderRadius: 10,
      background: 'rgba(0,122,255,.12)', border: '1px solid rgba(0,122,255,.2)'
    }}>
      <DeltaBadge delta={choice.interestDelta ?? 0} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '.82rem', color: '#fff', lineHeight: 1.4 }}>{choice.text}</div>
        {choice.reactionMessages && (
          <div style={{ fontSize: '.75rem', color: '#ff6b8a', marginTop: 4, fontStyle: 'italic' }}>
            → {choice.reactionMessages.join(' / ')}
          </div>
        )}
        <div style={{ fontSize: '.7rem', color: '#8e8e93', marginTop: 3 }}>
          → {choice.nextStepId === 'END' ? '🏁 FIN' : choice.nextStepId}
        </div>
      </div>
    </div>
  );
}

function CommentSection({ stepId, comments, onAdd, onDelete }: {
  stepId: string;
  comments: string[];
  onAdd: (stepId: string, text: string) => void;
  onDelete: (stepId: string, index: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState('');

  const handleSubmit = () => {
    const text = draft.trim();
    if (!text) return;
    onAdd(stepId, text);
    setDraft('');
  };

  const hasComments = comments.length > 0;

  return (
    <div style={{ marginTop: 8 }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: hasComments ? 'rgba(255,204,0,.15)' : 'rgba(255,255,255,.05)',
          border: hasComments ? '1px solid rgba(255,204,0,.3)' : '1px solid rgba(255,255,255,.1)',
          borderRadius: 8, padding: '5px 12px', cursor: 'pointer',
          fontSize: '.75rem', color: hasComments ? '#ffcc00' : '#888',
          display: 'flex', alignItems: 'center', gap: 6
        }}
      >
        {hasComments ? `📝 ${comments.length} note${comments.length > 1 ? 's' : ''}` : '+ Note'}
        <span style={{ fontSize: '.65rem' }}>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div style={{
          marginTop: 8, padding: 10, borderRadius: 10,
          background: 'rgba(255,204,0,.08)', border: '1px solid rgba(255,204,0,.15)'
        }}>
          {comments.map((c, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 6,
              padding: '6px 8px', borderRadius: 6, background: 'rgba(255,204,0,.1)'
            }}>
              <span style={{ fontSize: '.8rem', flex: 1, color: '#ffcc00', lineHeight: 1.4 }}>{c}</span>
              <button
                onClick={() => onDelete(stepId, i)}
                style={{
                  background: 'none', border: 'none', color: '#ff453a',
                  cursor: 'pointer', fontSize: '.75rem', padding: '0 4px', flexShrink: 0
                }}
              >✕</button>
            </div>
          ))}

          <div style={{ display: 'flex', gap: 6, marginTop: comments.length > 0 ? 8 : 0 }}>
            <input
              value={draft}
              onChange={e => setDraft(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              placeholder="Ton commentaire..."
              style={{
                flex: 1, padding: '8px 12px', borderRadius: 8,
                background: 'rgba(0,0,0,.3)', border: '1px solid rgba(255,255,255,.1)',
                color: '#fff', fontSize: '.82rem', outline: 'none'
              }}
            />
            <button
              onClick={handleSubmit}
              style={{
                padding: '8px 14px', borderRadius: 8, border: 'none',
                background: '#ffcc00', color: '#000', fontSize: '.8rem',
                fontWeight: 700, cursor: 'pointer', flexShrink: 0
              }}
            >OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

function StepCard({ step, index, comments, onAddComment, onDeleteComment }: {
  step: Step; index: number;
  comments: string[];
  onAddComment: (stepId: string, text: string) => void;
  onDeleteComment: (stepId: string, index: number) => void;
}) {
  const headerColor = step.isPhysical
    ? 'rgba(175,82,222,.4)'
    : step.inputType === 'text'
      ? 'rgba(255,159,10,.4)'
      : 'rgba(0,122,255,.25)';

  return (
    <div style={{ position: 'relative' }}>
      {index > 0 && (
        <div style={{
          width: 2, height: 20, background: '#444',
          margin: '0 auto'
        }} />
      )}
      <div style={{
        background: '#1c1c1e', borderRadius: 14,
        border: `1px solid ${headerColor}`, overflow: 'hidden'
      }}>
        <div style={{
          padding: '8px 14px', background: headerColor,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <span style={{ fontSize: '.85rem', fontWeight: 700, color: '#fff' }}>
            {step.id}
          </span>
          <span style={{ fontSize: '.7rem', color: '#aaa' }}>
            {step.girlMessages.length} msg · {step.choices.length} choix
          </span>
        </div>

        <div style={{ padding: '12px 14px' }}>
          <StepBadge step={step} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 12 }}>
            {step.girlMessages.map((msg, i) => (
              <div key={i} style={{
                fontSize: '.82rem', color: '#e5e5ea', lineHeight: 1.4,
                padding: '6px 10px', borderRadius: 12,
                background: 'rgba(44,44,46,.8)',
                borderBottomLeftRadius: 4, alignSelf: 'flex-start',
                maxWidth: '90%'
              }}>{msg}</div>
            ))}
          </div>

          {step.wrongAnswerMessages && (
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: '.7rem', color: '#ff453a', marginBottom: 4, fontWeight: 600 }}>
                Mauvaises réponses :
              </div>
              {step.wrongAnswerMessages.map((msg, i) => (
                <div key={i} style={{
                  fontSize: '.75rem', color: '#999', padding: '3px 0',
                  borderLeft: '2px solid #ff453a33', paddingLeft: 8, marginBottom: 2
                }}>{msg}</div>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {step.choices.map((choice, i) => (
              <ChoiceRow key={i} choice={choice} />
            ))}
          </div>

          <CommentSection
            stepId={step.id}
            comments={comments}
            onAdd={onAddComment}
            onDelete={onDeleteComment}
          />
        </div>
      </div>
    </div>
  );
}

export function DialogueViewer({ scenario }: { scenario: Scenario }) {
  const orderedSteps = buildStepOrder(scenario);
  const [comments, setComments] = useState<Comments>(() => loadComments(scenario.id));

  useEffect(() => {
    setComments(loadComments(scenario.id));
  }, [scenario.id]);

  const handleAdd = useCallback((stepId: string, text: string) => {
    setComments(prev => {
      const next = { ...prev, [stepId]: [...(prev[stepId] || []), text] };
      saveComments(scenario.id, next);
      return next;
    });
  }, [scenario.id]);

  const handleDelete = useCallback((stepId: string, index: number) => {
    setComments(prev => {
      const arr = [...(prev[stepId] || [])];
      arr.splice(index, 1);
      const next = { ...prev, [stepId]: arr };
      if (arr.length === 0) delete next[stepId];
      saveComments(scenario.id, next);
      return next;
    });
  }, [scenario.id]);

  const totalComments = Object.values(comments).reduce((n, arr) => n + arr.length, 0);

  const handleExport = useCallback(() => {
    const lines: string[] = [];
    for (const step of orderedSteps) {
      const stepComments = comments[step.id];
      if (!stepComments?.length) continue;
      lines.push(`## ${step.id}`);
      for (const c of stepComments) lines.push(`- ${c}`);
      lines.push('');
    }
    if (!lines.length) return;
    navigator.clipboard.writeText(lines.join('\n'));
  }, [comments, orderedSteps]);

  const handleClearAll = useCallback(() => {
    setComments({});
    saveComments(scenario.id, {});
  }, [scenario.id]);

  return (
    <div style={{ padding: '12px 0' }}>
      <div style={{
        display: 'flex', gap: 12, marginBottom: 16, padding: '0 4px',
        fontSize: '.8rem', color: '#8e8e93', flexWrap: 'wrap', alignItems: 'center'
      }}>
        <span>📊 {Object.keys(scenario.steps).length} étapes</span>
        <span>💬 {Object.values(scenario.steps).reduce((n, s) => n + s.girlMessages.length, 0)} messages</span>
        <span>🔀 {Object.values(scenario.steps).reduce((n, s) => n + s.choices.length, 0)} choix</span>
        {totalComments > 0 && (
          <span style={{ color: '#ffcc00' }}>📝 {totalComments} note{totalComments > 1 ? 's' : ''}</span>
        )}
      </div>

      {totalComments > 0 && (
        <div style={{
          display: 'flex', gap: 8, marginBottom: 16, padding: '0 4px'
        }}>
          <button
            onClick={handleExport}
            style={{
              padding: '6px 14px', borderRadius: 8, border: 'none',
              background: '#ffcc00', color: '#000', fontSize: '.78rem',
              fontWeight: 700, cursor: 'pointer'
            }}
          >📋 Copier toutes les notes</button>
          <button
            onClick={handleClearAll}
            style={{
              padding: '6px 14px', borderRadius: 8,
              border: '1px solid rgba(255,69,58,.3)', background: 'rgba(255,69,58,.1)',
              color: '#ff453a', fontSize: '.78rem', cursor: 'pointer'
            }}
          >Tout effacer</button>
        </div>
      )}

      <div style={{
        display: 'flex', gap: 8, marginBottom: 16, padding: '0 4px', flexWrap: 'wrap'
      }}>
        <Legend color="rgba(0,122,255,.4)" label="Chat" />
        <Legend color="rgba(175,82,222,.5)" label="Face-à-face" />
        <Legend color="rgba(255,159,10,.5)" label="Défi texte" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {orderedSteps.map((step, i) => (
          <StepCard
            key={step.id}
            step={step}
            index={i}
            comments={comments[step.id] || []}
            onAddComment={handleAdd}
            onDeleteComment={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <div style={{ width: 12, height: 12, borderRadius: 3, background: color }} />
      <span style={{ fontSize: '.75rem', color: '#aaa' }}>{label}</span>
    </div>
  );
}

function buildStepOrder(scenario: Scenario): Step[] {
  const visited = new Set<string>();
  const result: Step[] = [];

  function walk(id: string) {
    if (id === 'END' || visited.has(id)) return;
    const step = scenario.steps[id];
    if (!step) return;
    visited.add(id);
    result.push(step);
    for (const choice of step.choices) {
      walk(choice.nextStepId);
    }
  }

  walk(scenario.startStepId);

  for (const step of Object.values(scenario.steps)) {
    if (!visited.has(step.id)) {
      visited.add(step.id);
      result.push(step);
    }
  }

  return result;
}
