import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Импортируем наш хук/компонент
import ScrollToTop from './hooks/ScrollToTop';

// Твои компоненты Layout
import Navbar from './Layout/NavBar';
import Footer from './Layout/Footer';

// Твои страницы
import Home from './pages/Home';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import ThankYou from './pages/ThankYou';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      
      <Navbar />
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}