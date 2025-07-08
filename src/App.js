import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import HeroSection from './Components/HeroSection';
import Replacer from './Components/Replacer';
import Chatbot from './Components/Chatbot';
import Recipes from './Components/Recipes';
import Community from './Components/Community';
import Register from './Components/Register';
import Login from './Components/Login';
import SavedRecipes from './Components/SavedRecipes';
import Shopping from './Components/Shopping';

function App() {
  return (
    <Router>
      <Navbar />
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
      </Routes>
    </Router>
  );
}

export default App;
