
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const StoryConverter = () => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [story, setStory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!subject || !topic) return;
    
    setIsLoading(true);
    // TODO: Replace with actual API call to FastAPI backend
    setTimeout(() => {
      setStory(`Once upon a time in the magical land of ${subject}, there lived a curious student who wanted to understand ${topic}...`);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 p-4">
      <div className="container mx-auto max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 text-orange-600 hover:text-orange-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <Card className="mb-8 border-2 border-orange-200">
          <CardHeader className="text-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-t-lg">
            <CardTitle className="text-3xl font-bold">📚 Story Converter</CardTitle>
            <CardDescription className="text-yellow-100 text-lg">
              Transform any topic into a memorable story!
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-8">
            <div className="grid gap-6">
              <div>
                <Label htmlFor="subject" className="text-lg font-semibold text-gray-700">Subject</Label>
                <Input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g., Mathematics, Science, History..."
                  className="mt-2 p-3 text-lg border-2 border-orange-200 focus:border-orange-400"
                />
              </div>
              
              <div>
                <Label htmlFor="topic" className="text-lg font-semibold text-gray-700">Topic</Label>
                <Input
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., Photosynthesis, World War II, Algebra..."
                  className="mt-2 p-3 text-lg border-2 border-orange-200 focus:border-orange-400"
                />
              </div>
              
              <div>
                <Label htmlFor="details" className="text-lg font-semibold text-gray-700">Additional Details (Optional)</Label>
                <Textarea
                  id="details"
                  value={additionalDetails}
                  onChange={(e) => setAdditionalDetails(e.target.value)}
                  placeholder="Any specific aspects you want to focus on..."
                  className="mt-2 p-3 text-lg border-2 border-orange-200 focus:border-orange-400"
                  rows={3}
                />
              </div>
              
              <Button
                onClick={handleGenerate}
                disabled={!subject || !topic || isLoading}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-3 px-8 text-lg rounded-full"
              >
                {isLoading ? "🔄 Creating Story..." : "📖 Generate Story"}
              </Button>
            </div>
            
            {story && (
              <Card className="mt-8 border-2 border-yellow-300 bg-yellow-50">
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600">Your Story</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed text-lg">{story}</p>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StoryConverter;
