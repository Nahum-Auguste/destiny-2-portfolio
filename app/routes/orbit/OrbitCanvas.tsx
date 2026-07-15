import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Bloom, BrightnessContrast, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import { useEffect } from "react";
import * as THREE from "three"


export default function OrbitCanvas()
{


    return (
        <Canvas>
            <Content/>
        </Canvas>
    )
}

function Content()
{
    const {scene, gl} = useThree();
    const galaxy = useLoader(THREE.TextureLoader,"./textures/skyboxes/galaxy.png")

    useEffect(()=>{
        // galaxy.mapping = THREE.EquirectangularReflectionMapping
        scene.background = galaxy;
        gl.toneMapping = THREE.NoToneMapping;
    },[scene])

    return (
        <>
            <EffectComposer>
                <Bloom/>
                <Vignette eskil={false} offset={0.1} darkness={1.1} />
                <BrightnessContrast
                    brightness={0.0} 
                    contrast={0.4} // Positive values increase contrast
                />
            </EffectComposer>
            {/* <fog attach="fog" args={['#000000', 40, 700]} /> */}
            {/* <ambientLight /> */}
            <mesh  position={[0,0,-50]}>
                <boxGeometry  scale={100}/>
                <meshStandardMaterial color={'white'}/>
            </mesh>
            <PerspectiveCamera makeDefault position={[0,0,40]}/>
            <group position={[10,-10,-4]}>
                
                <mesh >
                    <sphereGeometry args={[.3,32,32]}/>
                    <meshStandardMaterial emissive={"white"} emissiveIntensity={15} side={2} color={"white"} toneMapped={false}/>
                </mesh>
                <spotLight intensity={7000} position={[8,-10,-45]}/>
                <pointLight position={[0,0,1.1]} intensity={15} distance={1000} decay={.25} color="white"/>
                {/* <pointLight intensity={1000} distance={100} decay={2} color="#FFFFA0"/> */}
            </group>

            {/* <fog attach="fog" args={['#000000', 5, 20]} /> */}
            {/* <mesh position={[4,0,-3]}>
                <boxGeometry args={[1,1,1]} />
                <meshStandardMaterial color="gray" />
            </mesh> */}
            <OrbitControls/>
            <Planet/>
        </>
    )
}

type MeshProps = {
    // position?: [number,number,number]
}

function Planet({}:MeshProps)
{
    const quality = 128;
    const folderPath = "./textures/earth/"
    const [map,normal,roughness,clouds] = useLoader(THREE.TextureLoader,[
        folderPath + "2k_earth_daymap.png",
        folderPath + "2k_earth_normal_map.png",
        folderPath + "2k_earth_roughness_map.png",
        folderPath + "2k_earth_clouds_transparent.png"
    ])

    clouds.wrapS = clouds.wrapT = THREE.RepeatWrapping;

    useFrame((state)=>{
        clouds.offset.x = state.clock.getElapsedTime() * -.005
        clouds.offset.y = state.clock.getElapsedTime() * .002

        map.offset.x = state.clock.getElapsedTime() * -.005/4
        map.offset.y = state.clock.getElapsedTime() * .001
        normal.offset.x = state.clock.getElapsedTime() * -.005/4
        normal.offset.y = state.clock.getElapsedTime() * .001
        roughness.offset.x = state.clock.getElapsedTime() * -.005/4
        roughness.offset.y = state.clock.getElapsedTime() * .001
    })

    return (
        <>
        
            <mesh  scale={60} position={[0,45,-40]}>
                <sphereGeometry args={[1,quality,quality]}/>
                <meshStandardMaterial 
                    // color={"black"}
                    color={"white"}
                    side={2}
                    emissive={"black"}
                    emissiveIntensity={.01}
                    map={map}
                    normalMap={normal}
                    roughnessMap={roughness}
                    normalScale={1}
                    roughness={1}

                />
            <mesh scale={60} position={[0,45,-40]}>
                <sphereGeometry args={[1,quality,quality]} />
                <meshStandardMaterial 
                    color="skyblue" 
                    side={1} // Render the inside of the sphere
                    transparent={true}
                    opacity={0.5}
                    emissive={"skyblue"}
                    emissiveIntensity={30}
                    
                />
                </mesh>
            </mesh>
            <mesh scale={60.3} position={[0,45,-40]}>
                <sphereGeometry args={[1,quality,quality]}/>
                <meshStandardMaterial 
                    side={2}
                    transparent
                    map={clouds}
                />
            </mesh>
        </>
    )
}