import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { AssessmentCard } from "@/components/AssessmentCard";
import { Brain, TrendingUp, Users, Sparkles, CheckCircle, Clock, Award } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Brain className="w-8 h-8 text-primary" />,
      title: "Psychometric Analysis",
      description: "Evaluate personality traits and motivation alignment with social media management roles"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-secondary" />,
      title: "Technical Assessment",
      description: "Test knowledge of social media tools, metrics, and best practices"
    },
    {
      icon: <Users className="w-8 h-8 text-accent" />,
      title: "WISCAR Framework",
      description: "Comprehensive 6-dimension analysis of readiness and potential"
    }
  ];

  const benefits = [
    { icon: <CheckCircle className="w-5 h-5 text-success" />, text: "Personalized career guidance" },
    { icon: <Clock className="w-5 h-5 text-success" />, text: "20-minute comprehensive assessment" },
    { icon: <Award className="w-5 h-5 text-success" />, text: "Science-based recommendations" },
    { icon: <Sparkles className="w-5 h-5 text-success" />, text: "Actionable next steps" }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-6">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">
            Social Media Manager
            <br />
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Readiness Assessment
            </span>
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Discover your potential as a Social Media Manager with our comprehensive, 
            science-based assessment platform. Get personalized insights and career guidance.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2">
                {benefit.icon}
                <span className="text-white text-sm">{benefit.text}</span>
              </div>
            ))}
          </div>

          <Button 
            variant="hero" 
            size="lg"
            className="text-lg px-8 py-4 h-auto"
            onClick={() => navigate('/assessment')}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Start Your Assessment
          </Button>
        </div>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            What You'll Discover
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <AssessmentCard key={index} variant="elevated">
                <div className="text-center space-y-4">
                  <div className="flex justify-center">{feature.icon}</div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </AssessmentCard>
            ))}
          </div>
        </div>

        {/* About Section */}
        <div className="max-w-4xl mx-auto">
          <AssessmentCard variant="highlight">
            <div className="text-center text-white">
              <h2 className="text-3xl font-bold mb-6">About Social Media Management</h2>
              <p className="text-lg text-white/90 mb-6">
                Social Media Managers are the creative strategists behind brand presence on digital platforms. 
                They craft compelling content, analyze engagement metrics, and build communities that drive business growth.
              </p>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h3 className="font-semibold mb-3">Key Responsibilities</h3>
                  <ul className="space-y-2 text-white/80">
                    <li>• Content creation and curation</li>
                    <li>• Community management</li>
                    <li>• Analytics and reporting</li>
                    <li>• Brand voice development</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Essential Skills</h3>
                  <ul className="space-y-2 text-white/80">
                    <li>• Creative storytelling</li>
                    <li>• Data analysis</li>
                    <li>• Strategic thinking</li>
                    <li>• Communication excellence</li>
                  </ul>
                </div>
              </div>
            </div>
          </AssessmentCard>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Unlock Your Potential?
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Take the first step towards your social media management career
          </p>
          <Button 
            variant="hero" 
            size="lg"
            className="text-lg px-8 py-4 h-auto"
            onClick={() => navigate('/assessment')}
          >
            Begin Assessment Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
