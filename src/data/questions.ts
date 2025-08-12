import { Question } from '@/types/assessment';

export const assessmentQuestions: Question[] = [
  // Psychometric Section
  {
    id: 'psych_1',
    text: 'I enjoy experimenting with new social media trends and features.',
    type: 'likert',
    category: 'psychometric',
    likertLabels: { min: 'Strongly Disagree', max: 'Strongly Agree' }
  },
  {
    id: 'psych_2',
    text: 'I find it easy to communicate with different types of people online.',
    type: 'likert',
    category: 'psychometric',
    likertLabels: { min: 'Strongly Disagree', max: 'Strongly Agree' }
  },
  {
    id: 'psych_3',
    text: 'How would you handle receiving negative comments on a brand post?',
    type: 'scenario',
    category: 'psychometric',
    scenario: 'A customer leaves a harsh criticism about your company\'s product on your latest Instagram post.',
    options: [
      'Delete the comment immediately',
      'Respond publicly with empathy and offer to resolve the issue privately',
      'Ignore the comment and hope it goes away',
      'Argue back to defend the brand'
    ]
  },
  {
    id: 'psych_4',
    text: 'I prefer working on creative projects rather than following strict procedures.',
    type: 'likert',
    category: 'psychometric',
    likertLabels: { min: 'Strongly Disagree', max: 'Strongly Agree' }
  },
  {
    id: 'psych_5',
    text: 'I actively follow industry trends and social media news.',
    type: 'likert',
    category: 'psychometric',
    likertLabels: { min: 'Strongly Disagree', max: 'Strongly Agree' }
  },

  // Technical Section
  {
    id: 'tech_1',
    text: 'What does CTR stand for in social media analytics?',
    type: 'multiple-choice',
    category: 'technical',
    options: [
      'Click-Through Rate',
      'Customer Transaction Rate',
      'Content Traffic Rating',
      'Campaign Target Reach'
    ]
  },
  {
    id: 'tech_2',
    text: 'Which metric best measures audience engagement?',
    type: 'multiple-choice',
    category: 'technical',
    options: [
      'Follower count',
      'Reach',
      'Engagement rate (likes, comments, shares per post)',
      'Impression count'
    ]
  },
  {
    id: 'tech_3',
    text: 'What is the ideal posting frequency for most business Instagram accounts?',
    type: 'multiple-choice',
    category: 'technical',
    options: [
      '5-7 times per day',
      '1-2 times per day',
      'Once per week',
      '10+ times per day'
    ]
  },
  {
    id: 'tech_4',
    text: 'Which platform is best for B2B marketing?',
    type: 'multiple-choice',
    category: 'technical',
    options: [
      'TikTok',
      'Instagram',
      'LinkedIn',
      'Snapchat'
    ]
  },
  {
    id: 'tech_5',
    text: 'What is a content calendar used for?',
    type: 'multiple-choice',
    category: 'technical',
    options: [
      'Tracking follower birthdays',
      'Planning and scheduling posts in advance',
      'Recording competitor activities',
      'Managing employee schedules'
    ]
  },

  // WISCAR Framework Questions
  {
    id: 'wiscar_will_1',
    text: 'I can consistently work on projects even when I don\'t feel motivated.',
    type: 'likert',
    category: 'wiscar',
    wiscarDimension: 'will',
    likertLabels: { min: 'Strongly Disagree', max: 'Strongly Agree' }
  },
  {
    id: 'wiscar_will_2',
    text: 'I finish what I begin, even when facing obstacles.',
    type: 'likert',
    category: 'wiscar',
    wiscarDimension: 'will',
    likertLabels: { min: 'Strongly Disagree', max: 'Strongly Agree' }
  },
  {
    id: 'wiscar_interest_1',
    text: 'I genuinely enjoy creating and curating content for online audiences.',
    type: 'likert',
    category: 'wiscar',
    wiscarDimension: 'interest',
    likertLabels: { min: 'Strongly Disagree', max: 'Strongly Agree' }
  },
  {
    id: 'wiscar_interest_2',
    text: 'I find social media marketing strategies fascinating.',
    type: 'likert',
    category: 'wiscar',
    wiscarDimension: 'interest',
    likertLabels: { min: 'Strongly Disagree', max: 'Strongly Agree' }
  },
  {
    id: 'wiscar_skill_1',
    text: 'How would you rate your current social media tool proficiency?',
    type: 'multiple-choice',
    category: 'wiscar',
    wiscarDimension: 'skill',
    options: [
      'Expert - I use advanced scheduling and analytics tools daily',
      'Intermediate - I know the basics of most major platforms',
      'Beginner - I use social media personally but not professionally',
      'Novice - I rarely use social media'
    ]
  },
  {
    id: 'wiscar_cognitive_1',
    text: 'A campaign is underperforming. What\'s your first step?',
    type: 'scenario',
    category: 'wiscar',
    wiscarDimension: 'cognitive',
    scenario: 'Your Instagram campaign has 50% lower engagement than usual after one week.',
    options: [
      'Immediately change the content strategy completely',
      'Analyze the data to identify specific underperforming elements',
      'Increase the posting frequency',
      'Wait another week to see if it improves'
    ]
  },
  {
    id: 'wiscar_learning_1',
    text: 'I actively seek feedback and use it to improve my work.',
    type: 'likert',
    category: 'wiscar',
    wiscarDimension: 'ability_to_learn',
    likertLabels: { min: 'Strongly Disagree', max: 'Strongly Agree' }
  },
  {
    id: 'wiscar_realworld_1',
    text: 'How comfortable are you with managing multiple social media accounts simultaneously?',
    type: 'multiple-choice',
    category: 'wiscar',
    wiscarDimension: 'real_world_fit',
    options: [
      'Very comfortable - I thrive with multiple projects',
      'Somewhat comfortable - I can manage with good organization',
      'Uncomfortable - I prefer focusing on one thing at a time',
      'Very uncomfortable - I get overwhelmed easily'
    ]
  }
];

export const correctAnswers: Record<string, number> = {
  'tech_1': 0, // Click-Through Rate
  'tech_2': 2, // Engagement rate
  'tech_3': 1, // 1-2 times per day
  'tech_4': 2, // LinkedIn
  'tech_5': 1, // Planning and scheduling posts
  'psych_3': 1, // Respond publicly with empathy
  'wiscar_skill_1': 1, // Expert = 4, Intermediate = 3, Beginner = 2, Novice = 1
  'wiscar_cognitive_1': 1, // Analyze the data
  'wiscar_realworld_1': 0 // Very comfortable = 4, Somewhat = 3, Uncomfortable = 2, Very uncomfortable = 1
};