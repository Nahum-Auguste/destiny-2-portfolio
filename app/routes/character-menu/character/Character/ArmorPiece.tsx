import { useGLTF } from "@react-three/drei";
import type { ArmorPieceType, ArmorSet, CharacterClass } from "../character.types"
import { useMemo } from "react";

type Props = {
    meshPath?: string
}

export default function ArmorPiece({meshPath}:Props)
{
    if (!meshPath) return null;
    const {scene} = useGLTF(meshPath);

    const mesh = useMemo(()=>{
        return scene.getObjectByProperty('isSkinnedMesh',true);
    },[meshPath]);

    if (!mesh)
    {
        console.error("Error: skinned mesh not found from:",meshPath);
        return null;
    }



    return (
        <primitive object={mesh}/>
    )
}