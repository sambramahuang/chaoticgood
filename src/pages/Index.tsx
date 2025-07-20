import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import heroImage from "@/assets/gaming-hero.jpg";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative"
      style={{
        backgroundImage: `linear-gradient(rgba(12, 10, 20, 0.8), rgba(12, 10, 20, 0.8)), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="w-full max-w-4xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-bold bg-gradient-electric bg-clip-text text-transparent animate-glow">
            Party Games
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose your game mode and let AI generate exciting questions for your group!
          </p>
        </div>

        {/* Add Custom Questions Button */}
        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigate("/custom-questions")}
            className="border-electric/30 hover:border-electric hover:bg-electric/10"
          >
            ✏️ Manage Custom Questions
          </Button>
        </div>

        {/* Game Mode Cards */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {/* Burning Bridges Card */}
          <Card className="bg-gradient-surface border-border shadow-card p-8 hover:shadow-electric transition-all duration-500 hover:scale-105 cursor-pointer group"
                onClick={() => navigate("/game/burning-bridges")}>
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto group-hover:animate-pulse-electric">
                <span className="text-4xl">🔥</span>
              </div>
              <div className="space-y-3">
                <h2 className="text-3xl font-bold text-foreground">Burning Bridges</h2>
                <p className="text-muted-foreground text-lg">
                  Deep, thought-provoking questions that reveal hidden truths and create intense conversations
                </p>
              </div>
              <Button variant="gaming" size="lg" className="w-full">
                Start Burning Bridges
              </Button>
            </div>
          </Card>

          {/* Truth or Dare Card */}
          <Card className="bg-gradient-surface border-border shadow-card p-8 hover:shadow-electric transition-all duration-500 hover:scale-105 cursor-pointer group"
                onClick={() => navigate("/game/truth-or-dare")}>
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto group-hover:animate-pulse-electric">
                <span className="text-4xl">🎲</span>
              </div>
              <div className="space-y-3">
                <h2 className="text-3xl font-bold text-foreground">Truth or Dare</h2>
                <p className="text-muted-foreground text-lg">
                  Classic party game with a modern twist - AI-generated truths and dares for endless fun
                </p>
              </div>
              <Button variant="gaming" size="lg" className="w-full">
                Start Truth or Dare
              </Button>
            </div>
          </Card>

          {/* Wavelength Card */}
          <Card className="bg-gradient-surface border-border shadow-card p-8 hover:shadow-electric transition-all duration-500 hover:scale-105 cursor-pointer group"
                onClick={() => navigate("/wavelength")}>
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto group-hover:animate-pulse-electric">
                <span className="text-4xl">📊</span>
              </div>
              <div className="space-y-3">
                <h2 className="text-3xl font-bold text-foreground">Wavelength</h2>
                <p className="text-muted-foreground text-lg">
                  A social guessing game where teams sync their wavelengths through creative examples
                </p>
              </div>
              <Button variant="gaming" size="lg" className="w-full">
                Start Wavelength
              </Button>
            </div>
          </Card>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-electric/20 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl">🤖</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground">AI-Generated</h3>
            <p className="text-sm text-muted-foreground">
              Fresh questions every time powered by artificial intelligence
            </p>
          </div>
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-electric/20 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl">👥</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground">Party Ready</h3>
            <p className="text-sm text-muted-foreground">
              Perfect for groups, parties, and social gatherings
            </p>
          </div>
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-electric/20 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground">Instant Fun</h3>
            <p className="text-sm text-muted-foreground">
              No setup required - just pick a mode and start playing
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
