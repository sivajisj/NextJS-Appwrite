"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";



export default function Login(){
    const [user, setUser] = React.useState({
        email: "",
        password: "",
       
    });

    const onLogin = async () => {
        console.log(user);
        
    }


    return (
        <div className="flex flex-col items-center 
        justify-center min-h-screen py-2">
                <h1 className="">Login</h1>

                <hr />

         

                <label htmlFor="email">email</label>
                <input
                className="p-2 border border-gray-300 rounded-lg
                mb-4 focus:outline-none focus:border-gray-600"
                    type="email"
                    name="email"
                    value={user.email}
                    placeholder="email"
                    onChange={(e) => setUser({...user, email: e.target.value })} />



                <label htmlFor="password">password</label>
                <input
                className="p-2 border border-gray-300 rounded-lg
                mb-4 focus:outline-none focus:border-gray-600"
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
                        Login heres
                    </button>

                    <Link href={"/signup"}>Create new Account</Link>

                   
        </div>
    )
}