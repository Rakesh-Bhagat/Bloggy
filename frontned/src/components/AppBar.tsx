import { Link } from "react-router-dom"

export const AppBar = () =>{
    return <div className="flex justify-between border-b border-slate-400 px-10 md:px-20 w-full h-15 items-center">
        <Link to={"/blogs"} className="flex font-bold text-2xl">Bloggy</Link>
        
        <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-medium text-gray-600 dark:text-gray-300">U</span>
        </div>

    </div>
}