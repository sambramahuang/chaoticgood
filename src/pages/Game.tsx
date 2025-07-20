import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowLeft, RefreshCw, Settings } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CustomQuestion {
  id: string;
  text: string;
  gameMode: string;
}

const Game = () => {
  const { mode } = useParams<{ mode: string }>();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [useCustomQuestions, setUseCustomQuestions] = useState(false);
  const [customQuestions, setCustomQuestions] = useState<CustomQuestion[]>([]);
  const [usedQuestionIds, setUsedQuestionIds] = useState<string[]>([]);

  const gameTitle = mode === "burning-bridges" ? "Burning Bridges" : "Truth or Dare";

  // Load custom questions from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("customQuestions");
    if (saved) {
      const questions: CustomQuestion[] = JSON.parse(saved);
      setCustomQuestions(questions.filter(q => q.gameMode === mode));
    }
  }, [mode]);
  
  const generateQuestion = async () => {
    setIsLoading(true);
    
    try {
      let selectedQuestion = "";

      if (useCustomQuestions && customQuestions.length > 0) {
        // Use custom questions
        const availableQuestions = customQuestions.filter(q => !usedQuestionIds.includes(q.id));
        
        if (availableQuestions.length === 0) {
          // Reset used questions if all have been used
          setUsedQuestionIds([]);
          const randomQuestion = customQuestions[Math.floor(Math.random() * customQuestions.length)];
          selectedQuestion = randomQuestion.text;
          setUsedQuestionIds([randomQuestion.id]);
        } else {
          const randomQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
          selectedQuestion = randomQuestion.text;
          setUsedQuestionIds(prev => [...prev, randomQuestion.id]);
        }
      } else {
        // Use AI-generated questions (placeholder for now)
        const questions = mode === "burning-bridges" 
          ? [
              "What's something you've done that you've never told anyone about?",
              "If you could erase one memory from someone's mind, what would it be?",
              "What's the most manipulative thing you've ever done?",
              "Who in this room do you trust the least and why?",
              "What's a secret that could ruin someone's relationship if revealed?"
            ]
          : [
              "Truth: What's the most embarrassing thing you've ever done?",
              "Dare: Do your best impression of someone in this room",
              "Truth: Who was your first crush and why?",
              "Dare: Let someone post a status on your social media",
              "Truth: What's something you're glad your parents don't know about you?"
            ];
        
        selectedQuestion = questions[Math.floor(Math.random() * questions.length)];
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCurrentQuestion(selectedQuestion);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate question. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 hover:bg-secondary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Menu
          </Button>
          
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {gameTitle}
          </h1>
          
          <Button
            variant="ghost"
            onClick={() => navigate("/custom-questions")}
            className="flex items-center gap-2 hover:bg-secondary"
          >
            <Settings className="h-4 w-4" />
            Manage Questions
          </Button>
        </div>

        {/* Question Source Toggle */}
        <Card className="bg-gradient-surface border-border shadow-card p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="question-source" className="text-foreground font-medium">
                Question Source
              </Label>
              <p className="text-sm text-muted-foreground">
                {useCustomQuestions 
                  ? `Using your custom questions (${customQuestions.length} available)` 
                  : "Using AI-generated questions"
                }
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="question-source" className="text-sm text-muted-foreground">
                AI
              </Label>
              <Switch
                id="question-source"
                checked={useCustomQuestions}
                onCheckedChange={setUseCustomQuestions}
                disabled={customQuestions.length === 0}
              />
              <Label htmlFor="question-source" className="text-sm text-muted-foreground">
                Custom
              </Label>
            </div>
          </div>
          {customQuestions.length === 0 && (
            <p className="text-xs text-muted-foreground mt-2">
              Add custom questions to enable this option
            </p>
          )}
        </Card>

        <Card className="bg-gradient-surface border-border shadow-card p-8 min-h-[300px] flex flex-col items-center justify-center text-center space-y-6">
          {currentQuestion ? (
            <>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto animate-pulse-electric">
                  <span className="text-2xl">🎯</span>
                </div>
                <p className="text-xl leading-relaxed text-foreground">
                  {currentQuestion}
                </p>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto animate-float">
                <span className="text-3xl">
                  {mode === "burning-bridges" ? "🔥" : "🎲"}
                </span>
              </div>
              <p className="text-xl text-muted-foreground">
                Ready to start? Click the button below to generate your first question!
              </p>
            </div>
          )}
        </Card>

        <div className="flex justify-center">
          <Button
            onClick={generateQuestion}
            disabled={isLoading}
            className="bg-gradient-primary hover:shadow-electric transition-all duration-300 text-lg px-8 py-6 rounded-xl font-semibold"
          >
            {isLoading ? (
              <>
                <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                {currentQuestion ? "Next Question" : "Start Game"}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Game;