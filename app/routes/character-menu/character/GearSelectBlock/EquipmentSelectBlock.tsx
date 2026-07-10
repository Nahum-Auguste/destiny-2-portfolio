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
}

// EquipmentSelectBlock({equipment:[{type:"arms",name:"immortal legend"},{type:"chest",name:"immortal legend"}]})

const MAX_UNEQUIPED_SLOTS = 9

export default function EquipmentSelectBlock<T extends EquipmentType>({equipment}:Props<T>)
{
    const data = Array(MAX_UNEQUIPED_SLOTS).fill(null);


    return (
        <div className={styles.container}>
            <div className={styles.equippedSlot}>

            </div>
            <div className={styles.hiddenItemSlotsContainer}>
                {
                    data.map((item,i)=><div className={styles.hiddenItemSlot} key={i}/>)
                }
            </div>
        </div>
    )
}