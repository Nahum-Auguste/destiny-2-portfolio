import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Character from "./Character";
import type { ArmorItem } from "../character.types";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Group, PerspectiveCamera as PerspectiveCameraImpl} from "three";

type Props = {
    helmet?: ArmorItem,
    arms?: ArmorItem,
    chest?: ArmorItem,
    legs?: ArmorItem,
    classItem?: ArmorItem,
}

export default function CharacterCanvas({helmet,arms,chest,legs,classItem}:Props)
{
    

    return (
        <Canvas>
            <CanvasContent helmet={helmet} arms={arms} chest={chest} legs={legs} classItem={classItem}/>
        </Canvas>
    )
}

const cameraY = .8;

export function CanvasContent({helmet,arms,chest,legs,classItem}:Props)
{
    const orbitallyRotatedGroupRef = useRef<Group>(undefined);
    const cameraRef = useRef<PerspectiveCameraImpl>(null);

    useFrame(()=>{
        const orbitGroup = orbitallyRotatedGroupRef.current;
        const camera = cameraRef.current;
        if (orbitGroup && camera)
        {
            orbitGroup.quaternion.copy(camera.quaternion);
        }
    })


    return (
        <>
            <group ref={orbitallyRotatedGroupRef}>
                <pointLight position={[0,1.5,.75]} intensity={20}/>
            </group>
            <Character helmet={helmet} arms={arms} chest={chest} legs={legs} classItem={classItem}/>
            <PerspectiveCamera ref={cameraRef} makeDefault position={[0,cameraY,1.5]} fov={95}/>
            <OrbitControls
                target={[0,cameraY,0]}
                minPolarAngle={Math.PI / 2.4} 
                maxPolarAngle={Math.PI / 2.4}
            />
        </>
    )
}