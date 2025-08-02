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
  const [showInstructions, setShowInstructions] = useState(mode === "bridges");

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

    await new Promise(resolve => setTimeout(resolve, 400));
    await new Promise(resolve => setTimeout(resolve, 300));
    await new Promise(resolve => setTimeout(resolve, 200));

    const result = Math.random() < 0.5 ? "TELL" : "SAFE";
    setCoinResult(result);
    setIsFlipping(false);
  };

  return (
    <>
      {showInstructions ? (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <Card className="p-6 space-y-4 text-center font-pixel">
            <h2 className="text-3xl font-arcade bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent drop-shadow-[0_0_5px_rgba(255,200,100,0.8)]">
              How to Play {gameTitle}
            </h2>

            {mode === "bridges" ? (
              <>
                <p className="bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent text-sm drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">
                  👥 In Bridges, players take turns flipping a coin and answering questions by pointing at someone in the group.
                </p>
                <p className="bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent text-sm drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">
                  🎭 There are 3 modes:
                  <br /><b>Building</b> – wholesome, feel-good questions.
                  <br /><b>Burning</b> – spicy, savage, and dramatic.
                  <br /><b>Chaotic</b> – a mix of both.
                </p>
                <p className="bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent text-sm drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">
                  🪙 Tap the coin to flip:
                  <br /><b>TELL</b> – You must answer.
                  <br /><b>SAFE</b> – You're off the hook.
                </p>
                <p className="bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent text-sm drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">
                  💡 Tip: You can hide or show the question to keep things spicy.
                </p>
              </>
            ) : (
              <>
                <p className="bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent text-sm drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">
                  👯 Truth or Dare is a classic party game.
                </p>
                <p className="bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent text-sm drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">
                  🧠 A random prompt will appear each round.
                  <br />
                  🤔 Truths test honesty. Dares test courage.
                </p>
                <p className="bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent text-sm drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">
                  💡 Tip: Add your own custom prompts for extra spice!
                </p>
              </>
            )}

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
              <Button
                onClick={() => setShowInstructions(false)}
                className="text-xs px-3 py-1 font-pixel bg-orange-600 hover:bg-orange-400 text-white rounded shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80"
              >
                Return to Game
              </Button>
            </div>
          </Card>
        </div>
      ) : (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-2xl space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-center">
              <Button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 text-xs px-3 py-1 text-white font-bold rounded-md font-pixel shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80 bg-orange-600 hover:bg-orange-400"
              >
                <ArrowLeft className="h-4 w-4" /> Back to Menu
              </Button>
              <h1 className="text-4xl font-arcade text-center my-2 sm:my-4 bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(255,200,100,0.9)]">
                {gameTitle}
              </h1>
              <div className="flex gap-2">
                <Button
                  onClick={() => setShowInstructions(true)}
                  className="flex items-center gap-2 text-xs px-3 py-1 text-white font-bold rounded-md font-pixel shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80 bg-orange-600 hover:bg-orange-400"
                >
                  📖 Instructions
                </Button>
                <Button
                  onClick={() => navigate("/custom-questions")}
                  className="flex items-center gap-2 text-xs px-3 py-1 text-white font-bold rounded-md font-pixel shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80 bg-orange-600 hover:bg-orange-400"
                >
                  <Settings className="h-4 w-4" /> Manage Questions
                </Button>
              </div>
            </div>

            {mode === "bridges" && (
              <Card className="p-4 flex flex-col items-center justify-center text-center space-y-2">
                <Label className="mb-2 block text-sm font-pixel">Select Bridge Mode</Label>
                <div className="flex gap-4">
                  <Button
                    variant={bridgeMode === 'building' ? 'default' : 'outline'}
                    onClick={() => setBridgeMode('building')}
                    className="font-pixel text-xs px-3 py-1 shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80 border-orange-400 hover:bg-orange-300"
                  >
                    Building
                  </Button>
                  <Button
                    variant={bridgeMode === 'burning' ? 'default' : 'outline'}
                    onClick={() => setBridgeMode('burning')}
                    className="font-pixel text-xs px-3 py-1 shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80 border-orange-400 hover:bg-orange-300"
                  >
                    Burning
                  </Button>
                  <Button
                    variant={bridgeMode === 'chaotic' ? 'default' : 'outline'}
                    onClick={() => setBridgeMode('chaotic')}
                    className="font-pixel text-xs px-3 py-1 shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80 border-orange-400 hover:bg-orange-300"
                  >
                    Chaotic
                  </Button>
                </div>
              </Card>
            )}

            {mode === "bridges" ? (
              <Card className="p-4 flex flex-col items-center justify-center text-center space-y-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuestionHidden(prev => !prev)}
                  className="font-pixel text-xs px-3 py-1 shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80 border-orange-400 hover:bg-orange-300"
                >
                  {questionHidden ? "Show Question" : "Hide Question"}
                </Button>
                {!questionHidden ? (
                  currentQuestion ? (
                    <p className="text-base mt-4 font-pixel bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">{currentQuestion}</p>
                  ) : (
                    <p className="text-sm font-pixel bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">Click the button to start!</p>
                  )
                ) : null}
              </Card>
            ) : (
              <Card className="p-8 min-h-[300px] flex flex-col items-center justify-center text-center space-y-6">
                {currentQuestion ? (
                  <p className="text-base mt-4 font-pixel bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">
                    {currentQuestion}
                  </p>
                ) : (
                  <p className="text-sm font-pixel bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">Click the button to start!</p>
                )}
              </Card>
            )}

            {mode === "bridges" && (
              <Card className="p-4 flex flex-col items-center justify-center text-center space-y-4 font-pixel">
                <div
                  onClick={!isFlipping ? flipCoin : undefined}
                  className={`w-24 h-24 rounded-full border-4 border-primary flex items-center justify-center text-sm font-bold cursor-pointer transition-all duration-300 ${
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
                  <p className="text-xs animate-pulse font-pixel bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">
                    👆 Tap the coin to flip!
                  </p>
                )}

                {coinResult && !isFlipping && (
                  <div className="text-center mt-2">
                    <p className="text-lg font-bold font-pixel bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">
                      {coinResult === "TELL" ? "🗣️ TELL" : "🛡️ SAFE"}
                    </p>
                    <p className="text-xs max-w-sm font-pixel bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">
                      {coinResult === "TELL"
                        ? "You must tell the person you pointed at about the question!"
                        : "You're safe! No need to reveal anything."}
                    </p>
                  </div>
                )}
              </Card>
            )}

            <div className="flex justify-center">
              <Button onClick={() => { generateQuestion(); setCoinResult(null); }} disabled={isFlipping} className="text-xs px-3 py-1 font-pixel shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80">
                {currentQuestion ? "Next Question" : "Start Game"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Game;
