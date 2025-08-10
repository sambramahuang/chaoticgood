import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowLeft, RefreshCw, Eye, EyeOff, Users, Target, Wine } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const WavelengthGame = () => {
  const navigate = useNavigate();
  const [gamePhase, setGamePhase] = useState<"setup" | "playing" | "guessing" | "reveal">("setup");
  const [secretNumber, setSecretNumber] = useState<number>(0);
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [showNumber, setShowNumber] = useState(true);
  const [roundNumber, setRoundNumber] = useState(1);
  const [guessedNumber, setGuessedNumber] = useState<number | null>(null);
  const [showGuessDialog, setShowGuessDialog] = useState(false);
  const [drinkingMode, setDrinkingMode] = useState(false);
  const [numberOfPlayers, setNumberOfPlayers] = useState(4);
  const [skipUsed, setSkipUsed] = useState(false);

  const categories = [
    "Basketball Players",
    "Football Players",
    "Movie Actors",
    "TV Shows",
    "Fast Food Restaurants",
    "Car Brands",
    "Countries",
    "Superheroes",
    "Video Games",
    "Musicians",
    "Animals",
    "Foods",
    "Board Games",
    "Book Series",
    "Phone Apps",
    "Social Media Platforms",
    "Clothing Brands",
    "Dog Breeds",
    "Pizza Toppings",
    "Ice Cream Flavors",
    "College Majors",
    "Vacation Destinations",
    "Sports",
    "Cartoon Characters",
    "Movie Genres",
    "NBA Players",
    "K-Pop Songs",
    "Taylor Swift Songs",
    "TikTok Trends",
    "Anime Characters",
    "Disney Movies",
    "Marvel Characters",
    "Horror Movies",
    "YouTubers",
    "Celebrity Couples",
    "Viral Memes",
    "Rappers",
    "Pop Songs",
    "Asian Street Foods",
    "Luxury Brands",
    "Super Smash Bros Characters",
    "Game of Thrones Characters",
    "Harry Potter Spells",
    "Fantasy Creatures",
    "Reality TV Shows",
    "Romantic Comedies",
    "Science Fiction Movies",
    "Stand-up Comedians",
    "Instagram Filters",
    "Fashion Trends",
    "K-Drama Series",
    "Disney Villains",
    "Anime Openings",
    "Pixar Characters",
    "Viral TikTok Songs",
    "Historical Events",
    "World Leaders",
    "Video Game Bosses",
    "Famous Paintings",
    "Classic Novels",
    "Superstitions",
    "Musical Instruments",
    "Streetwear Brands"
  ];

  const startNewRound = () => {
    const newNumber = Math.floor(Math.random() * 10) + 1;
    setSecretNumber(newNumber);
    setGamePhase("playing");
    setRoundNumber(1);
    generateCategory();
    setShowNumber(true);
    setGuessedNumber(null);
    setSkipUsed(false);
  };

  const generateCategory = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      setCurrentCategory(randomCategory);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate category. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const nextCategory = () => {
    setRoundNumber(prev => prev + 1);
    generateCategory();
    setSkipUsed(false);
  };

  const startGuessing = () => {
    setGamePhase("guessing");
    setShowNumber(false);
  };

  const submitGuess = () => {
    if (guessedNumber === null) {
      toast({
        title: "Error",
        description: "Please select a number first!",
        variant: "destructive",
      });
      return;
    }
    setGamePhase("reveal");
    setShowGuessDialog(false);
  };

  const resetGame = () => {
    setGamePhase("setup");
    setSecretNumber(0);
    setCurrentCategory("");
    setRoundNumber(1);
    setGuessedNumber(null);
    setShowNumber(true);
  };

  const requiredRounds = numberOfPlayers - 1;

  const getScoreText = () => {
    if (guessedNumber === null) return "";
    const difference = Math.abs(secretNumber - guessedNumber);
    if (difference === 0) return "🎯 Perfect! Bullseye!";
    if (difference === 1) return "🔥 Amazing! So close!";
    if (difference === 2) return "👍 Great guess!";
    if (difference === 3) return "😊 Not bad!";
    return "🤔 Keep practicing!";
  };

  const getDrinkingText = () => {
    if (guessedNumber === null || !drinkingMode) return "";
    const difference = Math.abs(secretNumber - guessedNumber);
    if (difference === 0) return "No penalty! Perfect guess!";
    if (difference === 1) return `1 penalty for being off by ${difference}!`;
    return `${difference} penalties for being off by ${difference}!`;
  };

  return (
    <div className="min-h-screen bg-[url('/gaming-hero.jpg')] bg-cover bg-center bg-no-repeat flex flex-col items-center px-3 py-6 sm:px-4 sm:py-10 text-white font-pixel overflow-x-hidden">
      {/* Constrain width for phones; allow comfortable tablet/desktop width */}
      <div className="w-full max-w-md sm:max-w-xl md:max-w-2xl space-y-6 sm:space-y-8">
        {/* Header: grid so nothing overflows on small screens */}
        <div className="grid grid-cols-[auto,1fr,auto] items-center gap-2 sm:gap-3 min-w-0">
          <Button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-[11px] sm:text-xs px-2.5 py-1 rounded shadow-md shadow-orange-400/50 bg-orange-600 hover:bg-orange-400 hover:shadow-lg hover:shadow-yellow-300/80"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" />
            <span className="hidden xs:inline">Back</span>
          </Button>

          <h1 className="font-arcade text-center my-1 bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(255,200,100,0.9)] text-2xl md:text-4xl leading-tight px-1 overflow-hidden text-ellipsis whitespace-nowrap">
            WAVELENGTH
          </h1>

          {/* spacer keeps layout balanced */}
          <div className="w-[74px] sm:w-24" />
        </div>

        {gamePhase === "setup" && (
          <Card className="bg-black/60 border border-orange-500 p-3 sm:p-4 rounded-xl text-center space-y-4 sm:space-y-6 font-sans overflow-hidden">
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-white text-xs sm:text-sm font-bold font-sans">How to Play Wavelength</h2>
              <div className="text-left space-y-2.5 sm:space-y-3 max-w-prose mx-auto font-sans">
                <p className="text-white text-[11px] sm:text-xs break-words">1. One player is the <strong>guesser</strong> and looks away</p>
                <p className="text-white text-[11px] sm:text-xs break-words">2. A secret number (1-10) is generated for the other players</p>
                <p className="text-white text-[11px] sm:text-xs break-words">3. Each round, give an example from the category that matches the number&apos;s intensity</p>
                <p className="text-white text-[11px] sm:text-xs break-words">4. <strong>1 = worst/weakest</strong>, <strong>10 = best/strongest</strong></p>
                <p className="text-white text-[11px] sm:text-xs break-words">5. After several rounds, the guesser tries to guess the number!</p>
              </div>
            </div>

            {/* Drinking Mode Toggle */}
            <Card className="bg-black/60 border border-orange-500 p-3 sm:p-4 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <Wine className="h-5 w-5 text-orange-300 shrink-0" />
                  <div className="min-w-0">
                    <Label htmlFor="drinking-mode" className="bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)] font-medium text-[11px] sm:text-xs">
                      Penalty Game Mode
                    </Label>
                    <p className="text-[11px] sm:text-xs bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)] break-words">
                      Wrong guesses = penalties (difference between numbers)
                    </p>
                  </div>
                </div>
                <Switch id="drinking-mode" checked={drinkingMode} onCheckedChange={setDrinkingMode} />
              </div>
            </Card>

            {/* Number of Players */}
            <Card className="bg-black/60 border border-orange-500 p-3 sm:p-4 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <Users className="h-5 w-5 text-orange-300 shrink-0" />
                  <div className="min-w-0">
                    <Label htmlFor="players" className="bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)] font-medium text-[11px] sm:text-xs">
                      Number of Players
                    </Label>
                    <p className="text-[11px] sm:text-xs bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)] break-words">
                      Total players including the guesser ({numberOfPlayers - 1} rounds)
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    onClick={() => setNumberOfPlayers(Math.max(2, numberOfPlayers - 1))}
                    disabled={numberOfPlayers <= 2}
                    className="text-xs px-3 py-1 shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80 border-orange-400 hover:bg-orange-300"
                  >
                    −
                  </Button>
                  <span className="text-sm font-bold min-w-[2rem] text-center">{numberOfPlayers}</span>
                  <Button
                    size="sm"
                    onClick={() => setNumberOfPlayers(Math.min(10, numberOfPlayers + 1))}
                    disabled={numberOfPlayers >= 10}
                    className="text-xs px-3 py-1 shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80 border-orange-400 hover:bg-orange-300"
                  >
                    +
                  </Button>
                </div>
              </div>
            </Card>

            <Button
              onClick={startNewRound}
              className="w-full text-xs bg-orange-600 hover:bg-orange-400 text-white rounded shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80 px-3 py-2"
            >
              Start New Round
            </Button>
          </Card>
        )}

        {gamePhase === "playing" && (
          <>
            {/* Secret Number Display */}
            <Card className="bg-black/60 border border-orange-500 p-3 sm:p-4 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-primary rounded-full flex items-center justify-center shrink-0">
                    <Target className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)] text-[11px] sm:text-xs font-semibold">
                      Secret Number
                    </h3>
                    <p className="text-[11px] sm:text-xs bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">
                      For non-guessers only
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowNumber(!showNumber)}
                    className="flex items-center gap-2 text-[11px] sm:text-xs px-2.5 py-1 shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80 border-orange-400 hover:bg-orange-300"
                  >
                    {showNumber ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    {showNumber ? "Hide" : "Show"}
                  </Button>
                  <div className="text-lg sm:text-xl font-bold text-orange-300 drop-shadow-[0_0_6px_rgba(255,200,100,0.8)]">
                    {showNumber ? secretNumber : "?"}
                  </div>
                </div>
              </div>
            </Card>

            {/* Category Card */}
            <Card className="bg-black/60 border border-orange-500 p-4 sm:p-6 min-h-[36vh] sm:min-h-[300px] flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6 rounded-xl overflow-hidden">
              <div className="space-y-3 sm:space-y-4 w-full max-w-prose mx-auto">
                <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">
                  <Users className="h-5 w-5" />
                  <span className="text-[11px] sm:text-xs">Round {roundNumber}</span>
                </div>

                {currentCategory ? (
                  <>
                    <div className="space-y-1.5 sm:space-y-2">
                      <p className="text-[11px] sm:text-xs bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)] uppercase tracking-wide">
                        Category
                      </p>
                      <h2 className="text-base sm:text-lg font-bold bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)] break-words">
                        {currentCategory}
                      </h2>
                    </div>
                    <p className="text-xs sm:text-sm bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)] max-w-full break-words">
                      Give an example that matches the intensity of the secret number (1 = worst, 10 = best)
                    </p>
                  </>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                      <RefreshCw className="h-7 w-7 sm:h-8 sm:w-8 animate-spin text-primary-foreground" />
                    </div>
                    <p className="text-xs sm:text-sm bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">
                      Generating category...
                    </p>
                  </div>
                )}
              </div>
            </Card>

            {/* Action Buttons: stack on mobile, 3 columns on sm+ */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
              <Button
                onClick={nextCategory}
                disabled={isLoading || !currentCategory}
                className="text-xs px-3 py-2 shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80 border-orange-400 hover:bg-orange-300 w-full"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Next Player"
                )}
              </Button>

              <Button
                onClick={() => {
                  generateCategory();
                  setSkipUsed(true);
                }}
                disabled={isLoading || skipUsed}
                className="text-xs px-3 py-2 shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80 border-orange-400 hover:bg-orange-300 w-full"
              >
                Skip Category
              </Button>

              <Button
                onClick={startGuessing}
                disabled={roundNumber < requiredRounds}
                className="text-xs px-3 py-2 shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80 border-orange-400 hover:bg-orange-300 w-full"
              >
                Start Guessing Phase
              </Button>
            </div>

            {roundNumber < requiredRounds && (
              <p className="text-center text-[11px] sm:text-xs bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">
                Complete {requiredRounds} rounds before guessing ({roundNumber}/{requiredRounds} done)
              </p>
            )}
          </>
        )}

        {gamePhase === "guessing" && (
          <Card className="bg-black/60 border border-orange-500 p-4 rounded-xl text-center space-y-4 sm:space-y-6 overflow-hidden">
            <div className="space-y-3 sm:space-y-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                <span className="text-lg">🤔</span>
              </div>
              <h2 className="text-sm sm:text-base font-bold bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">
                Guesser&apos;s Turn!
              </h2>
              <p className="text-xs sm:text-sm bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)] max-w-prose mx-auto break-words">
                Based on the {requiredRounds} examples you heard, what do you think the secret number was?
              </p>
              <p className="text-[11px] sm:text-xs bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">
                Remember: 1 = worst/weakest, 10 = best/strongest
              </p>
            </div>
            <Button onClick={() => setShowGuessDialog(true)} size="lg" className="w-full text-xs">
              Make Your Guess
            </Button>
          </Card>
        )}

        {gamePhase === "reveal" && (
          <Card className="bg-black/60 border border-orange-500 p-4 rounded-xl text-center space-y-4 sm:space-y-6 overflow-hidden">
            <div className="space-y-3 sm:space-y-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                <span className="text-lg">🎉</span>
              </div>
              <h2 className="text-sm sm:text-base font-bold bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">
                Results!
              </h2>

              <div className="grid grid-cols-2 gap-4 sm:gap-6 max-w-sm mx-auto">
                <div className="space-y-1.5">
                  <p className="text-[11px] sm:text-xs bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent">Secret Number</p>
                  <div className="text-lg sm:text-xl font-bold text-orange-300 drop-shadow-[0_0_6px_rgba(255,200,100,0.8)]">{secretNumber}</div>
                </div>
                <div className="space-y-1.5">
                  <p className="text-[11px] sm:text-xs bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent">Your Guess</p>
                  <div className="text-lg sm:text-xl font-bold text-white drop-shadow-[0_0_6px_rgba(255,200,100,0.8)]">{guessedNumber}</div>
                </div>
              </div>

              <div className="text-base sm:text-lg bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(255,200,100,0.9)]">
                {getScoreText()}
              </div>

              {drinkingMode && (
                <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-3 sm:p-4">
                  <div className="text-sm font-bold text-orange-300">{getDrinkingText()}</div>
                  {guessedNumber !== null && Math.abs(secretNumber - guessedNumber) > 0 && (
                    <p className="text-[11px] sm:text-xs text-orange-300 mt-2">
                      Time to take a penalty! Difference: {Math.abs(secretNumber - guessedNumber)}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
              <Button
                onClick={startNewRound}
                className="w-full text-xs bg-orange-600 hover:bg-orange-400 text-white rounded shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80 px-3 py-2"
              >
                Play Again
              </Button>
              <Button
                onClick={resetGame}
                className="w-full text-xs bg-orange-600 hover:bg-orange-400 text-white rounded shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80 px-3 py-2"
              >
                Back to Menu
              </Button>
            </div>
          </Card>
        )}

        {/* Guess Dialog */}
        <Dialog open={showGuessDialog} onOpenChange={setShowGuessDialog}>
          <DialogContent className="bg-black/80 border border-orange-500 rounded-xl w-[calc(100vw-2rem)] sm:max-w-md p-4 sm:p-6 max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-center text-sm sm:text-base bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent">
                Make Your Guess
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 sm:space-y-6">
              <p className="text-center bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent">
                What number do you think it was?
              </p>
              <div className="grid grid-cols-5 gap-2">
                {[1,2,3,4,5,6,7,8,9,10].map((num) => (
                  <Button
                    key={num}
                    variant={guessedNumber === num ? "gaming" : undefined}
                    onClick={() => setGuessedNumber(num)}
                    className={
                      guessedNumber === num
                        ? "aspect-square text-xs font-bold"
                        : "aspect-square text-xs font-bold shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80 border-orange-400 hover:bg-orange-300"
                    }
                  >
                    {num}
                  </Button>
                ))}
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  onClick={() => setShowGuessDialog(false)}
                  className="text-xs px-3 py-1 shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80 border-orange-400 hover:bg-orange-300"
                >
                  Cancel
                </Button>
                <Button onClick={submitGuess} className="text-xs px-3 py-1">
                  Submit Guess
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default WavelengthGame;