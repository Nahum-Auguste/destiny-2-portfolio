import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer, Noise } from "@react-three/postprocessing";





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

    return (
        <>
            <EffectComposer>
                <Bloom/>
                {/* <Noise/> */}
            </EffectComposer>
            <ambientLight />
            <mesh  position={[0,0,-50]}>
                <boxGeometry  scale={100}/>
                <meshStandardMaterial color={'white'}/>
            </mesh>
            <PerspectiveCamera makeDefault position={[0,0,40]}/>
            <group position={[60,-45,-180]}>
                
                <mesh >
                    <sphereGeometry args={[1,32,32]}/>
                    <meshStandardMaterial emissive={"yellow"} emissiveIntensity={3} side={2} color={"white"} toneMapped={false}/>
                </mesh>
                <pointLight position={[-5,0,0]} intensity={5000} distance={1000} decay={2} color="#FFFFA0"/>
                {/* <pointLight intensity={1000} distance={100} decay={2} color="#FFFFA0"/> */}
            </group>

            {/* <fog attach="fog" args={['#000000', 5, 20]} /> */}
            {/* <mesh position={[4,0,-3]}>
                <boxGeometry args={[1,1,1]} />
                <meshStandardMaterial color="gray" />
            </mesh> */}
            <OrbitControls/>
        </>
    )
}