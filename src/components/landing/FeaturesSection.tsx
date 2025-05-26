
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

export const FeaturesSection = () => {
  const navigate = useNavigate();

  const features = [
    {
      id: "story-converter",
      title: "📚 Story Converter",
      description: "Transform any subject topic into an engaging story that helps students memorize and understand concepts better!",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=300&fit=crop",
      path: "/story-converter",
      color: "from-yellow-400 to-orange-500"
    },
    {
      id: "doraemon-ai",
      title: "🤖 DoraemonAI",
      description: "Your personal RAG assistant! Upload text or files and ask questions. DoraemonAI will answer based on your content.",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop",
      path: "/doraemon-ai",
      color: "from-blue-400 to-cyan-500"
    },
    {
      id: "quiz-mate",
      title: "🎯 QuizMate",
      description: "Create personalized quizzes! Select subject, topic, difficulty level, and number of questions for instant quiz generation.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
      path: "/quiz-mate",
      color: "from-green-400 to-emerald-500"
    }
  ];

  const comingSoonFeatures = [
    "🎨 Art & Creativity Lab",
    "🧪 Virtual Science Experiments", 
    "🗣️ Language Practice Buddy",
    "📊 Progress Analytics Dashboard",
    "👥 Study Groups & Collaboration",
    "🏆 Achievement & Rewards System"
  ];

  return (
    <section id="features" className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          ✨ AI-Powered Features
        </Badge>
        <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
          Amazing Learning Tools
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover our collection of AI-powered tools designed to make learning fun, engaging, and accessible for everyone!
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {features.map((feature) => (
          <Card key={feature.id} className="group hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-purple-100 overflow-hidden">
            <div className="relative">
              <img 
                src={feature.image} 
                alt={feature.title}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
            </div>
            
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                {feature.title}
              </CardTitle>
              <CardDescription className="text-gray-600 text-base leading-relaxed">
                {feature.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Button 
                onClick={() => navigate(feature.path)}
                className={`w-full bg-gradient-to-r ${feature.color} hover:opacity-90 text-white font-semibold py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg`}
              >
                🚀 Try Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <h3 className="text-3xl font-bold text-gray-800 mb-8">🔮 More Amazing Features Coming Soon!</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {comingSoonFeatures.map((feature, index) => (
            <Badge key={index} variant="outline" className="p-3 text-sm border-purple-200 text-purple-600 hover:bg-purple-50">
              {feature}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
};
