import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { 
  Phone, ArrowRight, Clock,
  ChevronDown, CheckSquare, Square, X 
} from 'lucide-react';
import './RequestForm.css';

// Используем ID вместо имен для сохранения состояния при смене языка
const SEEDS = [
  { id: "rapeseed_spring", image: "https://cdn-icons-png.flaticon.com/512/1865/1865181.png" },
  { id: "rapeseed_winter", image: "https://cdn-icons-png.flaticon.com/512/1865/1865181.png" },
  { id: "corn", image: "https://cdn-icons-png.flaticon.com/512/1865/1865230.png" },
  { id: "sunflower", image: "https://cdn-icons-png.flaticon.com/512/1865/1865284.png" },
  { id: "soybean", image: "https://cdn-icons-png.flaticon.com/512/1865/1865103.png" },
];

const OTHER = [
  { id: "other", image: "https://cdn-icons-png.flaticon.com/512/2740/2740648.png" }
];

const ALL_PRODUCTS = [...SEEDS, ...OTHER];

const REGION_IDS = [
  "ukraine", "poland", "germany", "romania", "hungary", "other_eu"
];

type DropdownType = "product" | "region" | null;

export default function RequestForm() {
  const { t } = useTranslation();
  const productRef = useRef<HTMLDivElement>(null);
  const regionRef = useRef<HTMLDivElement>(null);

  const [openDropdown, setOpenDropdown] = useState<DropdownType>(null);
  
  const [formData, setFormData] = useState({
    products: [] as string[],
    customProduct: "",
    region: "",
    phone: "",
    agreement: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown === "product" && productRef.current && !productRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
      if (openDropdown === "region" && regionRef.current && !regionRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  const toggleDropdown = (dropdownName: DropdownType) => {
    setOpenDropdown(prev => prev === dropdownName ? null : dropdownName);
  };

  const toggleProduct = (productId: string) => {
    setFormData(prev => {
      const isSelected = prev.products.includes(productId);
      let newProducts;
      
      if (isSelected) {
        newProducts = prev.products.filter(p => p !== productId);
        if (productId === "other") prev.customProduct = "";
      } else {
        newProducts = [...prev.products, productId];
      }
      
      return { ...prev, products: newProducts };
    });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (formData.products.length === 0) {
      newErrors.products = t('requestForm.form.errors.noProduct');
    } 
    
    if (formData.products.includes("other") && !formData.customProduct.trim()) {
      newErrors.customProduct = t('requestForm.form.errors.noCustomProduct');
    }

    if (!formData.region) newErrors.region = t('requestForm.form.errors.noRegion');

    const phoneRegex = /^[0-9\+\-\s\(\)]{9,20}$/;
    if (!formData.phone) {
      newErrors.phone = t('requestForm.form.errors.noPhone');
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = t('requestForm.form.errors.invalidPhone');
    }

    if (!formData.agreement) newErrors.agreement = t('requestForm.form.errors.noAgreement');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getProductTriggerText = () => {
    if (formData.products.length === 0) {
      return <span className="request__placeholder">{t('requestForm.form.placeholders.selectProducts')}</span>;
    }
    return <span className="request__selected-text" style={{fontWeight: 600}}>{t('requestForm.form.placeholders.addMore')}</span>;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    setTimeout(() => {
      console.log(formData);
      toast.success(t('requestForm.form.toast.success'), {
        description: t('requestForm.form.toast.desc'),
      });
      setFormData({ products: [], customProduct: "", region: "", phone: "", agreement: false });
      setIsSubmitting(false);
    }, 1000);
  };

  // Получаем шаги из перевода
  const steps = t('requestForm.info.steps', { returnObjects: true }) as Array<{ num: string, label: string }>;

  return (
    <section className="request" id="contact">
      <div className="request__container">
        <div className="request__grid">

          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="request__info"
          >
            <span className="request__eyebrow">{t('requestForm.info.eyebrow')}</span>
            <h2 className="request__title">{t('requestForm.info.title')}</h2>
            <p className="request__desc">{t('requestForm.info.desc')}</p>

            <div className="request__steps">
              {steps.map((step) => (
                <div key={step.num} className="request__step">
                  <span className="request__step-num">{step.num}</span>
                  <span className="request__step-label">{step.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: form card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="request__card"
          >
            
            <div className="request__speed-banner">
              <div className="request__speed-icon-wrap">
                <Clock size={22} />
              </div>
              <div className="request__speed-text">
                <span className="request__speed-title">{t('requestForm.banner.title')}</span>
                <span className="request__speed-desc">{t('requestForm.banner.desc')}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="request__form">
              
              {/* 1. PRODUCT MULTI-SELECT */}
              <div className="request__field">
                <label className="request__label">{t('requestForm.form.labels.products')}</label>
                <div className={`request__custom-select ${errors.products ? "input-error" : ""}`} ref={productRef}>
                  <div className="request__select-trigger" onClick={() => toggleDropdown("product")}>
                    {getProductTriggerText()}
                    <ChevronDown size={18} />
                  </div>

                  {openDropdown === "product" && (
                    <div className="request__select-dropdown">
                      {/* SEEDS */}
                      <div className="request__dropdown-category">{t('requestForm.form.categories.seeds')}</div>
                      {SEEDS.map(product => {
                        const isSelected = formData.products.includes(product.id);
                        return (
                          <div
                            key={product.id}
                            className={`request__select-option request__multi-option ${isSelected ? 'selected' : ''}`}
                            onClick={() => toggleProduct(product.id)}
                          >
                            <div className="request__checkbox-icon">
                              {isSelected ? <CheckSquare size={18} color="#1a4d2e" /> : <Square size={18} color="#9CA3AF" />}
                            </div>
                            <img src={product.image} alt={product.id} />
                            <span>{t(`requestForm.products.${product.id}`)}</span>
                          </div>
                        );
                      })}

                      {/* OTHER */}
                      <div className="request__dropdown-category">{t('requestForm.form.categories.other')}</div>
                      {OTHER.map(product => {
                        const isSelected = formData.products.includes(product.id);
                        return (
                          <div
                            key={product.id}
                            className={`request__select-option request__multi-option ${isSelected ? 'selected' : ''}`}
                            onClick={() => toggleProduct(product.id)}
                          >
                            <div className="request__checkbox-icon">
                              {isSelected ? <CheckSquare size={18} color="#1a4d2e" /> : <Square size={18} color="#9CA3AF" />}
                            </div>
                            <img src={product.image} alt={product.id} />
                            <span>{t(`requestForm.products.${product.id}`)}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                {errors.products && <p className="request__error-message">{errors.products}</p>}

                {/* SELECTED PRODUCTS */}
                {formData.products.length > 0 && (
                  <div className="request__selected-container">
                    {formData.products.map(productId => {
                      const prod = ALL_PRODUCTS.find(p => p.id === productId);
                      return (
                        <div key={productId} className="request__selected-item">
                          <img src={prod?.image} alt={productId} />
                          <span className="request__selected-name">{t(`requestForm.products.${productId}`)}</span>
                          <button 
                            type="button" 
                            className="request__remove-btn" 
                            onClick={() => toggleProduct(productId)}
                            title={t('requestForm.form.buttons.remove')}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
                
                {/* Custom input */}
                {formData.products.includes("other") && (
                  <div style={{ marginTop: '10px' }}>
                    <input
                      type="text"
                      placeholder={t('requestForm.form.placeholders.customProduct')}
                      className={`request__input ${errors.customProduct ? 'input-error' : ''}`}
                      value={formData.customProduct}
                      onChange={(e) => setFormData({...formData, customProduct: e.target.value})}
                    />
                    {errors.customProduct && <p className="request__error-message">{errors.customProduct}</p>}
                  </div>
                )}
              </div>

              {/* 2. REGION */}
              <div className="request__field">
                <label className="request__label">{t('requestForm.form.labels.region')}</label>
                <div className={`request__custom-select ${errors.region ? "input-error" : ""}`} ref={regionRef}>
                  <div className="request__select-trigger" onClick={() => toggleDropdown("region")}>
                    {formData.region ? (
                      <div className="request__selected-single">
                        <span>{t(`requestForm.regions.${formData.region}`)}</span>
                      </div>
                    ) : (
                      <span className="request__placeholder">{t('requestForm.form.placeholders.selectRegion')}</span>
                    )}
                    <ChevronDown size={18} />
                  </div>

                  {openDropdown === "region" && (
                    <div className="request__select-dropdown">
                      {REGION_IDS.map(v => (
                        <div
                          key={v}
                          className="request__select-option request__single-option"
                          onClick={() => {
                            setFormData({ ...formData, region: v });
                            setOpenDropdown(null);
                          }}
                        >
                          <span>{t(`requestForm.regions.${v}`)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {errors.region && <p className="request__error-message">{errors.region}</p>}
              </div>

              {/* 3. PHONE */}
              <div className="request__field">
                <label className="request__label">{t('requestForm.form.labels.phone')}</label>
                <div className="request__input-wrap">
                  <Phone size={17} className="request__input-icon" />
                  <input
                    type="tel"
                    placeholder="+380 (XX) XXX-XX-XX"
                    className={`request__input request__input--with-icon ${errors.phone ? 'input-error' : ''}`}
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                {errors.phone && <p className="request__error-message">{errors.phone}</p>}
              </div>

              {/* 4. RODO */}
              <div className="request__field request__agreement">
                <label className="request__checkbox-label">
                  <input
                    type="checkbox"
                    className="request__checkbox-input"
                    checked={formData.agreement}
                    onChange={(e) => setFormData({...formData, agreement: e.target.checked})}
                  />
                  <span className="request__checkbox-text">
                    {t('requestForm.form.labels.agreement')}
                  </span>
                </label>
                {errors.agreement && <p className="request__error-message">{errors.agreement}</p>}
              </div>

              {/* SUBMIT */}
              <button 
                type="submit" 
                className="request__submit" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="request__spinner"></span>
                    {t('requestForm.form.buttons.submitting')}
                  </>
                ) : (
                  <>
                    {t('requestForm.form.buttons.submit')}
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}