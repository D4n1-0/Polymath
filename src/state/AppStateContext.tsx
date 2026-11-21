import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type {
  AvatarCrestId,
  GameResultSummary,
  MistakeVaultItem,
  OverlayId,
  ScreenId,
  TopicGymId,
} from '../types/polymath';
import { INITIAL_MISTAKE_VAULT } from '../data/questions';

interface PersistedState {
  isAuthenticated: boolean;
  displayName: string;
  username: string;
  email: string;
  provider: string;
  tier: string;
  avatarCrest: AvatarCrestId;
  languageId: string;
  languageCode: string;
  mathTrack: string;
  dailyXpGoal: number;
  soundEffects: boolean;
  hapticFeedback: boolean;
  streakReminders: boolean;
  passcodeLockEnabled: boolean;
  focusShields: number;
  dailyStreak: number;
  streakExtendedToday: boolean;
  formulaSparks: number;
  lifetimeSparks: number;
  weeklyXp: number;
  totalSolved: number;
  dailyDrillsDone: number;
  speedSprintBestSec: number;
  mistakeVault: MistakeVaultItem[];
  lesson3Completed: boolean;
  activeTopicGym: TopicGymId;
  doubleXpActive: boolean;
}

const DEFAULT_STATE: PersistedState = {
  isAuthenticated: false,
  displayName: 'John Doe',
  username: '@JohnDoe1080',
  email: 'john.doe@email.com',
  provider: 'Google Classroom',
  tier: 'PRO',
  avatarCrest: 'sigma-violet',
  languageId: 'en-US',
  languageCode: 'EN',
  mathTrack: 'Grade 8 • Algebra',
  dailyXpGoal: 150,
  soundEffects: true,
  hapticFeedback: true,
  streakReminders: true,
  passcodeLockEnabled: true,
  focusShields: 3,
  dailyStreak: 14,
  streakExtendedToday: false,
  formulaSparks: 840,
  lifetimeSparks: 18240,
  weeklyXp: 1820,
  totalSolved: 1420,
  dailyDrillsDone: 3,
  speedSprintBestSec: 42.4,
  mistakeVault: INITIAL_MISTAKE_VAULT,
  lesson3Completed: false,
  activeTopicGym: 'linear',
  doubleXpActive: false,
};

const STORAGE_KEY = 'polymath_demo_state_v1';

interface AppContextValue extends PersistedState {
  screen: ScreenId;
  overlay: OverlayId;
  pendingReturnScreen: ScreenId;
  pendingSsoProvider: string | null;
  lastGameResult: GameResultSummary | null;
  navigate: (screen: ScreenId) => void;
  openOverlay: (overlay: OverlayId) => void;
  closeOverlay: () => void;
  completeLoading: () => void;
  signInDemo: (opts?: { name?: string; username?: string; email?: string; provider?: string }) => void;
  startSsoRegistration: (provider: string) => void;
  setPendingEmailRegistration: (username: string, email: string) => void;
  logOut: () => void;
  setLanguage: (id: string, code: string) => void;
  setAvatarCrest: (crest: AvatarCrestId) => void;
  updateProfile: (patch: { displayName: string; username: string; mathTrack: string }) => void;
  togglePreference: (key: 'soundEffects' | 'hapticFeedback' | 'streakReminders' | 'passcodeLockEnabled') => void;
  cycleMathTrack: () => void;
  cycleDailyXpGoal: () => void;
  setActiveTopicGym: (topic: TopicGymId) => void;
  consumeFocusShield: () => void;
  restoreFocusShield: (amount?: number) => void;
  repairMistakeItem: (id: string) => void;
  activateDoubleXpBoost: () => boolean;
  finishGame: (summary: GameResultSummary) => void;
  claimCelebration: () => void;
  playTone: (kind: 'tap' | 'correct' | 'wrong' | 'win') => void;
  resetDemo: () => void;
}

const AppStateContext = createContext<AppContextValue | null>(null);

function loadPersisted(): PersistedState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as Partial<PersistedState>;
    return {
      ...DEFAULT_STATE,
      ...parsed,
      mistakeVault:
        Array.isArray(parsed.mistakeVault) && parsed.mistakeVault.length > 0
          ? parsed.mistakeVault
          : parsed.mistakeVault?.length === 0
            ? []
            : DEFAULT_STATE.mistakeVault,
    };
  } catch {
    return DEFAULT_STATE;
  }
}

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PersistedState>(loadPersisted);
  const [screen, setScreen] = useState<ScreenId>('loading');
  const [overlay, setOverlay] = useState<OverlayId>(null);
  const [pendingReturnScreen, setPendingReturnScreen] = useState<ScreenId>('path');
  const [pendingSsoProvider, setPendingSsoProvider] = useState<string | null>(null);
  const [lastGameResult, setLastGameResult] = useState<GameResultSummary | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage quota errors in private browsing
    }
  }, [state]);

  const playTone = (kind: 'tap' | 'correct' | 'wrong' | 'win') => {
    if (!state.soundEffects) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      const now = ctx.currentTime;
      if (kind === 'tap') {
        osc.frequency.setValueAtTime(520, now);
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.055);
      } else if (kind === 'correct') {
        osc.frequency.setValueAtTime(587, now);
        osc.frequency.setValueAtTime(784, now + 0.07);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        osc.start(now);
        osc.stop(now + 0.23);
      } else if (kind === 'wrong') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(240, now);
        osc.frequency.setValueAtTime(180, now + 0.09);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.22);
      } else {
        osc.frequency.setValueAtTime(523, now);
        osc.frequency.setValueAtTime(659, now + 0.08);
        osc.frequency.setValueAtTime(784, now + 0.16);
        osc.frequency.setValueAtTime(1046, now + 0.24);
        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        osc.start(now);
        osc.stop(now + 0.46);
      }
    } catch {
      // Ignore audio failures when blocked by autoplay policy
    }
  };

  const navigate = (next: ScreenId) => {
    setOverlay(null);
    if (next === 'settings-edit-profile' || next === 'settings-security') {
      if (screen === 'path' || screen === 'practice' || screen === 'league' || screen === 'profile') {
        setPendingReturnScreen(screen);
      }
    }
    setScreen(next);
  };

  const openOverlay = (next: OverlayId) => setOverlay(next);
  const closeOverlay = () => setOverlay(null);

  const completeLoading = () => {
    setScreen(state.isAuthenticated ? 'path' : 'login');
  };

  const signInDemo = (opts?: { name?: string; username?: string; email?: string; provider?: string }) => {
    playTone('correct');
    setState((prev) => ({
      ...prev,
      isAuthenticated: true,
      displayName: opts?.name?.trim() || prev.displayName,
      username: opts?.username?.trim()
        ? opts.username.startsWith('@')
          ? opts.username.trim()
          : `@${opts.username.trim()}`
        : prev.username,
      email: opts?.email?.trim() || prev.email,
      provider: opts?.provider || prev.provider,
    }));
    setOverlay(null);
    setScreen('path');
  };

  const startSsoRegistration = (provider: string) => {
    setPendingSsoProvider(provider);
    setScreen('register-sso-username');
  };

  const setPendingEmailRegistration = (username: string, email: string) => {
    const cleanUser = username.trim() || 'JohnDoe1080';
    setState((prev) => ({
      ...prev,
      username: cleanUser.startsWith('@') ? cleanUser : `@${cleanUser}`,
      email: email.trim() || prev.email,
      provider: 'Email & Passcode',
    }));
    setScreen('verify-code');
  };

  const logOut = () => {
    setOverlay(null);
    setState((prev) => ({ ...prev, isAuthenticated: false }));
    setScreen('login');
  };

  const setLanguage = (languageId: string, languageCode: string) => {
    setState((prev) => ({ ...prev, languageId, languageCode }));
    setOverlay(null);
  };

  const setAvatarCrest = (avatarCrest: AvatarCrestId) => {
    setState((prev) => ({ ...prev, avatarCrest }));
  };

  const updateProfile = (patch: { displayName: string; username: string; mathTrack: string }) => {
    const cleanHandle = patch.username.trim();
    setState((prev) => ({
      ...prev,
      displayName: patch.displayName.trim() || prev.displayName,
      username: cleanHandle ? (cleanHandle.startsWith('@') ? cleanHandle : `@${cleanHandle}`) : prev.username,
      mathTrack: patch.mathTrack.trim() || prev.mathTrack,
    }));
  };

  const togglePreference = (
    key: 'soundEffects' | 'hapticFeedback' | 'streakReminders' | 'passcodeLockEnabled',
  ) => {
    playTone('tap');
    setState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const cycleMathTrack = () => {
    const tracks = ['Grade 8 • Algebra', 'Grade 9 • Geometry', 'Pre-Calculus'];
    setState((prev) => {
      const idx = tracks.indexOf(prev.mathTrack);
      return { ...prev, mathTrack: tracks[(idx + 1) % tracks.length] };
    });
  };

  const cycleDailyXpGoal = () => {
    const goals = [100, 150, 200, 250];
    setState((prev) => {
      const idx = goals.indexOf(prev.dailyXpGoal);
      return { ...prev, dailyXpGoal: goals[(idx + 1) % goals.length] };
    });
  };

  const setActiveTopicGym = (activeTopicGym: TopicGymId) => {
    playTone('tap');
    setState((prev) => ({ ...prev, activeTopicGym }));
  };

  const consumeFocusShield = () => {
    setState((prev) => ({
      ...prev,
      focusShields: Math.max(0, prev.focusShields - 1),
    }));
  };

  const restoreFocusShield = (amount = 1) => {
    setState((prev) => ({
      ...prev,
      focusShields: Math.min(3, prev.focusShields + amount),
    }));
  };

  const repairMistakeItem = (id: string) => {
    setState((prev) => ({
      ...prev,
      mistakeVault: prev.mistakeVault.filter((item) => item.id !== id),
      focusShields: Math.min(3, prev.focusShields + 1),
    }));
  };

  const activateDoubleXpBoost = (): boolean => {
    if (state.doubleXpActive || state.formulaSparks < 350) return false;
    playTone('correct');
    setState((prev) => ({
      ...prev,
      formulaSparks: prev.formulaSparks - 350,
      doubleXpActive: true,
    }));
    return true;
  };

  const finishGame = (summary: GameResultSummary) => {
    playTone('win');
    const multiplier = state.doubleXpActive ? 2 : 1;
    const adjustedSummary: GameResultSummary = {
      ...summary,
      totalXpEarned: summary.totalXpEarned * multiplier,
      sparksEarned: summary.sparksEarned,
    };
    setLastGameResult(adjustedSummary);
    setState((prev) => {
      const nextBest =
        summary.mode === 'sprint' && summary.elapsedSec && summary.elapsedSec < prev.speedSprintBestSec
          ? Number(summary.elapsedSec.toFixed(1))
          : prev.speedSprintBestSec;
      return {
        ...prev,
        weeklyXp: prev.weeklyXp + adjustedSummary.totalXpEarned,
        formulaSparks: prev.formulaSparks + adjustedSummary.sparksEarned,
        lifetimeSparks: prev.lifetimeSparks + adjustedSummary.sparksEarned,
        totalSolved: prev.totalSolved + 4,
        dailyDrillsDone: Math.min(5, prev.dailyDrillsDone + 1),
        dailyStreak: prev.streakExtendedToday ? prev.dailyStreak : prev.dailyStreak + 1,
        streakExtendedToday: true,
        speedSprintBestSec: nextBest,
        lesson3Completed: summary.mode === 'function' ? true : prev.lesson3Completed,
        // Refill mistake vault if user cleared all 4 so they can replay later on reset, or keep cleared
      };
    });
    setOverlay(null);
    setScreen('celebration');
  };

  const claimCelebration = () => {
    playTone('tap');
    setScreen('path');
  };

  const resetDemo = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState({ ...DEFAULT_STATE, isAuthenticated: true });
    setOverlay(null);
    setScreen('path');
  };

  const value = useMemo<AppContextValue>(
    () => ({
      ...state,
      screen,
      overlay,
      pendingReturnScreen,
      pendingSsoProvider,
      lastGameResult,
      navigate,
      openOverlay,
      closeOverlay,
      completeLoading,
      signInDemo,
      startSsoRegistration,
      setPendingEmailRegistration,
      logOut,
      setLanguage,
      setAvatarCrest,
      updateProfile,
      togglePreference,
      cycleMathTrack,
      cycleDailyXpGoal,
      setActiveTopicGym,
      consumeFocusShield,
      restoreFocusShield,
      repairMistakeItem,
      activateDoubleXpBoost,
      finishGame,
      claimCelebration,
      playTone,
      resetDemo,
    }),
    [state, screen, overlay, pendingReturnScreen, pendingSsoProvider, lastGameResult],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider');
  return ctx;
}
