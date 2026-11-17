"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { campusSpots } from "./campusSpots";
import styles from "./CampusMap.module.css";

type CampusMapProps = {
  selectedSpotId: string | null;
  onSelectSpot: (spotId: string | null) => void;
};

export default function CampusMap({ selectedSpotId, onSelectSpot }: CampusMapProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerElementsRef = useRef(new Map<string, HTMLButtonElement>());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    if (!mapContainer.current || !token) {
      return;
    }

    mapboxgl.accessToken = token;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const initialView = isMobile
      ? {
          center: [-97.1334, 49.8091] as [number, number],
          zoom: 15.5,
          pitch: 57,
          bearing: -90,
        }
      : {
          center: [-97.133, 49.809] as [number, number],
          zoom: 17,
          pitch: 57,
          bearing: -90,
        };

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/prabbg/cmtzbefb200a501ssdex0417y",
      ...initialView,
    });
    mapRef.current = map;
    const markerElements = markerElementsRef.current;

    campusSpots.forEach((spot) => {
      const marker = document.createElement("button");
      marker.type = "button";
      marker.className = styles.marker;
      marker.setAttribute("aria-label", `Zoom to ${spot.name}`);
      marker.title = spot.name;
      markerElements.set(spot.id, marker);

      const dot = document.createElement("span");
      dot.className = styles.markerDot;
      dot.setAttribute("aria-hidden", "true");
      marker.appendChild(dot);

      const label = document.createElement("span");
      label.className = styles.markerLabel;
      label.textContent = spot.name;
      marker.appendChild(label);

      marker.addEventListener("click", () => {
        onSelectSpot(spot.id);
      });

      new mapboxgl.Marker({ element: marker, anchor: "center" })
        .setLngLat(spot.coordinates)
        .addTo(map);
    });

    map.on("zoomend", () => {
      if (map.getZoom() < 17.4) {
        onSelectSpot(null);
      }
    });

    map.on("error", (event) => {
      const message = event.error?.message ?? "Mapbox failed to load";
      console.error("Mapbox error:", event.error);
      setError(message);
    });

    return () => {
      markerElements.clear();
      mapRef.current = null;
      map.remove();
    };
  }, [onSelectSpot]);

  useEffect(() => {
    markerElementsRef.current.forEach((element, spotId) => {
      element.classList.toggle(styles.markerSelected, spotId === selectedSpotId);
    });

    const map = mapRef.current;

    if (!selectedSpotId) {
      return;
    }

    const spot = campusSpots.find((item) => item.id === selectedSpotId);

    if (!spot || !map) {
      return;
    }

    map.easeTo({
      center: spot.coordinates,
      zoom: Math.max(map.getZoom(), 17.5),
      duration: 850,
    });
  }, [selectedSpotId]);

  return (
    <div className={styles.wrapper}>
      <div ref={mapContainer} className={styles.map} />
      {error && <p className={styles.error}>Map error: {error}</p>}
    </div>
  );
}
