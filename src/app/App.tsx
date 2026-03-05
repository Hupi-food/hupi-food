import React from 'react';
import { Routes, Route, Navigate } from 'react-router';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { useAuth, UserRole } from './contexts/AuthContext';
import { SupabaseHealthCheck } from './views/SupabaseHealthCheck';

// --- Landing ---
import { NavigationModern } from './components/NavigationModern';
import { HeroInnovative } from './components/HeroInnovative';
import { MysteryBoxesSection } from './components/MysteryBoxesSection';
import { HowItWorksInnovative } from './components/HowItWorksInnovative';
import { ImpactSectionInnovative } from './components/ImpactSectionInnovative';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSectionInnovative } from './components/FAQSectionInnovative';
import { FooterInnovative } from './components/FooterInnovative';

// --- Auth ---
import { LoginScreen } from './views/auth/LoginScreen';
import { RegisterScreen } from './views/auth/RegisterScreen';
import { RegisterStoreScreen } from './views/auth/RegisterStoreScreen';
import { PendingApprovalScreen } from './views/auth/PendingApprovalScreen';

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
  <div style={{ fontFamily: "'Inter', 'Outfit', sans-serif", backgroundColor: '#0A0E27' }}>
    <NavigationModern />
    <HeroInnovative />
    <MysteryBoxesSection />
    <HowItWorksInnovative />
    <ImpactSectionInnovative />
    <TestimonialsSection />
    <FAQSectionInnovative />
    <FooterInnovative />
  </div>
);

// Protected Route Wrapper
const RequireAuth = ({ children, allowedRole }: { children: React.ReactNode; allowedRole: UserRole }) => {
  const { user, isAuthenticated, isPendingApproval } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // Si está pendiente de aprobación y es store_owner, solo puede ver la pantalla de pendiente
  if (isPendingApproval && user?.role === 'store_owner' && allowedRole === 'store_owner') {
    return <Navigate to="/store/pending" replace />;
  }

  if (user?.role !== allowedRole) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/health" element={<SupabaseHealthCheck />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/register/store" element={<RegisterStoreScreen />} />
        <Route path="/store/pending" element={
          <RequireAuth allowedRole="store_owner">
            <PendingApprovalScreen />
          </RequireAuth>
        } />

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
      <SpeedInsights />
    </>
  );
}
