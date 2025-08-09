// src/pages/BattleRoyale.tsx
import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RefreshCw } from "lucide-react";
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

const MAX_PLAYERS = 18;
const MIN_PLAYERS = 2;

const BattleRoyale = () => {
  const navigate = useNavigate();

  const [gameStarted, setGameStarted] = useState(false);
  const [numPlayers, setNumPlayers] = useState(MIN_PLAYERS);
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [tempNames, setTempNames] = useState<string[]>([]);
  const [currentPrompt, setCurrentPrompt] = useState<string | null>(null);
  const [usedIndexes, setUsedIndexes] = useState<Set<number>>(new Set());

  // Virus state (single active at a time)
  const [activeVirus, setActiveVirus] = useState<VirusEffect | null>(null);
  const [virusRounds, setVirusRounds] = useState(0);            // how many normal prompts until virus ends
  const [virusOwner, setVirusOwner] = useState<string | null>(null);
  const [virusShown, setVirusShown] = useState(0);              // normal prompts shown since this virus started

  // Virus scheduling (multiple across the game, but never overlapping)
  const [virusSchedule, setVirusSchedule] = useState<number[]>([]); // normal-prompt counts when a virus starts
  const [virusesStarted, setVirusesStarted] = useState(0);
  const [usedVirusIds, setUsedVirusIds] = useState<Set<number>>(new Set());

  // Tracking how many NORMAL prompts have been shown (excludes virus prompt and activation lines)
  const [normalPromptCount, setNormalPromptCount] = useState(0);

  // Prompt history for back/forward
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1); // -1 == nothing yet

  // Keep currentPrompt in sync with history index
  useEffect(() => {
    if (historyIndex >= 0 && historyIndex < history.length) {
      setCurrentPrompt(history[historyIndex]);
    }
  }, [historyIndex, history]);

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

  // Inject actor/target into underscores (normal prompts)
  const injectPlayers = (text: string) => {
    if (!playerNames.length) return text;
    const actor = playerNames[Math.floor(Math.random() * playerNames.length)];
    const others = playerNames.filter((n) => n !== actor);
    const target = others.length
      ? others[Math.floor(Math.random() * others.length)]
      : actor;
    let count = 0;
    return text.replace(/_/g, () => (count++ === 0 ? actor : target));
  };

  // Inject with fixed virus owner for first underscore (state-based)
  const injectVirusText = (text: string) => {
    if (!playerNames.length) return text;
    const owner =
      virusOwner ?? playerNames[Math.floor(Math.random() * playerNames.length)];
    if (!virusOwner) setVirusOwner(owner);

    const others = playerNames.filter((n) => n !== owner);
    const target = others.length
      ? others[Math.floor(Math.random() * others.length)]
      : owner;

    let count = 0;
    return text.replace(/_/g, () => (count++ === 0 ? owner : target));
  };

  // Inject with provided owner and names (avoids any state race)
  const injectVirusTextWithOwner = (text: string, owner: string, names: string[]) => {
    const others = names.filter((n) => n !== owner);
    const target = others.length
      ? others[Math.floor(Math.random() * others.length)]
      : owner;
    let count = 0;
    return text.replace(/_/g, () => (count++ === 0 ? owner : target));
  };

  const pushToHistory = (msg: string) => {
    setHistory((prev) => {
      const next = prev.slice(0, historyIndex + 1); // truncate forward history if user went back
      next.push(msg);
      return next;
    });
    setHistoryIndex((idx) => idx + 1);
  };

  // Create a virus schedule: choose 3–4 triggers, spaced by 5–9 normal prompts each (first after 4–6)
  const makeVirusSchedule = () => {
    const count = Math.random() < 0.5 ? 3 : 4;
    const triggers: number[] = [];
    let nextAt = Math.floor(Math.random() * 3) + 4; // 4–6 normals before first virus
    for (let i = 0; i < count; i++) {
      triggers.push(nextAt);
      nextAt += Math.floor(Math.random() * 5) + 5; // add 5–9 normals between viruses
    }
    return triggers;
  };

  const startGame = () => {
    if (
      tempNames.length === numPlayers &&
      tempNames.every((n) => n.trim() !== "")
    ) {
      setPlayerNames(tempNames);
      setGameStarted(true);

      // reset all state for a fresh run
      setUsedIndexes(new Set());
      setHistory([]);
      setHistoryIndex(-1);
      setCurrentPrompt(null);

      setActiveVirus(null);
      setVirusRounds(0);
      setVirusOwner(null);
      setVirusShown(0);

      setVirusSchedule(makeVirusSchedule());
      setVirusesStarted(0);
      setUsedVirusIds(new Set());
      setNormalPromptCount(0);
    }
  };

  const handlePrev = () => {
    if (historyIndex > 0) {
      setHistoryIndex((i) => i - 1);
    }
  };

  const startNewVirusNow = () => {
    // choose a virus not used before if possible
    const availableIds = virusEffects
      .map((_, i) => i)
      .filter((i) => !usedVirusIds.has(i));
    const idx =
      availableIds.length > 0
        ? availableIds[Math.floor(Math.random() * availableIds.length)]
        : Math.floor(Math.random() * virusEffects.length);

    const virus = virusEffects[idx];
    const rounds = Math.floor(Math.random() * 6) + 3; // 3-8 normals until end
    const owner = playerNames[Math.floor(Math.random() * playerNames.length)];

    setActiveVirus(virus);
    setVirusRounds(rounds);
    setVirusOwner(owner);
    setVirusShown(0);
    setVirusesStarted((n) => n + 1);
    setUsedVirusIds((s) => new Set(s).add(idx));

    // Immediately show the virus prompt
    const virusText = `CURSE!: ${injectVirusTextWithOwner(
      virus.prompt,
      owner,
      playerNames
    )}`;
    pushToHistory(virusText);
  };

  const handleNext = () => {
    // If we have forward history (user pressed Back), go forward first
    if (historyIndex < history.length - 1) {
      setHistoryIndex((i) => i + 1);
      return;
    }

    // If a virus is active and its duration is done, end it now
    if (activeVirus && virusShown >= virusRounds) {
      const endText = 'CURSE LIFTED!: ' + injectVirusText(activeVirus.activation);
      
      pushToHistory(endText);
      setActiveVirus(null);
      // do NOT increment normalPromptCount here; this is an end message
      return;
    }

    // If no active virus, check if it's time to start one (based on schedule)
    if (
      !activeVirus &&
      virusesStarted < virusSchedule.length &&
      normalPromptCount >= virusSchedule[virusesStarted]
    ) {
      startNewVirusNow();
      return;
    }

    // Generate a normal prompt — no repeats for this game instance
    const idxList = allPrompts
      .map((_, i) => i)
      .filter((i) => !usedIndexes.has(i));
    if (idxList.length === 0) {
      pushToHistory("🎉 No more prompts. Game over.");
      return;
    }

    const choice = idxList[Math.floor(Math.random() * idxList.length)];
    setUsedIndexes((s) => new Set(s).add(choice));
    const gameText = injectPlayers(allPrompts[choice]);
    pushToHistory(`${gameText}`);

    // This was a NORMAL prompt; increment counters
    setNormalPromptCount((c) => c + 1);
    if (activeVirus) {
      setVirusShown((v) => v + 1);
    }
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
            [HOME]
          </Button>
          <h1 className="text-3xl font-arcade text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-400 drop-shadow-[0_0_6px_rgba(255,200,100,0.9)]">
            BATTLE ROYALE
          </h1>
          <div className="w-24" />
        </div>

        {!gameStarted ? (
          <Card className="p-6 bg-gradient-surface space-y-4 min-h-[420px]">
            <h2 className=" text-xl font-pixel bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">Add Players</h2>

            {/* Controls row stays fixed (sticky) */}
            <div className="sticky top-0 z-10 bg-gradient-surface/90 backdrop-blur supports-[backdrop-filter]:bg-gradient-surface/60 border-b pb-3">
              <div className="flex items-center justify-between font-pixel text-white">
                <span>Number of players:</span>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => {
                      if (numPlayers > MIN_PLAYERS) {
                        const val = numPlayers - 1;
                        setNumPlayers(val);
                        setTempNames((prev) => prev.slice(0, val));
                      }
                    }}
                    className="px-2 py-1 text-xs font-pixel bg-orange-600 hover:bg-orange-400 text-white rounded shrink-0"
                  >
                    −
                  </Button>
                  <span className="w-8 text-center select-none">
                    {numPlayers}
                  </span>
                  <Button
                    onClick={() => {
                      if (numPlayers < MAX_PLAYERS) {
                        const val = numPlayers + 1;
                        setNumPlayers(val);
                        setTempNames((prev) => [...prev, ""]);
                      }
                    }}
                    className="px-2 py-1 text-xs font-pixel bg-orange-600 hover:bg-orange-400 text-white rounded shrink-0"
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>

            {/* Scrollable inputs list so the controls don't move */}
            <div className="h-64 md:h-72 overflow-y-auto pr-1 space-y-2">
              {Array.from({ length: numPlayers }).map((_, i) => (
                <input
                  key={i}
                  type="text"
                  placeholder={`Player ${i + 1}`}
                  value={tempNames[i] || ""}
                  onChange={(e) => {
                    const copy = [...tempNames];
                    copy[i] = e.target.value;
                    setTempNames(copy);
                  }}
                  className="w-full border rounded p-2 font-pixel text-black"
                />
              ))}
            </div>

            <Button
              onClick={startGame}
              className="w-full text-xs font-pixel text-white bg-orange-600 hover:bg-orange-400 rounded py-1"
            >
              Start Game
            </Button>
          </Card>
        ) : (
          <Card className="p-6 bg-gradient-surface text-center space-y-4">
            <h2 className="text-xl font-pixel bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">Current Prompt</h2>

            {/* Locked height so Next row doesn't shift */}
            <div
              className="bg-black bg-opacity-60 text-white p-10 rounded-lg font-pixel text-lg font-bold
             h-72 md:h-80 overflow-y-auto flex items-center justify-center text-center
             whitespace-pre-wrap"
            >
              <span className="block">
                {currentPrompt || "Press Next to start!"}
              </span>
            </div>

            <div className="flex justify-center gap-2">
              {/* Back button goes to previous prompt in history */}
              <Button
                onClick={handlePrev}
                disabled={historyIndex <= 0}
                className="text-xs font-pixel text-white bg-orange-600 hover:bg-orange-400 disabled:opacity-50 rounded py-1 px-3 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>

              <Button
                onClick={handleNext}
                className="text-xs font-pixel text-white bg-orange-600 hover:bg-orange-400 rounded py-1 px-3 flex items-center gap-2"
              >
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