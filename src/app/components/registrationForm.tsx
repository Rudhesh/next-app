// ... other imports

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "./modal";

const RegistrationForm = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  const handleSubmit = async (data1: any) => {
    console.log("second");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data1),
      });

      if (res.status === 400) {
        setError("This email is already registered");
      } else if (res.status === 200) {
        setError("");
        router.push("/login"); // Redirect to login page after successful registration
      } else {
        setError("Unexpected error occurred");
      }
    } catch (error) {
      setError("Error, try again");
      console.error(error);
    }
  };

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    sessionStatus === "authenticated" && (
      <div>
        <Button variant="outline" onClick={handleClickOpen}>
          Add User
        </Button>
        <Modal isOpen={open} onClose={handleClose} onSubmit={handleSubmit} />
      </div>
    )
  );
};

export default RegistrationForm;
