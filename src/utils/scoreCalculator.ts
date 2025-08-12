import { Answer, AssessmentResults } from '@/types/assessment';
import { correctAnswers } from '@/data/questions';

export const calculateAssessmentResults = (answers: Answer[]): AssessmentResults => {
  // Calculate psychometric fit score
  const psychAnswers = answers.filter(a => a.questionId.startsWith('psych_'));
  const psychFitScore = Math.round(
    (psychAnswers.reduce((sum, a) => sum + a.score, 0) / (psychAnswers.length * 5)) * 100
  );

  // Calculate technical score
  const techAnswers = answers.filter(a => a.questionId.startsWith('tech_'));
  const techScore = Math.round(
    (techAnswers.filter(a => a.score === 5).length / techAnswers.length) * 100
  );

  // Calculate WISCAR scores
  const wiscarAnswers = answers.filter(a => a.questionId.startsWith('wiscar_'));
  const wiscar = {
    will: calculateWiscarDimension(wiscarAnswers, 'will'),
    interest: calculateWiscarDimension(wiscarAnswers, 'interest'),
    skill: calculateWiscarDimension(wiscarAnswers, 'skill'),
    cognitive: calculateWiscarDimension(wiscarAnswers, 'cognitive'),
    ability_to_learn: calculateWiscarDimension(wiscarAnswers, 'ability_to_learn'),
    real_world_fit: calculateWiscarDimension(wiscarAnswers, 'real_world_fit')
  };

  // Calculate overall confidence
  const wiscarAverage = Object.values(wiscar).reduce((sum, score) => sum + score, 0) / 6;
  const overallConfidence = Math.round((psychFitScore + techScore + wiscarAverage) / 3);

  // Determine recommendation
  let recommendation: 'YES' | 'MAYBE' | 'NO' = 'NO';
  if (overallConfidence >= 75) recommendation = 'YES';
  else if (overallConfidence >= 60) recommendation = 'MAYBE';

  // Generate skill gaps and next steps
  const skillGaps = generateSkillGaps(techScore, wiscar);
  const nextSteps = generateNextSteps(recommendation, skillGaps);
  const careerMatches = generateCareerMatches(overallConfidence, wiscar);
  const learningPath = generateLearningPath(overallConfidence);

  return {
    psychFitScore,
    techScore,
    wiscar,
    overallConfidence,
    recommendation,
    skillGaps,
    nextSteps,
    careerMatches,
    learningPath
  };
};

const calculateWiscarDimension = (answers: Answer[], dimension: string): number => {
  const dimensionAnswers = answers.filter(a => a.questionId.includes(dimension));
  if (dimensionAnswers.length === 0) return 0;
  
  const average = dimensionAnswers.reduce((sum, a) => sum + a.score, 0) / dimensionAnswers.length;
  return Math.round((average / 5) * 100);
};

const generateSkillGaps = (techScore: number, wiscar: any): string[] => {
  const gaps: string[] = [];
  
  if (techScore < 70) gaps.push('Technical knowledge of social media tools and metrics');
  if (wiscar.skill < 70) gaps.push('Hands-on experience with professional social media tools');
  if (wiscar.cognitive < 70) gaps.push('Analytical thinking and data interpretation');
  if (wiscar.real_world_fit < 70) gaps.push('Multi-tasking and project management skills');
  
  return gaps;
};

const generateNextSteps = (recommendation: string, skillGaps: string[]): string[] => {
  const steps: string[] = [];
  
  if (recommendation === 'YES') {
    steps.push('Enroll in advanced social media management courses');
    steps.push('Start building a professional portfolio');
    steps.push('Network with industry professionals');
    steps.push('Consider internships or freelance projects');
  } else if (recommendation === 'MAYBE') {
    steps.push('Take foundational social media marketing courses');
    steps.push('Practice with personal projects or volunteer work');
    steps.push('Focus on improving identified skill gaps');
    steps.push('Retake assessment in 3-6 months');
  } else {
    steps.push('Explore related fields like content writing or customer service');
    steps.push('Develop basic digital literacy skills');
    steps.push('Consider other career paths that match your interests');
  }
  
  return steps;
};

const generateCareerMatches = (overallScore: number, wiscar: any): string[] => {
  const matches: string[] = [];
  
  if (overallScore >= 75) {
    matches.push('Social Media Manager');
    matches.push('Content Strategist');
    if (wiscar.cognitive >= 80) matches.push('Social Media Analyst');
    if (wiscar.will >= 80) matches.push('Community Manager');
  } else if (overallScore >= 60) {
    matches.push('Social Media Assistant');
    matches.push('Content Creator');
    matches.push('Community Moderator');
  } else {
    matches.push('Customer Service Representative');
    matches.push('Content Writer');
    matches.push('Digital Marketing Assistant');
  }
  
  return matches;
};

const generateLearningPath = (overallScore: number): string => {
  if (overallScore >= 75) return 'Intermediate to Advanced';
  if (overallScore >= 60) return 'Beginner to Intermediate';
  return 'Foundational Level';
};