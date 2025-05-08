"use client";

import Box from "@mui/material/Box";
import { useRouter, useSearchParams } from "next/navigation";
import VerificationInput from "react-verification-input";

export default function ConfirmSignUp() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const router = useRouter();

  const handleOnComplete = async (confirmationCode: string) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup/confirm`;

    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, confirmationCode }),
    });

    router.push("/sign-in");
  };

  return (
    <Box>
      {/* TODO: maybe add a "resend confirmation" button? */}
      <VerificationInput onComplete={handleOnComplete} />
    </Box>
  );
}
