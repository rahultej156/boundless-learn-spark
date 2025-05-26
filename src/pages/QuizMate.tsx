
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const QuizMate = () => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [numQuestions, setNumQuestions] = useState("");
  const [quiz, setQuiz] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!subject || !topic || !difficulty || !numQuestions) return;
    
    setIsLoading(true);
    // TODO: Replace with actual API call to FastAPI backend
    setTimeout(() => {
      const mockQuiz = Array.from({ length: parseInt(numQuestions) }, (_, i) => ({
        id: i + 1,
        question: `Sample question ${i + 1} about ${topic} in ${subject}?`,
        options: ["Option A", "Option B", "Option C", "Option D"],
        correct: 0
      }));
      setQuiz(mockQuiz);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4">
      <div className="container mx-auto max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 text-green-600 hover:text-green-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <Card className="mb-8 border-2 border-green-200">
          <CardHeader className="text-center bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-t-lg">
            <CardTitle className="text-3xl font-bold">🎯 QuizMate</CardTitle>
            <CardDescription className="text-green-100 text-lg">
              Create personalized quizzes to test your knowledge!
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-8">
            <div className="grid gap-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="subject" className="text-lg font-semibold text-gray-700">Subject</Label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g., Mathematics, Science..."
                    className="mt-2 p-3 text-lg border-2 border-green-200 focus:border-green-400"
                  />
                </div>
                
                <div>
                  <Label htmlFor="topic" className="text-lg font-semibold text-gray-700">Topic</Label>
                  <Input
                    id="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., Algebra, Chemistry..."
                    className="mt-2 p-3 text-lg border-2 border-green-200 focus:border-green-400"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="difficulty" className="text-lg font-semibold text-gray-700">Difficulty Level</Label>
                  <select
                    id="difficulty"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="mt-2 p-3 text-lg border-2 border-green-200 focus:border-green-400 rounded-md w-full"
                  >
                    <option value="">Select Difficulty</option>
                    <option value="easy">🟢 Easy</option>
                    <option value="medium">🟡 Medium</option>
                    <option value="hard">🔴 Hard</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="numQuestions" className="text-lg font-semibold text-gray-700">Number of Questions</Label>
                  <Input
                    id="numQuestions"
                    type="number"
                    value={numQuestions}
                    onChange={(e) => setNumQuestions(e.target.value)}
                    placeholder="e.g., 5, 10, 15..."
                    min="1"
                    max="50"
                    className="mt-2 p-3 text-lg border-2 border-green-200 focus:border-green-400"
                  />
                </div>
              </div>
              
              <Button
                onClick={handleGenerate}
                disabled={!subject || !topic || !difficulty || !numQuestions || isLoading}
                className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white font-bold py-3 px-8 text-lg rounded-full"
              >
                {isLoading ? "🔄 Generating Quiz..." : "🎯 Generate Quiz"}
              </Button>
            </div>
            
            {quiz.length > 0 && (
              <div className="mt-8 space-y-4">
                <h3 className="text-2xl font-bold text-green-600">Your Quiz</h3>
                {quiz.map((question, index) => (
                  <Card key={question.id} className="border-2 border-emerald-200 bg-emerald-50">
                    <CardHeader>
                      <CardTitle className="text-lg text-gray-800">
                        Question {index + 1}: {question.question}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-2">
                        {question.options.map((option: string, optIndex: number) => (
                          <Button
                            key={optIndex}
                            variant="outline"
                            className="justify-start text-left"
                          >
                            {String.fromCharCode(65 + optIndex)}. {option}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuizMate;
