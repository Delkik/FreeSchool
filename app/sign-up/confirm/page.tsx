"use client";

import Box from "@mui/material/Box";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import VerificationInput from "react-verification-input";

export default function ConfirmSignUp() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [error, setError] = useState(false);

  const router = useRouter();

  const handleOnComplete = async (confirmationCode: string) => {
    try {
      setError(false);
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup/confirm`;

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, confirmationCode }),
      });

      console.log(res);
      if (res.ok) {
        router.push("/sign-in");
        return;
      }
    } finally {
      setError(true);
    }
  };

  {
    /* TODO: maybe add a "resend confirmation" button? */
  }
  return (
    <Box className="flex flex-1 w-full justify-center items-center min-h-screen">
      <Box className="border-2 border-black p-5 rounded bg-white max-w-[400px]">
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-4xl font-bold">Enter the code</h1>
          <p>
            Enter the 6-digit verification code that was emailed to{" "}
            <span className="italic">{email}</span> to confirm your account
          </p>
          <VerificationInput
            validChars="1234567890"
            classNames={{ character: clsx(error && "border-red-600") }}
            onComplete={handleOnComplete}
          />
          <p className={clsx("text-red-600", !error && "invisible")}>
            Wrong Code. Try Again.
          </p>
        </div>
      </Box>
    </Box>
  );
}
