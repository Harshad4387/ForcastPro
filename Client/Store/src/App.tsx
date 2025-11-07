import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./pages/DashboardLayout";
import RawMaterialsPage from "./pages/RawMaterialsPage";
import ProductsPage from "./pages/ProductsPage";
import InwardProductsPage from "./pages/InwardProductsPage";
import SendProductRequestPage from "./pages/SendProductRequestPage";
import ViewRequestsPage from "./pages/ViewRequestsPage";
import NotFound from "./pages/NotFound";
import ViewAcceptedRequestsPage from "./pages/ViewAcceptedRequestsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/dashboard/raw-materials" replace />} />
            <Route path="raw-materials" element={<RawMaterialsPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="inward-products" element={<InwardProductsPage />} />
            <Route path="send-request" element={<SendProductRequestPage />} />
            <Route path="view-requests" element={<ViewRequestsPage />} />
            <Route path="view-accepted-requests" element={<ViewAcceptedRequestsPage />} />

          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
