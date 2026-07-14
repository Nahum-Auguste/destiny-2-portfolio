import { Link } from "react-router"
import styles from "./NetMenuHeader.module.css"




export default function NetMenuHeader()
{



    return (
        <header className={`${styles.header}`}>
            <Link to={"my-work"}>my-work.net</Link>
            <nav>
                <a href="" >RESUME</a>
                <Link to={""}>title screen</Link>
                <Link to={""}>about me</Link>
                <Link to={""}>character menu</Link>
                <Link to={""}>Orbit</Link>
            </nav>
        </header>
    )
}