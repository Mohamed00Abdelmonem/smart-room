import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import { VisualizerProvider } from './context/VisualizerContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/layout/CartDrawer';
import { TryInRoomModal } from './components/experienceA/TryInRoomModal';
import { ProductDetailModal } from './components/common/ProductDetailModal';
import { BookDemoModal } from './components/b2b/BookDemoModal';
import { ProposalComparisonModal } from './components/experienceB/ProposalComparisonModal';
import { Toast } from './components/common/Toast';

// Pages
import { HomePage } from './pages/HomePage';
import { ShowroomPage } from './pages/ShowroomPage';
import { VisualizerPage } from './pages/VisualizerPage';
import { DashboardPage } from './pages/DashboardPage';
import { IntegrationPage } from './pages/IntegrationPage';

// Scroll to top helper
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <CartProvider>
            <VisualizerProvider>
              <ScrollToTop />
              <div className="min-h-screen flex flex-col bg-white text-[#292722] dark:bg-[#121110] dark:text-[#F8F7F3] transition-colors duration-300">
                <Navbar />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/showroom" element={<ShowroomPage />} />
                    <Route path="/visualizer" element={<VisualizerPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/integration" element={<IntegrationPage />} />
                    <Route path="*" element={<HomePage />} />
                  </Routes>
                </main>
                <Footer />

                {/* Global Modals & Drawers */}
                <TryInRoomModal />
                <ProductDetailModal />
                <BookDemoModal />
                <ProposalComparisonModal />
                <CartDrawer />
                <Toast />
              </div>
            </VisualizerProvider>
          </CartProvider>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
