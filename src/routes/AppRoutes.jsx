import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import Header from '../components/shared/Header';

// Lazy load components for better performance
const LandingPage = React.lazy(() => import('../components/landing/LandingPage'));
const ModeSelect = React.lazy(() => import('../components/modes/ModeSelect'));
const GameEntry = React.lazy(() => import('../components/game/GameEntry'));
const GameBoard = React.lazy(() => import('../components/game/GameBoard'));
const GameStats = React.lazy(() => import('../components/stats/GameStats'));
const Settings = React.lazy(() => import('../components/settings/Settings'));

function AppRoutes() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <main className="main-content">
          <Suspense fallback={<LoadingSpinner text="Loading page..." />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/modes" element={<ModeSelect />} />
              <Route path="/entry" element={<GameEntry />} />
              <Route path="/game" element={<GameBoard />} />
              <Route path="/stats" element={<GameStats />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default AppRoutes;
