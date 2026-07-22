import { BrowserRouter, Routes, Route, Navigate, Outlet, useParams } from 'react-router-dom';
import useAuthStore from './store/authStore';
import LoginPage from './components/auth/LoginPage';
import AppShell from './components/layout/AppShell';

import OverviewPage from './components/dashboard/OverviewPage';
import SectionPage from './components/animals/SectionPage';
import AnimalDetailPage from './components/animals/AnimalDetailPage';
import AnimalForm from './components/animals/AnimalForm';
import PhotosPage from './components/animals/PhotosPage';

import DeathsPage from './components/health/DeathsPage';
import SickPage from './components/health/SickPage';
import VaccinationsPage from './components/health/VaccinationsPage';
import CertificatesPage from './components/health/CertificatesPage';
import WeightPage from './components/weight/WeightPage';

import StoreRevenuePage from './components/financial/StoreRevenuePage';
import OfflineSalesPage from './components/financial/OfflineSalesPage';
import BankTransfersPage from './components/financial/BankTransfersPage';
import ExpensesPage from './components/financial/ExpensesPage';
import FinancialReportPage from './components/financial/FinancialReportPage';

import SupervisorListPage from './components/supervisors/SupervisorListPage';
import SaleApprovalsPage from './components/approvals/SaleApprovalsPage';
import AnalyticsPage from './components/analytics/AnalyticsPage';
import SettingsPage from './components/settings/SettingsPage';

const VALID_SECTIONS = ['cattle', 'sheep', 'goat'];

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated()) return <Navigate to="/login" replace />;
  if (adminOnly && user?.role !== 'super_admin') return <Navigate to={`/dashboard/${user?.role}`} replace />;
  return children;
};

const SectionGuard = () => {
  const { section } = useParams();
  const { user } = useAuthStore();
  if (!VALID_SECTIONS.includes(section)) return <Navigate to="/dashboard" replace />;
  if (user?.role !== 'super_admin' && user?.role !== section) return <Navigate to={`/dashboard/${user?.role}`} replace />;
  return <Outlet />;
};

const DashboardIndex = () => {
  const { user } = useAuthStore();
  if (user?.role === 'super_admin') return <OverviewPage />;
  return <Navigate to={`/dashboard/${user?.role}`} replace />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AppShell />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardIndex />} />

          {/* Section routes — cattle/sheep/goat with sub-pages */}
          <Route path=":section" element={<SectionGuard />}>
            <Route index element={<SectionPage />} />
            <Route path="overview" element={<SectionPage />} />
            <Route path="all" element={<SectionPage />} />
            <Route path="males" element={<SectionPage filter="males" />} />
            <Route path="females" element={<SectionPage filter="females" />} />
            <Route path="young" element={<SectionPage filter="young" />} />
            <Route path="pregnant" element={<SectionPage filter="pregnant" />} />
            <Route path="deaths" element={<DeathsPage />} />
            <Route path="sick" element={<SickPage />} />
            <Route path="vaccinations" element={<VaccinationsPage />} />
            <Route path="certificates" element={<CertificatesPage />} />
            <Route path="weight" element={<WeightPage />} />
            <Route path="new" element={<AnimalForm />} />
            <Route path=":id" element={<AnimalDetailPage />} />
            <Route path=":id/edit" element={<AnimalForm />} />
            <Route path=":id/photos" element={<PhotosPage />} />
          </Route>

          {/* Financial routes — super_admin only */}
          <Route path="financial/store-revenue" element={<ProtectedRoute adminOnly><StoreRevenuePage /></ProtectedRoute>} />
          <Route path="financial/offline-sales" element={<ProtectedRoute adminOnly><OfflineSalesPage /></ProtectedRoute>} />
          <Route path="financial/bank" element={<ProtectedRoute adminOnly><BankTransfersPage /></ProtectedRoute>} />
          <Route path="financial/expenses" element={<ProtectedRoute adminOnly><ExpensesPage /></ProtectedRoute>} />
          <Route path="financial/report" element={<ProtectedRoute adminOnly><FinancialReportPage /></ProtectedRoute>} />

          {/* Super Admin only */}
          <Route path="supervisors" element={<ProtectedRoute adminOnly><SupervisorListPage /></ProtectedRoute>} />
          <Route path="approvals" element={<ProtectedRoute adminOnly><SaleApprovalsPage /></ProtectedRoute>} />
          <Route path="analytics" element={<ProtectedRoute adminOnly><AnalyticsPage /></ProtectedRoute>} />
          <Route path="settings" element={<ProtectedRoute adminOnly><SettingsPage /></ProtectedRoute>} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
