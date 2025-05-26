
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown } from "lucide-react";

export const HeroSection = () => {
  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="container mx-auto px-4 py-20 text-center">
      <div className="flex justify-center mb-6">
        <img 
          src="/lovable-uploads/8ecbec4d-c53a-4a9a-a6e6-041f41981410.png" 
          alt="Learn Without Bounds Logo"
          className="h-24 w-auto"
        />
      </div>
      
      <Badge className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600">
        🌟 Open Source • Free Forever
      </Badge>
      
      <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent mb-6 leading-tight">
        Learn w/o Bounds
      </h1>
      
      <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
        Empowering underprivileged students with AI-powered learning tools. 
        <span className="font-semibold text-purple-600"> Education should never be limited by money! </span>
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          onClick={scrollToFeatures}
        >
          🚀 Start Learning Now
        </Button>
        
        <Button 
          variant="outline" 
          size="lg"
          className="border-2 border-purple-300 text-purple-600 hover:bg-purple-50 px-8 py-6 text-lg rounded-full"
          onClick={scrollToFeatures}
        >
          Explore Features
        </Button>
      </div>
      
      <div className="relative mx-auto max-w-4xl">
        <img 
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=500&fit=crop" 
          alt="Students learning with technology"
          className="rounded-2xl shadow-2xl border-4 border-white"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent rounded-2xl"></div>
      </div>
      
      <Button
        variant="ghost"
        size="lg"
        onClick={scrollToFeatures}
        className="mt-8 text-purple-600 hover:text-purple-700 animate-bounce"
      >
        <ArrowDown className="w-6 h-6" />
      </Button>
    </section>
  );
};
