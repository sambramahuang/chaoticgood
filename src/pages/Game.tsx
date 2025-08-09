import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowLeft, RefreshCw, Settings } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  buildingQuestions,
  burningQuestions,
  truthQuestions,
  dareQuestions
} from "@/data/questions";

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
  const [truthOrDareMode, setTruthOrDareMode] = useState<"truth" | "dare" | "both">("both");

  const gameTitle = mode === "bridges" ? "Bridges" : "Truth or Dare";

  

  useEffect(() => {
    const saved = localStorage.getItem("customQuestions");
    if (saved) {
      const questions: CustomQuestion[] = JSON.parse(saved);
      setCustomQuestions(questions.filter(q => q.gameMode === mode));
    }
  }, [mode]);

  const [usedDefaultQuestions, setUsedDefaultQuestions] = useState<string[]>([]);

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
  } else if (mode === "truthOrDare") {
    switch (truthOrDareMode) {
      case 'truth':
        questionsPool = truthQuestions;
        break;
      case 'dare':
        questionsPool = dareQuestions;
        break;
      case 'both':
        questionsPool = [...truthQuestions, ...dareQuestions];
        break;
    }
  }

  const availableDefaults = questionsPool.filter(q => !usedDefaultQuestions.includes(q));

  if (availableDefaults.length > 0) {
    const question = availableDefaults[Math.floor(Math.random() * availableDefaults.length)];
    selectedQuestion = question;
    setUsedDefaultQuestions(prev => [...prev, question]);
  } else {
    selectedQuestion = "Game Over! All questions have been used.";
  }
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
      <div className="w-full max-w-2xl space-y-8 font-pixel">
        <div className="flex items-center justify-between gap-2">
          <Button onClick={() => navigate("/")} className="flex items-center gap-2 text-xs px-3 py-1 font-pixel text-white bg-orange-600 hover:bg-orange-400 rounded shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80">
            <ArrowLeft className="h-4 w-4" />
            Back to Menu
          </Button>
          <h1 className="font-arcade uppercase tracking-[0.06em] text-xl md:text-2xl leading-tight flex-1 text-center px-2 bg-gradient-to-r from-orange-500 via-yellow-300 to-orange-400 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(255,200,120,0.85)]">{gameTitle}</h1>
          <Button onClick={() => navigate("/custom-questions")} className="flex items-center gap-2 text-xs px-3 py-1 font-pixel text-white bg-orange-600 hover:bg-orange-400 rounded shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80">
            <Settings className="h-4 w-4" />
            Manage Questions
          </Button>
        </div>

        {mode === "bridges" && (
          <Card className="p-4 bg-black bg-opacity-60 border border-orange-500 rounded-xl">
            <Label className="mb-2 block text-sm bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">Select Bridge Mode</Label>
            <div className="flex gap-4">
              <Button onClick={() => setBridgeMode('building')} className={`${bridgeMode === 'building' ? 'bg-orange-600 hover:bg-orange-400' : 'bg-orange-700/40 hover:bg-orange-500/60'} text-white px-3 py-1 text-xs rounded shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80`}>Building</Button>
              <Button onClick={() => setBridgeMode('burning')} className={`${bridgeMode === 'burning' ? 'bg-orange-600 hover:bg-orange-400' : 'bg-orange-700/40 hover:bg-orange-500/60'} text-white px-3 py-1 text-xs rounded shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80`}>Burning</Button>
              <Button onClick={() => setBridgeMode('chaotic')} className={`${bridgeMode === 'chaotic' ? 'bg-orange-600 hover:bg-orange-400' : 'bg-orange-700/40 hover:bg-orange-500/60'} text-white px-3 py-1 text-xs rounded shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80`}>Chaotic (mixed)</Button>
            </div>
          </Card>
        )}

        {mode === "truthOrDare" && (
  <Card className="p-4 bg-black bg-opacity-60 border border-orange-500 rounded-xl">
    <Label className="mb-2 block text-sm bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">Select Truth or Dare Mode</Label>
    <div className="flex gap-4">
      <Button onClick={() => setTruthOrDareMode('truth')} className={`${truthOrDareMode === 'truth' ? 'bg-orange-600 hover:bg-orange-400' : 'bg-orange-700/40 hover:bg-orange-500/60'} text-white px-3 py-1 text-xs rounded shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80`}>Truth</Button>
      <Button onClick={() => setTruthOrDareMode('dare')} className={`${truthOrDareMode === 'dare' ? 'bg-orange-600 hover:bg-orange-400' : 'bg-orange-700/40 hover:bg-orange-500/60'} text-white px-3 py-1 text-xs rounded shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80`}>Dare</Button>
      <Button onClick={() => setTruthOrDareMode('both')} className={`${truthOrDareMode === 'both' ? 'bg-orange-600 hover:bg-orange-400' : 'bg-orange-700/40 hover:bg-orange-500/60'} text-white px-3 py-1 text-xs rounded shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80`}>Both</Button>
    </div>
  </Card>
)}

        <Card className="p-8 min-h-[300px] flex flex-col items-center justify-center text-center space-y-6 bg-black bg-opacity-60 border border-orange-500 rounded-xl">
          {currentQuestion ? (
            <>
              <Button size="sm" onClick={() => setQuestionHidden(prev => !prev)} className="text-white bg-orange-600 hover:bg-orange-400 px-3 py-1 text-xs rounded shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80">
                {questionHidden ? "Show Question" : "Hide Question"}
              </Button>
              {!questionHidden && <p className="text-xl mt-4 text-white">{currentQuestion}</p>}
            </>
          ) : (
            <p className="text-white">Click the button to start!</p>
          )}
        </Card>

        {mode === "bridges" && (
          <Card className="p-6 flex flex-col items-center text-center space-y-4 bg-black bg-opacity-60 border border-orange-500 rounded-xl">
            <div
              onClick={!isFlipping ? flipCoin : undefined}
              className={`w-24 h-24 rounded-full border-4 border-primary flex items-center justify-center text-lg font-bold cursor-pointer transition-all duration-300 ${
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
              ) : coinResult ? (
                <span className="font-pixel">{coinResult}</span>
              ) : (
                "🪙"
              )}
            </div>

            {!coinResult && !isFlipping && (
              <p className="text-sm text-white/80 animate-pulse">👆 Tap the coin to flip!</p>
            )}

            {coinResult && !isFlipping && (
              <div className="text-center mt-2">
                <p className="text-2xl font-bold font-pixel">
                  {coinResult === "TELL" ? "TELL" : "SAFE"}
                </p>
                <p className="text-sm text-white/80 max-w-sm">
                  {coinResult === "TELL"
                    ? "You must tell the person you pointed at about the question!"
                    : "You're safe! No need to reveal anything."}
                </p>
              </div>
            )}
          </Card>
        )}

        <div className="flex justify-center">
          <Button onClick={() => { generateQuestion(); setCoinResult(null); }} disabled={isFlipping} className="px-8 py-3 text-sm font-pixel text-white bg-orange-600 hover:bg-orange-400 rounded shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80">
            {currentQuestion ? "Next Question" : "Start Game"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Game;
