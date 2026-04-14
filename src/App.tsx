import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './hooks/ScrollToTop';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Contact from './pages/Contact';
import ThankYou from './pages/ThankYou';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop /> {/* <-- 2. ВСТАВЛЯЕМ СЮДА */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </BrowserRouter>
  );
}