"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import BlueWave from "../components/blueWave";
import Image from "next/image";

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  // const session = useSession();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/dashboard");
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password is invalid");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
      if (res?.url) router.replace("/dashboard");
    } else {
      setError("");
    }
  };

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    sessionStatus !== "authenticated" && (
      <div className="flex flex-col h-screen">
        <div className=" flex justify-center mt-20  ">
          <div style={{ width: "25%" }}>
            <div className=" shadow-lg flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-50 rounded">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="flex justify-center ">
                  <Image
                    className=" "
                    src="/logo-breitfuss.png"
                    height={225}
                    width={225}
                    alt="Breitfuss Logo"
                  />
                </div>

                <h2 className="mt-2 text-center text-xl  mb-10  leading-9 tracking-tight text-gray-900">
                  Login to take charge. Unleash BMT Data Hub.
                </h2>
              </div>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="w-full border border-gray-300 dark:text-white text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
                  placeholder="Email"
                  required
                />
                <input
                  type="password"
                  className="w-full border border-gray-300 dark:text-white text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
                  placeholder="Password"
                  required
                />
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-[#384D6C] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#303f57] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#303f57]"
                >
                  {" "}
                  Sign In
                </button>
                <p className="text-red-600 text-[16px] mb-4">
                  {error && error}
                </p>
              </form>
              <Link
                className="block text-center text-blue-500 hover:underline mt-2"
                href="/register"
              >
                Register Here
              </Link>

              <p className="mt-10 text-center text-sm text-gray-500">
                Made with love at{" "}
                <a
                  href="#"
                  className="font-semibold leading-6 text-red-600 hover:text-[#303f57]"
                >
                  Breitfuss
                </a>
              </p>
            </div>
          </div>
        </div>
        <BlueWave />
      </div>
    )
  );
};

export default Login;
