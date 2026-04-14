import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Прокручиваем наверх при каждом изменении пути (pathname)
    window.scrollTo(0, 0);
  }, [pathname]);

  // Этот компонент ничего не рендерит визуально
  return null;
}