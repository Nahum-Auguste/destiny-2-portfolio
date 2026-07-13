import { useState, type CSSProperties } from "react"
import { clamp } from "../../../../utils/math"
import styles from "./About.module.css"

type Page = {
    title:string,
    text:string
}

export default function AboutScreen()
{
    const pages: Page[] = [
        {
            title: 'Who am I?',
            text: `My name is Nahum Auguste (NAY-HUM August). I am web developer and a soon-to-be bachelor in computer science from the University of Central Florida.
            \nAs you could probably tell, I love playing games, and Destiny 2 is one of, if not my most played video game I have.
            
            `
        }
    ]
    const [idx, setIdx] = useState<number>(0);

    const flipPage = (newIdx:number)=> {
        setIdx(clamp(newIdx,0,pages.length-1));
    }

    return (
        <div className="w-full h-full border-0 border-amber-500 border-solid">
            <div className="opacity-75 h-[50px] w-full bg-[#5B8786] border-b-7 border-[#6AABA5] border-solid absolute top-0"/>
            <div className="h-full w-full flex flex-row">
                {/* <div className="h-full w-[33vw] bg-white/5">
    
                </div> */}
                <div className="h-full flex-1 border-0 border-solid pt-[200px]">
                    <article className="flex flex-row h-full" aria-live="polite">
                        <div className="flex flex-col items-center h-full min-w-fit px-[85px]">
                            <h2 className="uppercase">Nahum Auguste</h2>
                        </div>
                        <Pages idx={idx} pages={pages}/>
                    </article>
                </div>
            </div>
        </div>
    )
}

type PagesProps = {
    pages: Page[],
    idx: number
}

function Pages({pages,idx=0}:PagesProps)
{
    

    return (
        <section className={`${styles.pageContainer}`}>
            {
                pages.length?
                <>
                    <div className={styles.page}>
                        <h3 className="border-b border-white/30 mb-[80px] font-bold text-2xl">{pages[idx].title}</h3>
                        <div>
                            <p style={{whiteSpace:'pre-wrap'}}>{pages[idx].text}</p>
                        </div>
                    </div>
                    <div style={{"--i":1} as CSSProperties} className={`${styles.hiddenPage}`}/>
                    <div style={{"--i":2} as CSSProperties} className={`${styles.hiddenPage}`}/>
                </>
                :null
            }
        </section>
    )
}