import React from 'react';
import { Routes, Route, Navigate } from 'react-router';
import { useAuth, UserRole } from './contexts/AuthContext';

// --- Landing ---
import { NavigationModern } from './components/NavigationModern';
import { HeroModern } from './components/HeroModern';
import { WhyUseSection } from './components/WhyUseSection';
import { ExperienceSectionModern } from './components/ExperienceSectionModern';
import { ImpactSectionModern } from './components/ImpactSectionModern';
import { HowItWorksSectionModern } from './components/HowItWorksSectionModern';
import { PartnersSectionModern } from './components/PartnersSectionModern';
import { FAQSectionModern } from './components/FAQSectionModern';
import { CTASectionModern } from './components/CTASectionModern';
import { FooterModern } from './components/FooterModern';

// --- Auth ---
import { LoginScreen } from './views/auth/LoginScreen';

// --- Customer ---
import { HomeScreen } from './views/customer/HomeScreen';
import { BoxDetailsScreen } from './views/customer/BoxDetailsScreen';
import { CheckoutScreen } from './views/customer/CheckoutScreen';
import { OrdersScreen } from './views/customer/OrdersScreen';
import { ProfileScreen } from './views/customer/ProfileScreen';

// --- Store Owner ---
import { StoreDashboardScreen } from './views/store/StoreDashboardScreen';
import { InventoryScreen } from './views/store/InventoryScreen';
import { BoxFormScreen } from './views/store/BoxFormScreen';
import { ScannerScreen } from './views/store/ScannerScreen';

// --- Super Admin ---
import { AdminLayout } from './views/admin/AdminLayout';
import { AdminOverviewScreen } from './views/admin/AdminOverviewScreen';
import { PaymentQueueScreen } from './views/admin/PaymentQueueScreen';
import { UsersScreen } from './views/admin/UsersScreen';
import { StoresScreen } from './views/admin/StoresScreen';
import { SecurityScreen } from './views/admin/SecurityScreen';

const LandingPage = () => (
  <div style={{ fontFamily: "'Inter', 'Outfit', sans-serif", backgroundColor: '#FFF8F0' }}>
    <NavigationModern />
    <HeroModern />
    <WhyUseSection />
    <ExperienceSectionModern />
    <ImpactSectionModern />
    <HowItWorksSectionModern />
    <PartnersSectionModern />
    <FAQSectionModern />
    <CTASectionModern />
    <FooterModern />
  </div>
);

// Protected Route Wrapper
const RequireAuth = ({ children, allowedRole }: { children: React.ReactNode; allowedRole: UserRole }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role !== allowedRole) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginScreen />} />

      {/* Customer Routes */}
      <Route path="/app/home" element={<RequireAuth allowedRole="customer"><HomeScreen /></RequireAuth>} />
      <Route path="/app/box/:id" element={<RequireAuth allowedRole="customer"><BoxDetailsScreen /></RequireAuth>} />
      <Route path="/app/checkout" element={<RequireAuth allowedRole="customer"><CheckoutScreen /></RequireAuth>} />
      <Route path="/app/orders" element={<RequireAuth allowedRole="customer"><OrdersScreen /></RequireAuth>} />
      <Route path="/app/profile" element={<RequireAuth allowedRole="customer"><ProfileScreen /></RequireAuth>} />

      {/* Store Owner Routes */}
      <Route path="/store/dashboard" element={<RequireAuth allowedRole="store_owner"><StoreDashboardScreen /></RequireAuth>} />
      <Route path="/store/inventory" element={<RequireAuth allowedRole="store_owner"><InventoryScreen /></RequireAuth>} />
      <Route path="/store/box/:id" element={<RequireAuth allowedRole="store_owner"><BoxFormScreen /></RequireAuth>} />
      <Route path="/store/scanner" element={<RequireAuth allowedRole="store_owner"><ScannerScreen /></RequireAuth>} />

      {/* Super Admin Routes */}
      <Route path="/admin" element={<RequireAuth allowedRole="super_admin"><AdminLayout /></RequireAuth>}>
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<AdminOverviewScreen />} />
        <Route path="payments" element={<PaymentQueueScreen />} />
        <Route path="users" element={<UsersScreen />} />
        <Route path="stores" element={<StoresScreen />} />
        <Route path="security" element={<SecurityScreen />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
