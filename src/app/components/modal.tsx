"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Modal = ({ isOpen, onClose, onSubmit }: any) => {
  const [realname, setRealname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("first");
    if (!realname || !role || !email || !password) {
      setError("Please fill out all fields");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password is invalid");
      return;
    }

    try {
      // Your registration logic here
      await onSubmit({
        realname,
        role,
        email,
        password,
      });

      setError("");
      onClose();
    } catch (error) {
      setError("Error, try again");
      console.error(error);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="relative bg-gray-50 dark:bg-gray-800 rounded-lg mx-4 p-6 max-w-md w-full">
            <div className="absolute top-0 right-0 pt-2 pr-4">
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring focus:border-blue-300 dark:focus:border-blue-700"
              >
                &#x2715;
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Your form fields here */}
              <div className="mb-4">
                <label
                  htmlFor="realname"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="realname"
                  value={realname}
                  onChange={(e) => setRealname(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Jane"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Jane@gmail.com"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Role
                </label>
                <div className="relative">
                  <select
                    className="mt-1 p-2 w-full border rounded-md"
                    id="grid-state"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option>admin</option>
                    <option>data-admin</option>
                    <option>user</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="realname"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="****************"
                />
              </div>

              {/* Other form fields go here */}

              <div className="flex justify-end">
                <Button type="submit">Save</Button>
                <Button onClick={onClose} className="ml-2">
                  Cancel
                </Button>
              </div>

              {error && <p className="text-red-500 text-xs italic">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
