// src/pages/BattleRoyale.tsx
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Eye, EyeOff, RefreshCw } from "lucide-react";
import {
  regularPrompts,
  circleNamingGames,
  memoryChainGames,
  charadeActionJokeGames,
  virusEffects,
  splitTheRoomQuestions,
  bets
} from "@/data/picolo";
import type { VirusEffect } from "@/data/picolo";

const MAX_PLAYERS = 20;
const MIN_PLAYERS = 2;

const BattleRoyale = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [numPlayers, setNumPlayers] = useState(MIN_PLAYERS);
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [tempNames, setTempNames] = useState<string[]>([]);
  const [currentPrompt, setCurrentPrompt] = useState<string | null>(null);
  const [usedIndexes, setUsedIndexes] = useState<Set<number>>(new Set());
  const [showPrompt, setShowPrompt] = useState(true);
  const [activeVirus, setActiveVirus] = useState<VirusEffect | null>(null);
  const [virusRounds, setVirusRounds] = useState(0);

  // Combine all prompts
  const allPrompts = useMemo(
    () => [
      ...regularPrompts,
      ...circleNamingGames,
      ...memoryChainGames,
      ...charadeActionJokeGames,
      ...splitTheRoomQuestions,
      ...bets
    ],
    []
  );

  // Inject actor/target into underscores
  const injectPlayers = (text: string) => {
    const actor = playerNames[Math.floor(Math.random() * playerNames.length)];
    const others = playerNames.filter((n) => n !== actor);
    const target = others.length
      ? others[Math.floor(Math.random() * others.length)]
      : actor;
    let count = 0;
    return text.replace(/_/g, () => (count++ === 0 ? actor : target));
  };

  const startGame = () => {
    if (tempNames.length === numPlayers && tempNames.every((n) => n.trim() !== "")) {
      setPlayerNames(tempNames);
      setGameStarted(true);
      // pick a random virus
      const virus = virusEffects[Math.floor(Math.random() * virusEffects.length)];
      const rounds = Math.floor(Math.random() * 6) + 3; // 3-8
      setActiveVirus(virus);
      setVirusRounds(rounds);
    }
  };

  const getRandomPrompt = () => {
    // virus phase
    if (activeVirus) {
      if (virusRounds > 0) {
        // inject and prefix
        const base = injectPlayers(activeVirus.prompt);
        setCurrentPrompt(`VIRUS: ${base}`);
        setVirusRounds((r) => r - 1);
      } else {
        // Virus ended, show activation message
        setCurrentPrompt(`VIRUS: ${injectPlayers(activeVirus.activation)}`);
        setActiveVirus(null);
      }
      return;
    }

    // normal prompts
    const available = allPrompts.filter((_, i) => !usedIndexes.has(i));
    if (available.length === 0) {
      setUsedIndexes(new Set());
      setCurrentPrompt("🎉 All prompts used! Restarting...");
      return;
    }
    const idxList = allPrompts.map((_, i) => i).filter((i) => !usedIndexes.has(i));
    const choice = idxList[Math.floor(Math.random() * idxList.length)];
    setUsedIndexes((s) => new Set(s).add(choice));
    const gameText = injectPlayers(allPrompts[choice]);
    setCurrentPrompt(`GAME: ${gameText}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
      <div className="w-full max-w-xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            onClick={() => (window.location.href = "/")}
            className="flex items-center gap-2 text-xs px-3 py-1 font-pixel text-white bg-orange-600 hover:bg-orange-400 rounded shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80"
          >
            <ArrowLeft className="h-4 w-4" />
            [BACK]
          </Button>
          <h1 className="text-3xl font-arcade text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-400 drop-shadow-[0_0_6px_rgba(255,200,100,0.9)]">
            BATTLE ROYALE
          </h1>
          <div className="w-24" />
        </div>

        {!gameStarted ? (
          <Card className="p-6 bg-gradient-surface space-y-4">
            <h2 className="text-xl font-pixel">Add Players</h2>
            <div className="flex gap-2 items-center font-pixel">
              <span>Number of players:</span>
              <input
                type="number"
                min={MIN_PLAYERS}
                max={MAX_PLAYERS}
                value={numPlayers}
                onChange={(e) => {
                  const val = Math.max(MIN_PLAYERS, Math.min(MAX_PLAYERS, Number(e.target.value)));
                  setNumPlayers(val);
                  setTempNames(Array(val).fill(""));
                }}
                className="w-16 border rounded px-2 py-1 text-black"
              />
            </div>
            {Array.from({ length: numPlayers }).map((_, i) => (
              <input
                key={i}
                type="text"
                placeholder={`Player ${i+1}`}
                value={tempNames[i] || ""}
                onChange={(e) => {
                  const copy = [...tempNames]; copy[i] = e.target.value; setTempNames(copy);
                }}
                className="w-full border rounded p-2 font-pixel text-black"
              />
            ))}
            <Button onClick={startGame} className="w-full text-xs font-pixel text-white bg-orange-600 hover:bg-orange-400 rounded py-1">
              Start Game
            </Button>
          </Card>
        ) : (
          <Card className="p-6 bg-gradient-surface text-center space-y-4">
            <h2 className="text-xl font-pixel">Current Prompt</h2>
            {showPrompt ? (
              <div className="bg-blue-500 text-white p-6 rounded-lg font-pixel text-lg font-bold">
                {currentPrompt || "Press Next to start!"}
              </div>
            ) : (
              <div className="italic text-muted-foreground font-pixel">Prompt hidden</div>
            )}
            <div className="flex justify-center gap-2">
              <Button onClick={() => setShowPrompt((s) => !s)} className="text-xs font-pixel text-white bg-orange-600 hover:bg-orange-400 rounded py-1 px-3 flex items-center gap-2">
                {showPrompt ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showPrompt ? "Hide" : "Show"}
              </Button>
              <Button onClick={getRandomPrompt} className="text-xs font-pixel text-white bg-orange-600 hover:bg-orange-400 rounded py-1 px-3 flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Next
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BattleRoyale;