import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, RefreshCw, Settings } from "lucide-react";
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
      const question = available.length > 0
        ? available[Math.floor(Math.random() * available.length)]
        : customQuestions[Math.floor(Math.random() * customQuestions.length)];
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
    <div className="min-h-screen bg-background flex flex-col items-center py-4 px-3 sm:px-4">
      {/* Constrain width responsively and prevent overflow */}
      <div className="w-full max-w-md sm:max-w-xl md:max-w-2xl space-y-6 sm:space-y-8 font-pixel">
        {/* Header: responsive grid, clamp text, avoid overflow */}
        <div className="grid grid-cols-[auto,1fr,auto] items-center gap-2 sm:gap-3 min-w-0">
          <Button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-[11px] sm:text-xs px-2.5 py-1 bg-orange-600 hover:bg-orange-400 rounded shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" />
            <span className="hidden xs:inline">Back</span>
          </Button>

          <h1 className="font-arcade uppercase tracking-[0.06em] text-base xs:text-lg md:text-2xl leading-tight text-center px-1 sm:px-2 bg-gradient-to-r from-orange-500 via-yellow-300 to-orange-400 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(255,200,120,0.85)] overflow-hidden text-ellipsis whitespace-nowrap">
            {gameTitle}
          </h1>

          <Button
            onClick={() => navigate("/custom-questions")}
            className="flex items-center gap-2 text-[11px] sm:text-xs px-2.5 py-1 bg-orange-600 hover:bg-orange-400 rounded shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80"
          >
            <Settings className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">Manage</span>
          </Button>
        </div>

        {/* Bridges mode selector */}
        {mode === "bridges" && (
          <Card className="p-3 sm:p-4 bg-black/60 border border-orange-500 rounded-xl overflow-hidden">
            <Label className="mb-2 block text-xs sm:text-sm bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">
              Select Bridge Mode
            </Label>

            {/* Use wrap/grid so buttons never overflow on phones */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <Button
                onClick={() => setBridgeMode('building')}
                className={`${bridgeMode === 'building' ? 'bg-orange-600 hover:bg-orange-400' : 'bg-orange-700/40 hover:bg-orange-500/60'} text-white px-3 py-2 text-xs rounded shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80 w-full`}
              >
                Building
              </Button>
              <Button
                onClick={() => setBridgeMode('burning')}
                className={`${bridgeMode === 'burning' ? 'bg-orange-600 hover:bg-orange-400' : 'bg-orange-700/40 hover:bg-orange-500/60'} text-white px-3 py-2 text-xs rounded shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80 w-full`}
              >
                Burning
              </Button>
              <Button
                onClick={() => setBridgeMode('chaotic')}
                className={`${bridgeMode === 'chaotic' ? 'bg-orange-600 hover:bg-orange-400' : 'bg-orange-700/40 hover:bg-orange-500/60'} text-white px-3 py-2 text-xs rounded shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80 w-full col-span-2 sm:col-span-1`}
              >
                Chaotic (mixed)
              </Button>
            </div>
          </Card>
        )}

        {/* Truth/Dare selector */}
        {mode === "truthOrDare" && (
          <Card className="p-3 sm:p-4 bg-black/60 border border-orange-500 rounded-xl overflow-hidden">
            <Label className="mb-2 block text-xs sm:text-sm bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">
              Select Truth or Dare Mode
            </Label>
            <div className="grid grid-cols-3 gap-2">
              <Button
                onClick={() => setTruthOrDareMode('truth')}
                className={`${truthOrDareMode === 'truth' ? 'bg-orange-600 hover:bg-orange-400' : 'bg-orange-700/40 hover:bg-orange-500/60'} text-white px-2.5 py-2 text-xs rounded shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80 w-full`}
              >
                Truth
              </Button>
              <Button
                onClick={() => setTruthOrDareMode('dare')}
                className={`${truthOrDareMode === 'dare' ? 'bg-orange-600 hover:bg-orange-400' : 'bg-orange-700/40 hover:bg-orange-500/60'} text-white px-2.5 py-2 text-xs rounded shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80 w-full`}
              >
                Dare
              </Button>
              <Button
                onClick={() => setTruthOrDareMode('both')}
                className={`${truthOrDareMode === 'both' ? 'bg-orange-600 hover:bg-orange-400' : 'bg-orange-700/40 hover:bg-orange-500/60'} text-white px-2.5 py-2 text-xs rounded shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80 w-full`}
              >
                Both
              </Button>
            </div>
          </Card>
        )}

        {/* Question card: responsive height, wrap text safely */}
        <Card className="p-4 sm:p-6 min-h-[38vh] sm:min-h-[300px] w-full flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6 bg-black/60 border border-orange-500 rounded-xl overflow-hidden">
          {currentQuestion ? (
            <>
              <Button
                size="sm"
                onClick={() => setQuestionHidden(prev => !prev)}
                className="text-white bg-orange-600 hover:bg-orange-400 px-3 py-1 text-xs rounded shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80"
              >
                {questionHidden ? "Show Question" : "Hide Question"}
              </Button>
              {!questionHidden && (
                <p className="text-base sm:text-xl mt-2 sm:mt-4 text-white break-words hyphens-auto leading-snug max-w-full">
                  {currentQuestion}
                </p>
              )}
            </>
          ) : (
            <p className="text-sm sm:text-base text-white">Click the button to start!</p>
          )}
        </Card>

        {/* Coin card (bridges only): ensure no overflow */}
        {mode === "bridges" && (
          <Card className="p-4 sm:p-6 flex flex-col items-center text-center space-y-3 sm:space-y-4 bg-black/60 border border-orange-500 rounded-xl overflow-hidden">
            <div
              onClick={!isFlipping ? flipCoin : undefined}
              className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-primary flex items-center justify-center text-lg font-bold cursor-pointer transition-all duration-300 overflow-hidden ${
                isFlipping
                  ? 'animate-spin border-electric shadow-lg shadow-electric/50'
                  : coinResult === 'TELL'
                  ? 'bg-red-500 text-white border-red-400 shadow-lg shadow-red-500/50'
                  : coinResult === 'SAFE'
                  ? 'bg-green-500 text-white border-green-400 shadow-lg shadow-green-500/50'
                  : 'bg-gradient-primary text-white'
              }`}
            >
              {isFlipping ? (
                <span className="animate-bounce select-none">🪙</span>
              ) : coinResult ? (
                <span className="font-pixel">{coinResult}</span>
              ) : (
                "🪙"
              )}
            </div>

            {!coinResult && !isFlipping && (
              <p className="text-xs sm:text-sm text-white/80">👆 Tap the coin to flip!</p>
            )}

            {coinResult && !isFlipping && (
              <div className="text-center mt-1 sm:mt-2 px-2">
                <p className="text-lg sm:text-2xl font-bold font-pixel">
                  {coinResult === "TELL" ? "TELL" : "SAFE"}
                </p>
                <p className="text-xs sm:text-sm text-white/80 max-w-sm mx-auto break-words">
                  {coinResult === "TELL"
                    ? "You must tell the person you pointed at about the question!"
                    : "You're safe! No need to reveal anything."}
                </p>
              </div>
            )}
          </Card>
        )}

        {/* Primary action */}
        <div className="flex justify-center">
          <Button
            onClick={() => { generateQuestion(); setCoinResult(null); }}
            disabled={isFlipping}
            className="w-full sm:w-auto px-5 sm:px-8 py-2.5 sm:py-3 text-sm font-pixel text-white bg-orange-600 hover:bg-orange-400 rounded shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80"
          >
            {currentQuestion ? "Next Question" : "Start Game"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Game;