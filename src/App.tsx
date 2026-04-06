import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "./components/AppLayout";
import Index from "./pages/Index";
import Pacientes from "./pages/Pacientes";
import Medicos from "./pages/Medicos";
import Agendamentos from "./pages/Agendamentos";
import Prontuarios from "./pages/Prontuarios";
import Logs from "./pages/Logs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout><Index /></AppLayout>} />
          <Route path="/pacientes" element={<AppLayout><Pacientes /></AppLayout>} />
          <Route path="/medicos" element={<AppLayout><Medicos /></AppLayout>} />
          <Route path="/agendamentos" element={<AppLayout><Agendamentos /></AppLayout>} />
          <Route path="/prontuarios" element={<AppLayout><Prontuarios /></AppLayout>} />
          <Route path="/logs" element={<AppLayout><Logs /></AppLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
