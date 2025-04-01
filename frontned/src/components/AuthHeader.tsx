import { Link } from "react-router-dom"


interface AuthHeader {
    title: string,
    description: string,
    button: string,
    to: string
}
export const AuthHeader = ({ title, description, button, to }: AuthHeader) => {
    return <div className=" p-5">
        <div className="flex justify-center font-bold text-3xl ">{title}</div>
        <div className="flex justify-center">
            <div className="pr-2">{description}</div>
            <Link className="underline" to={to}>{button}</Link>
        </div>
    </div>
}