'use client'
import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./EquipmentSelectBlock.module.css"
import type { ArmorItem, ArmorPieceType, ArmorSet, Item } from "../character.types";











type Props= {
    equippedItem?: Item | ArmorItem,
    items?: Item[];
    direction?: 'left' | 'right';
    slotSize?: number;
    equipItem?: (idx:number) => void;
}

// EquipmentSelectBlock({equipment:[{type:"arms",name:"immortal legend"},{type:"chest",name:"immortal legend"}]})

const MAX_UNEQUIPED_SLOTS = 9
const UNHOVER_LEEWAY_TIME = 80;

export default function EquipmentSelectBlock({equippedItem,equipItem, items = [], direction='right', slotSize=80}:Props)
{
    // const [items, setItems] = useState(initialItems.filter((item,i)=>i+1<=MAX_UNEQUIPED_SLOTS));
    const [hovered, setHovered] = useState<boolean>(false);
    const isEquippedItemHoveredRef = useRef<boolean>(false);
    const isItemsContainerHoveredRef = useRef<boolean>(false);
    const equippedItemSlotRef = useRef<HTMLDivElement>(null);
    const itemsContainerRef = useRef<HTMLDivElement>(null);

    
    
    

    
    useEffect(()=>{
        // if (!equippedItem && items.length)
        // {
        //     equipItem(0);
        // }

        
        const itemsContainer = itemsContainerRef.current;
        const equippedItemSlot = equippedItemSlotRef.current;

        // console.log(itemsContainer);
        

        if (!itemsContainer || !equippedItemSlot)
            return;

        const handleEquippedItemSlotMouseMove = (e:MouseEvent)=> {
            isEquippedItemHoveredRef.current = true;
            setHovered(true);
        }

        const handleEquippedItemSlotMouseLeave = (e:MouseEvent)=> {
            isEquippedItemHoveredRef.current = false;
            
            setTimeout(()=>{
                // console.log("timer created");
                
                if (!isItemsContainerHoveredRef.current)
                    setHovered(false);
            },UNHOVER_LEEWAY_TIME);
            
        }

        const handleItemsContainerMouseMove = (e:MouseEvent)=> {
            // console.log(itemsContainerRef.current);
            
            isItemsContainerHoveredRef.current = true
        }

        const handleItemsContainerMouseLeave = (e:MouseEvent)=> {
            isItemsContainerHoveredRef.current = false;
            setTimeout(()=>{
                if (!isEquippedItemHoveredRef.current)
                    setHovered(false);
            },UNHOVER_LEEWAY_TIME);
        }

        equippedItemSlot.addEventListener('mousemove',handleEquippedItemSlotMouseMove);

        equippedItemSlot.addEventListener('mouseleave',handleEquippedItemSlotMouseLeave);


        itemsContainer.addEventListener('mousemove',handleItemsContainerMouseMove);
        itemsContainer.addEventListener('mouseleave',handleItemsContainerMouseLeave);


        return ()=> {

            equippedItemSlot.removeEventListener('mousemove',handleEquippedItemSlotMouseMove);

            equippedItemSlot.removeEventListener('mouseleave',handleEquippedItemSlotMouseLeave);

            itemsContainer.removeEventListener('mousemove',handleItemsContainerMouseMove);
            itemsContainer.removeEventListener('mouseleave',handleItemsContainerMouseLeave);
        }
    },[])

    return (
        <div style={{'--size':slotSize+"px"} as CSSProperties} className={styles.container}>
            {
                direction==='left'?
                <ItemSlots onClick={equipItem} direction={direction} data={items} hovered={hovered} itemsContainerRef={itemsContainerRef}/>
                : null
            }
            <div ref={equippedItemSlotRef} className={styles.visibleItemSlot}>
                <p>{equippedItem?equippedItem.name:null}</p>    
            </div>
            {
                direction==='right'?
                <ItemSlots onClick={equipItem} direction={direction} data={items} hovered={hovered} itemsContainerRef={itemsContainerRef}/>
                : null
            }
        </div>
    )
}

function ItemSlots({onClick=(idx:number)=>{},data,hovered,itemsContainerRef,direction}:{onClick?:(idx:number)=>void,data:Item[],hovered:boolean,direction:'left'|'right',itemsContainerRef:React.RefObject<HTMLDivElement | null>})
{
    const xpad = 15;

    return (
        <div style={{pointerEvents:hovered?'all':'none'}} className={`${styles.itemSlotsContainer} flex ${direction==="left"?'flex-row-reverse':'flex-row'}`}>
            <div style={{flexDirection:direction==='left'?'row-reverse':'row','--xpad':xpad + "px",paddingRight:direction==="left"?xpad:0, paddingLeft:direction==="right"?xpad:0} as CSSProperties} className={`${styles.hiddenItemSlotsContainer} `}>
                {
                    data.map((_,i)=><div className={styles.hiddenItemSlot} key={i}/>)
                }
            </div>
            <div style={{opacity:hovered?1:0, flexDirection:direction==='left'?'row-reverse':'row','--xpad':xpad + "px",paddingRight:direction==="left"?xpad:0, paddingLeft:direction==="right"?xpad:0} as CSSProperties} ref={itemsContainerRef} className={`${styles.visibleItemSlotsContainer}`}>
                {
                    data.map((item,i)=>(
                        <div onClick={()=>{onClick(i)}} className={styles.visibleItemSlot} key={i}>
                            <p>{item.name}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}