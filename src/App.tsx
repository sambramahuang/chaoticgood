import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Game from "./pages/Game";
import WavelengthGame from "./pages/WavelengthGame";
import CustomQuestions from "./pages/CustomQuestions";
import NotFound from "./pages/NotFound";
import BattleRoyale from "@/pages/BattleRoyale";
import InOtherWords from "@/pages/iow";
import KingsCup from "@/pages/kingscup";
import FibbageGame from "./pages/fibbage";
import TermsConditions from "@/pages/termsconditions";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/game/:mode" element={<Game />} />
          <Route path="/wavelength" element={<WavelengthGame />} />
          <Route path="/custom-questions" element={<CustomQuestions />} />
          <Route path="/battleroyale" element={<BattleRoyale />} />
          <Route path="/inotherwords" element={<InOtherWords />} />
          <Route path="/kingscup" element={<KingsCup />} />
          {/* <Route path="/fibbage" element={<FibbageGame />} /> */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="/termsconditions" element={<TermsConditions />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
