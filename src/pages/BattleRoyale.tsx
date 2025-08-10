// src/pages/BattleRoyale.tsx
import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RefreshCw } from "lucide-react";

const MAX_PLAYERS = 18;
const MIN_PLAYERS = 2;
const MAX_TURNS = 50; // end after 50 normal prompts (turns)

type Stage = "players" | "category" | "playing";
type CategoryKey = "classic" |  "chaotic" | "boysnight" | "girlsnight" ; // extend with new categories

export interface VirusEffect {
  prompt: string;
  activation: string;
}

type PromptModule = {
  regularPrompts: string[];
  circleNamingGames: string[];
  memoryChainGames: string[];
  charadeActionJokeGames: string[];
  splitTheRoomQuestions: string[];
  bets: string[];
  virusEffects: VirusEffect[];
};

const loaders: Record<CategoryKey, () => Promise<PromptModule>> = {
  classic: () => import("@/data/br/classic") as unknown as Promise<PromptModule>,
  boysnight: () => import("@/data/br/boysnight") as unknown as Promise<PromptModule>,
  chaotic: () => import("@/data/br/chaotic") as unknown as Promise<PromptModule>,
  girlsnight: () => import("@/data/br/girlsnight") as unknown as Promise<PromptModule>
};

const BattleRoyale = () => {
  // Flow
  const [stage, setStage] = useState<Stage>("players");
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | null>(null);
  const [isLoadingPack, setIsLoadingPack] = useState(false);

  // Loaded prompts pack (depends on selectedCategory)
  const [pack, setPack] = useState<PromptModule | null>(null);

  // Setup
  const [numPlayers, setNumPlayers] = useState(MIN_PLAYERS);
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [tempNames, setTempNames] = useState<string[]>([]);

  // Turn management (randomized order each round)
  const [turnOrder, setTurnOrder] = useState<string[]>([]);
  const [turnIndex, setTurnIndex] = useState<number>(0);

  // Prompt state
  const [currentPrompt, setCurrentPrompt] = useState<string | null>(null);
  const [usedIndexes, setUsedIndexes] = useState<Set<number>>(new Set());
  const [normalPromptCount, setNormalPromptCount] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  // Virus state (single active at a time)
  const [activeVirus, setActiveVirus] = useState<VirusEffect | null>(null);
  const [virusRounds, setVirusRounds] = useState(0);
  const [virusOwner, setVirusOwner] = useState<string | null>(null);
  const [virusShown, setVirusShown] = useState(0);

  // Virus scheduling
  const [virusSchedule, setVirusSchedule] = useState<number[]>([]);
  const [virusesStarted, setVirusesStarted] = useState(0);
  const [usedVirusIds, setUsedVirusIds] = useState<Set<number>>(new Set());

  // Prompt history for back/forward
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1); // -1 == nothing yet

  // Keep currentPrompt in sync with history index
  useEffect(() => {
    if (historyIndex >= 0 && historyIndex < history.length) {
      setCurrentPrompt(history[historyIndex]);
    }
  }, [historyIndex, history]);

  // Combine prompts from the loaded pack
  const allPrompts = useMemo(() => {
    if (!pack) return [];
    return [
      ...pack.regularPrompts,
      ...pack.circleNamingGames,
      ...pack.memoryChainGames,
      ...pack.charadeActionJokeGames,
      ...pack.splitTheRoomQuestions,
      ...pack.bets,
    ];
  }, [pack]);

  // Utils
  const shuffle = (arr: string[]) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const currentPlayer = () =>
    turnOrder.length > 0 ? turnOrder[turnIndex] : null;

  const advanceTurn = () => {
    if (turnOrder.length === 0) return;
    const nextIndex = turnIndex + 1;
    if (nextIndex >= turnOrder.length) {
      // new round → reshuffle order
      setTurnOrder(shuffle(playerNames));
      setTurnIndex(0);
    } else {
      setTurnIndex(nextIndex);
    }
  };

  const pushToHistory = (msg: string) => {
    setHistory((prev) => {
      const next = prev.slice(0, historyIndex + 1); // truncate forward history if user went back
      next.push(msg);
      return next;
    });
    setHistoryIndex((idx) => idx + 1);
  };

  // Inject actor/target into underscores, ensuring the first two are distinct (actor != target)
  const injectPlayersFor = (text: string, actor: string) => {
    if (!playerNames.length) return text;

    const others = playerNames.filter((n) => n !== actor);
    let lastAssigned: string | null = null;
    let count = 0;

    return text.replace(/_/g, () => {
      let nameToUse: string;

      if (count === 0) {
        nameToUse = actor; // first underscore is the turn owner
      } else if (count === 1) {
        nameToUse = others.length > 0
          ? others[Math.floor(Math.random() * others.length)]
          : actor; // edge-case single player
      } else {
        const pool = playerNames.length > 1
          ? playerNames.filter((n) => n !== lastAssigned)
          : playerNames;
        nameToUse = pool[Math.floor(Math.random() * pool.length)];
      }

      lastAssigned = nameToUse;
      count++;
      return nameToUse;
    });
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

  // Create a virus schedule
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

  // Flow actions
  const confirmPlayers = () => {
    if (
      tempNames.length === numPlayers &&
      tempNames.every((n) => n.trim() !== "")
    ) {
      const trimmed = tempNames.map(n => n.trim());
      setPlayerNames(trimmed);
      setStage("category"); // go choose category next
    }
  };

  const startNewGame = async (category: CategoryKey) => {
    setSelectedCategory(category);
    setIsLoadingPack(true);

    // Load the pack dynamically based on category
    const mod = await loaders[category]();
    setPack(mod);

    // reset all state for a fresh run
    setUsedIndexes(new Set());
    setHistory([]);
    setHistoryIndex(-1);
    setCurrentPrompt(null);
    setIsGameOver(false);

    setActiveVirus(null);
    setVirusRounds(0);
    setVirusOwner(null);
    setVirusShown(0);

    setVirusSchedule(makeVirusSchedule());
    setVirusesStarted(0);
    setUsedVirusIds(new Set());
    setNormalPromptCount(0);

    // set randomized order for first round
    setTurnOrder(shuffle(playerNames));
    setTurnIndex(0);

    setIsLoadingPack(false);
    setStage("playing");
  };

  const handlePrev = () => {
    if (historyIndex > 0) {
      setHistoryIndex((i) => i - 1);
    }
  };

  const startNewVirusNow = () => {
    if (!pack || pack.virusEffects.length === 0) return;

    const availableIds = pack.virusEffects
      .map((_, i) => i)
      .filter((i) => !usedVirusIds.has(i));
    const idx =
      availableIds.length > 0
        ? availableIds[Math.floor(Math.random() * availableIds.length)]
        : Math.floor(Math.random() * pack.virusEffects.length);

    const virus = pack.virusEffects[idx];
    const rounds = Math.floor(Math.random() * 6) + 3; // 3-8 normals until end

    // Tie virus owner to the current player's turn (fairness)
    const owner = currentPlayer() ?? playerNames[Math.floor(Math.random() * playerNames.length)];

    setActiveVirus(virus);
    setVirusRounds(rounds);
    setVirusOwner(owner);
    setVirusShown(0);
    setVirusesStarted((n) => n + 1);
    setUsedVirusIds((s) => new Set(s).add(idx));

    // Immediately show the virus prompt (does NOT consume a normal turn)
    const virusText = `CURSE!: ${injectVirusTextWithOwner(
      virus.prompt,
      owner,
      playerNames
    )}`;
    pushToHistory(virusText);
  };

  const handleNext = () => {
    if (stage !== "playing" || isGameOver || !pack) return;

    // If we have forward history (user pressed Back), go forward first
    if (historyIndex < history.length - 1) {
      setHistoryIndex((i) => i + 1);
      return;
    }

    // If we already hit max turns, finalize
    if (normalPromptCount >= MAX_TURNS) {
      if (!isGameOver) {
        pushToHistory("🎉 50 prompts reached. Game over.");
        setIsGameOver(true);
      }
      return;
    }

    // End active virus (does not consume a normal turn)
    if (activeVirus && virusShown >= virusRounds) {
      const endText = 'CURSE LIFTED!: ' + injectVirusText(activeVirus.activation);
      pushToHistory(endText);
      setActiveVirus(null);
      return;
    }

    // Maybe start a virus (does not consume a normal turn)
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
      pushToHistory("🎉 No more prompts in this category. Game over.");
      setIsGameOver(true);
      return;
    }

    // Determine whose turn it is (this player will occupy the first "_" slot)
    const actor = currentPlayer() ?? playerNames[Math.floor(Math.random() * playerNames.length)];

    // Pick a prompt
    const choice = idxList[Math.floor(Math.random() * idxList.length)];
    setUsedIndexes((s) => new Set(s).add(choice));

    // Inject names, ensuring two-player prompts `_,_` use distinct names
    const textWithNames = injectPlayersFor(allPrompts[choice], actor);

    pushToHistory(textWithNames);

    // This was a NORMAL prompt; increment counters and advance turn
    setNormalPromptCount((c) => c + 1);
    if (activeVirus) {
      setVirusShown((v) => v + 1);
    }
    advanceTurn();

    // End if we just hit max turns
    if (normalPromptCount + 1 >= MAX_TURNS) {
      pushToHistory("🎉 50 prompts reached. Game over.");
      setIsGameOver(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
      <div className="w-full max-w-xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            onClick={() => (window.location.href = "/")}
            className="h-10 w-10 p-0 bg-orange-600 hover:bg-orange-400 rounded-lg shadow-md shadow-yellow-300/60 hover:shadow-lg hover:shadow-yellow-300/90 flex items-center justify-center"
            aria-label="Back to Menu"
          >
            <ArrowLeft className="h-5 w-5 text-black" />
          </Button>
          <h1 className="text-3xl font-arcade text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-400 drop-shadow-[0_0_6px_rgba(255,200,100,0.9)]">
            BATTLE ROYALE
          </h1>
          <div className="w-24" />
        </div>

        {stage === "players" && (
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
              onClick={confirmPlayers}
              className="w-full text-xs font-pixel text-white bg-orange-600 hover:bg-orange-400 rounded py-1"
            >
              Continue
            </Button>
          </Card>
        )}

        {stage === "category" && (
          <Card className="p-6 bg-gradient-surface space-y-4 min-h-[300px]">
            <h2 className=" text-xl font-pixel bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">
              Choose a Category
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button
                onClick={() => startNewGame("classic")}
                className="w-full text-sm font-pixel text-white bg-orange-600 hover:bg-orange-400 rounded py-3"
              >
                Classic
              </Button>

              <Button
                onClick={() => startNewGame("chaotic")}
                className="w-full text-sm font-pixel text-white bg-orange-600 hover:bg-orange-400 rounded py-3"
              >
              CHAOTIC (18+)
              </Button>

              <Button
                onClick={() => startNewGame("boysnight")}
                className="w-full text-sm font-pixel text-white bg-orange-600 hover:bg-orange-400 rounded py-3"
              >
                Boy&apos;s Night
              </Button>

               <Button
                onClick={() => startNewGame("girlsnight")}
                className="w-full text-sm font-pixel text-white bg-orange-600 hover:bg-orange-400 rounded py-3"
              >
                Girl&apos;s Night
              </Button>

              
            </div>

            <div className="flex justify-between pt-2">
              <Button
                onClick={() => setStage("players")}
                className="text-xs font-pixel text-white bg-orange-600 hover:bg-orange-400 rounded py-1 px-3 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            </div>
          </Card>
        )}

        {stage === "playing" && (
          <Card className="p-6 bg-gradient-surface text-center space-y-4">
            <div className="flex items-center justify-between text-xs font-pixel text-white/80">
              {selectedCategory && (
                <div className="text-left text-xl font-pixel bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">
                  {selectedCategory.toUpperCase()}
                </div>
              )}
              <div className="text-right">
                Round: {normalPromptCount}/{MAX_TURNS}
              </div>
            </div>

            <div
              className="bg-black bg-opacity-60 text-white p-10 rounded-lg font-pixel text-lg font-bold
             h-72 md:h-80 overflow-y-auto flex items-center justify-center text-center
             whitespace-pre-wrap"
            >
              <span className="block">
                {isLoadingPack
                  ? "Loading prompts..."
                  : currentPrompt || "Press Next to start!"}
              </span>
            </div>

            <div className="flex justify-center gap-2">
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
                disabled={isGameOver || isLoadingPack || !pack}
                className="text-xs font-pixel text-white bg-orange-600 hover:bg-orange-400 disabled:opacity-50 rounded py-1 px-3 flex items-center gap-2"
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