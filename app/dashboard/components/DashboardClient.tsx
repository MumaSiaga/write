"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Sidebar from "./sidebar";
import Editor from "./Editor";


export default function DashboardClient() {
  // Authentication is enforced server-side in `app/dashboard/layout.tsx` via `requireUser()`.
  // This client component should only handle client interactions (logout, UI state).
  const [mobileView, setMobileView] = useState<'sidebar' | 'editor'>('sidebar');
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`
          md:block
          ${mobileView === 'sidebar' ? 'block' : 'hidden'}
        `}
      >
        <Sidebar notes={[]} onOpenEditor={(id) => { setSelectedNoteId(id); setMobileView('editor'); }} />
      </div>

      {/* Editor */}
      <div
        className={`
          flex-1
          md:block
          ${mobileView === 'editor' ? 'block' : 'hidden'}
        `}
      >
        {selectedNoteId && <Editor noteId={selectedNoteId} onBackToSidebar={() => setMobileView('sidebar')} />}
      </div>
    </div>
  );
}
