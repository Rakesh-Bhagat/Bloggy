export const Button = ({text, onClick}: Button) => {
    return <div>
        <button onClick={onClick} className="border w-sm rounded-md px-5 py-3 bg-gray-800 text-white hover:bg-gray-600 cursor-pointer">{text}</button>
    </div>
}

interface Button{
    text: string,
    onClick: () => void
}