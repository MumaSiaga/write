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
  className="cursor-pointer text-left text-sm rounded-lg cursor-pointer dark:text-white text-black"
             
>
  Logout
</button>

  );
}
