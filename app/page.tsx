import styles from "./page.module.css"
import CampusMap from "../components/CampusMap"
import Sidebar from "../components/sidebar";

export default function Home() {
  return (
    <main className={styles.layout}>
      <section className={styles.sidebar} aria-label="Find campus spots">
        <Sidebar />
      </section>
      <section className={styles.mapPanel} aria-label="Campus map">
        <CampusMap />
      </section>
    </main>
  );
}
