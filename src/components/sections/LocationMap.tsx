'use client';

import { importLibrary, setOptions } from '@googlemaps/js-api-loader';
import { useEffect, useRef } from 'react';
import type { Locale } from '@/i18n/routing';
import { publicEnv } from '@/lib/env';
import { siteConfig } from '@/lib/site-config';

type Props = {
  locale: Locale;
};

let mapsLoaderConfigured = false;

function ensureGoogleMapsConfigured() {
  if (mapsLoaderConfigured) return;

  const apiKey = publicEnv.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) return;

  setOptions({
    key: apiKey,
    v: 'weekly',
  });

  mapsLoaderConfigured = true;
}

function buildMapLabel() {
  return [siteConfig.location.city, siteConfig.location.region, siteConfig.location.country]
    .filter(Boolean)
    .join(', ');
}

function buildMapsHref() {
  const query = buildMapLabel();

  if (!query) return '';

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function LocationMap({ locale }: Props) {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function initMap() {
      const coordinates = siteConfig.coordinates;
      const mapId = publicEnv.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID;

      if (!mapRef.current || !coordinates) {
        return;
      }

      ensureGoogleMapsConfigured();

      const { Map: GoogleMap } = (await importLibrary('maps')) as google.maps.MapsLibrary;

      if (isCancelled || !mapRef.current) {
        return;
      }

      const position: google.maps.LatLngLiteral = {
        lat: coordinates.lat,
        lng: coordinates.lng,
      };

      const map = new GoogleMap(mapRef.current, {
        center: position,
        zoom: 12,
        mapTypeId: 'roadmap',
        ...(mapId ? { mapId } : {}),
        disableDefaultUI: true,
        zoomControl: true,
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        clickableIcons: false,
        gestureHandling: 'cooperative',
        colorScheme: google.maps.ColorScheme?.DARK ?? google.maps.ColorScheme?.FOLLOW_SYSTEM,
      });

      new google.maps.Circle({
        map,
        center: position,
        radius: 2500,
        strokeColor: '#38bdf8',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#38bdf8',
        fillOpacity: 0.14,
      });
    }

    initMap().catch((error) => {
      console.error('Google Maps init error:', error);
    });

    return () => {
      isCancelled = true;
    };
  }, []);

  const label = buildMapLabel();
  const mapsHref = buildMapsHref();

  if (!label || !siteConfig.coordinates) {
    return null;
  }

  return (
    <div className="glass-card-premium overflow-hidden rounded-[40px] border border-white/10">
      <div className="relative aspect-video w-full overflow-hidden">
        <div ref={mapRef} className="h-full w-full" />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
      </div>

      <div className="flex items-center justify-between gap-4 p-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-3sm-cyan">
            {locale === 'pl' ? 'Lokalizacja' : 'Location'}
          </p>
          <p className="mt-2 text-sm text-slate-400">{label}</p>
        </div>

        <a
          href={mapsHref}
          target="_blank"
          rel="noreferrer"
          className="secondary-cta rounded-2xl border border-white/12 px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:border-3sm-cyan/50 hover:text-3sm-cyan"
        >
          {locale === 'pl' ? 'Otwórz mapę' : 'Open map'}
        </a>
      </div>
    </div>
  );
}
