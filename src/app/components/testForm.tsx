import { revalidateTag } from "next/cache";
import React from "react";

async function TestForm() {
  const res = await fetch("http://localhost:3000/api/register", {
    cache: "no-cache",
    next: { tags: ["rdata"] },
  });
  const data = await res.json();
  const rdata = data.users;
  console.log(data);
  const addData = async (e: FormData) => {
    "use server";
    const email = e.get("email")?.toString();
    const realname = e.get("realname")?.toString();
    const role = e.get("role")?.toString();
    const password = e.get("password")?.toString();

    if (!email || !realname) return;

    const newData: any = {
      realname,
      email,
      role,
      password,
    };

    await fetch("http://localhost:3000/api/register", {
      method: "POST",
      body: JSON.stringify(newData),
      headers: { "Content-Type": "application/json" },
    });
    revalidateTag("rdata");
  };
  return (
    <div>
      <form action={addData}>
        <input
          name="email"
          type="text"
          className="w-full border border-gray-300 dark:text-white text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
          placeholder="Email"
          required
        />
        <input
          name="realname"
          type="text"
          className="w-full border border-gray-300 dark:text-white text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
          placeholder="realname"
          required
        />
        <input
          name="role"
          type="text"
          className="w-full border border-gray-300 dark:text-white text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
          placeholder="Role"
        />
        <input
          name="password"
          type="text"
          className="w-full border border-gray-300 dark:text-white text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
          placeholder="Password"
        />
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-[#384D6C] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#303f57] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#303f57]"
        >
          {" "}
          Sign In
        </button>
      </form>
      <div className="grid grid-cols-3 gap-4">
        {rdata.map(
          (item: {
            _id: React.Key | null | undefined;
            role:
              | string
              | number
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | React.PromiseLikeOfReactNode
              | null
              | undefined;
            realname:
              | string
              | number
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | React.PromiseLikeOfReactNode
              | null
              | undefined;
            email:
              | string
              | number
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | React.PromiseLikeOfReactNode
              | null
              | undefined;
          }) => (
            <div key={item._id} className="bg-gray-200 p-4 rounded-md">
              <p className="text-lg font-bold">{item.role}</p>
              <p className="text-md">{item.realname}</p>
              <p className="text-sm text-gray-500">{item.email}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default TestForm;
