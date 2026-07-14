'use client'
import { useState } from "react";
import type { ProjectTag } from "../my-work.types"
import styles from "./NewsFilterBar.module.css"

type Props = {
    setFilterTags: React.Dispatch<React.SetStateAction<ProjectTag[]>>
}

const filterLabels = ['all works','job related','games','web projects','art',"solo works","collaborative works"] as const;
type FilterLabel = typeof filterLabels[number];

export default function NewsFilterBar({setFilterTags}:Props)
{
    const [filter, setFilter] = useState<FilterLabel>('all works');

    return (
        <aside className={`${styles.container}`}>
            <ul className={styles.filterList}>
                {
                    filterLabels.map((l,i)=>{
                        const selected = l===filter;
                        const filterTags: ProjectTag[] = [];

                        switch (l)
                        {
                            case "art":
                                filterTags.push("arts")
                                break;
                            case "collaborative works":
                                filterTags.push("collab")
                                break;
                            case "games":
                                filterTags.push("game")
                                break;
                            case "job related":
                                filterTags.push("job")
                                break;
                            case "solo works":
                                filterTags.push("solo")
                                break;
                            case "web projects":
                                filterTags.push("web")
                                break;
                        }

                        return (
                            <li className={`${styles.filterItem} ${selected?styles.selected:''}`} key={i}>
                                <button className={`${styles.filterButton}`} onClick={()=>{setFilter(l);setFilterTags(filterTags)}}>
                                    <p>{l}</p>
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
        </aside>
    )
}