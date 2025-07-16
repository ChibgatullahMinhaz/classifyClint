import React from "react";
import { useNavigate, useLocation } from "react-router";
import { GoogleAuthProvider } from "firebase/auth";

import Swal from "sweetalert2";
import useAuth from "../Hook/useAuth";
import axiosSecure from "../Service/AxiosSecure";

const provider = new GoogleAuthProvider();

const SocialLogin = () => {
  const { signInWithProvider } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithProvider(provider);
      const user = result.user;

      if (user) {
        const saveUser = {
          firebaseUID: user.uid,
          name: user.displayName,
          email: user.email || "",
          photoURL: user.photoURL || "",
          isVerified: user.emailVerified,
          role: "student",
          createdAt: new Date(Number(user.metadata?.createdAt)),
          updatedAt: new Date(),
          lastLoginAt: new Date(Number(user.metadata?.lastLoginAt)),
        };

        await axiosSecure.post("/save/users", saveUser);
      }

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back!",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate(from, { replace: true });
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <span className="w-1/5 border-b md:w-1/4"></span>
        <p className="text-sm text-center text-gray-500">or sign in with</p>
        <span className="w-1/5 border-b md:w-1/4"></span>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Google
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
