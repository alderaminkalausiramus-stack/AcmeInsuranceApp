import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Claim } from './types/claim';
import { loadStoredClaims, saveStoredClaims, resetStoredClaims, exportClaimsToCSV } from './utils/storage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ClaimsListPage } from './pages/ClaimsListPage';
import { ClaimDetailPage } from './pages/ClaimDetailPage';
import { NewClaimModal } from './components/NewClaimModal';

const AppContent: React.FC = () => {
  const [claims, setClaims] = useState<Claim[]>(() => loadStoredClaims());
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const navigate = useNavigate();

  // Ensure names and image URLs are immediately sanitized in active browser sessions
  useEffect(() => {
    const needsFresh = claims.some((c) =>
      /\[mock\]|\[test\]|\(demo\)|sarah|james|derek|elena|marcus|linda|robert|jenkins|montgomery|vance|sterling|hastings/i.test(
        c.customer?.name || ''
      ) ||
      c.attachments?.some((a) => a.previewUrl && a.previewUrl.includes('unsplash')) ||
      (c.customer?.avatarUrl && c.customer.avatarUrl.includes('unsplash'))
    );
    if (needsFresh) {
      const refreshed = resetStoredClaims();
      setClaims(refreshed);
    }
  }, [claims]);

  const handleUpdateClaim = (updatedClaim: Claim) => {
    const updated = claims.map((c) => (c.id === updatedClaim.id ? updatedClaim : c));
    setClaims(updated);
    saveStoredClaims(updated);
  };

  const handleCreateClaim = (newClaim: Claim) => {
    const updated = [newClaim, ...claims];
    setClaims(updated);
    saveStoredClaims(updated);
    navigate(`/claims/${newClaim.id}`);
  };

  const handleResetData = () => {
    if (window.confirm('Reset all claims back to the default seed records? All customized decisions and timeline notes will be restored to defaults.')) {
      const resetList = resetStoredClaims();
      setClaims(resetList);
      navigate('/');
    }
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
        onResetData={handleResetData}
        totalClaimsCount={claims.length}
      />

      {/* Main Workspace Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Routes>
          <Route path="/" element={<ClaimsListPage claims={claims} />} />
          <Route
            path="/claims/:claimId"
            element={<ClaimDetailPage claims={claims} onUpdateClaim={handleUpdateClaim} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Enterprise Corporate Footer */}
      <Footer />

      {/* Simulate New Claim Modal */}
      <NewClaimModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onCreateClaim={handleCreateClaim}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
