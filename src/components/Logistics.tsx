import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { type LatLngExpression, type PathOptions, Layer } from 'leaflet';
import type { Feature, Geometry } from 'geojson';
import 'leaflet/dist/leaflet.css';
import { Ship, Train, Truck } from "lucide-react";
import { useTranslation } from 'react-i18next'; // ВЕРНУЛИ
import './Logistics.css';

export const Logistics: React.FC = () => {
  const { t } = useTranslation(); // ВЕРНУЛИ
  const [geoData, setGeoData] = useState<GeoJSON.FeatureCollection | null>(null);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        setGeoData(data);
      })
      .catch(err => console.error("Map loading error:", err));
  }, []);

  const deliveryMethods = [
    { 
      title: t('logistics.deliveryMethods.maritime.title'), 
      icon: <Ship size={24} />, 
      desc: t('logistics.deliveryMethods.maritime.desc') 
    },
    { 
      title: t('logistics.deliveryMethods.rail.title'), 
      icon: <Train size={24} />, 
      desc: t('logistics.deliveryMethods.rail.desc') 
    },
    { 
      title: t('logistics.deliveryMethods.road.title'), 
      icon: <Truck size={24} />, 
      desc: t('logistics.deliveryMethods.road.desc') 
    },
  ];

  const logisticsRegions = [
    { 
      id: "ukraine",
      name: t('logistics.regions.ukraine.name'), 
      color: "#1a4d2e", 
      countries: t('logistics.regions.ukraine.countries', { returnObjects: true }) as string[]
    },
    { 
      id: "europe",
      name: t('logistics.regions.europe.name'), 
      color: "#f5a623", 
      countries: t('logistics.regions.europe.countries', { returnObjects: true }) as string[]
    },
    { 
      id: "asia",
      name: t('logistics.regions.asia.name'), 
      color: "#3385ff", 
      countries: t('logistics.regions.asia.countries', { returnObjects: true }) as string[]
    }
  ];

  const styleFeature = (feature?: Feature<Geometry, any>): PathOptions => {
    if (!feature) return {};
    
    const countryName = feature.properties.name || feature.properties.NAME || "";
    const cleanName = countryName.trim();
    const region = logisticsRegions.find(r => r.countries.includes(cleanName));

    if (region) {
      return {
        fillColor: region.color,
        weight: 1,
        opacity: 1,
        color: 'white',
        dashArray: '',
        fillOpacity: 0.7
      };
    } else {
      return {
        fillColor: "#e5e7eb", 
        weight: 0.5,
        opacity: 1,
        color: '#ffffff',
        fillOpacity: 0.3
      };
    }
  };

  const onEachFeature = (feature: Feature<Geometry, any>, layer: Layer) => {
    const name = feature.properties.name || feature.properties.NAME;
    const isTargetRegion = logisticsRegions.find(r => r.countries.includes(name));
    
    if (isTargetRegion) {
      // Тут можно подставлять переведенное имя страны, но для простоты оставим оригинальное
      layer.bindTooltip(name, { permanent: false, direction: "center" });
      
      layer.on({
        mouseover: (e: L.LeafletMouseEvent) => {
          const target = e.target as L.Path;
          target.setStyle({ fillOpacity: 0.9, weight: 2 });
        },
        mouseout: (e: L.LeafletMouseEvent) => {
          const target = e.target as L.Path;
          target.setStyle({ fillOpacity: 0.7, weight: 1 });
        }
      });
    }
  };

  const mapCenter: LatLngExpression = [48, 25];

  return (
    <section id="logistics" className="logistics-section">
      <div className="logistics-container">
        
        <div className="logistics-header">
          <h2 className="section-title">{t('logistics.title')}</h2>
          <p className="section-subtitle">{t('logistics.subtitle')}</p>
        </div>

        <div className="methods-grid">
          {deliveryMethods.map((method, idx) => (
            <div key={idx} className="method-card">
              <div className="method-icon">{method.icon}</div>
              <div>
                <h4 className="method-title">{method.title}</h4>
                <p className="method-desc">{method.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="regions-legend-grid">
          {logisticsRegions.map((region) => (
            <div key={region.id} className="region-legend-card">
              <div className="region-header">
                <div 
                  className="region-color-dot" 
                  style={{ backgroundColor: region.color }} 
                />
                <h3 className="region-name">{region.name}</h3>
              </div>
              {/* Выводим страны через запятую (названия будут на англ, как в JSON) */}
              <div className="region-countries">
                {region.countries.join(", ")}
              </div>
            </div>
          ))}
        </div>

        <div className="leaflet-map-wrapper">
          <MapContainer 
            center={mapCenter} 
            zoom={4} 
            scrollWheelZoom={false} 
            style={{ height: "500px", width: "100%", borderRadius: "1.5rem", zIndex: 1 }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />

            {geoData ? (
              <GeoJSON 
                data={geoData} 
                style={styleFeature} 
                onEachFeature={onEachFeature}
              />
            ) : (
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000, fontWeight: 500 }}>
                {t('logistics.mapLoading')}
              </div>
            )}
          </MapContainer>
        </div>

      </div>
    </section>
  );
};