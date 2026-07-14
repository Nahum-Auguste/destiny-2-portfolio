import { Outlet } from "react-router";
import NetMenuHeader from "./components/NetMenuHeader/NetMenuHeader";



export default function NetMenuLayout()
{



    return (
        <div className="bg-[#12171C] w-full h-full">
            <NetMenuHeader/>
            <main>
                <Outlet/>
            </main>
        </div>
    )
}