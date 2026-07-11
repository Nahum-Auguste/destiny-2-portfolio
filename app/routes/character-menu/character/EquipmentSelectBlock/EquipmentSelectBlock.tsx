'use client'
import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./EquipmentSelectBlock.module.css"

type ArmorPieceType = 'helmet' | 'arms' | 'chest' | 'legs' | 'class';

type EquipmentType =  'ghost' | 'vehicle' | 'ship' | 'emblem' | 'horn' | 'finisher' | ArmorPieceType;


type ArmorSet = 'immortal legend';

interface Equipment<T extends EquipmentType> {
    name: string;
    type: T;
}

interface ArmorPiece<T extends ArmorPieceType> extends Equipment<T> {
    name: ArmorSet;
}


type Props<T extends EquipmentType> = {
    equipment: T extends ArmorPieceType ? ArmorPiece<T>[] : Equipment<T>[];
    direction?: 'left' | 'right';
}

// EquipmentSelectBlock({equipment:[{type:"arms",name:"immortal legend"},{type:"chest",name:"immortal legend"}]})

const MAX_UNEQUIPED_SLOTS = 9
const UNHOVER_LEEWAY_TIME = 80;

export default function EquipmentSelectBlock<T extends EquipmentType>({equipment, direction='right'}:Props<T>)
{
    const data = Array(MAX_UNEQUIPED_SLOTS-1).fill(null);
    const [hovered, setHovered] = useState<boolean>(false);
    const isEquippedItemHoveredRef = useRef<boolean>(false);
    const isItemsContainerHoveredRef = useRef<boolean>(false);
    const equippedItemSlotRef = useRef<HTMLDivElement>(null);
    const itemsContainerRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        
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
            itemsContainer.addEventListener('mouseleave',handleItemsContainerMouseLeave);
        }
    },[])

    return (
        <div className={styles.container}>
            {
                direction==='left'?
                <ItemSlots direction={direction} data={data} hovered={hovered} itemsContainerRef={itemsContainerRef}/>
                : null
            }
            <div ref={equippedItemSlotRef} className={styles.visibleItemSlot}>

            </div>
            {
                direction==='right'?
                <ItemSlots direction={direction} data={data} hovered={hovered} itemsContainerRef={itemsContainerRef}/>
                : null
            }
        </div>
    )
}

function ItemSlots({data,hovered,itemsContainerRef,direction}:{data:any[],hovered:boolean,direction:'left'|'right',itemsContainerRef:React.RefObject<HTMLDivElement | null>})
{
    const xpad = 15;

    return (
        <div style={{pointerEvents:hovered?'all':'none'}} className={`${styles.itemSlotsContainer} flex ${direction==="left"?'flex-row-reverse':'flex-row'}`}>
            <div style={{flexDirection:direction==='left'?'row-reverse':'row','--xpad':xpad + "px",paddingRight:direction==="left"?xpad:0, paddingLeft:direction==="right"?xpad:0} as CSSProperties} className={`${styles.hiddenItemSlotsContainer} `}>
                {
                    data.map((item,i)=><div className={styles.hiddenItemSlot} key={i}/>)
                }
            </div>
            <div style={{opacity:hovered?1:0, flexDirection:direction==='left'?'row-reverse':'row','--xpad':xpad + "px",paddingRight:direction==="left"?xpad:0, paddingLeft:direction==="right"?xpad:0} as CSSProperties} ref={itemsContainerRef} className={`${styles.visibleItemSlotsContainer}`}>
                {
                    data.map((item,i)=><div className={styles.visibleItemSlot} key={i}/>)
                }
            </div>
        </div>
    )
}