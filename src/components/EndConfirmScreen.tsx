import { useTranslation } from 'react-i18next';
import { DoodleScatter, PatientFace, TopBar } from './primitives';
import { getCase } from '../data/cases';
import { store, useStore, useTweaks } from '../game/store';
import type { EndConfirmChecks } from '../game/types';

interface Item {
  id: keyof EndConfirmChecks;
  label: string;
  sub: string;
}

export function EndConfirmScreen() {
  const { t } = useTranslation();
  const tweaks = useTweaks();

  const ITEMS: Item[] = [
    { id: 'sum', label: t('endConfirm.sumLabel'), sub: t('endConfirm.sumSub') },
    { id: 'safe', label: t('endConfirm.safeLabel'), sub: t('endConfirm.safeSub') },
    { id: 'ice', label: t('endConfirm.iceLabel'), sub: t('endConfirm.iceSub') },
  ];
  const checked = useStore((s) => s.endConfirm);
  const caseId = useStore((s) => s.selectedCaseId);
  const c = getCase(caseId);

  return (
    <div className="screen" style={{ background: 'var(--cream)', position: 'relative' }}>
      <TopBar here={5} steps={['Polyclinic', 'GP', 'Case', 'Brief', 'Encounter', 'Wrap']} />

      <DoodleScatter
        items={[
          { kind: 'sparkle', x: 60, y: 90, size: 22, color: '#FFD86B' },
          { kind: 'sparkle', x: '88%', y: 130, size: 20, color: '#5AB7F2' },
        ]}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          top: 67,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 40,
        }}
      >
        <div
          className="plush-lg"
          style={{
            width: 720,
            background: '#FFFCF3',
            padding: 36,
            position: 'relative',
            transform: 'rotate(-0.8deg)',
          }}
        >
          <div style={{ position: 'absolute', right: -38, top: -50 }}>
            <div className="floaty">
              <PatientFace style={tweaks.avatarStyle} skin={c.skin} hair={c.hair} size={110} mood="happy" />
            </div>
            <div style={{ position: 'absolute', left: -156, top: 16, width: 160 }}>
              <div
                style={{
                  position: 'relative',
                  background: 'white',
                  border: '3.5px solid var(--line)',
                  borderRadius: 'var(--r-md)',
                  padding: '8px 12px',
                  fontWeight: 700,
                  fontSize: 12,
                  boxShadow: 'var(--plush-sm)',
                }}
              >
                "Is there anything else I should know?"
                <svg style={{ position: 'absolute', right: -14, top: 14 }} width="20" height="22" viewBox="0 0 20 22">
                  <path
                    d="M 0 4 L 18 12 L 0 18 Z"
                    fill="white"
                    stroke="var(--line)"
                    strokeWidth="3.5"
                    strokeLinejoin="round"
                  />
                  <line x1="0" y1="4" x2="0" y2="18" stroke="white" strokeWidth="4" />
                </svg>
              </div>
            </div>
          </div>

          <div className="chip butter" style={{ marginBottom: 16 }}>
            {t('endConfirm.chip')}
          </div>
          <h1 style={{ fontSize: 32, lineHeight: 1.1, marginBottom: 8 }}>{t('endConfirm.heading')}</h1>
          <div
            style={{
              fontSize: 15,
              color: 'var(--ink-2)',
              fontWeight: 600,
              marginBottom: 22,
              maxWidth: 460,
            }}
          >
            {t('endConfirm.subtitle')}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 22 }}>
            {ITEMS.map((it) => {
              const on = checked[it.id];
              return (
                <div
                  key={it.id}
                  className="tap"
                  onClick={() => store.toggleEndConfirm(it.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: '12px 14px',
                    background: on ? 'var(--mint)' : 'white',
                    border: '3px solid var(--line)',
                    borderRadius: 16,
                    boxShadow: 'var(--plush-tiny)',
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: on ? 'white' : 'var(--cream)',
                      border: '3px solid var(--line)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 900,
                      fontSize: 18,
                      color: 'var(--mint-deep)',
                    }}
                  >
                    {on ? '✓' : ''}
                  </div>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: 15 }}>{it.label}</div>
                    <div style={{ fontWeight: 600, fontSize: 12, color: 'var(--ink-2)' }}>{it.sub}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button
              type="button"
              className="btn-plush ghost"
              style={{ flex: 1 }}
              onClick={() => store.setScreen('encounter')}
            >
              {t('endConfirm.backToRoom')}
            </button>
            <button
              type="button"
              className="btn-plush primary"
              style={{ flex: 1.4 }}
              onClick={() => store.setScreen('debrief')}
            >
              {t('endConfirm.endConsultation')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
