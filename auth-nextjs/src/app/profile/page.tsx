"use client";
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ProfilePage(){

    const router = useRouter()

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
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>This is the profile page</p>
            <hr />
            <hr />
            <button
            onClick={logout} className="mt-4 focus:outline-none transition-transform transform hover:scale-105 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
                Logout
            </button>
        </div>
    );
}