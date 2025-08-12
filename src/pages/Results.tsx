import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AssessmentCard } from "@/components/AssessmentCard";
import { AssessmentResults } from '@/types/assessment';
import { CheckCircle, AlertCircle, XCircle, TrendingUp, User, Briefcase, BookOpen, Target } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results as AssessmentResults;

  if (!results) {
    navigate('/');
    return null;
  }

  const getRecommendationIcon = () => {
    switch (results.recommendation) {
      case 'YES': return <CheckCircle className="w-8 h-8 text-success" />;
      case 'MAYBE': return <AlertCircle className="w-8 h-8 text-yellow-500" />;
      case 'NO': return <XCircle className="w-8 h-8 text-destructive" />;
    }
  };

  const getRecommendationColor = () => {
    switch (results.recommendation) {
      case 'YES': return 'bg-success text-success-foreground';
      case 'MAYBE': return 'bg-yellow-500 text-white';
      case 'NO': return 'bg-destructive text-destructive-foreground';
    }
  };

  const getRecommendationText = () => {
    switch (results.recommendation) {
      case 'YES': return 'Strong Fit - Ready to Pursue Social Media Management';
      case 'MAYBE': return 'Potential Fit - Some Development Needed';
      case 'NO': return 'Consider Alternative Paths';
    }
  };

  const ScoreCard = ({ title, score, icon, description }: { title: string; score: number; icon: React.ReactNode; description: string }) => (
    <AssessmentCard variant="elevated">
      <div className="text-center space-y-4">
        <div className="flex justify-center">{icon}</div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          {score}%
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="h-2 bg-gradient-primary rounded-full transition-all duration-1000"
            style={{ width: `${score}%` }}
          />
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </AssessmentCard>
  );

  const WiscarRadar = () => {
    const dimensions = [
      { key: 'will', label: 'Will', score: results.wiscar.will },
      { key: 'interest', label: 'Interest', score: results.wiscar.interest },
      { key: 'skill', label: 'Skill', score: results.wiscar.skill },
      { key: 'cognitive', label: 'Cognitive', score: results.wiscar.cognitive },
      { key: 'ability_to_learn', label: 'Learning', score: results.wiscar.ability_to_learn },
      { key: 'real_world_fit', label: 'Real-World Fit', score: results.wiscar.real_world_fit }
    ];

    return (
      <AssessmentCard>
        <h3 className="text-xl font-semibold mb-6 text-center">WISCAR Framework Analysis</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {dimensions.map((dim) => (
            <div key={dim.key} className="text-center space-y-2">
              <div className="text-sm font-medium text-muted-foreground">{dim.label}</div>
              <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                {dim.score}%
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="h-2 bg-gradient-secondary rounded-full transition-all duration-1000"
                  style={{ width: `${dim.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </AssessmentCard>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Your Assessment Results
          </h1>
          <p className="text-white/80 text-lg">
            Comprehensive analysis of your Social Media Manager readiness
          </p>
        </div>

        {/* Overall Recommendation */}
        <div className="max-w-4xl mx-auto mb-8">
          <AssessmentCard variant="highlight" className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-4">
              {getRecommendationIcon()}
              <div className="text-left">
                <div className="text-2xl font-bold text-white">
                  Overall Confidence: {results.overallConfidence}%
                </div>
                <div className="text-white/80">
                  {getRecommendationText()}
                </div>
              </div>
            </div>
            <Badge className={`${getRecommendationColor()} text-lg px-6 py-2`}>
              {results.recommendation}
            </Badge>
          </AssessmentCard>
        </div>

        {/* Score Breakdown */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <ScoreCard 
              title="Personality Fit"
              score={results.psychFitScore}
              icon={<User className="w-8 h-8 text-primary" />}
              description="Alignment with social media manager traits"
            />
            <ScoreCard 
              title="Technical Knowledge"
              score={results.techScore}
              icon={<TrendingUp className="w-8 h-8 text-secondary" />}
              description="Understanding of tools and concepts"
            />
            <ScoreCard 
              title="Overall Readiness"
              score={results.overallConfidence}
              icon={<Target className="w-8 h-8 text-accent" />}
              description="Combined assessment score"
            />
          </div>

          <WiscarRadar />
        </div>

        {/* Detailed Insights */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Career Matches */}
            <AssessmentCard>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Briefcase className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-semibold">Recommended Careers</h3>
                </div>
                <div className="space-y-2">
                  {results.careerMatches.map((career, index) => (
                    <Badge key={index} variant="secondary" className="mr-2 mb-2">
                      {career}
                    </Badge>
                  ))}
                </div>
              </div>
            </AssessmentCard>

            {/* Learning Path */}
            <AssessmentCard>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-6 h-6 text-secondary" />
                  <h3 className="text-xl font-semibold">Learning Path</h3>
                </div>
                <div className="text-lg font-medium text-secondary">
                  {results.learningPath}
                </div>
                <p className="text-sm text-muted-foreground">
                  Recommended skill development level based on your assessment
                </p>
              </div>
            </AssessmentCard>
          </div>
        </div>

        {/* Skill Gaps & Next Steps */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Skill Gaps */}
            {results.skillGaps.length > 0 && (
              <AssessmentCard>
                <h3 className="text-xl font-semibold mb-4">Areas for Improvement</h3>
                <ul className="space-y-2">
                  {results.skillGaps.map((gap, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm">{gap}</span>
                    </li>
                  ))}
                </ul>
              </AssessmentCard>
            )}

            {/* Next Steps */}
            <AssessmentCard>
              <h3 className="text-xl font-semibold mb-4">Recommended Next Steps</h3>
              <ol className="space-y-2">
                {results.nextSteps.map((step, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-gradient-primary rounded-full text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-sm">{step}</span>
                  </li>
                ))}
              </ol>
            </AssessmentCard>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center">
          <div className="space-x-4">
            <Button 
              variant="hero" 
              size="lg"
              onClick={() => navigate('/')}
            >
              Take Assessment Again
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={() => window.print()}
            >
              Save Results
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;