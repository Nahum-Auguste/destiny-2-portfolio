import { useEffect } from "react"
import { useNavigate } from "react-router";



export default function ControlsBar()
{
    const navigate = useNavigate();

    useEffect(()=>{
        const handleKeyDown = (e:KeyboardEvent)=> {
            if (e.key === 'Escape')
            {
                navigate(-1);
            }
            
        }
        window.addEventListener('keydown',handleKeyDown);

        return ()=>{
            window.removeEventListener('keydown',handleKeyDown);
        }
    },[]);

    return (
        <footer className="fixed bottom-0 w-full h-[80px] bg-black/30">
            <aside aria-label="Navigation Controls Hints" className="w-full h-[30px] flex flex-row items-center justify-end pr-[120px] pt-[20px]">
                <p className="h-full flex flex-row items-center gap-2"><kbd className="capitalize h-full">esc</kbd> Dismiss</p>
            </aside>
        </footer>
    )
}