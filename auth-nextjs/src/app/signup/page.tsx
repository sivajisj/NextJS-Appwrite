"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignUp() {

    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);



  const onSignup = async () => {
    try {
         setLoading(true);
        const response =  axios.post("/api/users/signup", user);
        console.log("signup success: ", (await response).data);
        router.push("/login");


    } catch (error: any) {
        console.log("Signup failed ", error.message);
        
        toast.error(error.message);
        
    }finally{
        setLoading(false);
    }
  };



  useEffect(()=> {
    
    if(user.email && user.password && user.username) {
           setButtonDisabled(false);
    }
    else {
      setButtonDisabled(true);
    }
  },[user])

  return (
    <div
      className="flex flex-col items-center 
        justify-center min-h-screen py-2"
    >
      <h1 className="">{!loading ? "Signup": "Process"}</h1>

      <hr />

      <label htmlFor="username">username</label>
      <input
        className="p-2 border border-gray-300 rounded-lg
                mb-4 focus:outline-none text-purple-600 focus:border-gray-600"
        type="text"
        name="username"
        value={user.username}
        placeholder="username"
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />

      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg
                mb-4 focus:outline-none text-purple-600 focus:border-gray-600"
        type="email"
        name="email"
        value={user.email}
        placeholder="email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />

      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg
                mb-4 focus:outline-none text-purple-600 focus:border-gray-600"
        type="password"
        name="password"
        value={user.password}
        placeholder="password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

      <button
        onClick={onSignup}
        className="p-2 border hover:text-black hover:bg-slate-300
                    mb-4 focus:outline-none border-gray-300 rounded-lg"
      >
        { buttonDisabled? "No signUp":  "Signup"}
      </button>

      <Link href={"/login"}>Visit login page</Link>
    </div>
  );
}
