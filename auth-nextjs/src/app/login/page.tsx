"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";



export default function Login(){
    const router = useRouter();

    const [user, setUser] = React.useState({
        email: "",
        password: "",
       
    });
    const [loading, setLoading] = React.useState(false);
    const [buttonDisabled, setButtonDisabled] = React.useState(false);

    const onLogin = async () => {
       
        try {
            setLoading(true);
           const response =  await axios.post("/api/users/login", user)
            console.log("Login successfull", response.data);
            // localStorage.setItem("token", response.data.token);
            // localStorage.setItem("user", JSON.stringify(response.data.user));
            toast.success("Login success" )
            router.push("/profile");
            
        } catch (error: any) {
            
            console.log("Login failed",error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true);
        }
    },[user])


    return (
        <div className="flex flex-col items-center 
        justify-center min-h-screen py-2">
                <h1 className="">{loading ? "Processing" : "Login"}</h1>

                <hr />

         

                <label htmlFor="email">email</label>
                <input
                className="p-2 border border-gray-300 rounded-lg
                mb-4 focus:outline-none text-black focus:border-gray-600"
                    type="email"
                    name="email"
                    value={user.email}
                    placeholder="email"
                    onChange={(e) => setUser({...user, email: e.target.value })} />



                <label htmlFor="password">password</label>
                <input
                className="p-2 border border-gray-300 rounded-lg
                mb-4 focus:outline-none text-black focus:border-gray-600"
                    type="password"
                    name="password"
                    value={user.password}
                    placeholder="password"
                    onChange={(e) => setUser({...user, password: e.target.value })} />
                    

                    <button
                    onClick={onLogin}
                     className="p-2 border hover:text-black hover:bg-slate-300
                    mb-4 focus:outline-none border-gray-300 rounded-lg"
                    >
                        Login here
                    </button>

                    <Link href={"/signup"}>Create new Account</Link>

                   
        </div>
    )
}