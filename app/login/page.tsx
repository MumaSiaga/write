"use client";
import { supabase } from "@/lib/supabaseClient";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
    const router = useRouter();
    const [checking, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;

      if (data.session) {
        router.replace("/dashboard");
      } else {
        setChecking(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.replace("/dashboard");
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [router]);

if (checking) {
  return (
    <div className="min-h-screen bg-[#fcfaf7] flex items-center justify-center"></div>
        
  )
}

  const handleGoogleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
  };

  return (
    
    <div className="min-h-screen flex items-center justify-center bg-[#fcfaf7] p-4">
        
      <div className="fixed top-8 left-8">
      <Link href="/" className="flex items-center gap-1.5 text-black transition-colors group">
        <span className="material-symbols-outlined text-[18px] font-light leading-none group-hover:-translate-x-0.5 transition-transform">
          arrow_back
        </span>
        <span className="text-sm font-light tracking-wide">Back</span>
      </Link>
    </div>
      <div className="w-full max-w-[900px]">

       
        {/* Main Login Card */}
        <div className="bg-white rounded-xl shadow-sm border border-[#dee5dc] overflow-hidden flex flex-col md:flex-row min-h-[500px]">

          {/* Left Image for desktop */}
          <div className="hidden md:block md:w-1/2 relative min-h-[300px] md:min-h-[500px]">
            <img
              alt="Serene workspace with an open notebook and pen"
              src="/Images/loginimage.jpg"
              className="absolute inset-0 w-full h-full object-cover grayscale-[20%] sepia-[10%] opacity-90"
            />
            <div className="absolute inset-0 bg-[#6c8863]/10 mix-blend-multiply"></div>
          </div>

          {/* Right Form */}
          <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
            <div className="text-center md:text-left mb-8">
              <h2 className="text-black text-3xl font-bold tracking-tight">
                Welcome
              </h2>
              <p className="text-gray-400 text-base mt-2">
                Sign in to your workspace
              </p>
            </div>

            {/* Google Sign In Button */}
            <div className="space-y-6">
              <button onClick={handleGoogleSignIn} className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl h-14 px-6 bg-white border border-[#8fa382] text-[#131811] text-black font-medium hover:bg-[#8fa382] hover:border-[black] transition-all active:scale-[0.98] shadow-sm">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"/>
                </svg>
                <span>Sign in with Google</span>
              </button>
            </div>

            {/* Footer Links */}
            <div className="mt-12 flex flex-col items-center md:items-start gap-4 text-xs font-medium">
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 transition-colors">
                  Terms of Service
                </a>
                <span className="text-[#dee5dc] ">|</span>
                <a href="#" className="text-gray-400 transition-colors">
                  Privacy Policy
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
      
    </div>
  );
}
