"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import styles from "./CampusMap.module.css";

const campusSpots = [
  {
    id: "eitc",
    name: "Engineering Complex",
    coordinates: [-97.133, 49.809] as [number, number],
  },
];

export default function CampusMap() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
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

    campusSpots.forEach((spot) => {
      const marker = document.createElement("button");
      marker.type = "button";
      marker.className = styles.marker;
      marker.setAttribute("aria-label", `View ${spot.name}`);
      marker.title = spot.name;

      const dot = document.createElement("span");
      dot.className = styles.markerDot;
      dot.setAttribute("aria-hidden", "true");
      marker.appendChild(dot);

      marker.addEventListener("click", () => {
        const wasSelected = marker.classList.contains(styles.markerSelected);

        mapContainer.current
          ?.querySelectorAll(`.${styles.markerSelected}`)
          .forEach((element) => element.classList.remove(styles.markerSelected));

        if (!wasSelected) {
          marker.classList.add(styles.markerSelected);
          map.easeTo({ center: spot.coordinates, duration: 600 });
        }
      });

      new mapboxgl.Marker({ element: marker, anchor: "center" })
        .setLngLat(spot.coordinates)
        .addTo(map);
    });

    map.on("error", (event) => {
      const message = event.error?.message ?? "Mapbox failed to load";
      console.error("Mapbox error:", event.error);
      setError(message);
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div ref={mapContainer} className={styles.map} />
      {error && <p className={styles.error}>Map error: {error}</p>}
    </div>
  );
}
