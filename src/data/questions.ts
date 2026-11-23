import type {
  AlgebraStageQuestion,
  FunctionQuestion,
  MistakeVaultItem,
  SpeedSprintQuestion,
} from '../types/polymath';

export const FUNCTION_DRILL_QUESTIONS: FunctionQuestion[] = [
  {
    id: 'fn-1',
    lessonTag: 'LESSON 3 • SINGLE OUTPUT RULE',
    prompt: 'Which relation is a valid mathematical function?',
    machine: {
      domain: '4, 5, 6',
      rule: 'f(x) = 2x + 1',
      range: '9, 11, 13',
    },
    clueBannerTitle: 'SPOT THE CLUE • EACH INPUT → EXACTLY 1 OUTPUT',
    options: [
      '{ (1, 3), (2, 5), (3, 7) }',
      '{ (2, 4), (2, 8), (3, 6) }',
      '{ (0, 1), (0, −1), (4, 2) }',
      '{ (5, 2), (5, 9), (1, 4) }',
    ],
    correctIndex: 0,
    explanation: 'Each input maps to exactly one unique output.',
    wrongHint: 'Look for the set where no x-value repeats with two different y-values.',
    optionClues: {
      1: {
        chip: 'x = 2 repeats!',
        reason: 'In B, input x = 2 splits into two outputs (4 and 8). Check which set gives every x only one y!',
      },
      2: {
        chip: 'x = 0 repeats!',
        reason: 'In C, input x = 0 maps to both 1 and −1. Look for the set where every first number x appears once.',
      },
      3: {
        chip: 'x = 5 repeats!',
        reason: 'In D, input x = 5 goes to both 2 and 9. Find the set with all unique x-values!',
      },
    },
    step2Breakdown: {
      ruleStrip: 'Rule: (1, _) (2, _) (3, _) → each x appears once',
      message: 'Check the first number (x) in each pair — pick the only set where no x-value repeats.',
    },
  },
  {
    id: 'fn-2',
    lessonTag: 'LESSON 3 • DOMAIN & RANGE',
    prompt: 'Given f(x) = 2x + 1, what is the output range for domain {4, 5, 6}?',
    machine: {
      domain: '4, 5, 6',
      rule: 'f(x) = 2x + 1',
      range: '?, ?, ?',
    },
    clueBannerTitle: 'SPOT THE CLUE • PLUG 4, 5, 6 INTO 2x + 1',
    options: [
      '{ 8, 10, 12 }',
      '{ 9, 11, 13 }',
      '{ 7, 9, 11 }',
      '{ 5, 6, 7 }',
    ],
    correctIndex: 1,
    explanation: 'f(4)=9, f(5)=11, and f(6)=13.',
    wrongHint: 'Multiply each input by 2, then remember to add 1.',
    optionClues: {
      0: {
        chip: 'Forgot +1',
        reason: 'You doubled {4, 5, 6} to get {8, 10, 12}, which is 2x. Remember the + 1 at the end!',
      },
      2: {
        chip: 'Off by −1',
        reason: '2(4) + 1 starts at 9, not 7. Try doubling 4 first, then adding 1.',
      },
      3: {
        chip: 'Added +1 only',
        reason: '{5, 6, 7} only added 1 to x. Multiply each input by 2 before adding 1!',
      },
    },
    step2Breakdown: {
      ruleStrip: 'f(4) = 2(4) + 1 = 9  •  f(5) = 2(5) + 1 = 11',
      message: 'Each output is 2× the input plus 1 — follow that pattern for 6 too!',
    },
  },
  {
    id: 'fn-3',
    lessonTag: 'LESSON 3 • SINGLE OUTPUT RULE',
    prompt: 'Which input table breaks the Single Output Rule?',
    machine: {
      domain: 'x inputs',
      rule: '1 input → 1 output',
      range: 'y outputs',
    },
    clueBannerTitle: 'SPOT THE CLUE • FIND ONE x WITH TWO y VALUES',
    options: [
      'x: 1→4, 2→4, 3→4',
      'x: −1→2, 0→3, 1→4',
      'x: 3→5, 3→8, 4→9',
      'x: 5→0, 6→1, 7→2',
    ],
    correctIndex: 2,
    explanation: 'Input x = 3 maps to both 5 and 8, so it is not a function.',
    wrongHint: 'Two different inputs can share an output, but one input cannot split into two outputs.',
    optionClues: {
      0: {
        chip: 'Valid (shared y)',
        reason: 'Different inputs (1, 2, 3) are allowed to share y = 4. Look for the table where the SAME x repeats!',
      },
      1: {
        chip: 'All x unique',
        reason: 'In B, −1, 0, and 1 each appear once. We want the table that breaks the rule by repeating an x.',
      },
      3: {
        chip: 'All x unique',
        reason: 'In D, 5, 6, and 7 each have a single output. Spot the table where one x maps to two different y values!',
      },
    },
    step2Breakdown: {
      ruleStrip: 'Check left numbers: 1, 2, 3 ✓  |  −1, 0, 1 ✓  |  3, 3, 4 ✕',
      message: 'Find the table where the same x-input appears twice with different outputs.',
    },
  },
  {
    id: 'fn-4',
    lessonTag: 'LESSON 3 • FUNCTION EVALUATION',
    prompt: 'If f(x) = 3x − 2, what value completes the pair (4, f(4))?',
    machine: {
      domain: 'x = 4',
      rule: 'f(x) = 3x − 2',
      range: 'f(4) = ?',
    },
    clueBannerTitle: 'SPOT THE CLUE • SUBSTITUTE x = 4 INTO 3x − 2',
    options: ['12', '14', '9', '10'],
    correctIndex: 3,
    explanation: 'f(4) = 3(4) − 2 = 12 − 2 = 10.',
    wrongHint: 'Substitute x = 4 first: 3 × 4 = 12, then subtract 2.',
    optionClues: {
      0: {
        chip: 'Forgot −2',
        reason: '12 is just 3 × 4! Don’t forget the − 2 step at the end.',
      },
      1: {
        chip: 'Added +2',
        reason: '14 comes from 12 + 2. Check the sign in f(x) = 3x − 2 — subtract 2 instead!',
      },
      2: {
        chip: '3(4) = 12',
        reason: 'Start with 3 × 4 = 12, then take away 2.',
      },
    },
    step2Breakdown: {
      ruleStrip: 'Step 1: 3 × 4 = 12   →   Step 2: 12 − 2 = ?',
      message: 'Multiply 3 by 4 first, then subtract 2 to find f(4).',
    },
  },
];

export const SPEED_SPRINT_QUESTIONS: SpeedSprintQuestion[] = [
  {
    id: 'sp-1',
    subtitle: 'SOLVE FOR X • BEAT 42.4s BEST',
    equation: '3(x − 4) = 18',
    options: ['x = 10', 'x = 6', 'x = 14', 'x = 8'],
    correctIndex: 0,
    explanation: 'Divide by 3 → x − 4 = 6 → x = 10.',
    wrongHint: 'Divide both sides by 3 first to get x − 4 = 6.',
    optionClues: {
      1: { chip: 'Halfway (x−4=6)', reason: '6 is the value of x − 4! Add 4 to finish isolating x.' },
      2: { chip: 'Added 4 to 10?', reason: 'Check: 3(14 − 4) = 30, not 18. Start with 18 ÷ 3 = 6, then add 4.' },
      3: { chip: 'Check 3(8−4)', reason: '3(8 − 4) = 12. Since 18 ÷ 3 = 6, solve x − 4 = 6.' },
    },
    step2Breakdown: {
      ruleStrip: '18 ÷ 3 = 6   →   x − 4 = 6   →   x = 6 + 4',
      message: 'Undo ×3 first, then add 4 to both sides.',
    },
  },
  {
    id: 'sp-2',
    subtitle: 'RAPID LINEAR • KEEP COMBO ALIVE',
    equation: '5x + 3 = 28',
    options: ['x = 6', 'x = 5', 'x = 4', 'x = 7'],
    correctIndex: 1,
    explanation: 'Subtract 3 → 5x = 25 → x = 5.',
    wrongHint: 'Subtract 3 from 28 first, then divide by 5.',
    optionClues: {
      0: { chip: '5(6)+3 = 33', reason: 'First undo +3: 28 − 3 = 25, then divide 25 ÷ 5.' },
      2: { chip: '5(4)+3 = 23', reason: 'Close! 28 − 3 = 25, and 25 ÷ 5 is one step higher.' },
      3: { chip: '5(7)+3 = 38', reason: 'Try 28 − 3 = 25 first, then divide by 5.' },
    },
    step2Breakdown: {
      ruleStrip: '5x = 28 − 3 = 25   →   x = 25 ÷ 5',
      message: 'Subtract 3 to get 5x = 25, then divide both sides by 5.',
    },
  },
  {
    id: 'sp-3',
    subtitle: 'MENTAL SLOPE • TWO-STEP',
    equation: '2x − 9 = 11',
    options: ['x = 1', 'x = 8', 'x = 10', 'x = 12'],
    correctIndex: 2,
    explanation: 'Add 9 → 2x = 20 → x = 10.',
    wrongHint: 'Undo −9 by adding 9 to 11 first.',
    optionClues: {
      0: { chip: 'Subtracted 9', reason: 'You did 11 − 9 = 2! To cancel −9, ADD 9 to get 2x = 20.' },
      1: { chip: '2(8)−9 = 7', reason: 'Add 9 to both sides: 11 + 9 = 20, then divide by 2.' },
      3: { chip: '2(12)−9 = 15', reason: '11 + 9 = 20, so solve 2x = 20.' },
    },
    step2Breakdown: {
      ruleStrip: '2x = 11 + 9 = 20   →   x = 20 ÷ 2',
      message: 'Add 9 to 11 to get 20, then halve 20.',
    },
  },
  {
    id: 'sp-4',
    subtitle: 'DISTRIBUTIVE BLITZ',
    equation: '4(x + 2) = 24',
    options: ['x = 8', 'x = 6', 'x = 5', 'x = 4'],
    correctIndex: 3,
    explanation: 'Divide by 4 → x + 2 = 6 → x = 4.',
    wrongHint: 'Divide 24 by 4 first to find what x + 2 equals.',
    optionClues: {
      0: { chip: 'Added +2', reason: 'Instead of adding 2 to 6, subtract 2 from 6.' },
      1: { chip: 'Halfway (x+2=6)', reason: '6 is x + 2! Subtract 2 from 6 to isolate x.' },
      2: { chip: '4(5+2) = 28', reason: '24 ÷ 4 = 6, so x + 2 = 6. Subtract 2!' },
    },
    step2Breakdown: {
      ruleStrip: '24 ÷ 4 = 6   →   x + 2 = 6   →   x = 6 − 2',
      message: 'Divide both sides by 4, then subtract 2.',
    },
  },
  {
    id: 'sp-5',
    subtitle: 'FINAL SPRINT • SPRINT FINISH',
    equation: '(x / 3) + 5 = 9',
    options: ['x = 12', 'x = 15', 'x = 9', 'x = 6'],
    correctIndex: 0,
    explanation: 'Subtract 5 → x / 3 = 4 → x = 12.',
    wrongHint: 'Subtract 5 first (x / 3 = 4), then multiply by 3.',
    optionClues: {
      1: { chip: '(15/3)+5 = 10', reason: '9 − 5 = 4 (not 5), so multiply 4 × 3.' },
      2: { chip: '(9/3)+5 = 8', reason: 'Start with 9 − 5 = 4, then multiply 4 × 3.' },
      3: { chip: '(6/3)+5 = 7', reason: 'After 9 − 5 = 4, undo ÷ 3 by multiplying 4 × 3.' },
    },
    step2Breakdown: {
      ruleStrip: 'x / 3 = 9 − 5 = 4   →   x = 4 × 3',
      message: 'Subtract 5 to get 4, then multiply by 3.',
    },
  },
];

export const INITIAL_MISTAKE_VAULT: MistakeVaultItem[] = [
  {
    id: 'mv-1',
    topicTag: 'YOUR PREVIOUS MISSTEP • SLOPE-SIGN FLIPPING',
    prompt: 'Fix your slope calculation between (2, 5) and (4, 1)',
    wrongWork: 'm = (5 − 1) / (4 − 2) = +2   ✕',
    hint: 'Match order in numerator and denominator: (1 − 5) ÷ (4 − 2).',
    options: ['m = −2  (−4 ÷ 2)', 'm = +2  (4 ÷ 2)', 'm = −0.5  (−2 ÷ 4)'],
    correctIndex: 0,
    explanation: 'From y₁ = 5 to y₂ = 1 drops by 4 while x grows by 2, giving −4 ÷ 2 = −2.',
  },
  {
    id: 'mv-2',
    topicTag: 'YOUR PREVIOUS MISSTEP • Y-INTERCEPT ZEROES (0, b)',
    prompt: 'Identify the true y-intercept of y = −3x + 6',
    wrongWork: 'y-intercept = (6, 0)   ✕',
    hint: 'At the y-axis, x is always 0. Substitute x = 0 into y = −3(0) + 6.',
    options: ['(6, 0)', '(0, 6)', '(0, −3)'],
    correctIndex: 1,
    explanation: 'Setting x = 0 gives y = 6, so the y-intercept coordinate is (0, 6).',
  },
  {
    id: 'mv-3',
    topicTag: 'YOUR PREVIOUS MISSTEP • INVERSE OPERATION SIGN',
    prompt: 'Fix the first step when solving 2x − 5 = 13',
    wrongWork: '2x = 13 − 5 = 8   ✕',
    hint: 'To undo −5 on the left side, add +5 to both sides.',
    options: ['2x = 13 − 5 = 8', 'x = 13 ÷ 2 − 5', '2x = 13 + 5 = 18'],
    correctIndex: 2,
    explanation: 'Adding 5 to both sides cancels −5 and balances the right side to 18.',
  },
  {
    id: 'mv-4',
    topicTag: 'YOUR PREVIOUS MISSTEP • SINGLE OUTPUT RULE',
    prompt: 'Repair why { (3, 4), (3, 9), (5, 2) } is NOT a function',
    wrongWork: 'Repeated output y values break functions   ✕',
    hint: 'Functions allow repeated y-values, but never one x-input mapping to two outputs.',
    options: [
      'Input x = 3 maps to two outputs (4 and 9)',
      'There are only 3 coordinate pairs',
      'Output 4 is larger than input 3',
    ],
    correctIndex: 0,
    explanation: 'Because x = 3 produces both 4 and 9, it fails the Single Output Rule.',
  },
];

export const ALGEBRA_BALANCING_STAGES: AlgebraStageQuestion[] = [
  {
    id: 'alg-1',
    badge: 'LINEAR EQUATION',
    promptPrefix: 'Balance the scale. Isolate variable ',
    highlightVar: 'x',
    promptSuffix: '.',
    mascotHintStep1: 'Move constants to the right side!',
    mascotHintStep2: 'Divide both sides by 3 to isolate x!',
    terms: {
      leftCoeffVar: '3x',
      coeffDivisor: '3',
      operator: '+',
      constant: '7',
      rightValue: '22',
      reducedRight: '15',
      inverseLabel: 'Inverse: +7 → −7',
      inverseOp: '−',
      transformedSummary: '3x = 22 − 7',
      reducedEquation: '3x = 15',
    },
    expectedAnswer: '5',
    explanation: 'Equation balanced! 3(5) + 7 = 22.',
    step1Hint: '3x means 3 × x. Divide both sides of 3x = 15 by 3 to isolate x.',
    step2Hint: 'Split 15 into 3 equal groups: 15 ÷ 3 gives the exact value of x.',
    ruleStrip: '3x ÷ 3 = x   •   15 ÷ 3 = ?',
    commonMistakes: {
      '12': {
        statusNote: '✕ 15 − 3 ≠ 15 ÷ 3',
        reason: '3x means 3 × x. You subtracted 3 (15 − 3 = 12) — try dividing 15 ÷ 3!',
      },
      '18': {
        statusNote: '✕ 15 + 3 ≠ 15 ÷ 3',
        reason: 'You added 3 to 15. To undo multiplying by 3, divide 15 ÷ 3 instead!',
      },
      '45': {
        statusNote: '✕ 15 × 3 ≠ 15 ÷ 3',
        reason: 'You multiplied 15 × 3. Undo ×3 with division: 15 ÷ 3!',
      },
      '15': {
        statusNote: '✕ That’s 3x, not x',
        reason: '15 is equal to 3x. Divide 15 by 3 to find a single x!',
      },
    },
  },
  {
    id: 'alg-2',
    badge: 'SLOPE-INTERCEPT CHECK',
    promptPrefix: 'Solve for ',
    highlightVar: 'x',
    promptSuffix: ' when y = 17.',
    mascotHintStep1: 'Subtract 5 from both sides first!',
    mascotHintStep2: 'Now divide 12 by 4!',
    terms: {
      leftCoeffVar: '4x',
      coeffDivisor: '4',
      operator: '+',
      constant: '5',
      rightValue: '17',
      reducedRight: '12',
      inverseLabel: 'Inverse: +5 → −5',
      inverseOp: '−',
      transformedSummary: '4x = 17 − 5',
      reducedEquation: '4x = 12',
    },
    expectedAnswer: '3',
    explanation: 'Balanced! 4(3) + 5 = 17.',
    step1Hint: '4x means 4 × x. Divide both sides of 4x = 12 by 4.',
    step2Hint: 'Count how many 4s fit into 12: 12 ÷ 4 isolates x.',
    ruleStrip: '4x ÷ 4 = x   •   12 ÷ 4 = ?',
    commonMistakes: {
      '8': {
        statusNote: '✕ 12 − 4 ≠ 12 ÷ 4',
        reason: 'You subtracted 4 (12 − 4 = 8). Since 4x is multiplication, divide 12 ÷ 4!',
      },
      '12': {
        statusNote: '✕ That’s 4x, not x',
        reason: '12 equals 4x. Divide 12 by 4 to find one x!',
      },
      '48': {
        statusNote: '✕ 12 × 4 ≠ 12 ÷ 4',
        reason: 'You multiplied 12 × 4. Undo ×4 by dividing 12 ÷ 4!',
      },
    },
  },
  {
    id: 'alg-3',
    badge: 'NEGATIVE CONSTANT',
    promptPrefix: 'Isolate ',
    highlightVar: 'x',
    promptSuffix: ' cleanly.',
    mascotHintStep1: 'Add 6 to both sides to cancel −6!',
    mascotHintStep2: 'Divide 16 by 2!',
    terms: {
      leftCoeffVar: '2x',
      coeffDivisor: '2',
      operator: '−',
      constant: '6',
      rightValue: '10',
      reducedRight: '16',
      inverseLabel: 'Inverse: −6 → +6',
      inverseOp: '+',
      transformedSummary: '2x = 10 + 6',
      reducedEquation: '2x = 16',
    },
    expectedAnswer: '8',
    explanation: 'Spot on! 2(8) − 6 = 10.',
    step1Hint: 'After adding 6 to get 2x = 16, divide both sides by 2.',
    step2Hint: 'Halve 16 (16 ÷ 2) to find the value of x.',
    ruleStrip: '2x ÷ 2 = x   •   16 ÷ 2 = ?',
    commonMistakes: {
      '2': {
        statusNote: '✕ Check −6 → +6',
        reason: 'Look at 10 + 6 = 16 (not 10 − 6 = 4). Divide 16 ÷ 2!',
      },
      '14': {
        statusNote: '✕ 16 − 2 ≠ 16 ÷ 2',
        reason: 'You subtracted 2 from 16. Since 2x means 2 × x, divide 16 ÷ 2!',
      },
      '16': {
        statusNote: '✕ That’s 2x, not x',
        reason: '16 equals 2x. Halve 16 (16 ÷ 2) to get x!',
      },
    },
  },
];
