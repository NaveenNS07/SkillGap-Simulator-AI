import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Authenticated Workspace Pages
import DashboardPage from './pages/DashboardPage';
import CareerExplorerPage from './pages/CareerExplorerPage';
import SimulationSetupPage from './pages/SimulationSetupPage';
import SimulationWorkspacePage from './pages/SimulationWorkspacePage';
import SimulationResultsPage from './pages/SimulationResultsPage';
import SkillProfilePage from './pages/SkillProfilePage';
import SkillGapPage from './pages/SkillGapPage';
import CareerRoadmapPage from './pages/CareerRoadmapPage';
import HistoryPage from './pages/HistoryPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Authenticated Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/careers" 
            element={
              <ProtectedRoute>
                <CareerExplorerPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/simulations/setup/:careerId" 
            element={
              <ProtectedRoute>
                <SimulationSetupPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/simulations/workspace/:simulationId" 
            element={
              <ProtectedRoute>
                <SimulationWorkspacePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/simulations/results/:simulationId" 
            element={
              <ProtectedRoute>
                <SimulationResultsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile/skills" 
            element={
              <ProtectedRoute>
                <SkillProfilePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/skill-gaps" 
            element={
              <ProtectedRoute>
                <SkillGapPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/roadmap" 
            element={
              <ProtectedRoute>
                <CareerRoadmapPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/history" 
            element={
              <ProtectedRoute>
                <HistoryPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
