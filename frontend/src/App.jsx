import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import CustomerPage from './pages/CustomerPage';
import AdminPage from './pages/AdminPage';
import { translations } from './i18n/translations';

function App() {
  const [language, setLanguage] = useState('en');
  const t = translations[language];

  return (
    <Router>
      <div className="min-h-screen bg-cream font-sans text-darkbrown">
        <Header language={language} setLanguage={setLanguage} t={t} />

        <main>
          <Routes>
            <Route path="/" element={<CustomerPage t={t} />} />
            <Route path="/admin" element={<AdminPage t={t} />} />
          </Routes>
        </main>

        <footer className="bg-darkbrown text-cream py-8 text-center text-sm opacity-90 mt-auto">
          <p>© {new Date().getFullYear()} {t.shopTitle}. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
