'use client';

import { importLibrary, setOptions } from '@googlemaps/js-api-loader';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { publicEnv } from '@/shared/env/env.public';

let mapsLoaderConfigured = false;

function ensureGoogleMapsConfigured() {
  if (mapsLoaderConfigured) {
    return;
  }

  const apiKey = publicEnv.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return;
  }

  setOptions({
    key: apiKey,
    v: 'weekly',
  });

  mapsLoaderConfigured = true;
}

function buildMapLabel(location: { city?: string; region?: string; country?: string }) {
  return [location.city, location.region, location.country].filter(Boolean).join(', ');
}

function buildMapsHref(label: string) {
  if (!label) {
    return '';
  }

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(label)}`;
}

function supportsWebGL() {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const canvas = document.createElement('canvas');

    const webgl2 = canvas.getContext('webgl2');
    if (webgl2) {
      return true;
    }

    const webgl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    return Boolean(webgl);
  } catch {
    return false;
  }
}

type Props = {
  location: {
    city?: string;
    region?: string;
    country?: string;
  };
  coordinates?: {
    lat: number;
    lng: number;
  };
  customLabel?: string;
};

export function LocationMap({ location, coordinates, customLabel }: Props) {
  const t = useTranslations('LocationMap');
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [mapWarning, setMapWarning] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function initMap() {
      const mapId = publicEnv.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID;

      if (!mapRef.current || !coordinates) {
        return;
      }

      ensureGoogleMapsConfigured();

      const { Map: GoogleMap, RenderingType } = (await importLibrary(
        'maps',
      )) as google.maps.MapsLibrary;

      if (isCancelled || !mapRef.current) {
        return;
      }

      const position: google.maps.LatLngLiteral = {
        lat: coordinates.lat,
        lng: coordinates.lng,
      };

      const canAttemptVector = Boolean(mapId) && supportsWebGL();

      const map = new GoogleMap(mapRef.current, {
        center: position,
        zoom: 10,
        mapTypeId: 'roadmap',
        ...(mapId ? { mapId } : {}),
        renderingType: canAttemptVector ? RenderingType.VECTOR : RenderingType.RASTER,
        disableDefaultUI: true,
        zoomControl: true,
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        clickableIcons: false,
        gestureHandling: 'cooperative',
        colorScheme: google.maps.ColorScheme?.DARK ?? google.maps.ColorScheme?.FOLLOW_SYSTEM,
      });

      const actualRenderingType = map.getRenderingType?.();

      if (!canAttemptVector) {
        setMapWarning(
          'Vector map is unavailable in this browser configuration. Showing raster fallback.',
        );
      } else if (actualRenderingType && actualRenderingType !== google.maps.RenderingType.VECTOR) {
        setMapWarning('Vector map is unavailable in this environment. Google fell back to raster.');
      } else {
        setMapWarning(null);
      }

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
      setMapWarning('Failed to initialize Google Maps.');
    });

    return () => {
      isCancelled = true;
    };
  }, [coordinates]);

  const label = customLabel || buildMapLabel(location);
  const mapsHref = buildMapsHref(label);

  if (!label || !coordinates) {
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
            {t('label')}
          </p>
          <p className="mt-2 text-sm text-slate-400">{label}</p>
          {mapWarning ? <p className="mt-2 text-xs text-amber-300">{mapWarning}</p> : null}
        </div>

        <a
          href={mapsHref}
          target="_blank"
          rel="noreferrer"
          className="secondary-cta rounded-2xl border border-white/12 px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:border-3sm-cyan/50 hover:text-3sm-cyan"
        >
          {t('openMap')}
        </a>
      </div>
    </div>
  );
}
