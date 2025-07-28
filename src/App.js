import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Loader from './Components/Loader'; // <-- Import loader
import { AuthProvider } from './context/AuthContext';

// Lazy load components
const HeroSection = lazy(() => import('./Components/HeroSection'));
const Replacer = lazy(() => import('./Components/Replacer'));
const Chatbot = lazy(() => import('./Components/Chatbot'));
const Recipes = lazy(() => import('./Components/Recipes'));
const Community = lazy(() => import('./Components/Community'));
const Register = lazy(() => import('./Components/Register'));
const Login = lazy(() => import('./Components/Login'));
const SavedRecipes = lazy(() => import('./Components/SavedRecipes'));
const Shopping = lazy(() => import('./Components/Shopping'));
const MoodSelector = lazy(() => import('./Components/MoodSelector'));
const Dashboard = lazy(() => import('./Components/Dashboard'));


function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/replacer" element={<Replacer />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/community" element={<Community />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/saved-recipes" element={<SavedRecipes />} />
            <Route path="/shopping" element={<Shopping />} />
            <Route path="/moodmeals" element={<MoodSelector />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
