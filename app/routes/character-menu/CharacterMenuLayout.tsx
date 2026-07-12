import { Outlet } from "react-router";
import Header from "./components/Header/Header";

export default function CharacterMenuLayout()
{

    return (
        <div className="w-full h-full flex flex-col">
            <Header/>
            <main className="w-full flex-1"><Outlet/></main>
        </div>
    )
}

