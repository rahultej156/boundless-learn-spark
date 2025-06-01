
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const StoryConverter = () => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [story, setStory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentFact, setCurrentFact] = useState("");
  const [factIndex, setFactIndex] = useState(0);

  const educationalFacts = [
    "💡 Stories help improve memory retention by up to 65% compared to facts alone!",
    "📚 The human brain is wired to remember narratives better than isolated information.",
    "🧠 Story-based learning activates multiple areas of the brain simultaneously.",
    "🎭 Ancient civilizations used storytelling as their primary method of education.",
    "⭐ Students who learn through stories show 30% better comprehension rates.",
    "🔄 Narrative learning creates stronger neural pathways for long-term memory.",
    "🌟 Stories make abstract concepts concrete and relatable to everyday experience.",
    "📖 Educational storytelling has been proven to increase student engagement by 300%."
  ];

  const handleGenerate = async () => {
    if (!subject || !topic) {
      toast.error("Please fill in both subject and topic fields");
      return;
    }
    
    setIsLoading(true);
    setStory("");
    setFactIndex(0);

    // Start cycling through facts
    const factInterval = setInterval(() => {
      setFactIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % educationalFacts.length;
        setCurrentFact(educationalFacts[nextIndex]);
        return nextIndex;
      });
    }, 5000); // Show each fact for 5 seconds

    try {
      const inputParams = {
        Subject: subject,
        Topic: topic,
        ...(additionalDetails && { "Additional Details": additionalDetails })
      };

      const requestBody = {
        user_id: "rahultejmora18@gmail.com",
        agent_id: "683c036c3b7c57f1745ceba3",
        session_id: `story-${Date.now()}`,
        message: JSON.stringify(inputParams)
      };

      console.log("Sending request to Lyzr AI:", requestBody);

      const response = await fetch('https://agent-prod.studio.lyzr.ai/v3/inference/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'sk-default-7JPMVLUFjyEKq2sDaBi3bU3rW2aF9Jrv'
        },
        body: JSON.stringify(requestBody)
      });

      console.log("API Response Status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response Data:", data);

      clearInterval(factInterval);

      // Parse the story from the API response
      let generatedStory = "";
      
      if (data && data.response) {
        try {
          // Try to parse the response as JSON first
          const parsedResponse = JSON.parse(data.response);
          if (parsedResponse.Story) {
            generatedStory = parsedResponse.Story;
          } else {
            generatedStory = data.response;
          }
        } catch (e) {
          // If JSON parsing fails, use the response as is
          generatedStory = data.response;
        }
      } else if (data && data.Story) {
        generatedStory = data.Story;
      } else {
        throw new Error("No story found in the response");
      }

      setStory(generatedStory);
      toast.success("Story generated successfully!");

    } catch (error) {
      console.error("Error generating story:", error);
      clearInterval(factInterval);
      
      // Fallback to mock story for development
      const mockStory = `Once upon a time in the magical realm of ${subject}, there lived a curious student named Alex who wanted to understand ${topic}. ${additionalDetails ? `Alex was particularly interested in ${additionalDetails.toLowerCase()}.` : ''} Through an enchanting adventure, Alex discovered the secrets of ${topic} and learned valuable lessons that would last a lifetime. The journey taught Alex that learning can be both fun and meaningful when presented as a story.`;
      
      setStory(mockStory);
      toast.error("Using fallback story due to API error. Please try again.");
    } finally {
      setIsLoading(false);
      setCurrentFact("");
    }
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
                  disabled={isLoading}
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
                  disabled={isLoading}
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
                  disabled={isLoading}
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
            
            {isLoading && currentFact && (
              <Card className="mt-8 border-2 border-blue-300 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600">Did You Know?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-700 leading-relaxed text-lg animate-fade-in">{currentFact}</p>
                </CardContent>
              </Card>
            )}
            
            {story && !isLoading && (
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
