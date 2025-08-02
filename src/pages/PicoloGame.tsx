// PicoloGame.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Eye, EyeOff, RefreshCw } from "lucide-react";

const MAX_PLAYERS = 20;
const MIN_PLAYERS = 2;

const promptsData = [
  { text: "{{player}}, what's your guilty pleasure?", type: "truth", category: "mild" },
  { text: "{{player}}, call your ex or drink 3 sips.", type: "dare", category: "spicy" },
  { text: "Everyone who's single drinks 1 sip.", type: "group", category: "mild" },
  { text: "{{player}}, compliment {{random_player}} sincerely or take 2 sips.", type: "dare", category: "mild" },
  { text: "{{player}}, confess your first impression of {{random_player}}.", type: "truth", category: "mild" },
  { text: "{{player}}, do your best impression of {{random_player}}.", type: "challenge", category: "mild" },
  { text: "{{player}}, bark before every sentence or drink twice.", type: "rule", category: "spicy" }
];

const categories = {
  truth: "bg-blue-500",
  dare: "bg-red-500",
  group: "bg-green-500",
  challenge: "bg-yellow-500",
  rule: "bg-purple-500"
};

const PicoloGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [numPlayers, setNumPlayers] = useState(MIN_PLAYERS);
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [tempNames, setTempNames] = useState<string[]>([]);
  const [currentPrompt, setCurrentPrompt] = useState<string | null>(null);
  const [usedIndexes, setUsedIndexes] = useState<Set<number>>(new Set());
  const [showPrompt, setShowPrompt] = useState(true);
  const [mode] = useState<"mild" | "spicy" | "insane">("mild");  // default mode

  const startGame = () => {
    if (tempNames.length === numPlayers && tempNames.every((n) => n.trim() !== "")) {
      setPlayerNames(tempNames);
      setGameStarted(true);
    }
  };

  const getRandomPrompt = () => {
    const filtered = promptsData.filter((p) => p.category === mode || mode === "insane");
    const availableIndexes = filtered.map((_, i) => i).filter((i) => !usedIndexes.has(i));

    if (availableIndexes.length === 0) {
      setUsedIndexes(new Set());
      setCurrentPrompt("🎉 All prompts used! Restarting...");
      return;
    }

    const randomIdx = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
    const prompt = filtered[randomIdx];

    const randomPlayer = () => playerNames[Math.floor(Math.random() * playerNames.length)];
    const p = randomPlayer();
    const otherPlayers = playerNames.filter((n) => n !== p);
    const rp = otherPlayers[Math.floor(Math.random() * otherPlayers.length)];

    const finalText = prompt.text
      .replace(/{{player}}/g, p)
      .replace(/{{random_player}}/g, rp)
      .replace(/{{all_players}}/g, playerNames.join(", "))
      .replace(/{{others}}/g, otherPlayers.join(", "));

    setUsedIndexes(new Set(usedIndexes).add(randomIdx));
    setCurrentPrompt(finalText);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
      <div className="w-full max-w-xl space-y-6">
        {/* header */}
        <div className="flex items-center justify-between">
          <Button
            onClick={() => (window.location.href = "/")}
            className="text-xs px-3 py-1 font-pixel text-white bg-orange-600 hover:bg-orange-400 rounded shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80 flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            [BACK] Menu
          </Button>
          <h1 className="text-3xl font-arcade text-center my-2 sm:my-4 bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(255,200,100,0.9)]">PICOLO MODE</h1>
          <div className="w-24" />
        </div>

        {/* setup or game screen */}
        {!gameStarted ? (
          <Card className="p-6 bg-gradient-surface space-y-4">
            <h2 className="text-xl font-semibold font-pixel">Add Players</h2>
            <div className="flex gap-2 items-center">
              <span className="font-pixel">Number of players:</span>
              <input
                type="number"
                min={MIN_PLAYERS}
                max={MAX_PLAYERS}
                value={numPlayers}
                onChange={(e) => {
                  const val = Math.min(MAX_PLAYERS, Math.max(MIN_PLAYERS, Number(e.target.value)));
                  setNumPlayers(val);
                  setTempNames(Array(val).fill(""));
                }}
                className="border px-2 py-1 w-16 rounded font-pixel text-black"
              />
            </div>

            {Array.from({ length: numPlayers }).map((_, idx) => (
              <input
                key={idx}
                type="text"
                placeholder={`Player ${idx + 1}`}
                value={tempNames[idx] || ""}
                onChange={(e) => {
                  const updated = [...tempNames];
                  updated[idx] = e.target.value;
                  setTempNames(updated);
                }}
                className="w-full border rounded p-2 font-pixel text-black"
              />
            ))}

            <Button onClick={startGame} className="w-full mt-2 text-xs px-3 py-1 font-pixel text-white bg-orange-600 hover:bg-orange-400 rounded shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80">
              Start Game
            </Button>
          </Card>
        ) : (
          <Card className="bg-gradient-surface border-border shadow-card p-6 text-center space-y-4">
            <h2 className="text-xl font-semibold font-pixel">Current Prompt</h2>
            {showPrompt ? (
              <div
                className={`rounded-lg p-6 text-lg font-bold font-pixel text-white ${
                  categories[
                    (currentPrompt &&
                      (Object.keys(categories) as (keyof typeof categories)[]).find((t) =>
                        currentPrompt.toLowerCase().includes(t)
                      )) ||
                      "truth"
                  ]
                }`}
              >
                {currentPrompt || "Press Next to start!"}
              </div>
            ) : (
              <div className="text-muted-foreground italic font-pixel">Prompt is hidden</div>
            )}
            <div className="flex gap-2 justify-center">
              <Button onClick={() => setShowPrompt(!showPrompt)} className="text-xs px-3 py-1 font-pixel text-white bg-orange-600 hover:bg-orange-400 rounded shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80">
                {showPrompt ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                {showPrompt ? "Hide" : "Show"}
              </Button>
              <Button onClick={getRandomPrompt} className="text-xs px-3 py-1 font-pixel text-white bg-orange-600 hover:bg-orange-400 rounded shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80">
                <RefreshCw className="w-4 h-4 mr-2" />
                Next
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PicoloGame;