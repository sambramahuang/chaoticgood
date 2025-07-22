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
        backgroundImage: `linear-gradient(rgba(15, 8, 4, 0.85), rgba(12, 6, 3, 0.9)), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="w-full max-w-4xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 retro-scan relative">
          <h1 className="text-6xl font-pixel font-bold text-neon-cyan neon-text uppercase tracking-wider">
            Party Games
          </h1>
          <div className="text-xl text-neon-yellow font-retro max-w-2xl mx-auto">
            <span className="inline-block animate-pulse">▶</span> Choose your game mode and let AI generate exciting questions for your group! <span className="inline-block animate-pulse">◀</span>
          </div>
        </div>

        {/* Add Custom Questions Button */}
        <div className="text-center">
          <Button 
            variant="retro" 
            size="lg"
            onClick={() => navigate("/custom-questions")}
            className="retro-button border-2 border-neon-yellow bg-neon-yellow text-retro-dark hover:bg-neon-green font-pixel text-xs"
          >
            [EDIT] Custom Questions
          </Button>
        </div>

        {/* Game Mode Cards */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {/* Bridges Card */}
          <Card className="retro-button bg-gradient-surface border-2 border-neon-cyan shadow-card p-8 hover:shadow-neon transition-all duration-200 hover:scale-105 cursor-pointer group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="text-center space-y-6 relative z-10" onClick={() => navigate("/game/bridges")}>
              <div className="w-20 h-20 bg-gradient-neon border-2 border-neon-cyan flex items-center justify-center mx-auto group-hover:animate-pulse">
                <span className="text-4xl filter drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]">🌉</span>
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-retro font-bold text-neon-cyan uppercase tracking-wider">Bridges</h2>
                <p className="text-neon-yellow font-retro text-sm leading-relaxed">
                  [WHO HERE...] questions with coin flip - TELL means reveal your answer, SAFE means you're protected
                </p>
              </div>
              <Button variant="gaming" size="lg" className="w-full font-pixel text-xs">
                [START] Bridges
              </Button>
            </div>
          </Card>

          {/* Truth or Dare Card */}
          <Card className="retro-button bg-gradient-surface border-2 border-neon-pink shadow-card p-8 hover:shadow-pink transition-all duration-200 hover:scale-105 cursor-pointer group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-neon-pink/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="text-center space-y-6 relative z-10" onClick={() => navigate("/game/truth-or-dare")}>
              <div className="w-20 h-20 bg-gradient-retro border-2 border-neon-pink flex items-center justify-center mx-auto group-hover:animate-pulse">
                <span className="text-4xl filter drop-shadow-[0_0_8px_rgba(255,0,255,0.8)]">🎲</span>
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-retro font-bold text-neon-pink uppercase tracking-wider">Truth or Dare</h2>
                <p className="text-neon-yellow font-retro text-sm leading-relaxed">
                  [CLASSIC] party game with a modern twist - AI-generated truths and dares for endless fun
                </p>
              </div>
              <Button variant="gaming" size="lg" className="w-full font-pixel text-xs">
                [START] Truth or Dare
              </Button>
            </div>
          </Card>

          {/* Wavelength Card */}
          <Card className="retro-button bg-gradient-surface border-2 border-neon-green shadow-card p-8 hover:shadow-neon transition-all duration-200 hover:scale-105 cursor-pointer group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-neon-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="text-center space-y-6 relative z-10" onClick={() => navigate("/wavelength")}>
              <div className="w-20 h-20 bg-gradient-neon border-2 border-neon-green flex items-center justify-center mx-auto group-hover:animate-pulse">
                <span className="text-4xl filter drop-shadow-[0_0_8px_rgba(0,255,0,0.8)]">📊</span>
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-retro font-bold text-neon-green uppercase tracking-wider">Wavelength</h2>
                <p className="text-neon-yellow font-retro text-sm leading-relaxed">
                  [SOCIAL] guessing game where teams sync their wavelengths through creative examples
                </p>
              </div>
              <Button variant="gaming" size="lg" className="w-full font-pixel text-xs">
                [START] Wavelength
              </Button>
            </div>
          </Card>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="text-center space-y-3 retro-button bg-retro-surface border border-neon-cyan p-4">
            <div className="w-12 h-12 bg-neon-cyan/20 border border-neon-cyan flex items-center justify-center mx-auto">
              <span className="text-2xl filter drop-shadow-[0_0_4px_rgba(0,255,255,0.8)]">🤖</span>
            </div>
            <h3 className="text-sm font-pixel text-neon-cyan uppercase">AI-Generated</h3>
            <p className="text-xs text-neon-yellow font-retro">
              Fresh questions every time powered by artificial intelligence
            </p>
          </div>
          <div className="text-center space-y-3 retro-button bg-retro-surface border border-neon-pink p-4">
            <div className="w-12 h-12 bg-neon-pink/20 border border-neon-pink flex items-center justify-center mx-auto">
              <span className="text-2xl filter drop-shadow-[0_0_4px_rgba(255,0,255,0.8)]">👥</span>
            </div>
            <h3 className="text-sm font-pixel text-neon-pink uppercase">Party Ready</h3>
            <p className="text-xs text-neon-yellow font-retro">
              Perfect for groups, parties, and social gatherings
            </p>
          </div>
          <div className="text-center space-y-3 retro-button bg-retro-surface border border-neon-green p-4">
            <div className="w-12 h-12 bg-neon-green/20 border border-neon-green flex items-center justify-center mx-auto">
              <span className="text-2xl filter drop-shadow-[0_0_4px_rgba(0,255,0,0.8)]">⚡</span>
            </div>
            <h3 className="text-sm font-pixel text-neon-green uppercase">Instant Fun</h3>
            <p className="text-xs text-neon-yellow font-retro">
              No setup required - just pick a mode and start playing
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
