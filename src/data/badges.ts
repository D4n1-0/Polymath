import type { BadgeItem } from '../types/polymath';

export const ALL_BADGES: BadgeItem[] = [
  { id: 'speed-demon', name: 'Speed Demon', description: '10 Blitz sets under 45s', unlocked: true, accentBg: '#ffdbca', shadowColor: '#ffdbca', iconKey: 'bolt' },
  { id: 'equation-master', name: 'Equation Master', description: '100 Linear equations solved', unlocked: true, accentBg: '#6bff8f', shadowColor: '#6bff8f', iconKey: 'check' },
  { id: 'streak-sentinel', name: 'Streak Sentinel', description: '14-day daily momentum', unlocked: true, accentBg: '#ffdad6', shadowColor: '#ffdad6', iconKey: 'flame' },
  { id: 'diamond-bound', name: 'Diamond Bound', description: 'Top 10 league qualification', unlocked: true, accentBg: '#e9ddff', shadowColor: '#d0bcff', iconKey: 'diamond' },
  { id: 'slope-architect', name: 'Slope Architect', description: '50 Slope-Intercept drills (42/50)', unlocked: false, progressPct: 84, accentBg: '#f8fafc', shadowColor: '#e2e8f0', iconKey: 'compass' },
  { id: 'shield-guardian', name: 'Shield Guardian', description: 'Clear 10 Mistake Vaults (6/10)', unlocked: false, progressPct: 60, accentBg: '#f8fafc', shadowColor: '#e2e8f0', iconKey: 'shield' },
  { id: 'function-purist', name: 'Function Purist', description: 'Pass Vertical Line Test without hints (3/5)', unlocked: false, progressPct: 60, accentBg: '#f8fafc', shadowColor: '#e2e8f0', iconKey: 'check' },
  { id: 'balance-ace', name: 'Balance Ace', description: 'Isolate 25 variables in 1 try (19/25)', unlocked: false, progressPct: 76, accentBg: '#f8fafc', shadowColor: '#e2e8f0', iconKey: 'bolt' },
  { id: 'combo-king', name: 'Combo ×5', description: 'Hit 5 consecutive Speed Sprint answers (4/5)', unlocked: false, progressPct: 80, accentBg: '#f8fafc', shadowColor: '#e2e8f0', iconKey: 'flame' },
  { id: 'emerald-promote', name: 'Emerald Climber', description: 'Reach 2,000 Weekly League XP (91%)', unlocked: false, progressPct: 91, accentBg: '#f8fafc', shadowColor: '#e2e8f0', iconKey: 'diamond' },
  { id: 'zero-errors', name: 'Flawless Run', description: 'Finish a drill with 3/3 Shields intact', unlocked: false, progressPct: 50, accentBg: '#f8fafc', shadowColor: '#e2e8f0', iconKey: 'shield' },
  { id: 'domain-scout', name: 'Domain Scout', description: 'Map 30 input sets cleanly (21/30)', unlocked: false, progressPct: 70, accentBg: '#f8fafc', shadowColor: '#e2e8f0', iconKey: 'compass' },
  { id: 'range-finder', name: 'Range Finder', description: 'Evaluate 40 f(x) outputs (28/40)', unlocked: false, progressPct: 70, accentBg: '#f8fafc', shadowColor: '#e2e8f0', iconKey: 'compass' },
  { id: 'spark-collector', name: 'Spark Collector', description: 'Hold 1,000 Formula Sparks (84%)', unlocked: false, progressPct: 84, accentBg: '#f8fafc', shadowColor: '#e2e8f0', iconKey: 'bolt' },
  { id: 'night-owl', name: 'Night Owl Solver', description: 'Complete 5 late-evening drills (2/5)', unlocked: false, progressPct: 40, accentBg: '#f8fafc', shadowColor: '#e2e8f0', iconKey: 'flame' },
  { id: 'early-bird', name: 'Morning Momentum', description: 'Solve before 9 AM 5 days (3/5)', unlocked: false, progressPct: 60, accentBg: '#f8fafc', shadowColor: '#e2e8f0', iconKey: 'flame' },
  { id: 'fraction-fixer', name: 'Fraction Fixer', description: 'Clear 15 Ratio Gym stages (5/15)', unlocked: false, progressPct: 33, accentBg: '#f8fafc', shadowColor: '#e2e8f0', iconKey: 'check' },
  { id: 'polymath-elite', name: 'PolyMath Unit 1', description: 'Master all 4 lessons in Unit 01 (50%)', unlocked: false, progressPct: 50, accentBg: '#f8fafc', shadowColor: '#e2e8f0', iconKey: 'diamond' },
];
