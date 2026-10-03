import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import HomePage from './pages/HomePage';
import PredictPage from './pages/PredictPage';
import BreedExplorerPage from './pages/BreedExplorerPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import './App.css';

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('cattle-ai-theme') || 'light');
  const [toast, setToast] = useState(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('cattle-ai-theme', theme);
  }, [theme]);

  const notify = (message, type = 'success') => setToast({ message, type, id: Date.now() });

  return (
    <BrowserRouter>
      <Navbar theme={theme} onToggleTheme={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')} />
      <main className="app-shell">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/predict" element={<PredictPage notify={notify} />} />
          <Route path="/breeds" element={<BreedExplorerPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage notify={notify} />} />
        </Routes>
      </main>
      <Footer />
      {toast && <Toast key={toast.id} {...toast} onClose={() => setToast(null)} />}
    </BrowserRouter>
  );
}

export default App;
