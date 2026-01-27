"use client";

import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  return (
<button
  onClick={logout}
  className="
    w-full
    px-4 py-2
    rounded-lg
    text-sm font-medium
    cursor-pointer
    text-black
    bg-[#8fa382]
    dark:text-white
    dark:bg-black
    transition-colors
  "
>
  Logout
</button>

  );
}
