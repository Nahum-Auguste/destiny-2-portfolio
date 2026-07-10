import { Outlet } from "react-router";
import Header from "./components/Header/Header";

export default function CharacterMenuLayout()
{

    return (
        <div className="w-full h-full">
            <Header/>
            <main className="w-full h-full"><Outlet/></main>
        </div>
    )
}