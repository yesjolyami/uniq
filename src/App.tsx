import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import HomePage from './pages/HomePage';
import DirectionPage from './pages/DirectionPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 font-sans selection:bg-primary/10">
        <Header />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/japan" element={<DirectionPage countryId="japan" />} />
          <Route path="/germany" element={<DirectionPage countryId="germany" />} />
        </Routes>

        <Footer />
        <BackToTop />
      </div>
    </BrowserRouter>
  );
}
