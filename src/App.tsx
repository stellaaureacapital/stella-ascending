import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import ServiceDetail from "./pages/ServiceDetail.tsx";
import Market from "./pages/Market.tsx";
import Artigos from "./pages/Artigos.tsx";
import Artigo from "./pages/Artigo.tsx";
import Sobre from "./pages/Sobre.tsx";
import Solucoes from "./pages/Solucoes.tsx";
import Contato from "./pages/Contato.tsx";
import Privacidade from "./pages/Privacidade.tsx";
import Cookies from "./pages/Cookies.tsx";
import Termos from "./pages/Termos.tsx";
import Disclaimer from "./pages/Disclaimer.tsx";
import Lgpd from "./pages/Lgpd.tsx";
import Seguranca from "./pages/Seguranca.tsx";
import CookieBanner from "./components/site/CookieBanner";
import { useEffect } from "react";
import { initConsent } from "./lib/consent";
import { LanguageProvider } from "./i18n/LanguageContext";
import { AuthProvider } from "./hooks/use-auth";
import Login from "./pages/auth/Login";
import Cadastro from "./pages/auth/Cadastro";
import EsqueciSenha from "./pages/auth/EsqueciSenha";
import ResetPassword from "./pages/auth/ResetPassword";
import ProtectedRoute from "./components/area/ProtectedRoute";
import AreaLayout from "./components/area/AreaLayout";
import MinhaConta from "./pages/area/MinhaConta";
import MeusProdutos from "./pages/area/MeusProdutos";
import MeusEbooks from "./pages/area/MeusEbooks";
import MeusCursos from "./pages/area/MeusCursos";
import RelatoriosPremium from "./pages/area/RelatoriosPremium";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    initConsent();
  }, []);
  return (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/solucoes" element={<Solucoes />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/servicos/:slug" element={<ServiceDetail />} />
            <Route path="/mercado" element={<Market />} />
            <Route path="/artigos" element={<Artigos />} />
            <Route path="/artigos/:slug" element={<Artigo />} />
            <Route path="/privacidade" element={<Privacidade />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/termos" element={<Termos />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/lgpd" element={<Lgpd />} />
            <Route path="/seguranca" element={<Seguranca />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/esqueci-senha" element={<EsqueciSenha />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
              path="/area"
              element={
                <ProtectedRoute>
                  <AreaLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<MinhaConta />} />
              <Route path="minha-conta" element={<MinhaConta />} />
              <Route path="meus-produtos" element={<MeusProdutos />} />
              <Route path="meus-ebooks" element={<MeusEbooks />} />
              <Route path="meus-cursos" element={<MeusCursos />} />
              <Route path="relatorios-premium" element={<RelatoriosPremium />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <CookieBanner />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
  );
};

export default App;
