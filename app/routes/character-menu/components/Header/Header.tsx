import { Link, useLocation } from "react-router";
import styles from "./Header.module.css"

const routeNames = ['resume','my work','contact','about me','character'] as const;
type RouteName = typeof routeNames[number]; 

export default function Header()
{
    const location = useLocation();
    const path = location.pathname.toLowerCase().replace("-"," ");

    return (
        <header  className={`${styles.header} ${path.includes('my work') || path.includes('about')?styles.closed:''} w-full bg-gray-500`}>
            <div className="flex-1"/>
            <nav>
                <ul>
                    {
                        routeNames.map((n:RouteName,i)=>{
                            return (
                                <li key={i} className={path.includes(n) ? styles.selected : ''}>
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