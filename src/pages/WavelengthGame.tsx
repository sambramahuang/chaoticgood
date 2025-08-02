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
    "Movie Genres"
  ];

  const startNewRound = () => {
    const newNumber = Math.floor(Math.random() * 10) + 1;
    setSecretNumber(newNumber);
    setGamePhase("playing");
    setRoundNumber(1);
    generateCategory();
    setShowNumber(true);
    setGuessedNumber(null);
  };

  const generateCategory = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API delay
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
    if (difference === 0) return "🍻 No shots! Perfect guess!";
    if (difference === 1) return `🥃 1 shot for being off by ${difference}!`;
    return `🥃 ${difference} shots for being off by ${difference}!`;
  };

  return (
    <div className="min-h-screen bg-[url('/gaming-hero.jpg')] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center px-4 py-10 text-white font-pixel">
      <div className="w-full max-w-2xl space-y-8">
        <div className="flex items-center justify-between">
          <Button
            variant="retro"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 font-pixel text-xs text-white rounded-md shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80 bg-orange-600 hover:bg-orange-400 px-3 py-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Menu
          </Button>
          
          <h1 className="text-4xl font-arcade text-center my-4 bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(255,200,100,0.9)]">
            WAVELENGTH
          </h1>
          
          <div className="w-24" />
        </div>

        {gamePhase === "setup" && (
          <Card className="bg-black bg-opacity-60 border border-orange-500 p-4 rounded-xl text-center space-y-6">
            <div className="space-y-4">
              <h2 className="bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)] text-base font-bold">How to Play Wavelength</h2>
              <div className="text-left space-y-3 max-w-lg mx-auto">
                <p className="bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">1. One player is the <strong className="text-white">guesser</strong> and looks away</p>
                <p className="bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">2. A secret number (1-10) is generated for the other players</p>
                <p className="bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">3. Each round, give an example from the category that matches the number's intensity</p>
                <p className="bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">4. <strong className="text-white">1 = worst/weakest</strong>, <strong className="text-white">10 = best/strongest</strong></p>
                <p className="bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">5. After several rounds, the guesser tries to guess the number!</p>
              </div>
            </div>

            {/* Drinking Mode Toggle */}
            <Card className="bg-black bg-opacity-60 border border-orange-500 p-4 rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Wine className="h-5 w-5 text-orange-300" />
                  <div>
                    <Label htmlFor="drinking-mode" className="bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)] font-medium text-xs">
                      Drinking Game Mode
                    </Label>
                    <p className="text-xs bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">
                      Wrong guesses = shots (difference between numbers)
                    </p>
                  </div>
                </div>
                <Switch
                  id="drinking-mode"
                  checked={drinkingMode}
                  onCheckedChange={setDrinkingMode}
                />
              </div>
            </Card>

            {/* Number of Players */}
            <Card className="bg-black bg-opacity-60 border border-orange-500 p-4 rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-orange-300" />
                  <div>
                    <Label htmlFor="players" className="bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)] font-medium text-xs">
                      Number of Players
                    </Label>
                    <p className="text-xs bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">
                      Total players including the guesser ({numberOfPlayers - 1} rounds)
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    // variant="outline"
                    size="sm"
                    onClick={() => setNumberOfPlayers(Math.max(2, numberOfPlayers - 1))}
                    disabled={numberOfPlayers <= 2}
                    className="text-xs px-3 py-1 font-pixel shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80 border-orange-400 hover:bg-orange-300"
                  >
                    -
                  </Button>
                  <span className="text-sm font-bold min-w-[2rem] text-center">{numberOfPlayers}</span>
                  <Button
                    // variant="outline"
                    size="sm"
                    onClick={() => setNumberOfPlayers(Math.min(10, numberOfPlayers + 1))}
                    disabled={numberOfPlayers >= 10}
                    className="text-xs px-3 py-1 font-pixel shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80 border-orange-400 hover:bg-orange-300"
                  >
                    +
                  </Button>
                </div>
              </div>
            </Card>

            <Button
              onClick={startNewRound}
              className="w-full text-xs font-pixel bg-orange-600 hover:bg-orange-400 text-white rounded shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80 px-3 py-2"
            >
              Start New Round
            </Button>
          </Card>
        )}

        {gamePhase === "playing" && (
          <>
            {/* Secret Number Display */}
            <Card className="bg-black bg-opacity-60 border border-orange-500 p-4 rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Target className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)] text-xs font-semibold">Secret Number</h3>
                    <p className="text-xs bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">For non-guessers only</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowNumber(!showNumber)}
                    className="flex items-center gap-2 text-xs px-3 py-1 font-pixel shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80 border-orange-400 hover:bg-orange-300"
                  >
                    {showNumber ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    {showNumber ? "Hide" : "Show"}
                  </Button>
                  <div className="text-lg font-bold text-orange-300 drop-shadow-[0_0_6px_rgba(255,200,100,0.8)]">
                    {showNumber ? secretNumber : "?"}
                  </div>
                </div>
              </div>
            </Card>

            {/* Category Card */}
            <Card className="bg-black bg-opacity-60 border border-orange-500 p-6 min-h-[300px] flex flex-col items-center justify-center text-center space-y-6 rounded-xl">
              <div className="space-y-4">
                <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">
                  <Users className="h-5 w-5" />
                  <span className="text-xs">Round {roundNumber}</span>
                </div>
                
                {currentCategory ? (
                  <>
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto animate-pulse-electric">
                      <span className="text-xs">📝</span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)] uppercase tracking-wide">Category</p>
                      <h2 className="text-lg font-bold bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">{currentCategory}</h2>
                    </div>
                    <p className="bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)] max-w-md">
                      Give an example that matches the intensity of the secret number (1 = worst, 10 = best)
                    </p>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto animate-float">
                      <RefreshCw className="h-8 w-8 animate-spin text-primary-foreground" />
                    </div>
                    <p className="text-sm bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">Generating category...</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={nextCategory}
                disabled={isLoading || !currentCategory}
                className="text-xs px-3 py-1 font-pixel shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80 border-orange-400 hover:bg-orange-300 flex-1"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Next Category"
                )}
              </Button>
              
              <Button
                onClick={startGuessing}
                // variant="electric"
                disabled={roundNumber < requiredRounds}
                className="text-xs px-3 py-1 font-pixel shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80 border-orange-400 hover:bg-orange-300 flex-1"
              >
                Start Guessing Phase
              </Button>
            </div>
            
            {roundNumber < requiredRounds && (
              <p className="text-center text-xs bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">
                Complete {requiredRounds} rounds before guessing ({roundNumber}/{requiredRounds} done)
              </p>
            )}
          </>
        )}

        {gamePhase === "guessing" && (
          <Card className="bg-black bg-opacity-60 border border-orange-500 p-4 rounded-xl text-center space-y-6">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto animate-float">
                <span className="text-lg">🤔</span>
              </div>
              <h2 className="bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)] text-base font-bold">Guesser's Turn!</h2>
              <p className="bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)] max-w-md mx-auto">
                Based on the {requiredRounds} examples you heard, what do you think the secret number was?
              </p>
              <p className="text-xs bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">
                Remember: 1 = worst/weakest, 10 = best/strongest
              </p>
            </div>
            <Button 
              onClick={() => setShowGuessDialog(true)} 
              variant="gaming" 
              size="lg" 
              className="w-full text-xs"
            >
              Make Your Guess
            </Button>
          </Card>
        )}

        {gamePhase === "reveal" && (
          <Card className="bg-black bg-opacity-60 border border-orange-500 p-4 rounded-xl text-center space-y-6">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto animate-pulse-electric">
                <span className="text-lg">🎉</span>
              </div>
              <h2 className="bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)] text-base font-bold">Results!</h2>
              
              <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
                <div className="space-y-2">
                  <p className="text-xs bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">Secret Number</p>
                  <div className="text-lg font-bold text-orange-300 drop-shadow-[0_0_6px_rgba(255,200,100,0.8)]">{secretNumber}</div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">Your Guess</p>
                  <div className="text-lg font-bold text-white drop-shadow-[0_0_6px_rgba(255,200,100,0.8)]">{guessedNumber}</div>
                </div>
              </div>
              
              <div className="text-lg bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(255,200,100,0.9)]">{getScoreText()}</div>
              
              {drinkingMode && (
                <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-4">
                  <div className="text-sm font-bold text-orange-300">{getDrinkingText()}</div>
                  {guessedNumber !== null && Math.abs(secretNumber - guessedNumber) > 0 && (
                    <p className="text-xs text-orange-300 mt-2">
                      🍻 Time to drink! Difference: {Math.abs(secretNumber - guessedNumber)}
                    </p>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex gap-4">
              <Button
                onClick={startNewRound}
                className="flex-1 text-xs font-pixel bg-orange-600 hover:bg-orange-400 text-white rounded shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80 px-3 py-2"
              >
                Play Again
              </Button>
              <Button
                onClick={resetGame}
                className="flex items-center justify-center text-xs font-pixel text-white rounded-md bg-orange-600 hover:bg-orange-400 shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80 px-3 py-2 border-none outline-none ring-0 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none"
              >
                Back to Menu
              </Button>
            </div>
          </Card>
        )}

        {/* Guess Dialog */}
        <Dialog open={showGuessDialog} onOpenChange={setShowGuessDialog}>
          <DialogContent className="bg-black bg-opacity-80 border border-orange-500 rounded-xl">
            <DialogHeader>
              <DialogTitle className="bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)] text-center text-sm">Make Your Guess</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <p className="text-center bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">
                What number do you think it was?
              </p>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <Button
                    key={num}
                    variant={guessedNumber === num ? "gaming" : undefined}
                    onClick={() => setGuessedNumber(num)}
                    className={
                      guessedNumber === num
                        ? "aspect-square text-xs font-bold"
                        : "aspect-square text-xs font-bold text-xs px-3 py-1 font-pixel shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80 border-orange-400 hover:bg-orange-300"
                    }
                  >
                    {num}
                  </Button>
                ))}
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  // variant="outline"
                  onClick={() => setShowGuessDialog(false)}
                  className="text-xs px-3 py-1 font-pixel shadow-md shadow-orange-400/50 hover:shadow-lg hover:shadow-yellow-300/80 border-orange-400 hover:bg-orange-300"
                >
                  Cancel
                </Button>
                <Button variant="gaming" onClick={submitGuess}>
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