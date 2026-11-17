"use client";

import { useCallback, useState } from "react";
import styles from "./page.module.css"
import CampusMap from "../components/CampusMap"
import Sidebar from "../components/sidebar";

export default function Home() {
  const [selectedSpotId, setSelectedSpotId] = useState<string | null>(null);
  const selectSpot = useCallback((spotId: string | null) => {
    setSelectedSpotId(spotId);
  }, []);

  return (
    <main className={styles.layout}>
      <section className={styles.sidebar} aria-label="Find campus spots">
        <Sidebar selectedSpotId={selectedSpotId} onSelectSpot={selectSpot} />
      </section>
      <section className={styles.mapPanel} aria-label="Campus map">
        <CampusMap selectedSpotId={selectedSpotId} onSelectSpot={selectSpot} />
      </section>
    </main>
  );
}
