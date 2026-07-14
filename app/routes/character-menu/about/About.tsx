import { useState, type CSSProperties } from "react"
import { clamp } from "../../../../utils/math"
import styles from "./About.module.css"
import loreBookCover from "@assets/images/lore-screen/test-book.webp"
import pageIcon from "@assets/svgs/lore-screen/page-icons/page.svg"
import pageReadIcon from "@assets/svgs/lore-screen/page-icons/page-read.svg"
import pageUnreadIcon from "@assets/svgs/lore-screen/page-icons/page-unread.svg"
import pageOutlineIcon from "@assets/svgs/lore-screen/page-icons/page-outline.svg"
import newContentIcon from "@assets/svgs/general/new.svg"
import loreBookIcon from "@assets/svgs/lore-screen/lore-book-icon.svg";
import arrowIcon from "@assets/svgs/general/triangle-left.svg";
import { getSaveData, saveCollectedPageIndex } from "../../../../helpers/cookies"


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
            \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nsef
            `
        },
        {
            title: "idk man",
            text: "sssf"
        },
        {
            title: "idk man 2?",
            text: "awd"
        }
    ]
    const [idx, setIdx] = useState<number>(0);

    const flipPage = (newIdx:number)=> {
        setIdx(clamp(newIdx,0,pages.length-1));
    }

    return (
        <div className="w-full h-full">
            <div className="opacity-75 h-[50px] w-full bg-[#5B8786] border-b-7 border-[#6AABA5] border-solid absolute top-0"/>
            <div className="h-full w-full flex flex-row">
                <header className="absolute flex flex-row gap-[15px] items-center left-[45px] top-[100px]">
                    <img className="relative bottom-[2px]" style={{width:70}} src={loreBookIcon}/>
                    <div className="flex flex-col gap-[0px]">
                        <h1 className="leading-[1em] text-[2rem] font-[600]">LORE</h1>
                        <h2 className="leading-[1em] text-[1.25rem] opacity-50">THE NAUGUCSHEMA</h2>
                    </div>
                </header>
                <div className="h-full flex-1 border-0 border-solid pt-[200px]">
                    <article className="flex flex-row h-full" aria-live="polite">
                        <div className="flex flex-col items-center h-full px-[45px] gap-[60px] w-[50vw] shrink-0 max-w-[450px]">
                            <h3 className="uppercase">Nahum Auguste</h3>
                            <div className={styles.imgContainer}>
                                <img src={loreBookCover} style={{objectFit:'contain'}} className="w-full" alt="Nahum Auguste Lore Book"/>
                                <div className="relative flex flex-column justify-center items-center h-fit">
                                    <img style={{objectFit:'contain'}} className="opacity-40 absolute h-full" src={pageIcon} alt=""/>
                                    <p className="m-[2px] text-[20px]">{idx+1} / {pages.length}</p>
                                </div>
                            </div>
                        </div>
                        <Pages setPageIdx={setIdx} idx={idx} pages={pages} />
                    </article>
                </div>
            </div>
        </div>
    )
}

type PagesProps = {
    pages: Page[],
    idx: number,
    setPageIdx: React.Dispatch<React.SetStateAction<number>>
}

function Pages({pages,idx=0,setPageIdx}:PagesProps)
{
    const [clicks,setClicks] = useState(0);
    let saveData = getSaveData();
    console.log(saveData);
    
    const onPageNavButtonClick = (idx:number)=> {
        setPageIdx(idx);
        setClicks(c=>c+1);
        saveData = saveCollectedPageIndex(idx);
        console.log(saveData);
    }

    return (
        <section className={`relative flex flex-col ${styles.pagesContainer}`}>
            {
                pages.length?
                <>
                    <div className={`h-full w-full absolute top-0 ${styles.pageBackgroundContainer}`}>
                        <div className={`${styles.pageBackground} flex flex-col`}/>
                        <div style={{"--i":1} as CSSProperties} className={`${styles.hiddenPageBackground}`}/>
                        <div style={{"--i":2} as CSSProperties} className={`${styles.hiddenPageBackground}`}/>
                    </div>
                    <div className={`flex-1 flex flex-col pb-[300px] pr-[70px] pt-[15px] ${styles.pageContainer}`}>
                        <h4 className="border-b border-white/30 mb-[40px] font-bold text-2xl">{pages[idx].title}</h4>
                        <div className={`border-b border-solid border-white/30 flex-1 w-[100%] ${styles.textContainer}`}>
                            <p style={{whiteSpace:'pre-wrap'}}>{pages[idx].text}</p>
                        </div>
                        <nav className="relative overflow-x-visible">
                            {/* <div className="absolute right-[98%] bg-white/25 h-[60%] flex flex-col justify-center items-center w-[20px] px-[6.5px]">
                                <img src={arrowIcon}/>
                            </div> */}
                            {
                                pages.map((_,i)=>{
                                    const selected = i===idx;
                                    const collected = saveData.collectedPageIndices.includes(i);

                                    return (
                                        <div key={i} className={`flex flex-col justify-center items-center ${styles.pageNavButtonContainer}`}>
                                            <button onClick={()=>{onPageNavButtonClick(i)}} className={`${styles.pageNavButton} ${selected?styles.selected:''} mb-1.5`}>
                                                <div className={`${!collected?`newItemOverlay`:''}`}><img className={`${styles.pageNavButtonImage} w-full`} style={{objectFit:'contain'}} src={collected ? pageReadIcon : pageUnreadIcon} alt=""/></div>
                                                <img className={`${styles.pageNavButtonOutlineImage} absolute w-[115%] bottom-[-4px] left-[-3.5px] h-[115%]`} style={{objectFit:'contain',maxWidth:'none'}} src={pageOutlineIcon} alt=""/>
                                                {
                                                    !collected?
                                                    <img alt="" src={newContentIcon} className="absolute w-[50%] top-1/2 left-1/2 -translate-x-[45%] -translate-y-1/6" style={{objectFit:'contain'}}/>
                                                    :null
                                                }
                                                <p>{i+1}</p>
                                            </button>
                                            <div className={`${styles.pageNavButtonUnderline} ${selected?styles.selected:''}`}/>
                                        </div>
                                    )
                                })
                            }
                        </nav>
                    </div>
                </>
                :null
            }
        </section>
    )
}
