import { Html, useGLTF } from "@react-three/drei";
import type { ArmorPieceType, ArmorSet, CharacterClass } from "../character.types"
import { Suspense, useLayoutEffect, useMemo } from "react";
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three"
import { createArmorMaterial } from "./helpers/create-armor-material";

type Props = {
    meshPaths?: string[]
    texturePaths?:string[]
}

export default function ArmorPiece({meshPaths,texturePaths}:Props)
{
    if (!meshPaths?.length) return null;

    // console.log(meshPaths);
    
    
    return (
        <Suspense fallback={<Html><p>Loading...</p></Html>}>
        {
            meshPaths.map((p,i)=><ArmorPieceMesh setTexturePaths={texturePaths} key={i} meshPath={p}/>)
        }
        </Suspense>
    )
}

function ArmorPieceMesh({meshPath,setTexturePaths=[]}:{meshPath:string,setTexturePaths?:string[]})
{
    const {scene} = useGLTF(meshPath);
    const clonedScene = useMemo(()=>SkeletonUtils.clone(scene),[scene])

    const mesh = useMemo(()=>{
        return clonedScene.getObjectByProperty('isSkinnedMesh',true) as THREE.SkinnedMesh;
    },[clonedScene]);

    if (!mesh)
    {
        console.error("Error: skinned mesh not found from:",meshPath);
        return null;
    }

    const hash = useMemo(()=>{return getMeshHash(mesh)},[mesh])

    if (!hash)
    {
        console.log('hash not found for',meshPath);
        
    }
    else {
        // console.log(hash);
        
    }

    const texturePaths = useMemo(()=>{
        if (hash)
        {
            return setTexturePaths.filter((p)=>p.includes(hash)&&(p.includes('albedo')||p.includes('normal')||p.includes('gstack')||p.includes('dyemap')));
        }
        else {
            return [];
        }
    },[hash])

    const {albedo, normal, gstack, dyeMap} = useLoader(TextureLoader,texturePaths).reduce((acc,cur,i)=>{
        if (texturePaths[i].includes("albedo"))
        {
            acc.albedo = cur;
        }
        else if (texturePaths[i].includes("normal"))
        {
            acc.normal = cur;
        }
        else if (texturePaths[i].includes("gstack"))
        {
            acc.gstack = cur;
        }
        else if (texturePaths[i].includes("dyeMap"))
        {
            acc.dyeMap = cur;
        }
        return acc;
    }, {} as Record<'albedo' | 'normal' | 'gstack' | 'dyeMap', THREE.Texture<HTMLImageElement, THREE.TextureEventMap>>);

    useLayoutEffect(()=>{
        if ("dispose" in mesh.material)
            mesh.material.dispose();

        if (Array.isArray(mesh.material))
        {    
            mesh.material.forEach((m)=>{
                if ("dispose" in m)
                    m.dispose();
            })
        }

        mesh.material = createArmorMaterial(albedo,normal,gstack,dyeMap);
    },[albedo,normal,gstack,dyeMap]);

    return (
        <primitive object={mesh}/>
    )
}

function getMeshHash(mesh:THREE.SkinnedMesh)
{
    const match = mesh.name.match(/^[0-9A-F]{8}/i);
    return match? match[0] : null
}