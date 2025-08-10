

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { categories, type CategoryKey } from "@/data/iow";

// -------- Types --------
type TeamId = "A" | "B";
type Round = 1 | 2 | 3;

interface Settings {
  teamAName: string;
  teamBName: string;
  timerSeconds: number; // per turn
  allowSkips: boolean;
  selectedCategories: CategoryKey[];
  cardCount: number;
}

interface CardItem {
  id: string;
  text: string;
  category: CategoryKey;
}

interface Scores {
  A: number;
  B: number;
}

// -------- Utils --------
const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const slug = (s: string) => s.toLowerCase().replace(/\s+/g, "-");
const prettyCategory = (k: CategoryKey) =>
  k.replace(/([A-Z])/g, " $1").replace(/^./, c => c.toUpperCase());

// -------- LocalStorage Keys --------
const LS_SETTINGS = "iow.settings";
const LS_STATE = "iow.state";

// -------- Page Component --------
const InOtherWords = () => {
type Stage = "settings" | "turnIntro" | "playing" | "turnSummary" | "roundEnd" | "final";

  const [stage, setStage] = useState<Stage>("settings");

  // Settings
  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem(LS_SETTINGS);
    if (saved) return JSON.parse(saved) as Settings;
    return {
      teamAName: "Team A",
      teamBName: "Team B",
      timerSeconds: 60,
      allowSkips: true,
      selectedCategories: ["internetSlang" as CategoryKey],
      cardCount: 50,
    };
  });

  // Game state
  const [round, setRound] = useState<Round>(1);
  const [currentTeam, setCurrentTeam] = useState<TeamId>("A");
  const [deck, setDeck] = useState<CardItem[]>([]);
  const [discard, setDiscard] = useState<CardItem[]>([]);
  const [scores, setScores] = useState<Scores>({ A: 0, B: 0 });
  const [currentCard, setCurrentCard] = useState<CardItem | null>(null);
  const [cardsLeft, setCardsLeft] = useState<number>(0);

  // Timer
  const [timeLeft, setTimeLeft] = useState<number>(settings.timerSeconds);
  const timerRef = useRef<number | null>(null);
  const endTsRef = useRef<number>(0);

  // Persist settings
  useEffect(() => {
    localStorage.setItem(LS_SETTINGS, JSON.stringify(settings));
  }, [settings]);

  // Build deck from categories
  const buildDeck = (cats: CategoryKey[], count: number): CardItem[] => {
    const pool: CardItem[] = cats.flatMap((cat) =>
      categories[cat].map((text) => ({ id: `${cat}:${slug(text)}`, text, category: cat }))
    );
    const unique = Array.from(new Map(pool.map((c) => [c.id, c])).values());
    return shuffle(unique).slice(0, Math.min(count, unique.length));
  };

  // Round rule text
  const ruleText = useMemo(() => {
    if (round === 1) return "Round 1 – Describe (no names or exact rhymes)";
    if (round === 2) return "Round 2 – One word only";
    return "Round 3 – Charades only (no words/sounds)";
  }, [round]);

  // Start Game
  const startGame = () => {
    const deckBuilt = buildDeck(settings.selectedCategories, settings.cardCount);
    if (deckBuilt.length < settings.cardCount) {
      alert("Not enough unique cards in chosen categories to reach the requested card count.");
      return;
    }
    setDeck(deckBuilt);
    setDiscard([]);
    setScores({ A: 0, B: 0 });
    setRound(1);
    setCurrentTeam("A");
    setCurrentCard(null);
    setTimeLeft(settings.timerSeconds);
    setCardsLeft(deckBuilt.length);
    setStage("turnIntro");
  };

  // Turn control
const beginTurn = () => {
  setTimeLeft(settings.timerSeconds);
  setStage("playing");
  startCountdown();
};

const handleEndGame = () => {
  // clear local storage
  localStorage.removeItem(LS_STATE);
  localStorage.removeItem(LS_SETTINGS);

  // reset in-memory state
  setRound(1);
  setCurrentTeam("A");
  setDeck([]);
  setDiscard([]);
  setScores({ A: 0, B: 0 });
  setCurrentCard(null);
  setTimeLeft(60);
  setCardsLeft(0);
  setSettings({
    teamAName: "Team A",
    teamBName: "Team B",
    timerSeconds: 60,
    allowSkips: true,
    selectedCategories: ["internetSlang" as CategoryKey],
    cardCount: 50,
  });
  setStage("settings");
};


  const startCountdown = () => {
    // drift-corrected countdown
    endTsRef.current = Date.now() + settings.timerSeconds * 1000;
    setTimeLeft(settings.timerSeconds);
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      const ms = Math.max(0, endTsRef.current - Date.now());
      const s = Math.ceil(ms / 1000);
      setTimeLeft(s);
      if (ms <= 0) {
        window.clearInterval(timerRef.current!);
        timerRef.current = null;
        endTurn();
      } else if (s === 10) {
        // subtle vibration cue on supported devices
        (navigator as any).vibrate?.(60);
      }
    }, 100);
  };

  // Draw next card (respect skips and end-of-round)
  const drawNext = () => {
  // If no cards remain, jump immediately to the next round/final
  if (deck.length === 0) {
    gotoNextRound();
    return;
  }

  setCurrentCard(() => {
    const next = deck[0];
    setDeck((d) => d.slice(1));
    setCardsLeft((n) => Math.max(0, n - 1));
    return next;
  });
};

  // Actions during play
  useEffect(() => {
    if (stage === "playing" && !currentCard) {
      // first draw when entering playing
      drawNext();
    }
  }, [stage, currentCard]);

  const onGotIt = () => {
    if (!currentCard) return;
    setScores((s) => ({ ...s, [currentTeam]: s[currentTeam] + 1 }));
    setDiscard((d) => [currentCard, ...d]);
    setCurrentCard(null);
    drawNext();
  };

  const onSkip = () => {
    if (!currentCard) return;
    if (!settings.allowSkips) return;
    // push to bottom of deck
    setDeck((d) => [...d, currentCard]);
    // do not change cardsLeft
    setCurrentCard(null);
    drawNext();
  };

  const endTurn = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setStage("turnSummary");
  };

  const gotoNextRound = () => {
  // stop timer if running
  if (timerRef.current) {
    clearInterval(timerRef.current);
    timerRef.current = null;
  }

  if (round < 3) {
    const nextDeck = shuffle(discard);
    setDeck(nextDeck);
    setDiscard([]);
    setCardsLeft(nextDeck.length);
    setRound((r) => (r + 1) as Round);
    setCurrentTeam(currentTeam === "A" ? "B" : "A");
    setCurrentCard(null);
    setStage("roundEnd"); // show the round transition immediately
  } else {
    setStage("final");
  }
};

  const nextTeam = () => {
    // deck empty = end of round
    if (deck.length === 0 && !currentCard) {
      if (round < 3) {
        // prepare next round with same guessed deck reshuffled
        const nextDeck = shuffle(discard);
        setDeck(nextDeck);
        setDiscard([]);
        setCardsLeft(nextDeck.length);
        setRound((r) => (r + 1) as Round);
        setCurrentTeam(currentTeam === "A" ? "B" : "A");
        setCurrentCard(null);
        setStage("roundEnd");
      } else {
        setStage("final");
      }
      return;
    }

    // normal alternation
    setCurrentTeam((t) => (t === "A" ? "B" : "A"));
    setCurrentCard(null);
    setStage("turnIntro");
  };

  // Save/restore minimal state so refresh doesn’t kill a session
  useEffect(() => {
    if (stage !== "settings") {
      const snapshot = {
        stage,
        settings,
        round,
        currentTeam,
        deck,
        discard,
        scores,
        currentCard,
        cardsLeft,
      };
      localStorage.setItem(LS_STATE, JSON.stringify(snapshot));
    }
  }, [stage, settings, round, currentTeam, deck, discard, scores, currentCard, cardsLeft]);

  useEffect(() => {
    const saved = localStorage.getItem(LS_STATE);
    if (!saved) return;
    try {
      const s = JSON.parse(saved);
      if (s && s.stage && s.stage !== "settings") {
        setStage(s.stage);
        setSettings(s.settings);
        setRound(s.round);
        setCurrentTeam(s.currentTeam);
        setDeck(s.deck);
        setDiscard(s.discard);
        setScores(s.scores);
        setCurrentCard(s.currentCard);
        setCardsLeft(s.cardsLeft);
      }
    } catch {}
  }, []);

  // ------------- UI -------------
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
            IN OTHER WORDS
          </h1>
          <Button
      onClick={handleEndGame}
      className="text-xs font-pixel text-white bg-orange-600 hover:bg-orange-400 rounded px-3 py-1"
    >
      END GAME
    </Button>
          <div className="w-24" />
        </div>

        {/* SETTINGS */}
        {stage === "settings" && (
          <Card className="p-6 bg-gradient-surface space-y-5">
            <h2 className="text-xl font-pixel bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">
              Settings
            </h2>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-pixel text-white/80">Team A</label>
                <input
                  value={settings.teamAName}
                  onChange={(e) => setSettings({ ...settings, teamAName: e.target.value })}
                  className="w-full border rounded p-2 font-pixel text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-pixel text-white/80">Team B</label>
                <input
                  value={settings.teamBName}
                  onChange={(e) => setSettings({ ...settings, teamBName: e.target.value })}
                  className="w-full border rounded p-2 font-pixel text-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-pixel text-white/80">Timer (seconds)</label>
                  <input
                    type="number"
                    min={15}
                    max={180}
                    value={settings.timerSeconds}
                    onChange={(e) => setSettings({ ...settings, timerSeconds: Math.max(15, Math.min(180, Number(e.target.value))) })}
                    className="w-full border rounded p-2 font-pixel text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-pixel text-white/80">Card Count</label>
                  <input
                    type="number"
                    min={20}
                    max={120}
                    value={settings.cardCount}
                    onChange={(e) => setSettings({ ...settings, cardCount: Math.max(20, Math.min(120, Number(e.target.value))) })}
                    className="w-full border rounded p-2 font-pixel text-black"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  id="skips"
                  type="checkbox"
                  checked={settings.allowSkips}
                  onChange={(e) => setSettings({ ...settings, allowSkips: e.target.checked })}
                  className="h-4 w-4"
                />
                <label htmlFor="skips" className="text-sm font-pixel text-white/80">Allow Skips</label>
              </div>

              <div>
                <label className="block text-sm font-pixel text-white/80 mb-1">Categories</label>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(categories) as CategoryKey[]).map((k) => {
                    const checked = settings.selectedCategories.includes(k);
                    return (
                      <label key={k} className={`flex items-center gap-2 border rounded px-2 py-2 cursor-pointer ${checked ? "bg-orange-500/20 border-orange-400" : "bg-black/10"}`}>
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(e) => {
                            setSettings((s) => {
                              const next = new Set(s.selectedCategories);
                              if (e.target.checked) next.add(k); else next.delete(k);
                              return { ...s, selectedCategories: Array.from(next) as CategoryKey[] };
                            });
                          }}
                        />
                        <span className="font-pixel text-white/90 capitalize">{k.replace(/([A-Z])/g, " $1")}</span>
                        <span className="ml-auto text-xs text-white/50">{categories[k].length}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <Button
                onClick={startGame}
                className="w-full text-xs font-pixel text-white bg-orange-600 hover:bg-orange-400 rounded py-2"
              >
                Start Game
              </Button>
            </div>
          </Card>
        )}

        {/* TURN INTRO */}
        {stage === "turnIntro" && (
          <Card className="p-6 bg-gradient-surface space-y-4 text-center">
            <h2 className="text-xl font-pixel bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">
              {currentTeam === "A" ? settings.teamAName : settings.teamBName}'s Turn
            </h2>
            <p className="font-pixel text-xs text-white/80">Choose a describer on your team and pass them the phone.</p>
                        <div className="text-xs font-pixel text-white">{ruleText}</div>

            <Button onClick={beginTurn} className="mx-auto text-xs font-pixel text-white bg-orange-600 hover:bg-orange-400 rounded py-2 px-4">
              I'M READY!
            </Button>
          </Card>
        )}

         

        {/* ACTIVE PLAY */}
        {stage === "playing" && (
          <Card className="p-6 bg-gradient-surface text-center space-y-4">
            <div className="flex items-center justify-between text-xs font-pixel text-white/80">
              <div className="text-left">
                <div className="text-xl font-pixel bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">{ruleText}</div>
                {/* <div className="mt-1">Cards left: {cardsLeft}</div> */}
                {currentCard && (
    <div className="mt-1 inline-block text-[10px] font-pixel px-2 py-1 rounded bg-black/50 text-white/80">
      Category: {prettyCategory(currentCard.category)}
    </div>
  )}
              </div>
              <div className="text-right">
                <div className="text-3xl font-arcade">{timeLeft}s</div>
                <div className="mt-1">{currentTeam === "A" ? settings.teamAName : settings.teamBName}</div>
              </div>
            </div>

            <div className="bg-black bg-opacity-60 text-white p-8 rounded-lg font-pixel text-xl font-bold h-64 md:h-72 overflow-y-auto flex items-center justify-center text-center whitespace-pre-wrap">
<span>{currentCard?.text || ""}</span>            </div>

            <div className="flex justify-center gap-2">
              <Button onClick={onSkip} disabled={!settings.allowSkips} className="text-xs font-pixel text-white bg-orange-600 hover:bg-orange-400 rounded py-1 px-3 disabled:opacity-40">PASS ❌</Button>
              <Button onClick={onGotIt} className="text-xs font-pixel text-white bg-orange-600 hover:bg-orange-400 rounded py-1 px-3">GOT IT ✅</Button>
              <Button onClick={endTurn} className="text-xs font-pixel text-white bg-orange-600 hover:bg-orange-400 rounded py-1 px-3 flex items-center gap-2"><RefreshCw className="w-4 h-4"/>END TURN</Button>
            </div>
          </Card>
        )}

        {/* TURN SUMMARY */}
        {stage === "turnSummary" && (
          <Card className="p-6 bg-gradient-surface space-y-4 text-center">
            <h2 className="text-xl font-pixel bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">Time's Up!</h2>
            <div className="flex items-center justify-around font-pixel text-white/90">
              <div>
                <div className="text-sm">{settings.teamAName}</div>
                <div className="text-2xl">{scores.A}</div>
              </div>
              <div>
                <div className="text-sm">{settings.teamBName}</div>
                <div className="text-2xl">{scores.B}</div>
              </div>
            </div>
            <Button onClick={nextTeam} className="mx-auto text-xs font-pixel text-white bg-orange-600 hover:bg-orange-400 rounded py-2 px-4">
              {deck.length === 0 && !currentCard ? "Continue" : "Next Team"}
            </Button>
          </Card>
        )}

        {/* ROUND END */}
        {stage === "roundEnd" && (
          <Card className="p-6 bg-gradient-surface space-y-4 text-center">
            <h2 className="text-xl font-pixel bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">Round {round} Begins</h2>
            <p className="font-pixel text-white/80">Same deck, tougher rules.</p>
            <Button onClick={() => setStage("turnIntro")} className="mx-auto text-xs font-pixel text-white bg-orange-600 hover:bg-orange-400 rounded py-2 px-4">Start Round {round}</Button>
          </Card>
        )}

        {/* FINAL */}
        {stage === "final" && (
          <Card className="p-6 bg-gradient-surface space-y-4 text-center">
            <h2 className="text-xl font-pixel bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">Final Score</h2>
            <div className="flex items-center justify-around font-pixel text-white/90">
              <div>
                <div className="text-sm">{settings.teamAName}</div>
                <div className="text-3xl">{scores.A}</div>
              </div>
              <div>
                <div className="text-sm">{settings.teamBName}</div>
                <div className="text-3xl">{scores.B}</div>
              </div>
            </div>
            <div className="text-xs font-pixel text-white/60">Cards guessed total: {discard.length}</div>
            <div className="flex justify-center gap-2">
              <Button onClick={() => setStage("settings")} className="text-xs font-pixel text-white bg-orange-600 hover:bg-orange-400 rounded py-1 px-3">Play Again</Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default InOtherWords;
