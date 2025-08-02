import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface Player {
  name: string;
  score: number;
}

const FibbageGame = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerName, setPlayerName] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [numRounds, setNumRounds] = useState(3);

  const addPlayer = () => {
    if (playerName.trim()) {
      setPlayers(prev => [...prev, { name: playerName.trim(), score: 0 }]);
      setPlayerName("");
    }
  };

  const startGame = () => {
    if (players.length >= 2) {
      setGameStarted(true);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        <div className="flex items-center justify-between">
          <Button onClick={() => navigate("/")} className="text-xs px-3 py-1 font-pixel text-white bg-orange-600 hover:bg-orange-400 rounded shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80 flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Menu
          </Button>
          <h1 className="text-3xl font-arcade bg-gradient-primary bg-clip-text text-transparent">Fibbage</h1>
          <div className="w-10" />
        </div>

        {!gameStarted ? (
          <Card className="p-6 space-y-4 font-pixel">
            <Input
              placeholder="Enter player name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addPlayer()}
              className="bg-white text-black placeholder-gray-500"
            />
            <Button onClick={addPlayer} disabled={!playerName} className="text-xs px-3 py-1 font-pixel text-white bg-orange-600 hover:bg-orange-400 rounded shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80">Add Player</Button>
            <div className="space-y-2">
              {players.map((p, i) => (
                <div key={i} className="text-sm">{p.name}</div>
              ))}
            </div>
            <div className="pt-4 space-y-2">
              <label className="text-sm">Number of Rounds</label>
              <Input
                type="number"
                value={numRounds}
                onChange={(e) => setNumRounds(Number(e.target.value))}
                min={1}
                max={10}
                className="bg-white text-black placeholder-gray-500"
              />
            </div>
            <Button className="mt-4 text-xs px-3 py-1 font-pixel text-white bg-orange-600 hover:bg-orange-400 rounded shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80" onClick={startGame} disabled={players.length < 2}>
              Start Game
            </Button>
          </Card>
        ) : (
          <FibbageGameFlow
            players={players}
            setPlayers={setPlayers}
            numRounds={numRounds}
            onBackToMenu={() => {
              setGameStarted(false);
              setPlayers([]);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default FibbageGame;
// Example questions for Fibbage. In a real app, you might fetch these from an API.
const FIBBAGE_QUESTIONS: { question: string; answer: string }[] = [
  {
    question: "What is the only mammal capable of true flight?",
    answer: "Bat",
  },
  {
    question: "What is the world's largest island?",
    answer: "Greenland",
  },
  {
    question: "Which fruit has its seeds on the outside?",
    answer: "Strawberry",
  },
  {
    question: "What is the national animal of Scotland?",
    answer: "Unicorn",
  },
  {
    question: "What is the most common color of toilet paper in France?",
    answer: "Pink",
  },
  {
    question: "What is the only food that never spoils?",
    answer: "Honey",
  },
];

type PlayerWithAnswers = Player & {
  fakeAnswer?: string;
  vote?: number; // index in answers
};

type FibbagePhase = "submit-fake" | "vote" | "reveal" | "final";

interface FibbageGameFlowProps {
  players: Player[];
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  numRounds: number;
  onBackToMenu: () => void;
}

function shuffle<T>(arr: T[]): T[] {
  // Fisher-Yates shuffle
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const FibbageGameFlow = ({
  players,
  setPlayers,
  numRounds,
  onBackToMenu,
}: FibbageGameFlowProps) => {
  const [phase, setPhase] = useState<FibbagePhase>("submit-fake");
  const [round, setRound] = useState(0);
  const [questionOrder] = useState(() =>
    shuffle(Array.from({ length: Math.min(numRounds, FIBBAGE_QUESTIONS.length) }, (_, i) => i))
  );
  const [playerStates, setPlayerStates] = useState<PlayerWithAnswers[]>(
    players.map((p) => ({ ...p }))
  );
  const [fakeAnswers, setFakeAnswers] = useState<string[]>(Array(players.length).fill(""));
  const [votes, setVotes] = useState<(number | null)[]>(Array(players.length).fill(null));
  const [shuffledAnswers, setShuffledAnswers] = useState<{ text: string; author: number | null }[]>(
    []
  );
  const [revealData, setRevealData] = useState<{
    answerList: { text: string; author: number | null }[];
    votes: (number | null)[];
    playerStates: PlayerWithAnswers[];
  } | null>(null);

  const [currentAnsweringPlayerIdx, setCurrentAnsweringPlayerIdx] = useState(0);
  const [currentVotingPlayerIdx, setCurrentVotingPlayerIdx] = useState(0);

  const currentQuestion =
    FIBBAGE_QUESTIONS[questionOrder[round] % FIBBAGE_QUESTIONS.length];

  // Handle submitting fake answers
  const handleFakeAnswerChange = (idx: number, value: string) => {
    setFakeAnswers((prev) => {
      const next = [...prev];
      next[idx] = value;
      return next;
    });
  };

  const allFakeAnswersSubmitted = fakeAnswers.every((a) => a.trim().length > 0);

  const submitFakeAnswerForCurrentPlayer = () => {
    if (fakeAnswers[currentAnsweringPlayerIdx].trim().length === 0) return;
    if (currentAnsweringPlayerIdx + 1 < players.length) {
      setCurrentAnsweringPlayerIdx(currentAnsweringPlayerIdx + 1);
    } else {
      // Prepare answer list: all fake answers + real answer
      // Each answer: { text, author } (author: player index, real answer is author=null)
      const answerObjs: { text: string; author: number | null }[] = [
        ...fakeAnswers.map((text, i) => ({ text: text.trim(), author: i })),
        { text: currentQuestion.answer, author: null },
      ];
      const shuffled = shuffle(answerObjs);
      setShuffledAnswers(shuffled);
      setPhase("vote");
      setVotes(Array(players.length).fill(null));
      setCurrentVotingPlayerIdx(0);
    }
  };

  // Handle voting
  const handleVote = (playerIdx: number, answerIdx: number) => {
    setVotes((prev) => {
      const next = [...prev];
      next[playerIdx] = answerIdx;
      return next;
    });
  };

  const allVotesSubmitted = votes.every((v) => v !== null);

  const submitVoteForCurrentPlayer = () => {
    if (votes[currentVotingPlayerIdx] === null) return;
    if (currentVotingPlayerIdx + 1 < players.length) {
      setCurrentVotingPlayerIdx(currentVotingPlayerIdx + 1);
    }
  };

  const submitVotes = () => {
    // Score calculation:
    // - Each player who picks the real answer gets 2 points.
    // - Each player gets 1 point for every vote their fake answer receives.
    // - No one can vote for their own fake answer.
    // Prepare new scores
    const realAnswerIdx = shuffledAnswers.findIndex((a) => a.author === null);
    const newPlayerStates = playerStates.map((p) => ({ ...p }));
    // Tally who voted for what
    for (let i = 0; i < votes.length; ++i) {
      const votedFor = votes[i];
      if (votedFor === null) continue;
      if (votedFor === realAnswerIdx) {
        newPlayerStates[i].score += 2;
      } else {
        // Who wrote the answer?
        const author = shuffledAnswers[votedFor].author;
        if (author !== null && author !== i) {
          newPlayerStates[author].score += 1;
        }
      }
      newPlayerStates[i].vote = votedFor;
    }
    // Save for reveal
    setRevealData({
      answerList: shuffledAnswers,
      votes: [...votes],
      playerStates: newPlayerStates,
    });
    setPlayerStates(newPlayerStates);
    setPhase("reveal");
  };

  // Next round or finish
  const nextRound = () => {
    if (round + 1 < numRounds) {
      setRound((r) => r + 1);
      setPhase("submit-fake");
      setFakeAnswers(Array(players.length).fill(""));
      setVotes(Array(players.length).fill(null));
      setShuffledAnswers([]);
      setRevealData(null);
      setPlayerStates(
        playerStates.map((p) => ({
          name: p.name,
          score: p.score,
        }))
      );
      setCurrentAnsweringPlayerIdx(0);
      setCurrentVotingPlayerIdx(0);
    } else {
      setPhase("final");
    }
  };

  // Final scoreboard
  if (phase === "final") {
    const sorted = [...playerStates].sort((a, b) => b.score - a.score);
    return (
      <Card className="p-8 text-center space-y-4 font-pixel">
        <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Final Scores</h3>
          {sorted.map((p, i) => (
            <div key={i} className="text-lg">
              <span className="font-bold">{i === 0 ? "🏆 " : ""}{p.name}</span>: {p.score}
            </div>
          ))}
        </div>
        <Button onClick={onBackToMenu} className="text-xs px-3 py-1 font-pixel text-white bg-orange-600 hover:bg-orange-400 rounded shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80">Back to Menu</Button>
      </Card>
    );
  }

  // Reveal phase
  if (phase === "reveal" && revealData) {
    return (
      <Card className="p-8 text-center space-y-4 font-pixel">
        <h2 className="text-xl font-bold mb-3">Round {round + 1} Results</h2>
        <div className="mb-3">
          <div className="mb-2 font-semibold">Question:</div>
          <div className="italic">{currentQuestion.question}</div>
        </div>
        <div className="mb-3">
          <div className="font-semibold mb-1">Answers & Votes:</div>
          <ul className="space-y-2">
            {revealData.answerList.map((ans, idx) => {
              const voters = revealData.votes
                .map((v, i) => (v === idx ? playerStates[i].name : null))
                .filter(Boolean);
              const isReal = ans.author === null;
              return (
                <li key={idx} className="border rounded px-2 py-1">
                  <span className={isReal ? "font-bold text-primary" : ""}>
                    {ans.text}
                  </span>
                  {isReal && <span className="ml-2 text-xs text-muted">(Real Answer)</span>}
                  <div className="text-xs mt-1">
                    {voters.length > 0
                      ? `Voted by: ${voters.join(", ")}`
                      : <span className="text-muted">No votes</span>}
                  </div>
                  {!isReal && (
                    <div className="text-xs text-muted">
                      {ans.author !== null ? `Submitted by: ${playerStates[ans.author].name}` : ""}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="mb-3">
          <h3 className="font-semibold mb-1">Scores</h3>
          <ul>
            {playerStates.map((p, i) => (
              <li key={i}>{p.name}: {p.score}</li>
            ))}
          </ul>
        </div>
        <Button onClick={nextRound} className="text-xs px-3 py-1 font-pixel text-white bg-orange-600 hover:bg-orange-400 rounded shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80">
          {round + 1 < numRounds ? "Next Round" : "See Final Scores"}
        </Button>
      </Card>
    );
  }

  // Voting phase
  if (phase === "vote") {
    const p = playerStates[currentVotingPlayerIdx];
    return (
      <Card className="p-8 text-center space-y-6 font-pixel">
        <h2 className="text-xl font-bold">Round {round + 1}: Vote</h2>
        <div className="mb-3">
          <div className="mb-1 font-semibold">Question:</div>
          <div className="italic">{currentQuestion.question}</div>
        </div>
        <div className="mb-3">
          <div className="font-semibold">{p.name}, pick the real answer:</div>
          <div className="flex flex-col items-center gap-2 mt-2">
            {shuffledAnswers.map((ans, idx) => (
              <Button
                key={idx}
                className="text-xs px-3 py-1 font-pixel text-white bg-orange-600 hover:bg-orange-400 rounded shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80 w-full"
                disabled={
                  votes[currentVotingPlayerIdx] !== null ||
                  (ans.author === currentVotingPlayerIdx) // can't vote your own fake answer
                }
                onClick={() => handleVote(currentVotingPlayerIdx, idx)}
              >
                {ans.text}
              </Button>
            ))}
            {votes[currentVotingPlayerIdx] !== null && (
              <div className="text-xs text-muted mt-1">Vote submitted!</div>
            )}
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <Button
            onClick={submitVoteForCurrentPlayer}
            disabled={votes[currentVotingPlayerIdx] === null}
            className="text-xs px-3 py-1 font-pixel text-white bg-orange-600 hover:bg-orange-400 rounded shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80"
          >
            {currentVotingPlayerIdx + 1 < players.length ? "Next Voter" : "Ready to Reveal"}
          </Button>
          {allVotesSubmitted && (
            <Button onClick={submitVotes} className="text-xs px-3 py-1 font-pixel text-white bg-orange-600 hover:bg-orange-400 rounded shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80">
              Reveal Results
            </Button>
          )}
        </div>
      </Card>
    );
  }

  // Fake answer submission phase
  const currentPlayer = playerStates[currentAnsweringPlayerIdx];
  return (
    <Card className="p-8 text-center space-y-6 font-pixel">
      <h2 className="text-xl font-bold">Round {round + 1} of {numRounds}</h2>
      <div className="mb-3">
        <div className="mb-1 font-semibold">Question:</div>
        <div className="italic">{currentQuestion.question}</div>
      </div>
      <div className="mb-3 flex flex-col items-center">
        <div className="font-semibold mb-2">{currentPlayer.name}'s fake answer:</div>
        <textarea
          value={fakeAnswers[currentAnsweringPlayerIdx]}
          onChange={(e) => handleFakeAnswerChange(currentAnsweringPlayerIdx, e.target.value)}
          placeholder="Type your fake answer"
          rows={3}
          className="w-full max-w-md p-2 border rounded resize-y font-pixel text-black"
        />
      </div>
      <Button
        onClick={submitFakeAnswerForCurrentPlayer}
        disabled={fakeAnswers[currentAnsweringPlayerIdx].trim().length === 0}
        className="text-xs px-3 py-1 font-pixel text-white bg-orange-600 hover:bg-orange-400 rounded shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80"
      >
        {currentAnsweringPlayerIdx + 1 < players.length ? "Next Player" : "Submit All Answers"}
      </Button>
    </Card>
  );
};