
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Brain, Lightbulb, Star, BookOpen } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface QuizQuestion {
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correct_answer: string;
  explanation: string;
}

interface QuizResponse {
  quiz_title: string;
  input_parameters: {
    subject: string;
    topic: string;
    number_of_questions: number;
    difficulty_level: string;
  };
  questions: QuizQuestion[];
}

const QuizMate = () => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [numQuestions, setNumQuestions] = useState("");
  const [quiz, setQuiz] = useState<QuizResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentFact, setCurrentFact] = useState(0);
  const [progress, setProgress] = useState(0);

  const educationalFacts = [
    { icon: Brain, text: "Did you know? Your brain has about 86 billion neurons!", color: "text-purple-600" },
    { icon: Lightbulb, text: "Fun fact: Learning new things creates new neural pathways in your brain!", color: "text-yellow-600" },
    { icon: Star, text: "Amazing: You can remember up to 1 million gigabytes of information!", color: "text-blue-600" },
    { icon: BookOpen, text: "Cool fact: Reading for just 6 minutes can reduce stress by 68%!", color: "text-green-600" },
    { icon: Brain, text: "Wow: Your brain uses 20% of your body's total energy!", color: "text-red-600" },
    { icon: Lightbulb, text: "Did you know? Every time you learn something new, your brain physically changes!", color: "text-indigo-600" },
    { icon: Star, text: "Amazing: The more you practice, the stronger your memory becomes!", color: "text-pink-600" },
    { icon: BookOpen, text: "Fun fact: Explaining what you learn to others helps you remember it better!", color: "text-teal-600" }
  ];

  const generateQuiz = async () => {
    if (!subject || !topic || !difficulty || !numQuestions) return;
    
    setIsLoading(true);
    setProgress(0);
    setCurrentFact(0);

    // Progress animation and fact cycling
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) return 95;
        return prev + Math.random() * 15;
      });
    }, 300);

    const factInterval = setInterval(() => {
      setCurrentFact(prev => (prev + 1) % educationalFacts.length);
    }, 2000);

    try {
      const requestBody = {
        user_id: "rahultejmora18@gmail.com",
        agent_id: "683b3269c446a3a00dfefca0",
        session_id: `quiz-${Date.now()}`,
        message: JSON.stringify({
          subject: subject,
          topic: topic,
          number_of_questions: parseInt(numQuestions),
          difficulty_level: difficulty
        })
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

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Lyzr AI response:", data);

      // Parse the response - assuming the quiz data is in the response message
      let quizData: QuizResponse;
      if (typeof data.response === 'string') {
        quizData = JSON.parse(data.response);
      } else {
        quizData = data.response || data;
      }

      clearInterval(progressInterval);
      clearInterval(factInterval);
      setProgress(100);

      setTimeout(() => {
        setQuiz(quizData);
        setIsLoading(false);
      }, 500);

    } catch (error) {
      console.error("Error generating quiz:", error);
      clearInterval(progressInterval);
      clearInterval(factInterval);
      
      // Fallback to mock data if API fails
      setTimeout(() => {
        const mockQuiz: QuizResponse = {
          quiz_title: `${topic} in ${subject}: ${difficulty} Level Quiz`,
          input_parameters: {
            subject,
            topic,
            number_of_questions: parseInt(numQuestions),
            difficulty_level: difficulty
          },
          questions: Array.from({ length: parseInt(numQuestions) }, (_, i) => ({
            question: `Sample question ${i + 1} about ${topic} in ${subject}?`,
            options: {
              A: "Option A",
              B: "Option B", 
              C: "Option C",
              D: "Option D"
            },
            correct_answer: "A",
            explanation: `This is the explanation for question ${i + 1} about ${topic}.`
          }))
        };
        setQuiz(mockQuiz);
        setProgress(100);
        setIsLoading(false);
      }, 2000);
    }
  };

  const CurrentFactIcon = educationalFacts[currentFact].icon;

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
            {isLoading ? (
              <div className="space-y-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-green-600 mb-4">🔮 Creating Your Amazing Quiz!</h3>
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 mb-6">
                    <div className="flex items-center justify-center space-x-3 mb-4">
                      <CurrentFactIcon className={`w-8 h-8 ${educationalFacts[currentFact].color} animate-bounce`} />
                      <span className="text-lg font-semibold text-gray-700">Learning Fun Fact!</span>
                    </div>
                    <p className="text-lg text-gray-600 animate-fade-in">
                      {educationalFacts[currentFact].text}
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <Progress value={progress} className="h-3 bg-green-100" />
                    <p className="text-sm text-gray-600">
                      Generating your personalized quiz... {Math.round(progress)}%
                    </p>
                  </div>
                </div>
              </div>
            ) : quiz ? (
              <div className="space-y-6">
                <div className="text-center bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-6">
                  <h3 className="text-2xl font-bold text-green-600 mb-2">{quiz.quiz_title}</h3>
                  <p className="text-gray-600">
                    {quiz.input_parameters.subject} • {quiz.input_parameters.topic} • {quiz.input_parameters.difficulty_level} Level
                  </p>
                </div>
                
                {quiz.questions.map((question, index) => (
                  <Card key={index} className="border-2 border-emerald-200 bg-emerald-50">
                    <CardHeader>
                      <CardTitle className="text-lg text-gray-800">
                        Question {index + 1}: {question.question}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-3">
                        {Object.entries(question.options).map(([key, value]) => (
                          <Button
                            key={key}
                            variant="outline"
                            className={`justify-start text-left p-4 h-auto ${
                              key === question.correct_answer 
                                ? 'border-green-500 bg-green-50 hover:bg-green-100' 
                                : 'hover:bg-gray-50'
                            }`}
                          >
                            <span className="font-semibold mr-3">{key}.</span> {value}
                          </Button>
                        ))}
                      </div>
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                        <p className="text-sm text-blue-700">
                          <span className="font-semibold">💡 Explanation:</span> {question.explanation}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <div className="text-center">
                  <Button
                    onClick={() => {
                      setQuiz(null);
                      setSubject("");
                      setTopic("");
                      setDifficulty("");
                      setNumQuestions("");
                    }}
                    className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white font-bold py-3 px-8 text-lg rounded-full"
                  >
                    🎯 Create Another Quiz
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid gap-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="subject" className="text-lg font-semibold text-gray-700">Subject</Label>
                    <Input
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g., Mathematics, Science, History..."
                      className="mt-2 p-3 text-lg border-2 border-green-200 focus:border-green-400"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="topic" className="text-lg font-semibold text-gray-700">Topic</Label>
                    <Input
                      id="topic"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="e.g., Algebra, Chemistry, Ancient Egypt..."
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
                      <option value="Easy">🟢 Easy</option>
                      <option value="Medium">🟡 Medium</option>
                      <option value="Hard">🔴 Hard</option>
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
                      max="20"
                      className="mt-2 p-3 text-lg border-2 border-green-200 focus:border-green-400"
                    />
                  </div>
                </div>
                
                <Button
                  onClick={generateQuiz}
                  disabled={!subject || !topic || !difficulty || !numQuestions || isLoading}
                  className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white font-bold py-3 px-8 text-lg rounded-full"
                >
                  🎯 Generate Quiz with AI
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuizMate;
