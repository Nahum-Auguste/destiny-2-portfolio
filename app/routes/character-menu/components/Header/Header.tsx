import { Link, useLocation } from "react-router";
import styles from "./Header.module.css"

const routeNames = ['resume','my work','contact','about','character'] as const;
type RouteName = typeof routeNames[number]; 

export default function Header()
{
    const location = useLocation();

    return (
        <header  className={`${styles.header} w-full h-[110px] bg-gray-500`}>
            <div className="flex-1"/>
            <nav>
                <ul>
                    {
                        routeNames.map((n:RouteName,i)=>{
                            return (
                                <li key={i} className={location.pathname.toLowerCase().replace("-"," ").includes(n) ? styles.selected : ''}>
                                    {
                                        n === "resume" || n === 'contact' ?
                                        <p>{n}</p>
                                        :
                                        <Link to={n.replace(" ",'-').toLowerCase()}>{n}</Link>
                                    }
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>
        </header>
    )
}