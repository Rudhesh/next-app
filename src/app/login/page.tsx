"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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
      <div className="bg-[#384D6C] flex flex-col h-screen">
          <div className=" flex justify-center mt-20  " >
        <div  style={{width: "25%"}}>
        <div className=" shadow-lg flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white rounded">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
         
         <h2 className=" text-center text-5xl font-bold leading-9 tracking-tight text-[#384D6C]">
            BMT HUB
           </h2>
           <h2 className="mt-2 text-center text-xl  mb-10  leading-9 tracking-tight text-gray-900">
           Login to take charge. Unleash BMT app.
           </h2>
         </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="Email"
              required
            />
            <input
              type="password"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
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
            <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
          </form>
          {/* <Link
            className="block text-center text-blue-500 hover:underline mt-2"
            href="/register"
          >
            Register Here
          </Link> */}

          <p className="mt-10 text-center text-sm text-gray-500">
          Made with love at {" "}
            <a href="#" className="font-semibold leading-6 text-red-600 hover:text-[#303f57]">
            Breitfuss
            </a>
          </p>
        </div>
      </div>
      </div>
      </div>
    )
  );
};

export default Login;


// "use client";

// import Link from "next/link";
// import React, { useState } from "react";
// import toast from "react-hot-toast";
// import { signIn } from "next-auth/react";
// //import { toast } from "react-toastify";
// import { useRouter,useSearchParams } from "next/navigation";
// import { parseCallbackUrl } from "../../../helpers/helpers";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const router = useRouter();
//   const params = useSearchParams();
//   const callBackUrl = params.get("callbackUrl");
//   const submitHandler = async (e: { preventDefault: () => void; }) => {
//     e.preventDefault();
// console.log("first")
//     const data = await signIn("credentials", {
//       email,
//       password,
//        callbackUrl: callBackUrl ? parseCallbackUrl(callBackUrl) : "/",
       
//       //callbackUrl: false,
//     });
//       console.log("data===>", data)
//     if (data?.error) {
//       Error(data?.error);
//       toast.error("Registration failed. Try again.");
//     }

//     if (data?.ok) {
//       toast.success("Registration successful");
//       router.push("/");
      
//     }
//   };

//   return (
//     <div
//       style={{ maxWidth: "480px" }}
//       className="mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
//     >
//       <form onSubmit={submitHandler}>
//         <h2 className="mb-5 text-2xl font-semibold">Login</h2>

//         <div className="mb-4">
//           <label className="block mb-1"> Email </label>
//           <input
//             className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
//             type="text"
//             placeholder="Type your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block mb-1"> Password </label>
//           <input
//             className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
//             type="password"
//             placeholder="Type your password"
//             minLength={6}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
//         >
//           Login
//         </button>

//         <hr className="mt-4" />

//         <p className="text-center mt-5">
//           Don have an account?{" "}
//           <Link href="/register" className="text-blue-500">
//             Register
//           </Link>
//         </p>
//       </form>

//       <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
//         onClick={() => {
//           signIn("google");
//         }}
        
//       >
//         Login with Google
//       </button>
//     </div>
//   );
// };

// export default Login;