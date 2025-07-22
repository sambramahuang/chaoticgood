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
        
        <div className="text-center space-y-4 relative">
          <div className="flex justify-center mt-2 mb-2">
            <img 
              src="/chaoticlogo.png" 
              alt="Chaotic Good" 
              className="w-[250px] md:w-[350px] lg:w-[450px] !shadow-none !filter-none !drop-shadow-none" 
            />
          </div> 
          <div className="text-xl text-neon-yellow font-chaotic max-w-2xl mx-auto">
            <span className="inline-block animate-pulse">▶</span> Choose your game mode <span className="inline-block animate-pulse">◀</span>
          </div>
        </div>

        {/* Add Custom Questions Button */}
        <div className="text-center">
          <Button 
            variant="retro" 
            size="lg"
            onClick={() => navigate("/custom-questions")}
            className="retro-button border-2 border-orange-400 bg-orange-500 text-black hover:bg-orange-600 hover:text-white font-chaotic text-xs drop-shadow-[0_0_6px_#f97316] hover:drop-shadow-[0_0_10px_#f97316]"
          >
            [EDIT] Custom Questions
          </Button>
        </div>

        {/* Game Mode Cards */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {/* Bridges Card */}
          <Card className="retro-button bg-gradient-to-b from-black via-black to-orange-900 border-2 border-orange-500 shadow-orange-500 p-8 hover:shadow-orange-500 transition-all duration-200 hover:scale-105 cursor-pointer group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="text-center space-y-6 relative z-10" onClick={() => navigate("/game/bridges")}>
              <div className="w-20 h-20 bg-orange-900 border-2 border-orange-500 flex items-center justify-center mx-auto group-hover:animate-pulse">
                <span className="text-4xl text-orange-300">🌉</span>
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-chaotic font-bold text-orange-400 uppercase tracking-wider">Bridges</h2>
                <p className="text-neon-yellow font-chaotic text-sm leading-relaxed">
                  [WHO HERE...] questions with coin flip - TELL means reveal your answer, SAFE means you're protected
                </p>
              </div>
              <Button
                variant="gaming"
                size="lg"
                className="w-full font-chaotic text-xs bg-orange-500 text-black border-2 border-orange-400 hover:bg-orange-600 hover:text-white transition !shadow-none !filter-none drop-shadow-[0_0_6px_#f97316] hover:drop-shadow-[0_0_10px_#f97316]"
              >
                START
              </Button>
            </div>
          </Card>

          {/* Truth or Dare Card */}
          <Card className="retro-button bg-gradient-to-b from-black via-black to-orange-900 border-2 border-orange-500 shadow-orange-500 p-8 hover:shadow-orange-500 transition-all duration-200 hover:scale-105 cursor-pointer group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="text-center space-y-6 relative z-10" onClick={() => navigate("/game/truth-or-dare")}>
              <div className="w-20 h-20 bg-orange-900 border-2 border-orange-500 flex items-center justify-center mx-auto group-hover:animate-pulse">
                <span className="text-4xl text-orange-300">🎲</span>
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-chaotic font-bold text-orange-400 uppercase tracking-wider">Truth or Dare</h2>
                <p className="text-neon-yellow font-chaotic text-sm leading-relaxed">
                  [CLASSIC] party game with a modern twist - AI-generated truths and dares for endless fun
                </p>
              </div>
              <Button
                variant="gaming"
                size="lg"
                className="w-full font-chaotic text-xs bg-orange-500 text-black border-2 border-orange-400 hover:bg-orange-600 hover:text-white transition !shadow-none !filter-none drop-shadow-[0_0_6px_#f97316] hover:drop-shadow-[0_0_10px_#f97316]"
              >
                START
              </Button>
            </div>
          </Card>

          {/* Wavelength Card */}
          <Card className="retro-button bg-gradient-to-b from-black via-black to-orange-900 border-2 border-orange-500 shadow-orange-500 p-8 hover:shadow-orange-500 transition-all duration-200 hover:scale-105 cursor-pointer group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="text-center space-y-6 relative z-10" onClick={() => navigate("/wavelength")}>
              <div className="w-20 h-20 bg-orange-900 border-2 border-orange-500 flex items-center justify-center mx-auto group-hover:animate-pulse">
                <span className="text-4xl text-orange-300">📊</span>
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-chaotic font-bold text-orange-400 uppercase tracking-wider">Wavelength</h2>
                <p className="text-neon-yellow font-chaotic text-sm leading-relaxed">
                  [SOCIAL] guessing game where teams sync their wavelengths through creative examples
                </p>
              </div>
              <Button
                variant="gaming"
                size="lg"
                className="w-full font-chaotic text-xs bg-orange-500 text-black border-2 border-orange-400 hover:bg-orange-600 hover:text-white transition !shadow-none !filter-none drop-shadow-[0_0_6px_#f97316] hover:drop-shadow-[0_0_10px_#f97316]"
              >
                START
              </Button>
            </div>
          </Card>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="text-center space-y-3 retro-button bg-retro-surface border border-orange-500 p-4">
            <div className="w-12 h-12 bg-orange-500/20 border border-orange-500 flex items-center justify-center mx-auto">
              <span className="text-2xl filter drop-shadow-[0_0_4px_#f97316]">🤖</span>
            </div>
            <h3 className="text-sm font-chaotic text-orange-400 uppercase">AI-Generated</h3>
            <p className="text-xs text-neon-yellow font-chaotic">
              Fresh questions every time powered by artificial intelligence
            </p>
          </div>
          <div className="text-center space-y-3 retro-button bg-retro-surface border border-orange-500 p-4">
            <div className="w-12 h-12 bg-orange-500/20 border border-orange-500 flex items-center justify-center mx-auto">
              <span className="text-2xl filter drop-shadow-[0_0_4px_#f97316]">👥</span>
            </div>
            <h3 className="text-sm font-chaotic text-orange-400 uppercase">Party Ready</h3>
            <p className="text-xs text-neon-yellow font-chaotic">
              Perfect for groups, parties, and social gatherings
            </p>
          </div>
          <div className="text-center space-y-3 retro-button bg-retro-surface border border-orange-500 p-4">
            <div className="w-12 h-12 bg-orange-500/20 border border-orange-500 flex items-center justify-center mx-auto">
              <span className="text-2xl filter drop-shadow-[0_0_4px_#f97316]">⚡</span>
            </div>
            <h3 className="text-sm font-chaotic text-orange-400 uppercase">Instant Fun</h3>
            <p className="text-xs text-neon-yellow font-chaotic">
              No setup required - just pick a mode and start playing
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
