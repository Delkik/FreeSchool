"use client";

import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <Navbar />
      <div className="flex-1 ml-[var(--nav-size)] p-6">{children}</div>
    </div>
  );
}
