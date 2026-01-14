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
    text-black
    bg-blue-100
    hover:bg-red-50
    dark:text-white-400
    dark:hover:bg-blue-900/20
    transition-colors
  "
>
  Logout
</button>

  );
}
