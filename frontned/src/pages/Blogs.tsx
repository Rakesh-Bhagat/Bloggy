import { AppBar } from "../components/AppBar"
import { Post } from "../components/Post"

export const Blogs = () => {
    return <div className="">
        <div className="mb-10">
            <AppBar />
        </div>
        <div className="flex justify-center items-center flex-col ">
            <div className=" flex-col">
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            </div>
            
            
            
            
        </div>
    </div>
}