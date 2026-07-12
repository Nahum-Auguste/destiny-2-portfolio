import type { ArmorItem } from "../character.types"
import ArmorPiece from "./ArmorPiece"

type Props = {
    helmet?: ArmorItem,
    arms?: ArmorItem,
    chest?: ArmorItem,
    legs?: ArmorItem,
    classItem?: ArmorItem,
}

export default function Character({helmet,arms,chest,legs,classItem}:Props)
{


    return (
        <>
            <ArmorPiece meshPath={helmet?.meshPath}/>
            <ArmorPiece meshPath={arms?.meshPath}/>
            <ArmorPiece meshPath={chest?.meshPath}/>
            <ArmorPiece meshPath={legs?.meshPath}/>
            <ArmorPiece meshPath={classItem?.meshPath}/>
        </>
    )
}