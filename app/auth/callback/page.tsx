"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    let unsubscribe: any;

    // Try to read session (supabase-js parses the URL fragment after OAuth redirect)
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;

      if (data.session) {
        router.replace("/dashboard");
        return;
      }

      // Fallback: listen for auth state changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (!mounted) return;

        if (session) {
          router.replace("/dashboard");
        }
      });

      unsubscribe = subscription;
    });

    return () => {
      mounted = false;
      unsubscribe?.unsubscribe?.();
    };
  }, [router]);

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
