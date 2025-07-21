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
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 hover:bg-secondary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Menu
          </Button>
          
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Wavelength
          </h1>
          
          <div className="w-24" />
        </div>

        {gamePhase === "setup" && (
          <Card className="bg-gradient-surface border-border shadow-card p-8 text-center space-y-6">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto animate-float">
                <span className="text-3xl">📊</span>
              </div>
              <h2 className="text-2xl font-bold text-foreground">How to Play Wavelength</h2>
              <div className="text-left space-y-3 text-muted-foreground max-w-lg mx-auto">
                <p>1. One player is the <strong className="text-foreground">guesser</strong> and looks away</p>
                <p>2. A secret number (1-10) is generated for the other players</p>
                <p>3. Each round, give an example from the category that matches the number's intensity</p>
                <p>4. <strong className="text-foreground">1 = worst/weakest</strong>, <strong className="text-foreground">10 = best/strongest</strong></p>
                <p>5. After several rounds, the guesser tries to guess the number!</p>
              </div>
            </div>

            {/* Drinking Mode Toggle */}
            <Card className="bg-gradient-surface border-border shadow-card p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Wine className="h-5 w-5 text-electric" />
                  <div>
                    <Label htmlFor="drinking-mode" className="text-foreground font-medium">
                      Drinking Game Mode
                    </Label>
                    <p className="text-sm text-muted-foreground">
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

            <Button onClick={startNewRound} variant="gaming" size="lg" className="w-full">
              Start New Round
            </Button>
          </Card>
        )}

        {gamePhase === "playing" && (
          <>
            {/* Secret Number Display */}
            <Card className="bg-gradient-surface border-border shadow-card p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Target className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Secret Number</h3>
                    <p className="text-sm text-muted-foreground">For non-guessers only</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowNumber(!showNumber)}
                    className="flex items-center gap-2"
                  >
                    {showNumber ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    {showNumber ? "Hide" : "Show"}
                  </Button>
                  <div className="text-4xl font-bold text-electric">
                    {showNumber ? secretNumber : "?"}
                  </div>
                </div>
              </div>
            </Card>

            {/* Category Card */}
            <Card className="bg-gradient-surface border-border shadow-card p-8 min-h-[300px] flex flex-col items-center justify-center text-center space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-5 w-5" />
                  <span>Round {roundNumber}</span>
                </div>
                
                {currentCategory ? (
                  <>
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto animate-pulse-electric">
                      <span className="text-2xl">📝</span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground uppercase tracking-wide">Category</p>
                      <h2 className="text-3xl font-bold text-foreground">{currentCategory}</h2>
                    </div>
                    <p className="text-muted-foreground max-w-md">
                      Give an example that matches the intensity of the secret number (1 = worst, 10 = best)
                    </p>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto animate-float">
                      <RefreshCw className="h-8 w-8 animate-spin text-primary-foreground" />
                    </div>
                    <p className="text-xl text-muted-foreground">Generating category...</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={nextCategory}
                disabled={isLoading || !currentCategory}
                className="bg-gradient-primary hover:shadow-electric transition-all duration-300 flex-1"
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
                variant="electric"
                disabled={roundNumber < 3}
                className="flex-1"
              >
                Start Guessing Phase
              </Button>
            </div>
            
            {roundNumber < 3 && (
              <p className="text-center text-sm text-muted-foreground">
                Complete at least 3 rounds before guessing
              </p>
            )}
          </>
        )}

        {gamePhase === "guessing" && (
          <Card className="bg-gradient-surface border-border shadow-card p-8 text-center space-y-6">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto animate-float">
                <span className="text-3xl">🤔</span>
              </div>
              <h2 className="text-2xl font-bold text-foreground">Guesser's Turn!</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Based on the {roundNumber - 1} examples you heard, what do you think the secret number was?
              </p>
              <p className="text-sm text-muted-foreground">
                Remember: 1 = worst/weakest, 10 = best/strongest
              </p>
            </div>
            <Button 
              onClick={() => setShowGuessDialog(true)} 
              variant="gaming" 
              size="lg" 
              className="w-full"
            >
              Make Your Guess
            </Button>
          </Card>
        )}

        {gamePhase === "reveal" && (
          <Card className="bg-gradient-surface border-border shadow-card p-8 text-center space-y-6">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto animate-pulse-electric">
                <span className="text-3xl">🎉</span>
              </div>
              <h2 className="text-2xl font-bold text-foreground">Results!</h2>
              
              <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Secret Number</p>
                  <div className="text-4xl font-bold text-electric">{secretNumber}</div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Your Guess</p>
                  <div className="text-4xl font-bold text-foreground">{guessedNumber}</div>
                </div>
              </div>
              
              <div className="text-2xl">{getScoreText()}</div>
              
              {drinkingMode && (
                <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
                  <div className="text-xl font-bold text-red-400">{getDrinkingText()}</div>
                  {guessedNumber !== null && Math.abs(secretNumber - guessedNumber) > 0 && (
                    <p className="text-sm text-red-300 mt-2">
                      🍻 Time to drink! Difference: {Math.abs(secretNumber - guessedNumber)}
                    </p>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex gap-4">
              <Button onClick={startNewRound} variant="gaming" className="flex-1">
                Play Again
              </Button>
              <Button onClick={resetGame} variant="outline" className="flex-1">
                Back to Menu
              </Button>
            </div>
          </Card>
        )}

        {/* Guess Dialog */}
        <Dialog open={showGuessDialog} onOpenChange={setShowGuessDialog}>
          <DialogContent className="bg-gaming-surface border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground text-center">Make Your Guess</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <p className="text-center text-muted-foreground">
                What number do you think it was?
              </p>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <Button
                    key={num}
                    variant={guessedNumber === num ? "gaming" : "outline"}
                    onClick={() => setGuessedNumber(num)}
                    className="aspect-square text-lg font-bold"
                  >
                    {num}
                  </Button>
                ))}
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setShowGuessDialog(false)}>
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