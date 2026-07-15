'use client'
import { useEffect, useState } from "react"
import styles from "./MyWork.module.css"
import NewsFilterBar from "./WorksFilterBar/WorksFilterBar"
import type { ProjectTag } from "./my-work.types";

const works: Work[] = [{
    tags: ['game','collab',],
    shortDescription:'2D Pixel Godot game for UCF KnightHacks Club',
    title: 'END LESS Dungeon Crawler'
}]

export default function MyWorkScreen()
{
    const [filterTags,setFilterTags] = useState<ProjectTag[]>([]);
    const [filteredWorks,setFilteredWorks] = useState([...works]);

    useEffect(()=>{
        // console.log(filterTags);
        
        setFilteredWorks(()=>works.filter((w)=>!filterTags.length || filterTags.every((t)=>w.tags.includes(t))))

    },[filterTags]);

    useEffect(()=>{
        // console.log(filteredWorks.map((w)=>w.title));
        
    },[filteredWorks])

    return (
        <div className={`${styles.screen}`}>
            <div className={`${styles.heroContainer}`}>
                <h1>My Work</h1>
            </div>
            <div className={`${styles.mainContainer}`}>
                <NewsFilterBar setFilterTags={setFilterTags}/>
                <div className={`${styles.projects}`}>
                    {
                        filteredWorks.map((w,i)=>{

                            return (
                                <ProjectCard key={i} shortDescription={w.shortDescription} tags={w.tags} caption={w.caption} imgAlt={w.imgAlt} imgSrc={w.imgSrc} title={w.title}/>
                            )
                        })
                    }
                </div>
                <div className="max-w-[30vw] flex-1"/>
            </div>
        </div>
    )
}

type Work = {
    imgSrc?: string,
    caption?: string
    title?: string,
    shortDescription?: string
    imgAlt?:string
    tags: ProjectTag[]
}

function ProjectCard({imgSrc,shortDescription="",title="",imgAlt="",caption}:Work)
{


    return (
        <article className={`${styles.project}`}>
            <a href=""/>
            <figure className={`${styles.projectImageContainer}`}>
                <img src={!imgSrc?undefined:imgSrc} alt={imgAlt}/>
                {caption?<figcaption className="opacity-0 absolute"></figcaption>:null}
            </figure>
            <header>
                <p>{shortDescription}</p>
                <h2>{title}</h2>
            </header>
        </article>
    )
}
