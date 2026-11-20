import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { AlertTriangle, Loader2, RefreshCw } from 'lucide-react';
import { Claim } from './types/claim';
import { fetchClaims, createClaim, updateClaim } from './services/claimsService';
import { exportClaimsToCSV } from './utils/csvExport';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ClaimsListPage } from './pages/ClaimsListPage';
import { ClaimDetailPage } from './pages/ClaimDetailPage';
import { NewClaimModal } from './components/NewClaimModal';

const SentryRoutes = Sentry.withSentryReactRouterV7Routing(Routes);

const AppContent: React.FC = () => {
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
    void loadClaims();
  }, [loadClaims]);

  const handleUpdateClaim = async (updatedClaim: Claim): Promise<void> => {
    const saved = await updateClaim(updatedClaim);
    setClaims((prev) => prev.map((c) => (c.id === saved.id ? saved : c)));
  };

  const handleCreateClaim = async (newClaim: Claim): Promise<void> => {
    const saved = await createClaim(newClaim);
    setClaims((prev) => [saved, ...prev]);
    navigate(`/claims/${saved.id}`);
  };

  const handleExportCSV = () => {
    exportClaimsToCSV(claims);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 antialiased">
      {/* Top Corporate Navigation */}
      <Header
        onOpenNewClaimModal={() => setIsNewModalOpen(true)}
        onExportCSV={handleExportCSV}
        totalClaimsCount={claims.length}
      />

      {/* Main Workspace Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {isLoading ? (
          <div className="bg-white border border-slate-200 rounded-lg p-12 text-center shadow-sm my-8">
            <Loader2 className="w-7 h-7 text-blue-700 animate-spin mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-800">Loading Claims Registry...</p>
            <p className="text-xs text-slate-500 mt-1">Synchronizing records with the claims datastore.</p>
          </div>
        ) : errorMessage ? (
          <div className="bg-white border border-rose-200 rounded-lg p-8 text-center max-w-lg mx-auto shadow-sm my-8">
            <AlertTriangle className="w-9 h-9 text-rose-600 mx-auto mb-3" />
            <h2 className="text-sm font-semibold text-slate-900">Unable to Load Claims</h2>
            <p className="text-xs text-slate-600 mt-1 mb-4">{errorMessage}</p>
            <button
              type="button"
              onClick={() => void loadClaims()}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-md text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 transition shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
          </div>
        ) : (
          <SentryRoutes>
            <Route path="/" element={<ClaimsListPage claims={claims} />} />
            <Route
              path="/claims/:claimId"
              element={<ClaimDetailPage claims={claims} onUpdateClaim={handleUpdateClaim} />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </SentryRoutes>
        )}
      </main>

      {/* Enterprise Corporate Footer */}
      <Footer />

      {/* File New Claim Modal */}
      <NewClaimModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onCreateClaim={handleCreateClaim}
      />
    </div>
  );
};

const ErrorFallback: React.FC<{ resetError: () => void }> = ({ resetError }) => (
  <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 text-slate-900">
    <div className="bg-white border border-rose-200 rounded-lg p-8 text-center max-w-lg w-full shadow-sm">
      <AlertTriangle className="w-9 h-9 text-rose-600 mx-auto mb-3" />
      <h2 className="text-sm font-semibold text-slate-900">Something went wrong</h2>
      <p className="text-xs text-slate-600 mt-1 mb-4">
        An unexpected error occurred and has been reported to our monitoring team.
      </p>
      <button
        type="button"
        onClick={resetError}
        className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-md text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 transition shadow-sm"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        <span>Try Again</span>
      </button>
    </div>
  </div>
);

export const App: React.FC = () => {
  return (
    <Sentry.ErrorBoundary fallback={({ resetError }) => <ErrorFallback resetError={resetError} />}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Sentry.ErrorBoundary>
  );
};

export default App;
