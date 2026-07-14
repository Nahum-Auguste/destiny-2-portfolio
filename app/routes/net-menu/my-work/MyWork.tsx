'use client'
import { useState } from "react"
import styles from "./MyWork.module.css"
import NewsFilterBar from "./NewsFilterBar/NewsFilterBar"
import type { ProjectTag } from "./my-work.types";



export default function MyWorkScreen()
{
    const [filterTags,setFilterTags] = useState<ProjectTag[]>([]);

    return (
        <div className={`${styles.screen}`}>
            <div className={`${styles.heroContainer}`}>
                <h1>My Work</h1>
            </div>
            <div className={`${styles.mainContainer}`}>
                <NewsFilterBar setFilterTags={setFilterTags}/>
            </div>
        </div>
    )
}

