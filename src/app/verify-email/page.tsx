"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const VerifyEmailPage = () => {
  const [token, setToken] = useState<string>("");
  const [verified, setVerified] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  const verifyEmail = async () => {
      try {
        await axios.post("/api/user/verify-email", { token });

        setVerified(true);
        setError(null);
      } catch (error) {
        console.log(error);
        setError(
          "An error occured while verify your email, please try again later."
        );
      }
    };

  useEffect(() => {
    // const searchParams = new URLSearchParams(window.location.search).get('token')

    const urlToken = window.location.search.split("=")[1];

    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    
    if(token.length > 0){

      verifyEmail()
    }
  }, [token]);

  if(error) return <h1>An error occured in this page</h1>
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-10">
        Verify your Email
      </h1>
      <div className="flex justify-center items-center mt-10">
        {verified && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline">
              {" "}
              Your email has been verified.
            </span>

            <Link
              href="/login"
              className="text-blue-500 hover:text-white-500 font-bold ml-2"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
