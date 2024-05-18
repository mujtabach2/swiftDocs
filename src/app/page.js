import Image from "next/image";
import supabase from "./config/supabaseClient";
export default function Home() {
  console.log(supabase);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to Supabase</h1>
      {/*button to login [age ] */}
    </main>
  );
}
