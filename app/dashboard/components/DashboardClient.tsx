"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";

export default function DashboardClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
  let mounted = true;

  supabase.auth.getSession().then(({ data }) => {
    if (!mounted) return;

    if (data.session) {
      setUser(data.session.user);
    } else {
      router.replace("/login");
    }

    // Add a tiny delay (e.g., 1 second) before hiding the loading screen
    setTimeout(() => {
      if (mounted) setLoading(false);
    }, 1000); // 1000ms = 1 second
  });

  // Listen to auth changes
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    if (!mounted) return;

    if (session) {
      setUser(session.user);
    } else {
      router.replace("/login");
    }
  });

  return () => {
    mounted = false;
    subscription.unsubscribe();
  };
}, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  if (loading) {
 return (
    <div className="min-h-screen bg-[#fcfaf7] flex items-center justify-center">
        <h3 className="text-sage text-black font-display text-3xl md:text-4xl lg:text-5xl font-extralight italic leading-relaxed tracking-tight px-6 max-w-3xl mx-auto">
                        "True simplicity is the ultimate sophistication."
                    </h3>
        <div className="flex justify-center pt-4">
        <div className="size-2 bg-sage rounded-full animate-pulse-gentle shadow-[0_0_8px_rgba(111,135,100,0.4)]"></div>
        </div>
    </div>
        
  );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">
        Welcome, {user?.email || "User"}!
      </h1>
      <button
        onClick={handleLogout}
        className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
