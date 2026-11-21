import type { LessonNode, TopicGymId } from '../types/polymath';

export const UNIT_ONE_LESSONS: LessonNode[] = [
  {
    id: 'lesson-1',
    number: 1,
    title: 'Lesson 1: Inputs and the Domain',
    subtitle: 'Understanding the set of all possible input values (x)',
    status: 'mastered',
    stars: 3,
  },
  {
    id: 'lesson-2',
    number: 2,
    title: 'Lesson 2: Outputs and the Range',
    subtitle: 'Mapping inputs to their resulting output values (y)',
    status: 'mastered',
    stars: 3,
  },
  {
    id: 'lesson-3',
    number: 3,
    title: 'Lesson 3: The Single Output Rule',
    subtitle: 'Each input in the domain must map to exactly one unique output. Test candidate relations across coordinate pairs and tables.',
    status: 'current',
    stars: 0,
  },
  {
    id: 'lesson-4',
    number: 4,
    title: 'Lesson 4: The Vertical Line Test',
    subtitle: 'Testing function validity on coordinate graphs and curves.',
    status: 'locked',
    stars: 0,
  },
];

export interface TopicGymModule {
  id: TopicGymId;
  chipLabel: string;
  tag: string;
  stars: string;
  title: string;
  formula: string;
  description: string;
  targetGame: 'game-algebra' | 'game-function';
}

export const TOPIC_GYM_MODULES: Record<TopicGymId, TopicGymModule> = {
  linear: {
    id: 'linear',
    chipLabel: 'Linear Graphs',
    tag: 'ACTIVE MODULE',
    stars: '★★☆',
    title: 'Slope-Intercept Form',
    formula: 'y = mx + b',
    description: 'Master calculating coordinate lines, slopes, and y-axis intercepts with 15 focused drills.',
    targetGame: 'game-algebra',
  },
  algebra: {
    id: 'algebra',
    chipLabel: 'Algebra',
    tag: 'CORE DRILL',
    stars: '★★★',
    title: 'Balancing & Isolating x',
    formula: '3x + 7 = 22',
    description: 'Use inverse operations to isolate variables cleanly across two-step linear equations.',
    targetGame: 'game-algebra',
  },
  geometry: {
    id: 'geometry',
    chipLabel: 'Geometry',
    tag: 'VISUAL LAB',
    stars: '★☆☆',
    title: 'Coordinate Slope & Triangles',
    formula: 'm = (y₂ − y₁) / (x₂ − x₁)',
    description: 'Measure rise-over-run slopes, right-triangle lengths, and vertical line intersections.',
    targetGame: 'game-function',
  },
  fractions: {
    id: 'fractions',
    chipLabel: 'Fractions',
    tag: 'FLUENCY',
    stars: '★★☆',
    title: 'Proportional Ratios',
    formula: 'a / b = c / d',
    description: 'Cross-multiply, simplify rational slopes, and balance fractional coefficients quickly.',
    targetGame: 'game-algebra',
  },
};
