import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import HomePage from './pages/HomePage';
import DirectionPage from './pages/DirectionPage';
import AdminPage from './pages/AdminPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route
          path="*"
          element={
            <div className="min-h-screen bg-white font-sans">
              <Header />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/japan" element={<DirectionPage countryId="japan" />} />
                <Route path="/germany" element={<DirectionPage countryId="germany" />} />
              </Routes>
              <Footer />
              <BackToTop />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
