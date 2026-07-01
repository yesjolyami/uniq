import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import HomePage from './pages/HomePage';
import DirectionPage from './pages/DirectionPage';
import AdminPage from './pages/AdminPage';
import CompanyPage from './pages/CompanyPage';
import EmploymentPage from './pages/EmploymentPage';
import EducationPage from './pages/EducationPage';

function HashScrollHandler() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const id = hash.replace('#', '');

    window.setTimeout(() => {
      const element = document.getElementById(decodeURIComponent(id));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }, [hash]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <HashScrollHandler />
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route
          path="*"
          element={
            <div className="min-h-screen bg-white font-sans">
              <Header />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/company" element={<CompanyPage />} />
                <Route path="/employment" element={<EmploymentPage />} />
                <Route path="/education" element={<EducationPage />} />
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
