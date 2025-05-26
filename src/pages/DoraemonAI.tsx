
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const DoraemonAI = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAsk = async () => {
    if (!question) return;
    
    setIsLoading(true);
    // TODO: Replace with actual API call to FastAPI backend
    setTimeout(() => {
      setAnswer(`Based on the content you provided, here's what I found: ${question} is an interesting topic that relates to...`);
      setIsLoading(false);
    }, 2000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFileContent(e.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 p-4">
      <div className="container mx-auto max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <Card className="mb-8 border-2 border-blue-200">
          <CardHeader className="text-center bg-gradient-to-r from-blue-400 to-cyan-500 text-white rounded-t-lg">
            <CardTitle className="text-3xl font-bold">🤖 DoraemonAI</CardTitle>
            <CardDescription className="text-blue-100 text-lg">
              Your smart study companion! Ask questions about your content.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-8">
            <div className="grid gap-6">
              <div>
                <Label htmlFor="file" className="text-lg font-semibold text-gray-700">Upload File or Enter Text</Label>
                <Input
                  id="file"
                  type="file"
                  onChange={handleFileUpload}
                  accept=".txt,.pdf,.doc,.docx"
                  className="mt-2 p-3 border-2 border-blue-200 focus:border-blue-400"
                />
              </div>
              
              <div>
                <Label htmlFor="content" className="text-lg font-semibold text-gray-700">Or Paste Text Content</Label>
                <Textarea
                  id="content"
                  value={fileContent}
                  onChange={(e) => setFileContent(e.target.value)}
                  placeholder="Paste your study material here..."
                  className="mt-2 p-3 text-lg border-2 border-blue-200 focus:border-blue-400"
                  rows={6}
                />
              </div>
              
              <div>
                <Label htmlFor="question" className="text-lg font-semibold text-gray-700">Ask Your Question</Label>
                <Input
                  id="question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="What would you like to know about this content?"
                  className="mt-2 p-3 text-lg border-2 border-blue-200 focus:border-blue-400"
                />
              </div>
              
              <Button
                onClick={handleAsk}
                disabled={!question || isLoading}
                className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white font-bold py-3 px-8 text-lg rounded-full"
              >
                {isLoading ? "🔄 Thinking..." : "🤔 Ask DoraemonAI"}
              </Button>
            </div>
            
            {answer && (
              <Card className="mt-8 border-2 border-cyan-300 bg-cyan-50">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600">DoraemonAI's Answer</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed text-lg">{answer}</p>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DoraemonAI;
