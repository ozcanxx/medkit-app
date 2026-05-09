import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { store, useScreen, useTweaks } from './game/store';
import { applyIntensity, applyPalette } from './styles/palettes';
import { SplashScreen } from './components/SplashScreen';
import { OnboardingScreen } from './components/OnboardingScreen';
import { HomeScreen } from './components/HomeScreen';
import { ModeSelectScreen } from './components/ModeSelectScreen';
import { GPRoomScreen } from './components/GPRoomScreen';
import { CaseLibraryScreen } from './components/CaseLibraryScreen';
import { BriefScreen } from './components/BriefScreen';
import { EncounterScreen } from './components/EncounterScreen';
import { EndConfirmScreen } from './components/EndConfirmScreen';
import { DebriefScreen } from './components/DebriefScreen';
import { HistoryScreen } from './components/HistoryScreen';
import { AgenticRoundsScreen } from './components/AgenticRoundsScreen';
import { AgentTopologyScreen } from './components/AgentTopologyScreen';
import { BackgroundMusic } from './components/BackgroundMusic';

export default function App() {
  const screen = useScreen();
  const tweaks = useTweaks();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    applyPalette(tweaks.palette);
  }, [tweaks.palette]);

  useEffect(() => {
    applyIntensity(tweaks.intensity);
  }, [tweaks.intensity]);

  // Minimal path-based route: /agentic-rounds boots straight into the
  // architecture page so the demo can deep-link to it.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const path = window.location.pathname.replace(/\/+$/, '');
    if (path === '/agentic-rounds') {
      store.setScreen('agenticRounds');
    } else if (path === '/agent-topology') {
      store.setScreen('agentTopology');
    }
  }, []);

  return (
    <div className="app">
      {/* Dil Seçim Menüsü (Başlangıç Ekranı - Sayfanın Ortası) */}
      {screen === 'splash' && (
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          zIndex: 9999, 
          background: 'var(--paper)', 
          padding: '24px 32px', 
          borderRadius: 'var(--r-md)', 
          border: 'var(--stroke-thick) solid var(--line)', 
          boxShadow: 'var(--plush)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px'
        }}>
          <label htmlFor="language-select" style={{ fontWeight: 800, fontSize: '22px', color: 'var(--ink)' }}>{t('selectLanguage', 'Dil Seçiniz')}</label>
          <select id="language-select" value={i18n.language} onChange={(e) => i18n.changeLanguage(e.target.value)} style={{ padding: '8px 16px', borderRadius: 'var(--r-sm)', border: '2.5px solid var(--line)', fontSize: '16px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', color: 'var(--ink)' }}>
            <option value="tr">Türkçe</option>
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="el">Ελληνικά</option>
          </select>
        </div>
      )}

      {screen === 'splash' && <SplashScreen />}
      {screen === 'onboarding' && <OnboardingScreen />}
      {screen === 'home' && <HomeScreen />}
      {screen === 'mode' && <ModeSelectScreen />}
      {screen === 'gpRoom' && <GPRoomScreen />}
      {screen === 'library' && <CaseLibraryScreen />}
      {screen === 'brief' && <BriefScreen />}
      {screen === 'encounter' && <EncounterScreen />}
      {screen === 'endConfirm' && <EndConfirmScreen />}
      {screen === 'debrief' && <DebriefScreen />}
      {screen === 'history' && <HistoryScreen />}
      {screen === 'agenticRounds' && <AgenticRoundsScreen />}
      {screen === 'agentTopology' && <AgentTopologyScreen />}
      <BackgroundMusic />
    </div>
  );
}
