
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const CTASection = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="container mx-auto px-4 py-20">
      <Card className="bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 border-none text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-black/10"></div>
        <CardContent className="relative p-12 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            🌟 Education Without Limits!
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Join thousands of students who are already learning without boundaries. 
            <strong> Because knowledge should be free for everyone! </strong>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              size="lg"
              onClick={scrollToTop}
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-6 text-lg rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              🎓 Start Your Journey
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-6 text-lg rounded-full font-semibold"
            >
              📖 Learn More
            </Button>
          </div>
          
          <div className="text-lg opacity-80">
            💝 <strong>100% Free</strong> • 🌍 <strong>Open Source</strong> • 🤝 <strong>Community Driven</strong>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
