"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

type SignupFormData = {
  username: string;
  email: string;
  password: string;
};

const SignupPage = () => {
  const [signupFormData, setSignupFormData] = useState<SignupFormData>({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;

    setSignupFormData({
      ...signupFormData,
      [name]: value,
    });
  };

  const handleSignup = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/api/user/signup", signupFormData);

      console.log("Signup result -> ", response.data);

      toast.success("Signup successful");

      setSignupFormData({
        username: "",
        email: "",
        password: "",
      });
      router.push("/login");
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data) {
        console.log("signup error -> ", error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        console.error("Unexpected error -> ", error);
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const { username, email, password } = signupFormData;

    if (username.length > 0 && email.length > 0 && password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [signupFormData]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="mb-8">{loading ? "Please wait..." : "Signup"}</h1>
      <hr />

      {/* username field*/}

      <label htmlFor="username">Username</label>
      <input
        id="username"
        type="text"
        name="username"
        value={signupFormData.username}
        onChange={handleChange}
        placeholder="Enter your username"
        className="p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      />

      {/* email field */}

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        name="email"
        value={signupFormData.email}
        onChange={handleChange}
        placeholder="Enter your email"
        className="p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      />

      {/* password field */}

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        name="password"
        value={signupFormData.password}
        onChange={handleChange}
        placeholder="Password"
        className="p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      />

      <button
        onClick={handleSignup}
        className="p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        disabled={buttonDisabled}
      >
        signup
      </button>
      <Link href="/login">Login here</Link>
    </div>
  );
};

export default SignupPage;
