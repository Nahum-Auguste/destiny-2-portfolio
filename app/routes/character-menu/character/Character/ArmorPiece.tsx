import { useGLTF } from "@react-three/drei";
import type { ArmorPieceType, ArmorSet, CharacterClass } from "../character.types"
import { useMemo } from "react";

type Props = {
    meshPaths?: string[]
}

export default function ArmorPiece({meshPaths}:Props)
{
    if (!meshPaths?.length) return null;

    // console.log(meshPaths);
    
    
    return (
        <>
        {
            meshPaths.map((p,i)=><ArmorPieceMesh key={i} meshPath={p}/>)
        }
        </>
    )
}

function ArmorPieceMesh({meshPath}:{meshPath:string})
{
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