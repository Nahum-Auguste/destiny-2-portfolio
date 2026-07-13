import { Outlet } from "react-router";
import Header from "./components/Header/Header";
import ControlsBar from "./components/ControlsBar/ControlsBar";

export default function CharacterMenuLayout()
{

    return (
        <div className="w-full h-full flex flex-col">
            <Header/>
            <main className="w-full flex-1 bg-[#38393E]"><Outlet/></main>
            <ControlsBar/>
        </div>
    )
}

