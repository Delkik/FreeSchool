import SignInButton from "@/components/main/SignInButton";
import SignUpButton from "@/components/main/SignUpButton";

export default function LandingPage() {
  return (
    <div className="w-full flex min-h-screen justify-center items-center">
      <main className="w-full min-h-screen flex flex-col">
        <div className="w-full flex py-5 px-10 items-center justify-between border-b-2 shadow">
          <span className="invisible w-[250px]"></span>
          <span className="flex self-center text-2xl italic">FreeSchool</span>
          <span className="self-end flex gap-5 w-[250px]">
            <SignInButton />
            <SignUpButton />
          </span>
        </div>
        <div className="flex flex-1 justify-center">
          <div className="flex flex-col justify-center items-center gap-12">
            <h1 className="text-6xl font-bold">Welcome!</h1>
            <div className="flex flex-col self-center items-center gap-6">
              <p className="text-xl text-[var(--subtext)]">
                Whether you&apos;re a Parent, Teacher, or Student,{" "}
                <span className="italic">FreeSchool</span> is the perfect tool
                for all your Homeschooling needs.
              </p>
              <div className="flex flex-col gap-2 w-full items-center"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
