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
  const [useCustomQuestions, setUseCustomQuestions] = useState(false);
  const [customQuestions, setCustomQuestions] = useState<CustomQuestion[]>([]);
  const [usedQuestionIds, setUsedQuestionIds] = useState<string[]>([]);
  const [coinResult, setCoinResult] = useState<"TELL" | "SAFE" | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [bridgeMode, setBridgeMode] = useState<'building' | 'burning' | 'chaotic'>('chaotic');
  const [questionHidden, setQuestionHidden] = useState(false);

  const gameTitle = mode === "bridges" ? "Bridges" : "Truth or Dare";

  const buildingQuestions = [
    "Who here makes you feel appreciated?",
    "Who here do you trust the most?",
    "Who here is the kindest person?",
    "Who has made your day better recently?"
  ];

  const burningQuestions = [
    "Who here do you avoid texting back?",
    "Who here has the worst fashion sense?",
    "Who would you never date in this group?",
    "Who here is most likely to betray someone for clout?"
  ];

  useEffect(() => {
    const saved = localStorage.getItem("customQuestions");
    if (saved) {
      const questions: CustomQuestion[] = JSON.parse(saved);
      setCustomQuestions(questions.filter(q => q.gameMode === mode));
    }
  }, [mode]);

  const generateQuestion = () => {
    let selectedQuestion = "";

    if (useCustomQuestions && customQuestions.length > 0) {
      const available = customQuestions.filter(q => !usedQuestionIds.includes(q.id));
      const question = available.length > 0 ? available[Math.floor(Math.random() * available.length)] : customQuestions[Math.floor(Math.random() * customQuestions.length)];
      selectedQuestion = question.text;
      setUsedQuestionIds(prev => [...prev, question.id]);
    } else {
      let questionsPool: string[] = [];

      if (mode === "bridges") {
        switch (bridgeMode) {
          case 'building':
            questionsPool = buildingQuestions;
            break;
          case 'burning':
            questionsPool = burningQuestions;
            break;
          default:
            questionsPool = [...buildingQuestions, ...burningQuestions];
        }
      } else {
        questionsPool = [
          "Truth: What's the most embarrassing thing you've ever done?",
          "Dare: Do your best impression of someone in this room",
          "Truth: Who was your first crush and why?",
          "Dare: Let someone post a status on your social media"
        ];
      }

      selectedQuestion = questionsPool[Math.floor(Math.random() * questionsPool.length)];
    }

    setCurrentQuestion(selectedQuestion);
    setQuestionHidden(false);
  };

  const flipCoin = async () => {
    setIsFlipping(true);
    setCoinResult(null);

    await new Promise(resolve => setTimeout(resolve, 800));
    await new Promise(resolve => setTimeout(resolve, 600));
    await new Promise(resolve => setTimeout(resolve, 400));

    const result = Math.random() < 0.5 ? "TELL" : "SAFE";
    setCoinResult(result);
    setIsFlipping(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate("/")} className="flex items-center gap-2 hover:bg-secondary">
            <ArrowLeft className="h-4 w-4" /> Back to Menu
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">{gameTitle}</h1>
          <Button variant="ghost" onClick={() => navigate("/custom-questions")} className="flex items-center gap-2 hover:bg-secondary">
            <Settings className="h-4 w-4" /> Manage Questions
          </Button>
        </div>

        {mode === "bridges" && (
          <Card className="p-4">
            <Label className="mb-2 block text-sm">Select Bridge Mode</Label>
            <div className="flex gap-4">
              <Button variant={bridgeMode === 'building' ? 'default' : 'outline'} onClick={() => setBridgeMode('building')}>Building</Button>
              <Button variant={bridgeMode === 'burning' ? 'default' : 'outline'} onClick={() => setBridgeMode('burning')}>Burning</Button>
              <Button variant={bridgeMode === 'chaotic' ? 'default' : 'outline'} onClick={() => setBridgeMode('chaotic')}>Chaotic</Button>
            </div>
          </Card>
        )}

        <Card className="p-8 min-h-[300px] flex flex-col items-center justify-center text-center space-y-6">
          {currentQuestion ? (
            <>
              <Button variant="outline" size="sm" onClick={() => setQuestionHidden(prev => !prev)}>
                {questionHidden ? "Show Question" : "Hide Question"}
              </Button>
              {!questionHidden && <p className="text-xl mt-4">{currentQuestion}</p>}
            </>
          ) : (
            <p>Click the button to start!</p>
          )}
        </Card>

        {mode === "bridges" && (
          <Card className="p-6 flex flex-col items-center text-center space-y-4">
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
              {isFlipping ? <span className="animate-bounce">🪙</span> : coinResult || "🪙"}
            </div>

            {!coinResult && !isFlipping && (
              <p className="text-sm text-muted-foreground animate-pulse">👆 Tap the coin to flip!</p>
            )}

            {coinResult && !isFlipping && (
              <div className="text-center mt-2">
                <p className="text-2xl font-bold">
                  {coinResult === "TELL" ? "🗣️ TELL" : "🛡️ SAFE"}
                </p>
                <p className="text-sm text-muted-foreground max-w-sm">
                  {coinResult === "TELL"
                    ? "You must tell the person you pointed at about the question!"
                    : "You're safe! No need to reveal anything."}
                </p>
              </div>
            )}
          </Card>
        )}

        <div className="flex justify-center">
          <Button onClick={() => { generateQuestion(); setCoinResult(null); }} disabled={isFlipping} className="px-8 py-6 text-lg">
            {currentQuestion ? "Next Question" : "Start Game"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Game;
