
interface InputField{
    placeholder: string,
    type: string,
    label: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const InputField = ({placeholder, type, label, onChange}: InputField) => {
    return <div className="flex flex-col justify-center">
        <label className="pl-1" htmlFor={label}>{label}</label>
        <input onChange={onChange} name={label} type={type} placeholder={placeholder} className="border rounded px-3 py-1 w-sm mt-1 mb-2 text-left focus:outline-none border-slate-400 "/>
    </div>
}