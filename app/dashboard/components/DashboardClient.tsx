"use client";

import { useState ,useEffect} from "react";
import { supabase } from "@/lib/supabaseClient";
import Sidebar from "./sidebar";
import Editor from "./Editor";
type Note = {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
};

export default function DashboardClient() {
  // Authentication is enforced server-side in `app/dashboard/layout.tsx` via `requireUser()`.
  // This client component should only handle client interactions (logout, UI state).
    const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [mobileView, setMobileView] = useState<'sidebar' | 'editor'>('sidebar');

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };
    const fetchNotes = async () => {
    const { data, error } = await supabase
      .from("Notes")
      .select("*")
      .order("updated_at", { ascending: false });

    if (!error && data) {
      setNotes(data);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);``
    const handleCreateNote = async () => {
    const { data, error } = await supabase
      .from("Notes")
      .insert([{ title: "Untitled Note", content: "" }])
      .select()
      .single();

    if (error || !data) return;

    await fetchNotes();
    setSelectedNoteId(data.id);
    setMobileView("editor");
  };
    const handleOpenEditor = (id: string) => {
    setSelectedNoteId(id);
    setMobileView("editor");
  };
    const handleNoteDeleted = () => {
    setSelectedNoteId(null);
    setMobileView("sidebar");
    fetchNotes();
  };
  const handleDeleteMany = async (ids: string[]) => {
  if (ids.length === 0) return;

  const ok = confirm(`Delete ${ids.length} notes permanently?`);
  if (!ok) return;

  const { error } = await supabase
    .from("Notes")
    .delete()
    .in("id", ids);

  if (error) {
    console.error(error.message);
    return;
  }

  setSelectedNoteId(null);
  fetchNotes();
};


return (
  <div className="flex h-screen overflow-hidden">
    {/* Sidebar */}
    <div className={`md:block ${mobileView === "sidebar" ? "block" : "hidden"}`}>
      <Sidebar
        notes={notes}
        onOpenEditor={handleOpenEditor}
        onCreateNote={handleCreateNote}
        onDeleteMany={handleDeleteMany}
      />
    </div>

    {/* Editor */}
    <div className={`flex-1 md:block ${mobileView === "editor" ? "block" : "hidden"}`}>
      {selectedNoteId ? (
        <Editor
          noteId={selectedNoteId}
          onBackToSidebar={() => setMobileView("sidebar")}
          onNoteDeleted={handleNoteDeleted}
        />
      ) : (
        <div className="flex items-center justify-center h-full text-gray-400">
          Select a note
        </div>
      )}
    </div>
  </div>
);

}
