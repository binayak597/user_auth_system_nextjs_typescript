"use client";

import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

type UserDetailsType = {
  _id: string;
  username: string;
  email: string;
};

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState<UserDetailsType>();

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.get("/api/user/logout");
      toast.success("logout successful");
      router.push("/login");
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data) {
        console.log("profile page error -> ", error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        console.error("Unexpected error -> ", error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  const fetchUserDetails = async () => {
    try {
      const { data } = await axios.get("/api/user/getMe");

      setUserDetails(data.user);
      console.log(data.user);
      toast.success("User details fetched successfully");
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        console.error("Unexpected error -> ", error);
        toast.error("An unexpected error occurred");
      }
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl">Profile</h1>
      <hr />

      {userDetails && (
        <h2>
          <Link href={`/profile/${userDetails._id}`}>Get Details</Link>
        </h2>
      )}

      <div className="flex items-center justify-center gap-4 mt-4">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-blue-500 text-wite rounded"
        >
          Logout
        </button>
        <button
          onClick={fetchUserDetails}
          className="px-4 py-2 bg-green-500 text-wite rounded"
        >
          Fetch your details
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
