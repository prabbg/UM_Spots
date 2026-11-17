"use client";

import styles from "./Sidebar.module.css";
import { useState } from "react";

export default function Sidebar() {
    const [open, setOpen] = useState({
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
                    >
                        Classrooms
                    </button>
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
