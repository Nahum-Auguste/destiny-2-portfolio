import styles from "./Orbit.module.css"
import OrbitCanvas from "./OrbitCanvas"


export default function Orbit()
{



    return (
        <main className={`w-full h-full ${styles.screen}`}>
            <OrbitCanvas/>
        </main>
    )
}