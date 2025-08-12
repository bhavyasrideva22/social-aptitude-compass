export interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'likert' | 'scenario';
  category: 'psychometric' | 'technical' | 'wiscar';
  options?: string[];
  likertLabels?: { min: string; max: string };
  scenario?: string;
  wiscarDimension?: 'will' | 'interest' | 'skill' | 'cognitive' | 'ability_to_learn' | 'real_world_fit';
}

export interface Answer {
  questionId: string;
  value: number | string;
  score: number;
}

export interface AssessmentResults {
  psychFitScore: number;
  techScore: number;
  wiscar: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability_to_learn: number;
    real_world_fit: number;
  };
  overallConfidence: number;
  recommendation: 'YES' | 'MAYBE' | 'NO';
  skillGaps: string[];
  nextSteps: string[];
  careerMatches: string[];
  learningPath: string;
}

export interface AssessmentState {
  currentSection: number;
  currentQuestion: number;
  answers: Answer[];
  isComplete: boolean;
  results?: AssessmentResults;
}