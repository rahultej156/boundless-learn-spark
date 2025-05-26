
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import { useState } from "react";

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    feedback: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle form submission - will be connected to FastAPI backend later
    console.log("Form submitted:", formData);
    alert("Thank you for your feedback! We'll get back to you soon.");
    // Reset form
    setFormData({
      name: "",
      contact: "",
      email: "",
      feedback: ""
    });
  };

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

      <div className="max-w-2xl mx-auto">
        <Card className="border-2 border-purple-100 hover:shadow-xl transition-all duration-300 mb-8">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">
              Contact Form
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="border-purple-200 focus:border-purple-400"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Number</Label>
                  <Input
                    id="contact"
                    name="contact"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.contact}
                    onChange={handleInputChange}
                    className="border-purple-200 focus:border-purple-400"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="border-purple-200 focus:border-purple-400"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="feedback">Feedback / Message *</Label>
                <Textarea
                  id="feedback"
                  name="feedback"
                  placeholder="Share your thoughts, suggestions, or questions..."
                  value={formData.feedback}
                  onChange={handleInputChange}
                  required
                  className="min-h-[120px] border-purple-200 focus:border-purple-400"
                />
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                📨 Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Email Contact Information */}
        <div className="text-center">
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <p className="text-gray-600 mb-4">
              For more details, partnerships, or direct communication:
            </p>
            
            <div className="bg-white rounded-lg p-4 mb-4 border border-purple-100">
              <p className="text-lg font-semibold text-purple-600">
                rahultejmora18@gmail.com
              </p>
            </div>
            
            <Button 
              onClick={handleEmailClick}
              variant="outline"
              className="border-purple-300 text-purple-600 hover:bg-purple-50"
            >
              📧 Send Direct Email
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
