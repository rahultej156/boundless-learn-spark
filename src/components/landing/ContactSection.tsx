
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export const ContactSection = () => {
  const handleEmailClick = () => {
    window.location.href = "mailto:rahultejmora18@gmail.com";
  };

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          📧 Get in Touch
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Have questions, suggestions, or want to contribute to our mission? 
          We'd love to hear from you!
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <Card className="border-2 border-purple-100 hover:shadow-xl transition-all duration-300">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">
              Contact Us
            </CardTitle>
          </CardHeader>
          
          <CardContent className="text-center">
            <p className="text-gray-600 mb-6">
              For more details, partnerships, or any questions about our platform:
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-lg font-semibold text-purple-600">
                rahultejmora18@gmail.com
              </p>
            </div>
            
            <Button 
              onClick={handleEmailClick}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              📨 Send Email
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
