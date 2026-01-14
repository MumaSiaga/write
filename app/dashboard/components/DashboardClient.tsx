"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";
import Sidebar from "./sidebar";
import Editor from "./Editor";


export default function DashboardClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [mobileView, setMobileView] = useState<'sidebar' | 'editor'>('sidebar')


 useEffect(() => {
  let mounted = true;
  let timeoutId: NodeJS.Timeout;

  supabase.auth.getSession().then(({ data }) => {
    if (!mounted) return;

    if (!data.session) {
      router.replace("/login");
      return;
    }

    setUser(data.session.user);

    timeoutId = setTimeout(() => {
      if (mounted) setLoading(false);
    }, 1000);
  });

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
    clearTimeout(timeoutId);
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
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`
          md:block
          ${mobileView === 'sidebar' ? 'block' : 'hidden'}
        `}
      >
        <Sidebar onOpenEditor={() => setMobileView('editor')} />
      </div>

      {/* Editor */}
      <div
        className={`
          flex-1
          md:block
          ${mobileView === 'editor' ? 'block' : 'hidden'}
        `}
      >
        <Editor onBackToSidebar={() => setMobileView('sidebar')} />
      </div>
    </div>
  )
}
