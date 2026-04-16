import { useEffect } from "react";
import { CheckCircle2, ArrowLeft, Package, MapPin, Phone } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import NavBar from "../Layout/NavBar";
import Footer from "../Layout/Footer";
import "./ThankYou.css";

interface OrderSummary {
  products: string;
  region: string;
  phone: string;
}

export default function ThankYou() {
  const { t } = useTranslation();
  const location = useLocation();
  const data = location.state as OrderSummary | null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="thank-you-page">
      <main className="thank-you-main">
        <div className="thank-you-container">
          
          {/* Иконка успеха */}
          <div className="success-icon-wrapper">
            <div className="success-circle">
              <CheckCircle2 className="success-icon" />
            </div>
          </div>
          
          <h1 className="thank-you-title">
            {t('thankYou.title')}
          </h1>
          
          <p className="thank-you-message">
            {t('thankYou.messagePart1')}
            <strong className="highlight-text">{t('thankYou.messageHighlight')}</strong>
            {t('thankYou.messagePart2')}
          </p>

          {/* Карточка с деталями заказа (показываем только если есть данные) */}
          {data && (
            <div className="order-summary-card">
              <h3 className="summary-title">{t('thankYou.summaryTitle')}</h3>
              
              <div className="summary-row">
                <div className="summary-icon-box">
                  <Package size={20} />
                </div>
                <div className="summary-content">
                  <span className="summary-label">{t('thankYou.product')}</span>
                  <span className="summary-value">{data.products}</span>
                </div>
              </div>

              <div className="summary-row">
                <div className="summary-icon-box">
                  <MapPin size={20} />
                </div>
                <div className="summary-content">
                  <span className="summary-label">{t('thankYou.region')}</span>
                  <span className="summary-value">{data.region}</span>
                </div>
              </div>

              <div className="summary-row">
                <div className="summary-icon-box">
                  <Phone size={20} />
                </div>
                <div className="summary-content">
                  <span className="summary-label">{t('thankYou.phone')}</span>
                  <span className="summary-value">{data.phone}</span>
                </div>
              </div>
            </div>
          )}
          
          <Link to="/" className="back-link-wrapper">
            <button className="btn-back touch-target">
              <ArrowLeft className="button-icon" />
              {t('thankYou.backHome')}
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}