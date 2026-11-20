import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { AlertTriangle, Loader2, RefreshCw } from 'lucide-react';
import { Claim } from './types/claim';
import { fetchClaims, createClaim, updateClaim, deleteClaim } from './services/claimsService';
import { exportClaimsToCSV } from './utils/csvExport';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DashboardLayout } from './components/DashboardLayout';
import { DashboardPage } from './pages/DashboardPage';
import { ClaimsListPage } from './pages/ClaimsListPage';
import { ClaimDetailPage } from './pages/ClaimDetailPage';
import { LoginPage } from './pages/LoginPage';
import { UsersPage } from './pages/UsersPage';
import { NewClaimModal } from './components/NewClaimModal';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';

const SentryRoutes = Sentry.withSentryReactRouterV7Routing(Routes);

const AuthenticatedApp: React.FC = () => {
  const { profile, isSuperAdmin, signOut } = useAuth();
  const [claims, setClaims] = useState<Claim[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const loadClaims = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const loaded = await fetchClaims();
      setClaims(loaded);
    } catch (err) {
      Sentry.captureException(err);
      setErrorMessage(
        err instanceof Error ? err.message : 'Unable to load claims. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (profile) {
      void loadClaims();
    } else {
      setClaims([]);
    }
  }, [profile, loadClaims]);

  const handleUpdateClaim = async (updatedClaim: Claim): Promise<void> => {
    const saved = await updateClaim(updatedClaim);
    setClaims((prev) => prev.map((c) => (c.id === saved.id ? saved : c)));
  };

  const handleCreateClaim = async (newClaim: Claim): Promise<void> => {
    const saved = await createClaim(newClaim);
    setClaims((prev) => [saved, ...prev]);
    navigate(`/claims/${saved.id}`);
  };

  const handleDeleteClaim = async (claimId: string): Promise<void> => {
    await deleteClaim(claimId);
    setClaims((prev) => prev.filter((c) => c.id !== claimId));
  };

  const handleExportCSV = () => {
    exportClaimsToCSV(claims);
  };

  if (!profile) {
    return null;
  }

  const loadingPanel = (
    <Card className="p-12 text-center my-6">
      <Loader2 className="w-6 h-6 text-foreground animate-spin mx-auto mb-3" />
      <p className="text-sm font-semibold text-foreground">Loading Claims Registry...</p>
      <p className="text-xs text-muted-foreground mt-1">
        Synchronizing records with Supabase.
      </p>
    </Card>
  );

  const errorPanel = (
    <Card className="p-8 text-center max-w-lg mx-auto my-8 border-rose-200">
      <AlertTriangle className="w-8 h-8 text-rose-600 mx-auto mb-3" />
      <h2 className="text-sm font-semibold text-foreground">Unable to Load Claims</h2>
      <p className="text-xs text-muted-foreground mt-1 mb-4">{errorMessage}</p>
      <Button type="button" size="sm" onClick={() => void loadClaims()}>
        <RefreshCw className="w-3.5 h-3.5" />
        <span>Retry</span>
      </Button>
    </Card>
  );

  return (
    <>
      <DashboardLayout
        claims={claims}
        profile={profile}
        onOpenNewClaimModal={() => setIsNewModalOpen(true)}
        onExportCSV={handleExportCSV}
        onSignOut={signOut}
      >
        <SentryRoutes>
          <Route
            path="/"
            element={
              isLoading ? (
                loadingPanel
              ) : errorMessage ? (
                errorPanel
              ) : (
                <DashboardPage
                  claims={claims}
                  profile={profile}
                  onOpenNewClaimModal={() => setIsNewModalOpen(true)}
                />
              )
            }
          />
          <Route
            path="/claims"
            element={
              isLoading ? (
                loadingPanel
              ) : errorMessage ? (
                errorPanel
              ) : (
                <ClaimsListPage claims={claims} />
              )
            }
          />
          <Route
            path="/claims/:claimId"
            element={
              isLoading ? (
                loadingPanel
              ) : (
                <ClaimDetailPage
                  claims={claims}
                  onUpdateClaim={handleUpdateClaim}
                  onDeleteClaim={isSuperAdmin ? handleDeleteClaim : undefined}
                />
              )
            }
          />
          <Route
            path="/users"
            element={isSuperAdmin ? <UsersPage /> : <Navigate to="/" replace />}
          />
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </SentryRoutes>
      </DashboardLayout>

      {/* File New Claim Modal */}
      <NewClaimModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onCreateClaim={handleCreateClaim}
      />
    </>
  );
};

const AppShell: React.FC = () => {
  const { profile, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="w-6 h-6 text-foreground animate-spin mx-auto mb-3" />
          <p className="text-sm font-semibold text-foreground">Verifying Session...</p>
          <p className="text-xs text-muted-foreground mt-1">
            Connecting to Acme Insurance directory.
          </p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <SentryRoutes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </SentryRoutes>
    );
  }

  return <AuthenticatedApp />;
};

const ErrorFallback: React.FC<{ resetError: () => void }> = ({ resetError }) => (
  <div className="min-h-screen bg-background flex items-center justify-center p-4 text-foreground">
    <Card className="p-8 text-center max-w-lg w-full border-rose-200">
      <AlertTriangle className="w-8 h-8 text-rose-600 mx-auto mb-3" />
      <h2 className="text-sm font-semibold text-foreground">Something went wrong</h2>
      <p className="text-xs text-muted-foreground mt-1 mb-4">
        An unexpected error occurred and has been reported to our monitoring team.
      </p>
      <Button type="button" size="sm" onClick={resetError}>
        <RefreshCw className="w-3.5 h-3.5" />
        <span>Try Again</span>
      </Button>
    </Card>
  </div>
);

export const App: React.FC = () => {
  return (
    <Sentry.ErrorBoundary fallback={({ resetError }) => <ErrorFallback resetError={resetError} />}>
      <BrowserRouter>
        <AuthProvider>
          <AppShell />
        </AuthProvider>
      </BrowserRouter>
    </Sentry.ErrorBoundary>
  );
};

export default App;
