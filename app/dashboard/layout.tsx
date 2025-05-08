"use client";

import Navbar from "@/components/main/Navbar";
import { useSession } from "next-auth/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session } = useSession();

  return (
    <div className="">
      <Navbar />

      {session ? (
        <div className="ml-[var(--nav-size)]">{children}</div>
      ) : (
        <div className="ml-[var(--nav-size)]">loading...</div>
      )}
    </div>
  );
}
