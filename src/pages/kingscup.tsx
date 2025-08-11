// src/pages/KingsCup.tsx
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, RefreshCw, Crown } from "lucide-react";

const RANKS = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"] as const;
const SUITS = ["♠️","♥️","♦️","♣️"] as const;

type Rank = typeof RANKS[number];
type Suit = typeof SUITS[number];

interface PlayingCard {
  rank: Rank;
  suit: Suit;
  code: string; // e.g., "A♠️"
}

const RULES: Record<Rank, { title: string; prompt: string }> = {
  A: { title: "Ace — Waterfall", prompt: "Everyone drinks. Start together; you can stop only when the person before you stops." },
  "2": { title: "Two — You", prompt: "Point at someone. They drink." },
  "3": { title: "Three — Me", prompt: "You drink." },
  "4": { title: "Four — Floor", prompt: "Last to touch the floor drinks." },
  "5": { title: "Five — Guys", prompt: "All guys drink." },
  "6": { title: "Six — Chicks", prompt: "All girls drink." },
  "7": { title: "Seven — Heaven", prompt: "Last to raise a hand drinks." },
  "8": { title: "Eight — Mate", prompt: "Pick a mate. Whenever you drink, your mate drinks for the rest of the game." },
  "9": { title: "Nine — Rhyme", prompt: "Say a word. Go around rhyming it. First to fail or repeat drinks." },
  "10": { title: "Ten — Categories", prompt: "Pick a category (e.g., fruits). Go around naming items. First to fail drinks." },
  J: { title: "Jack — Never Have I Ever", prompt: "Say something you’ve never done. Anyone who has done it drinks." },
  Q: { title: "Queen — Question Master", prompt: "Until the next Queen, anyone who answers your question must drink. (Don’t answer the QM!)" },
  K: { title: "King — King’s Cup", prompt: "Pour a bit of your drink into the King’s Cup. Whoever draws the 4th King drinks the cup and the game ends." },
};

function makeDeck(): PlayingCard[] {
  const deck: PlayingCard[] = [];
  for (const suit of SUITS) for (const rank of RANKS) deck.push({ rank, suit, code: `${rank}${suit}` });
  return deck;
}

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const kingscup = () => {
  const navigate = useNavigate();

  const initialDeck = useMemo(() => shuffle(makeDeck()), []);
  const [deck, setDeck] = useState<PlayingCard[]>(initialDeck);
  const [currentCard, setCurrentCard] = useState<PlayingCard | null>(null);
  const [kingsDrawn, setKingsDrawn] = useState(0);
  const [drawCount, setDrawCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [endReason, setEndReason] = useState<"finalKing" | "deckExhausted" | null>(null);

  const cardsLeft = deck.length;
  const started = drawCount > 0;

  const drawCard = () => {
    if (gameOver) return;
    if (deck.length === 0) {
      setGameOver(true);
      setEndReason("deckExhausted");
      setCurrentCard(null);
      return;
    }
    const [next, ...rest] = deck;
    setDeck(rest);
    setCurrentCard(next);
    setDrawCount((n) => n + 1);

    if (next.rank === "K") {
      const newKings = kingsDrawn + 1;
      setKingsDrawn(newKings);
      if (newKings >= 4) {
        setGameOver(true);
        setEndReason("finalKing");
      }
    }
  };

  const resetGame = () => {
    const fresh = shuffle(makeDeck());
    setDeck(fresh);
    setCurrentCard(null);
    setKingsDrawn(0);
    setDrawCount(0);
    setGameOver(false);
    setEndReason(null);
  };

  const headerTitle = "Kings Cup";

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-4 px-3 sm:px-4">
      <div className="w-full max-w-md sm:max-w-xl md:max-w-2xl space-y-6 sm:space-y-8 font-pixel">
        {/* Header */}
        <div className="grid grid-cols-[auto,1fr,auto] items-center gap-2 sm:gap-3 min-w-0">
          <Button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-[11px] sm:text-xs px-2.5 py-1 bg-orange-600 hover:bg-orange-400 rounded shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" />
            <span className="hidden xs:inline">Back</span>
          </Button>

          <h1 className="font-arcade uppercase tracking-[0.06em] text-base xs:text-lg md:text-2xl leading-tight text-center px-1 sm:px-2 bg-gradient-to-r from-orange-500 via-yellow-300 to-orange-400 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(255,200,120,0.85)] overflow-hidden text-ellipsis whitespace-nowrap">
            {headerTitle}
          </h1>

          <Button
            onClick={resetGame}
            className="flex items-center gap-2 text-[11px] sm:text-xs px-2.5 py-1 bg-orange-600 hover:bg-orange-400 rounded shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80"
          >
            <RefreshCw className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">Reset</span>
          </Button>
        </div>

        {/* Status (wraps on small screens) */}
        <Card className="p-3 sm:p-4 bg-black/60 border border-orange-500 rounded-xl overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-white/90 text-xs sm:text-sm">
            {/* Cards left block */}
            <div className="flex items-center gap-2 shrink-0">
              <Label className="bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">
                Cards left
              </Label>
              <span className="font-arcade">{cardsLeft}</span>
            </div>

            {/* Kings block — will wrap below when space is tight */}
            <div className="flex items-center gap-2 shrink-0">
              <Label className="bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">
                Kings
              </Label>
              <div className="flex items-center flex-wrap gap-1">
                {[0, 1, 2, 3].map((i) => (
                  <Crown
                    key={i}
                    className={`h-3 w-3 sm:h-4 sm:w-4 ${i < kingsDrawn ? "text-yellow-300" : "text-white/30"}`}
                  />
                ))}
                {/* <span className="ml-1 font-arcade">{kingsDrawn}/4</span> */}
              </div>
            </div>
          </div>
        </Card>

        {/* Card + Prompt */}
        <Card className="p-4 sm:p-6 min-h-[38vh] sm:min-h-[300px] w-full flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6 bg-black/60 border border-orange-500 rounded-xl overflow-hidden">
          {!started && !gameOver && (
            <p className="text-sm sm:text-base text-white/90">
              Tap <span className="font-arcade">Start Game</span> to draw your first card.
            </p>
          )}

          {currentCard && !gameOver && (
            <>
              <div className="text-5xl sm:text-6xl md:text-7xl leading-none select-none">
                <span
                  className={`px-3 py-1 rounded-lg ${
                    currentCard.suit === "♥️" || currentCard.suit === "♦️"
                      ? "text-red-400"
                      : "text-white"
                  }`}
                >
                  {currentCard.code}
                </span>
              </div>

              <div className="space-y-2 sm:space-y-3 max-w-xl">
                <h2 className="text-lg sm:text-xl md:text-2xl bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(255,200,100,0.6)]">
                  {RULES[currentCard.rank].title}
                </h2>
                <p className="text-sm sm:text-base text-white/90 break-words hyphens-auto leading-snug">
                  {RULES[currentCard.rank].prompt}
                </p>
                {currentCard.rank === "K" && kingsDrawn < 4 && (
                  <p className="text-xs sm:text-sm text-white/70">
                    King #{kingsDrawn} drawn. Add a splash to the cup. Draw carefully…
                  </p>
                )}
              </div>
            </>
          )}

          {gameOver && (
            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-center">
                <Crown className="h-10 w-10 text-yellow-300" />
              </div>
              <h2 className="text-xl sm:text-2xl font-arcade bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(255,200,100,0.7)]">
                Game Over
              </h2>
              <p className="text-sm sm:text-base text-white/90 max-w-md">
                {endReason === "finalKing"
                  ? "You drew the 4th King. Drink the King’s Cup! 🎉"
                  : "The deck is finished. Nicely played!"}
              </p>
              <div className="flex gap-2 justify-center">
                <Button
                  onClick={resetGame}
                  className="px-5 sm:px-6 py-2 bg-orange-600 hover:bg-orange-400 text-white rounded shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80"
                >
                  Play Again
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Primary Action */}
        {!gameOver && (
          <div className="flex justify-center">
            <Button
              onClick={drawCard}
              className="w-full sm:w-auto px-5 sm:px-8 py-2.5 sm:py-3 text-sm font-pixel text-white bg-orange-600 hover:bg-orange-400 rounded shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80"
            >
              {started ? "Draw Next Card" : "Start Game"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default kingscup;