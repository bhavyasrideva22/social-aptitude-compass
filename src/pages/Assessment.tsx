import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AssessmentCard } from "@/components/AssessmentCard";
import { ProgressBar } from "@/components/ProgressBar";
import { assessmentQuestions } from '@/data/questions';
import { Answer, AssessmentState } from '@/types/assessment';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { calculateAssessmentResults } from '@/utils/scoreCalculator';
import { correctAnswers } from '@/data/questions';

const Assessment = () => {
  const navigate = useNavigate();
  const [assessmentState, setAssessmentState] = useState<AssessmentState>({
    currentSection: 0,
    currentQuestion: 0,
    answers: [],
    isComplete: false
  });

  const sections = [
    { name: "Personality & Motivation", questions: assessmentQuestions.filter(q => q.category === 'psychometric') },
    { name: "Technical Knowledge", questions: assessmentQuestions.filter(q => q.category === 'technical') },
    { name: "WISCAR Framework", questions: assessmentQuestions.filter(q => q.category === 'wiscar') }
  ];

  const currentSection = sections[assessmentState.currentSection];
  const currentQuestion = currentSection?.questions?.[assessmentState.currentQuestion];
  const totalQuestions = assessmentQuestions.length;
  const answeredQuestions = assessmentState.answers.length;

  // Safety check - if no current question, show loading or redirect
  if (!currentQuestion || !currentSection) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin w-8 h-8 border-4 border-white/30 border-t-white rounded-full mx-auto mb-4"></div>
          <p>Loading assessment...</p>
        </div>
      </div>
    );
  }

  const handleAnswer = (value: number | string) => {
    let score = 0;
    
    if (currentQuestion.type === 'likert') {
      score = typeof value === 'number' ? value : 1;
    } else if (currentQuestion.type === 'multiple-choice' || currentQuestion.type === 'scenario') {
      const correctAnswer = correctAnswers[currentQuestion.id];
      if (correctAnswer !== undefined) {
        score = value === correctAnswer ? 5 : 1;
      } else {
        // For multiple choice without correct answers, assign scores based on position
        if (currentQuestion.id.includes('skill_1')) {
          score = typeof value === 'number' ? 5 - value : 1; // Expert=5, Novice=1
        } else if (currentQuestion.id.includes('realworld_1')) {
          score = typeof value === 'number' ? 5 - value : 1; // Very comfortable=5
        } else {
          score = typeof value === 'number' ? value + 1 : 1;
        }
      }
    }

    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      value,
      score
    };

    const updatedAnswers = [...assessmentState.answers.filter(a => a.questionId !== currentQuestion.id), newAnswer];
    
    setAssessmentState(prev => ({
      ...prev,
      answers: updatedAnswers
    }));

    // Auto-advance to next question
    setTimeout(() => {
      handleNext();
    }, 500);
  };

  const handleNext = () => {
    if (!currentSection || !currentQuestion) return;
    
    if (assessmentState.currentQuestion < currentSection.questions.length - 1) {
      setAssessmentState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1
      }));
    } else if (assessmentState.currentSection < sections.length - 1) {
      setAssessmentState(prev => ({
        ...prev,
        currentSection: prev.currentSection + 1,
        currentQuestion: 0
      }));
    } else {
      // Assessment complete
      const results = calculateAssessmentResults(assessmentState.answers);
      setAssessmentState(prev => ({
        ...prev,
        isComplete: true,
        results
      }));
      navigate('/results', { state: { results } });
    }
  };

  const handlePrevious = () => {
    if (!currentSection) return;
    
    if (assessmentState.currentQuestion > 0) {
      setAssessmentState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1
      }));
    } else if (assessmentState.currentSection > 0) {
      const prevSection = sections[assessmentState.currentSection - 1];
      if (prevSection) {
        setAssessmentState(prev => ({
          ...prev,
          currentSection: prev.currentSection - 1,
          currentQuestion: prevSection.questions.length - 1
        }));
      }
    }
  };

  const getCurrentAnswer = () => {
    if (!currentQuestion) return undefined;
    return assessmentState.answers.find(a => a.questionId === currentQuestion.id);
  };

  const renderQuestion = () => {
    if (!currentQuestion) return null;
    
    const currentAnswer = getCurrentAnswer();

    if (currentQuestion.type === 'likert') {
      return (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">{currentQuestion.likertLabels?.min}</p>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <Button
                  key={rating}
                  variant={currentAnswer?.value === rating ? "hero" : "outline"}
                  size="lg"
                  className="w-16 h-16 rounded-full text-lg font-bold"
                  onClick={() => handleAnswer(rating)}
                >
                  {rating}
                </Button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">{currentQuestion.likertLabels?.max}</p>
          </div>
        </div>
      );
    }

    if (currentQuestion.type === 'multiple-choice' || currentQuestion.type === 'scenario') {
      return (
        <div className="space-y-4">
          {currentQuestion.scenario && (
            <AssessmentCard variant="elevated" className="mb-6">
              <p className="text-sm text-muted-foreground font-medium">Scenario:</p>
              <p className="mt-2">{currentQuestion.scenario}</p>
            </AssessmentCard>
          )}
          <div className="grid gap-3">
            {currentQuestion.options?.map((option, index) => (
              <Button
                key={index}
                variant={currentAnswer?.value === index ? "hero" : "outline"}
                className="p-6 h-auto text-left justify-start whitespace-normal"
                onClick={() => handleAnswer(index)}
              >
                <span className="w-6 h-6 rounded-full bg-gradient-primary text-primary-foreground flex items-center justify-center text-sm font-bold mr-3">
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </Button>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Social Media Manager Assessment
          </h1>
          <p className="text-white/80 text-lg">
            {currentSection.name} - Question {assessmentState.currentQuestion + 1} of {currentSection.questions.length}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <ProgressBar value={answeredQuestions} max={totalQuestions} />
          <p className="text-center text-white/60 mt-2 text-sm">
            {answeredQuestions} of {totalQuestions} questions completed
          </p>
        </div>

        {/* Question Card */}
        <div className="max-w-4xl mx-auto">
          <AssessmentCard className="mb-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-full text-primary-foreground font-bold text-lg mb-4">
                {answeredQuestions + 1}
              </div>
              <h2 className="text-2xl font-semibold mb-4">
                {currentQuestion.text}
              </h2>
            </div>
            
            {renderQuestion()}
          </AssessmentCard>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={assessmentState.currentSection === 0 && assessmentState.currentQuestion === 0}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            <div className="text-white/60 text-sm flex items-center">
              Section {assessmentState.currentSection + 1} of {sections.length}
            </div>

            <Button
              variant="hero"
              onClick={handleNext}
              disabled={!getCurrentAnswer()}
            >
              {assessmentState.currentSection === sections.length - 1 && 
               assessmentState.currentQuestion === currentSection.questions.length - 1 
                ? 'Finish Assessment' : 'Next'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;