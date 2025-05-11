"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import  axios  from "axios";
import toast from "react-hot-toast";

type LoginFormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [loginFormData, setLoginFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false)

  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    setLoginFormData({
      ...loginFormData,
      [name]: value,
    });
  };

  const handleLogin = async () => {

    try {
      
      setLoading(true)

      const response = await axios.post("/api/user/login", loginFormData)

      console.log(" Login result -> ", response.data)
      toast.success("Login successful")

      setLoginFormData({
        email: "",
        password: ""
      })

      router.push("/profile")
    } catch (error: any) {
      
      console.log("login error -> ", error.response.data.message)
      toast.error(error.response.data.message)
    } finally{

      setLoading(false)
    }
  };

  useEffect(() => {

    const {email, password} = loginFormData
    if(email.length > 0 && password.length > 0){
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true)
    }
  }, [loginFormData])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="mb-8">{loading? "Please wait...": "Login"}</h1>
      <hr />

      {/* email field */}

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        name="email"
        value={loginFormData.email}
        onChange={handleChange}
        placeholder="Enter your email"
        className="p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 "
      />

      {/* password field */}

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        name="password"
        value={loginFormData.password}
        onChange={handleChange}
        placeholder="Password"
        className="p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 "
      />

      <button
        onClick={handleLogin}
        className="p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        disabled={buttonDisabled}
      >
        login
      </button>
      <Link href="/signup">Signup here</Link>
    </div>
  );
};

export default LoginPage;
