"use client";
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage(){

    const router = useRouter()
    const [user, setUser] = useState("nothing")

    function logout(){
       
        try{

        axios.get("/api/users/logout")
        toast.success("Logged out successfully")
        router.push("/login")
        console.log("logout successfully");
        

        }catch(err: any){
            console.log(err.message)
            toast.error(err.message)
        }
    }

    const getUserDetails = async () => {
        try{
            const res = await axios.get("/api/users/me")
            setUser(res.data._id)
            console.log(user);
            
        }catch(err: any){
            console.log(err.message)
            toast.error(err.message)
        }
    }

         
 
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>This is the profile page</p>
            <hr />
            <h2 className="p-2 rounded bg-green-500">{user === "nothing" 
            ? "Nothing": ( <Link href={`/profile/${user}`}>{user}</Link>) }</h2>
            <hr />
            <hr />
            <button
            onClick={logout} className="mt-4 focus:outline-none transition-transform transform hover:scale-105 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
                Logout
            </button>
      <hr />
            <button
            onClick={getUserDetails} className="mt-4 focus:outline-none transition-transform transform hover:scale-105 bg-green-800 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
                getUser
            </button>
        </div>
    );
}
