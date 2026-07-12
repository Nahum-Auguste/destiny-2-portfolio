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
            <ArmorPiece meshPaths={helmet?.meshPaths}/>
            <ArmorPiece meshPaths={arms?.meshPaths}/>
            <ArmorPiece meshPaths={chest?.meshPaths}/>
            <ArmorPiece meshPaths={legs?.meshPaths}/>
            <ArmorPiece meshPaths={classItem?.meshPaths}/>
        </>
    )
}