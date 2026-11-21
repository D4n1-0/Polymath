export type ScreenId =
  | 'loading'
  | 'login'
  | 'register-method'
  | 'register-sso-username'
  | 'register-email-form'
  | 'verify-code'
  | 'path'
  | 'practice'
  | 'league'
  | 'profile'
  | 'game-function'
  | 'game-sprint'
  | 'game-vault'
  | 'game-algebra'
  | 'celebration'
  | 'settings-edit-profile'
  | 'settings-security';

export type OverlayId =
  | null
  | 'language-picker'
  | 'forgot-password'
  | 'pause-exit'
  | 'settings-sidebar'
  | 'hud-shields'
  | 'hud-streak'
  | 'hud-sparks'
  | 'all-badges'
  | 'edit-avatar'
  | 'lesson-guide';

export type TopicGymId = 'linear' | 'algebra' | 'geometry' | 'fractions';

export type AvatarCrestId = 'sigma-violet' | 'emerald-crest' | 'amber-blitz';

export interface LanguageOption {
  id: string;
  code: string;
  name: string;
  subtitle: string;
  flagSrc: string;
}

export interface MistakeVaultItem {
  id: string;
  topicTag: string;
  prompt: string;
  wrongWork: string;
  hint: string;
  options: [string, string, string];
  correctIndex: number;
  explanation: string;
}

export interface FunctionQuestion {
  id: string;
  lessonTag: string;
  prompt: string;
  machine?: {
    domain: string;
    rule: string;
    range: string;
  };
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
  wrongHint: string;
}

export interface SpeedSprintQuestion {
  id: string;
  subtitle: string;
  equation: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
}

export interface AlgebraStageQuestion {
  id: string;
  badge: string;
  promptPrefix: string;
  highlightVar: string;
  promptSuffix: string;
  mascotHintStep1: string;
  mascotHintStep2: string;
  terms: {
    leftCoeffVar: string;
    operator: '+' | '−';
    constant: string;
    rightValue: string;
    inverseLabel: string;
    inverseOp: '+' | '−';
    transformedSummary: string;
    reducedEquation: string;
  };
  expectedAnswer: string;
  explanation: string;
}

export interface LessonNode {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  status: 'mastered' | 'current' | 'locked';
  stars: number;
}

export interface BadgeItem {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  progressPct?: number;
  accentBg: string;
  shadowColor: string;
  iconKey: 'bolt' | 'check' | 'flame' | 'diamond' | 'compass' | 'shield';
}

export interface LeagueMember {
  id: string;
  rank: number;
  name: string;
  handle: string;
  xp: number;
  isUser?: boolean;
  trend: 'up' | 'same' | 'down';
  avatarBg: string;
}

export interface GameResultSummary {
  mode: 'function' | 'sprint' | 'vault' | 'algebra';
  stageLabel: string;
  accuracyPct: number;
  speedBonusXp: number;
  totalXpEarned: number;
  sparksEarned: number;
  elapsedSec?: number;
  newPersonalBest?: boolean;
}
