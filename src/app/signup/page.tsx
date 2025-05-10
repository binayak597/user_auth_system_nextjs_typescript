"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { axios } from "axios";

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

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;

    setSignupFormData({
      ...signupFormData,
      [name]: value,
    });
  };

  const handleSignup = () => {};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="mb-8">Signup</h1>
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
      >
        signup
      </button>
      <Link href="/login">Login here</Link>
    </div>
  );
};

export default SignupPage;
