"use client";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="pr-12 pl-6 pt-6">{children}</div>;
}
