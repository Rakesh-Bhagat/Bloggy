import { useState } from "react"
import { AuthHeader } from "../components/AuthHeader"
import { Button } from "../components/Button"
import { InputField } from "../components/InputField"
import { Quote } from "../components/Quote"
import axios from "axios"
import { SigninInput } from "@irakesh_bhagat/bloggy-common"
import { useNavigate } from "react-router-dom"


export const Login = () => {
    const navigate = useNavigate();
    const [userInputs, setUserInputs] = useState<SigninInput>({
        email: "",
        password: ""
    })


async function handleLogin() {

    try {
        const response = await axios.post("https://bloggy.rakeshbhagat333.workers.dev/api/v1/user/signin", userInputs)
        const jwt = "Bearer " + response.data.token
        console.log(jwt)
        localStorage.setItem("token", jwt)
        navigate("/blogs")
    } catch (error) {
        console.log(error)
    }
   
}
    return <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex justify-center h-screen ">
            <div className="flex justify-center flex-col w-lg ">
                <div className="">
                    <AuthHeader title={"Login"} description={"Dont't have an account?"} button={"Signup"}  to={"/signup"}/>
                </div>
                <div className="flex justify-center w-full">
                    <div className="">
                        <InputField onChange={(e)=>{
                            setUserInputs({
                                ...userInputs,
                                email: e.target.value,
                            });
                        }} type={"text"} placeholder={"example@gmail.com"}  label={"Email"}/>
                        <InputField onChange={(e)=>{
                            setUserInputs({
                                ...userInputs,
                                password: e.target.value,
                            })
                        }} type={"password"} placeholder={"Password"}  label={"Password"}/>
                    </div>
                    
                    
                </div>
                <div className="flex justify-center mt-1">
                    <Button onClick={handleLogin} text={"Login"} />
                </div>
            </div>
        </div>
        <div className="invisible lg:visible">
            <Quote />
        </div>
    </div>
}