"use client";

import styles from "./Sidebar.module.css";
import { useState } from "react";
import { campusSpots } from "./campusSpots";

type SidebarProps = {
    selectedSpotId: string | null;
    onSelectSpot: (spotId: string | null) => void;
};

export default function Sidebar({ selectedSpotId, onSelectSpot }: SidebarProps) {
    const [open, setOpen] = useState({
        classrooms: false,
        study: false,
        food: false
    });

    return (
        <main>
            <h1 className={styles.title}>UM Spots</h1>

            <div className={styles.searchWrapper}>
                <input
                    type="search"
                    aria-label="Search classrooms, study spaces, and restaurants"
                    placeholder="Search campus spots..."
                    className={styles.searchBar}
                />

                <button
                    className={styles.searchButton}
                    type="button"
                    aria-label="Search campus spots"
                >
                    <span aria-hidden="true">⌕</span>
                </button>
            </div>

            <ul className={styles.roomList}>
                <li>
                    <button
                        className={styles.categoryButton}
                        type="button"
                        aria-expanded={open.classrooms}
                        aria-controls="classroom-building-list"
                        onClick={() =>
                            setOpen(prev => ({
                                ...prev,
                                classrooms: !prev.classrooms
                            }))
                        }
                    >
                        Classrooms
                    </button>

                    {open.classrooms && (
                        <ul id="classroom-building-list" className={styles.buildingList}>
                            {campusSpots.map((spot) => (
                                <li key={spot.id} className={styles.buildingItem}>
                                    <button
                                        className={styles.buildingButton}
                                        data-selected={selectedSpotId === spot.id}
                                        type="button"
                                        aria-pressed={selectedSpotId === spot.id}
                                        onClick={() => onSelectSpot(spot.id)}
                                    >
                                        {spot.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>

                <li>
                    <button
                        className={styles.categoryButton}
                        type="button"
                        aria-expanded={open.study}
                        onClick={() =>
                            setOpen(prev => ({
                                ...prev,
                                study: !prev.study
                            }))
                        }
                    >
                        Study Spaces
                    </button>

                    {open.study && (
                        <ul>
                            <li>Lounges</li>
                            <li>Quiet Study Areas</li>
                        </ul>
                    )}
                </li>

                <li>
                    <button
                        className={styles.categoryButton}
                        type="button"
                        aria-expanded={open.food}
                        onClick={() =>
                            setOpen(prev => ({
                                ...prev,
                                food: !prev.food
                            }))
                        }
                    >
                        Food & Drink
                    </button>

                    {open.food && (
                        <ul>
                            <li>Restaurants</li>
                            <li>Cafés</li>
                        </ul>
                    )}
                </li>
            </ul>
        </main>
    );
}
