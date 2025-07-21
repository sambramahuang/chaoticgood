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
  const [coinResult, setCoinResult] = useState<"TELL" | "SAFE" | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);

  const gameTitle = mode === "bridges" ? "Bridges" : "Truth or Dare";

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
        const questions = mode === "bridges" 
          ? [
              "Who here is the best looking?",
              "Who here do you hate the most?",
              "Who here do you think will end up being a stripper?",
              "Who here do you think will impress your parents the most?",
              "Who here would survive the longest in a zombie apocalypse?",
              "Who here is most likely to become famous?",
              "Who here would you trust with your biggest secret?",
              "Who here is most likely to get arrested?",
              "Who here would make the worst roommate?",
              "Who here is most likely to marry for money?"
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

  const flipCoin = async () => {
    setIsFlipping(true);
    setCoinResult(null);
    
    // Multiple animation phases for suspense
    await new Promise(resolve => setTimeout(resolve, 800)); // Initial spin
    await new Promise(resolve => setTimeout(resolve, 600)); // Slowing down
    await new Promise(resolve => setTimeout(resolve, 400)); // Final suspense
    
    const result = Math.random() < 0.5 ? "TELL" : "SAFE";
    setCoinResult(result);
    setIsFlipping(false);
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
              
              {/* Coin Flip for Bridges Mode */}
              {mode === "bridges" && (
                <div className="space-y-4 mt-8">
                  <div className="flex flex-col items-center space-y-4">
                    <div 
                      onClick={!isFlipping ? flipCoin : undefined}
                      className={`w-24 h-24 rounded-full border-4 border-primary flex items-center justify-center text-2xl font-bold cursor-pointer transition-all duration-300 ${
                        isFlipping 
                          ? 'animate-spin border-electric shadow-lg shadow-electric/50' 
                          : coinResult === 'TELL' 
                            ? 'bg-red-500 text-white border-red-400 shadow-lg shadow-red-500/50 animate-pulse' 
                            : coinResult === 'SAFE' 
                              ? 'bg-green-500 text-white border-green-400 shadow-lg shadow-green-500/50 animate-pulse' 
                              : 'bg-gradient-primary text-white hover:scale-110 hover:shadow-lg hover:shadow-primary/50'
                      }`}
                    >
                      {isFlipping ? (
                        <span className="animate-bounce">🪙</span>
                      ) : (
                        coinResult || "🪙"
                      )}
                    </div>
                    
                    {!coinResult && !isFlipping && (
                      <p className="text-sm text-muted-foreground animate-pulse">
                        👆 Tap the coin to flip!
                      </p>
                    )}
                    
                    {coinResult && !isFlipping && (
                      <div className="text-center space-y-2 animate-fade-in">
                        <p className="text-2xl font-bold">
                          {coinResult === "TELL" ? "🗣️ TELL" : "🛡️ SAFE"}
                        </p>
                        <p className="text-sm text-muted-foreground max-w-sm">
                          {coinResult === "TELL" 
                            ? "You must tell the person you pointed at about the question!" 
                            : "You're safe! No need to reveal anything."
                          }
                        </p>
                      </div>
                    )}
                    
                    {isFlipping && (
                      <div className="text-center space-y-2">
                        <p className="text-lg text-electric font-semibold animate-pulse">
                          Flipping coin...
                        </p>
                        <div className="flex justify-center space-x-1">
                          <div className="w-2 h-2 bg-electric rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                          <div className="w-2 h-2 bg-electric rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                          <div className="w-2 h-2 bg-electric rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto animate-float">
                <span className="text-3xl">
                  {mode === "bridges" ? "🌉" : "🎲"}
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
            onClick={() => {
              generateQuestion();
              setCoinResult(null);
            }}
            disabled={isLoading || isFlipping}
            className="bg-gradient-primary hover:shadow-electric transition-all duration-300 text-lg px-8 py-6 rounded-xl font-semibold"
          >
            {isLoading || isFlipping ? (
              <>
                <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                {isFlipping ? "Flipping..." : "Generating..."}
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