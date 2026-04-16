import NavBar from '@/Layout/NavBar';
import HeroCarousel from '@/components/HeroCarousel';
import ProductsGrid from '@/components/ProductsGrid';
import TrustStrip from '@/components/TrustStrip';
import RequestForm from '@/components/RequestForm';
import Footer from '@/Layout/Footer';
import './Home.css';
import { Logistics } from '@/components/Logistics';

export default function Home() {
  return (
    <div className="home">
      <main className="home__main">
        <HeroCarousel />
        <ProductsGrid />
        <TrustStrip />
        <RequestForm />
        <Logistics />
      </main>
    </div>
  );
}