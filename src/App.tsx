import React from 'react';
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
import { EgyptPaymentModal } from './components/checkout/EgyptPaymentModal';
import { Toast } from './components/common/Toast';
import { ScrollToTop } from './components/common/ScrollToTop';

// Platform Core Pages
import { HomePage } from './pages/HomePage';
import { ShowroomPage } from './pages/ShowroomPage';
import { VisualizerPage } from './pages/VisualizerPage';
import { DashboardPage } from './pages/DashboardPage';
import { IntegrationPage } from './pages/IntegrationPage';

// Store Builder Module
import { StoreBuilderProvider } from './modules/storeBuilder/context/StoreBuilderContext';
import { StoreBuilderLayout } from './modules/storeBuilder/components/layout/StoreBuilderLayout';
import { StoreOverviewView } from './modules/storeBuilder/views/StoreOverviewView';
import { WebsiteBuilderView } from './modules/storeBuilder/views/WebsiteBuilderView';
import { PagesManagementView } from './modules/storeBuilder/views/PagesManagementView';
import { DesignBrandingView } from './modules/storeBuilder/views/DesignBrandingView';
import { ProductsManagementView } from './modules/storeBuilder/views/ProductsManagementView';
import { CollectionsView } from './modules/storeBuilder/views/CollectionsView';
import { OrdersManagementView } from './modules/storeBuilder/views/OrdersManagementView';
import { CustomersView } from './modules/storeBuilder/views/CustomersView';
import { StoreSettingsView } from './modules/storeBuilder/views/StoreSettingsView';
import { PublicStoreView } from './modules/storeBuilder/views/PublicStoreView';

const AppContent: React.FC = () => {
  const location = useLocation();

  // Complete UI isolation for Store Builder module & Public Storefronts
  const isStoreBuilderRoute = location.pathname.startsWith('/my-store');
  const isPublicStoreRoute = location.pathname.startsWith('/store');

  if (isStoreBuilderRoute) {
    return (
      <StoreBuilderProvider>
        <Routes>
          <Route path="/my-store" element={<StoreBuilderLayout />}>
            <Route index element={<StoreOverviewView />} />
            <Route path="builder" element={<WebsiteBuilderView />} />
            <Route path="pages" element={<PagesManagementView />} />
            <Route path="branding" element={<DesignBrandingView />} />
            <Route path="products" element={<ProductsManagementView />} />
            <Route path="collections" element={<CollectionsView />} />
            <Route path="orders" element={<OrdersManagementView />} />
            <Route path="customers" element={<CustomersView />} />
            <Route path="settings" element={<StoreSettingsView />} />
          </Route>
        </Routes>
      </StoreBuilderProvider>
    );
  }

  if (isPublicStoreRoute) {
    return (
      <Routes>
        <Route path="/store/:storeSlug" element={<PublicStoreView />} />
        <Route path="/store/:storeSlug/:pageSlug" element={<PublicStoreView />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-[#292722] dark:bg-[#121110] dark:text-[#F8F7F3] transition-colors duration-300">
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
      <EgyptPaymentModal />
      <CartDrawer />
      <Toast />
    </div>
  );
};

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <CartProvider>
            <VisualizerProvider>
              <ScrollToTop />
              <AppContent />
            </VisualizerProvider>
          </CartProvider>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
