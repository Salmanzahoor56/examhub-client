import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import StudentDashboard from './screens/StudentDashboard';
import AdminDashboard from './screens/AdminDashboard';
import ExamScreen from './screens/ExamScreen';
import ResultScreen from './screens/ResultScreen';
import ProfileScreen from './screens/ProfileScreen';
import RankingScreen from './screens/RankingScreen';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

const App = () => {
  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            borderRadius: '12px',
            background: '#1e293b',
            color: '#fff',
            fontWeight: 600,
            padding: '14px 20px',
            boxShadow: '0 12px 32px rgba(15,23,42,0.25)',
          },
          success: { iconTheme: { primary: '#10b981', secondary: '#fff' } },
          error:   { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
        }}
      />
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/dashboard" element={<PrivateRoute><StudentDashboard /></PrivateRoute>} />
            <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/exam/:id" element={<PrivateRoute><ExamScreen /></PrivateRoute>} />
            <Route path="/result/:id" element={<PrivateRoute><ResultScreen /></PrivateRoute>} />
            <Route path="/ranking" element={<PrivateRoute><RankingScreen /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><ProfileScreen /></PrivateRoute>} />
          </Routes>
        </Container>
      </main>
      <BottomNav />
      <Footer />
    </Router>
  );
};

export default App;