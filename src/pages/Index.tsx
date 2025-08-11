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
              className="w-[175px] md:w-[245px] lg:w-[315px] !shadow-none !filter-none !drop-shadow-none" 
            />
          </div> 
          <div className="text-xl font-arcade max-w-2xl mx-auto">
            <span className="bg-gradient-to-r from-orange-700 via-orange-600 to-yellow-500 bg-clip-text text-transparent">
              <span style={{ fontFamily: 'monospace' }}>&gt;</span> CHOOSE YOUR GAME MODE <span style={{ fontFamily: 'monospace' }}>&lt;</span>
            </span>
          </div>
        </div>

        {/* Add Custom Questions Button */}
        {/* <div className="text-center">
          <Button 
            variant="retro" 
            size="lg"
            onClick={() => navigate("/custom-questions")}
            className="retro-button border-2 border-orange-400 bg-orange-500 text-black hover:bg-orange-600 hover:text-white font-pixel text-xs drop-shadow-[0_0_10px_#fb923c] hover:drop-shadow-[0_0_10px_#fb923c]"
          >
            [EDIT] Custom Questions
          </Button>
        </div> */}

        {/* Game Mode Cards */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">


          {/* Picolo Mode Card */}
          <Card className="retro-button bg-gradient-to-b from-black via-black to-orange-900 border-2 border-orange-500 shadow-orange-500 p-8 hover:shadow-orange-500 transition-all duration-200 hover:scale-105 cursor-pointer group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="text-center space-y-6 relative z-10" onClick={() => navigate("/battleroyale")}>
              <div className="w-20 h-20 bg-orange-900 border-2 border-orange-500 flex items-center justify-center mx-auto group-hover:animate-pulse">
                <img 
                  src="/bricon.png" 
                  alt="battle royale icon" 
                  className="w-12 h-12 mx-auto"
                />
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-arcade font-bold uppercase tracking-wider">
                  <span className="bg-gradient-to-r from-yellow-200 via-orange-400 to-orange-300 bg-clip-text text-transparent">
                    Battle Royale
                  </span>
                </h2>
                <p className="font-pixel text-[10px] leading-relaxed bg-gradient-to-r from-orange-300 via-yellow-200 to-orange-400 bg-clip-text text-transparent">
                  Battle it out with challenges, dares and questions to see who will take the most penalites.
                </p>
              </div>
              <Button
                variant="gaming"
                size="lg"
                className="retro-button border-2 border-orange-400 bg-orange-500 text-black hover:bg-orange-600 hover:text-white font-pixel text-xs drop-shadow-[0_0_10px_#fb923c] hover:drop-shadow-[0_0_10px_#fb923c]"
              >
                START
              </Button>
            </div>
          </Card>

          {/* Bridges Card */}
          <Card 
            onClick={() => navigate("/game/bridges")}
            className="retro-button bg-gradient-to-b from-black via-black to-orange-900 border-2 border-orange-500 shadow-orange-500 p-8 hover:shadow-orange-500 transition-all duration-200 hover:scale-105 cursor-pointer group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="text-center space-y-6 relative z-10">
              <div className="w-20 h-20 bg-orange-900 border-2 border-orange-500 flex items-center justify-center mx-auto group-hover:animate-pulse">
                <img 
                  src="/bridgesicon.png" 
                  alt="Bridges icon" 
                  className="w-12 h-12 mx-auto"
                />
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-arcade font-bold uppercase tracking-wider">
                  <span className="bg-gradient-to-r from-yellow-200 via-orange-400 to-orange-300 bg-clip-text text-transparent">
                    Bridges
                  </span>
                </h2>
                <p className="font-pixel text-[10px] leading-relaxed bg-gradient-to-r from-orange-300 via-yellow-200 to-orange-400 bg-clip-text text-transparent">
                  Will you build or burn bridges? A flip of a coin decides your fate in this chaotic game.
                </p>
              </div>
              <Button
                variant="gaming"
                size="lg"
                className="retro-button border-2 border-orange-400 bg-orange-500 text-black hover:bg-orange-600 hover:text-white font-pixel text-xs drop-shadow-[0_0_10px_#fb923c] hover:drop-shadow-[0_0_10px_#fb923c]"
              >
                START
              </Button>
            </div>
          </Card>

          {/* Truth or Dare Card */}
          <Card 
            onClick={() => navigate("/game/truthOrDare")}
            className="retro-button bg-gradient-to-b from-black via-black to-orange-900 border-2 border-orange-500 shadow-orange-500 p-8 hover:shadow-orange-500 transition-all duration-200 hover:scale-105 cursor-pointer group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="text-center space-y-6 relative z-10">
              <div className="w-20 h-20 bg-orange-900 border-2 border-orange-500 flex items-center justify-center mx-auto group-hover:animate-pulse">
                <img 
                  src="/todicon.png" 
                  alt="Truth or Dare icon" 
                  className="w-12 h-12 mx-auto"
                />
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-arcade font-bold uppercase tracking-wider">
                  <span className="bg-gradient-to-r from-yellow-200 via-orange-400 to-orange-300 bg-clip-text text-transparent">
                    Truth or Dare
                  </span>
                </h2>
                <p className="font-pixel text-[10px] leading-relaxed bg-gradient-to-r from-orange-300 via-yellow-200 to-orange-400 bg-clip-text text-transparent">
                  Classic truth or dare prompts, are you brave enough to face the challenge?
                </p>
              </div>
              <Button
                variant="gaming"
                size="lg"
                className="retro-button border-2 border-orange-400 bg-orange-500 text-black hover:bg-orange-600 hover:text-white font-pixel text-xs drop-shadow-[0_0_10px_#fb923c] hover:drop-shadow-[0_0_10px_#fb923c]"
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
                  <img 
                    src="/wavelengthicon.png" 
                    alt="Wavelength icon" 
                    className="w-12 h-12 mx-auto"
                  />
                </div>
                <div className="space-y-3">
                  <h2 className="text-2xl font-arcade font-bold uppercase tracking-wider">
                    <span className="bg-gradient-to-r from-yellow-200 via-orange-400 to-orange-300 bg-clip-text text-transparent">
                      Wavelength
                    </span>
                  </h2>
                  <p className="font-pixel text-[10px] leading-relaxed bg-gradient-to-r from-orange-300 via-yellow-200 to-orange-400 bg-clip-text text-transparent">
                    Can you figure out what your friends are thinking? A game of deduction.
                  </p>
                </div>
                <Button
                  variant="gaming"
                  size="lg"
                  className="retro-button border-2 border-orange-400 bg-orange-500 text-black hover:bg-orange-600 hover:text-white font-pixel text-xs drop-shadow-[0_0_10px_#fb923c] hover:drop-shadow-[0_0_10px_#fb923c]"
                >
                  START
                </Button>
              </div>
          </Card>
          <Card className="retro-button bg-gradient-to-b from-black via-black to-orange-900 border-2 border-orange-500 shadow-orange-500 p-8 hover:shadow-orange-500 transition-all duration-200 hover:scale-105 cursor-pointer group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="text-center space-y-6 relative z-10" onClick={() => navigate("/inotherwords")}>
                <div className="w-20 h-20 bg-orange-900 border-2 border-orange-500 flex items-center justify-center mx-auto group-hover:animate-pulse">
                  <img 
                    src="/iow.png" 
                    alt="iow icon" 
                    className="w-12 h-12 mx-auto"
                  />
                </div>
                <div className="space-y-3">
                  <h2 className="text-2xl font-arcade font-bold uppercase tracking-wider">
                    <span className="bg-gradient-to-r from-yellow-200 via-orange-400 to-orange-300 bg-clip-text text-transparent">
                      IN OTHER WORDS
                    </span>
                  </h2>
                  <p className="font-pixel text-[10px] leading-relaxed bg-gradient-to-r from-orange-300 via-yellow-200 to-orange-400 bg-clip-text text-transparent">
                    Work in teams to decipher what your teammates are trying to say. A game of words and charades. 
                  </p>
                </div>
                <Button
                  variant="gaming"
                  size="lg"
                  className="retro-button border-2 border-orange-400 bg-orange-500 text-black hover:bg-orange-600 hover:text-white font-pixel text-xs drop-shadow-[0_0_10px_#fb923c] hover:drop-shadow-[0_0_10px_#fb923c]"
                >
                  START
                </Button>
              </div>
          </Card>

          <Card className="retro-button bg-gradient-to-b from-black via-black to-orange-900 border-2 border-orange-500 shadow-orange-500 p-8 hover:shadow-orange-500 transition-all duration-200 hover:scale-105 cursor-pointer group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="text-center space-y-6 relative z-10" onClick={() => navigate("/kingscup")}>
                <div className="w-20 h-20 bg-orange-900 border-2 border-orange-500 flex items-center justify-center mx-auto group-hover:animate-pulse">
                  <img 
                    src="/kingscup.png" 
                    alt="kings cup icon" 
                    className="w-12 h-12 mx-auto"
                  />
                </div>
                <div className="space-y-3">
                  <h2 className="text-2xl font-arcade font-bold uppercase tracking-wider">
                    <span className="bg-gradient-to-r from-yellow-200 via-orange-400 to-orange-300 bg-clip-text text-transparent">
                      KING'S CUP
                    </span>
                  </h2>
                  <p className="font-pixel text-[10px] leading-relaxed bg-gradient-to-r from-orange-300 via-yellow-200 to-orange-400 bg-clip-text text-transparent">
Draw a card, follow the rule, and watch the night spiral into hilarious chaos.                  </p>
                </div>
                <Button
                  variant="gaming"
                  size="lg"
                  className="retro-button border-2 border-orange-400 bg-orange-500 text-black hover:bg-orange-600 hover:text-white font-pixel text-xs drop-shadow-[0_0_10px_#fb923c] hover:drop-shadow-[0_0_10px_#fb923c]"
                >
                  START
                </Button>
              </div>
          </Card>


          {/* Fibbage Card */}
          {/* <Card className="retro-button bg-gradient-to-b from-black via-black to-orange-900 border-2 border-orange-500 shadow-orange-500 p-8 hover:shadow-orange-500 transition-all duration-200 hover:scale-105 cursor-pointer group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="text-center space-y-6 relative z-10" onClick={() => navigate("/fibbage")}>
              <div className="w-20 h-20 bg-orange-900 border-2 border-orange-500 flex items-center justify-center mx-auto group-hover:animate-pulse">
                <img 
                  src="/fibbageicon.png" 
                  alt="Fibbage icon" 
                  className="w-12 h-12 mx-auto"
                />
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-arcade font-bold uppercase tracking-wider">
                  <span className="bg-gradient-to-r from-yellow-200 via-orange-400 to-orange-300 bg-clip-text text-transparent">
                    Fibbage
                  </span>
                </h2>
                <p className="font-pixel text-[10px] leading-relaxed bg-gradient-to-r from-orange-300 via-yellow-200 to-orange-400 bg-clip-text text-transparent">
                  [BLUFF] trivia deception game where you try to fool your friends with fake answers and guess the truth
                </p>
              </div>
              <Button
                variant="gaming"
                size="lg"
                className="retro-button border-2 border-orange-400 bg-orange-500 text-black hover:bg-orange-600 hover:text-white font-pixel text-xs drop-shadow-[0_0_10px_#fb923c] hover:drop-shadow-[0_0_10px_#fb923c]"
              >
                START
              </Button>
            </div>
          </Card> */}

        </div>
      </div>
    </div>
  );
};

export default Index;
