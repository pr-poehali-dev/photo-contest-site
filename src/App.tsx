import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ParticipantDashboard from "./pages/ParticipantDashboard";
import JudgeDashboard from "./pages/JudgeDashboard";
import PhotoUpload from "./pages/PhotoUpload";
import VotingInterface from "./pages/VotingInterface";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/participant" element={<ParticipantDashboard />} />
          <Route path="/participant/upload" element={<PhotoUpload />} />
          <Route path="/judge" element={<JudgeDashboard />} />
          <Route path="/judge/voting" element={<VotingInterface />} />
          <Route path="/auth/login" element={<Auth />} />
          <Route path="/auth/register" element={<Auth />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
