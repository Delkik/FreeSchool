import Navbar from "@/components/main/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <Navbar />
      <div className="ml-[var(--nav-size)]">{children}</div>
    </div>
  );
}
