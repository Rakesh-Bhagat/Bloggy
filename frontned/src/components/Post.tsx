import { Link } from "react-router-dom"

export const Post = () =>{
    return <Link to={"/blog/1"}>
        <div className="flex flex-col w-sm md:w-3xl border-b border-slate-300 p-5">
            <div className="flex items-center">
                
                <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-600 rounded-full ">
                    <span className=" font-medium text-gray-300 ">R</span>
                </div>
                <div className="pl-2">Rakesh Bhagat</div>
            </div>
            <div className="font-extrabold text-xl mt-3">How an Ugly Single-Page Website Makes $5000 a Month with Affiliate Marketing</div>
            <div className="text-gray-600 mt-2">No need to create a fancy and modern website with hundreds of pages to make money online. --Making money online is the dream for man...

            </div>
            <div className="text-slate-300 font-light mt-1">1 Min Read</div>
        </div>
    </Link>
} 