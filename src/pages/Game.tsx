import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";

interface CustomQuestion {
  question: string;
  type: "truth" | "dare";
}

const truths = [
  "What's your biggest fear?",
  "What's the most embarrassing thing you've ever done?",
  "What's a secret you've never told anyone?",
  "Who was your first crush?",
  "What is your guilty pleasure?",
];

const dares = [
  "Do 10 jumping jacks.",
  "Sing a song loudly.",
  "Do your best dance move.",
  "Speak in an accent for the next round.",
  "Act like a celebrity until your next turn.",
];

const bridgeQuestions = [
  "Share a time you overcame a challenge.",
  "What's one thing you want to accomplish this year?",
  "Describe a moment you felt truly happy.",
  "What's a lesson you've learned from a mistake?",
  "Who inspires you the most and why?",
];

function getRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const coinSides = ["Heads", "Tails"];

const Game = () => {
  const { mode } = useParams<{ mode: string }>();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [currentType, setCurrentType] = useState<"truth" | "dare" | "bridge" | "">("");
  const [customQuestions, setCustomQuestions] = useState<CustomQuestion[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [inputType, setInputType] = useState<"truth" | "dare">("truth");
  const [coinResult, setCoinResult] = useState<string | null>(null);
  const [showCoin, setShowCoin] = useState(false);

  useEffect(() => {
    if (mode === "bridges") {
      setCurrentType("bridge");
      setCurrentQuestion(getRandom(bridgeQuestions));
    } else if (mode === "truth-or-dare") {
      setCurrentType(Math.random() < 0.5 ? "truth" : "dare");
      generateQuestion(Math.random() < 0.5 ? "truth" : "dare");
    }
  // eslint-disable-next-line
  }, [mode]);

  const generateQuestion = (type: "truth" | "dare") => {
    setCurrentType(type);
    const custom = customQuestions.filter(q => q.type === type);
    let pool = type === "truth" ? truths : dares;
    if (custom.length > 0) {
      pool = pool.concat(custom.map(q => q.question));
    }
    setCurrentQuestion(getRandom(pool));
    setShowCoin(false);
    setCoinResult(null);
  };

  const addCustomQuestion = () => {
    if (inputValue.trim()) {
      setCustomQuestions(prev => [...prev, { question: inputValue.trim(), type: inputType }]);
      setInputValue("");
    }
  };

  const flipCoin = () => {
    setShowCoin(true);
    setCoinResult(getRandom(coinSides));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate("/")} className="flex items-center gap-2 hover:bg-secondary">
            <ArrowLeft className="h-4 w-4" /> Back to Menu
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {mode === "bridges" ? "Bridges" : "Truth or Dare"}
          </h1>
          <div className="w-10" />
        </div>

        {mode === "bridges" && (
          <Card className="p-8 text-center space-y-6">
            <h2 className="text-2xl font-bold mb-4">Bridge Question</h2>
            <div className="text-lg mb-4">{currentQuestion}</div>
            <Button onClick={() => setCurrentQuestion(getRandom(bridgeQuestions))}>Next Question</Button>
          </Card>
        )}

        {mode === "truth-or-dare" && (
          <Card className="p-8 text-center space-y-6">
            <h2 className="text-2xl font-bold mb-4">
              {currentType === "truth" ? "Truth" : "Dare"}
            </h2>
            <div className="text-lg mb-4">{currentQuestion}</div>
            <div className="flex justify-center gap-4 mb-4">
              <Button variant={currentType === "truth" ? "default" : "outline"} onClick={() => generateQuestion("truth")}>
                Truth
              </Button>
              <Button variant={currentType === "dare" ? "default" : "outline"} onClick={() => generateQuestion("dare")}>
                Dare
              </Button>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-2">
                <Input
                  placeholder={`Add a custom ${inputType}...`}
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && addCustomQuestion()}
                />
                <select
                  className="border rounded px-2 py-1"
                  value={inputType}
                  onChange={e => setInputType(e.target.value as "truth" | "dare")}
                >
                  <option value="truth">Truth</option>
                  <option value="dare">Dare</option>
                </select>
                <Button onClick={addCustomQuestion} disabled={!inputValue}>Add</Button>
              </div>
              {customQuestions.length > 0 && (
                <div className="text-xs mt-2 text-muted-foreground">
                  {customQuestions.length} custom {customQuestions.length === 1 ? "question" : "questions"} added
                </div>
              )}
            </div>
            <div className="pt-6">
              <Button variant="secondary" onClick={flipCoin}>Flip Coin</Button>
              {showCoin && coinResult && (
                <div className="mt-2 text-lg font-semibold">{coinResult}!</div>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Game;
