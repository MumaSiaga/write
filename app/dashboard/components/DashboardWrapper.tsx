"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function DashboardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    let mounted = true;
    let unsubscribe: any;

    // Check for existing session
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;

      if (data.session) {
        setHasSession(true);
        setIsChecking(false);
        return;
      }

      // No session found; listen for auth state changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (!mounted) return;

        if (session) {
          setHasSession(true);
          setIsChecking(false);
        } else {
          setIsChecking(false);
          router.replace("/login");
        }
      });

      // If no session after initial check, redirect
      setIsChecking(false);
      router.replace("/login");
      unsubscribe = subscription;
    });

    return () => {
      mounted = false;
      unsubscribe?.unsubscribe?.();
    };
  }, [router]);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-[#fcfaf7] flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-sage text-black font-display text-3xl md:text-4xl lg:text-5xl font-extralight italic leading-relaxed tracking-tight px-6 max-w-3xl mx-auto">
            "True simplicity is the ultimate sophistication."
          </h3>
          <div className="flex justify-center pt-4">
            <div className="size-2 bg-sage rounded-full animate-pulse-gentle shadow-[0_0_8px_rgba(111,135,100,0.4)]"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!hasSession) {
    return null;
  }

  return <>{children}</>;
}
