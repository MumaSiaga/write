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
    <button onClick={logout}>
      Logout
    </button>
  );
}
