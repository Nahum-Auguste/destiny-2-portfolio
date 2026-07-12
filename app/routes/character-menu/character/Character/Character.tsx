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
            <ArmorPiece texturePaths={helmet?.texturePaths} meshPaths={helmet?.meshPaths}/>
            <ArmorPiece texturePaths={arms?.texturePaths} meshPaths={arms?.meshPaths}/>
            <ArmorPiece texturePaths={chest?.texturePaths} meshPaths={chest?.meshPaths}/>
            <ArmorPiece texturePaths={legs?.texturePaths} meshPaths={legs?.meshPaths}/>
            <ArmorPiece texturePaths={classItem?.texturePaths} meshPaths={classItem?.meshPaths}/>
        </>
    )
}