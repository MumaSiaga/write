"use client";
import { use, useEffect, useState } from "react";
import Logout from "./logout";
import { supabase } from "@/lib/supabaseClient";


type Note = {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
};

type SidebarProps = {
  notes: Note[];
  onOpenEditor?: (id: string) => void;
};

export default function Sidebar({ notes: initialNotes, onOpenEditor }: SidebarProps) {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const handleNewNote = async () => {
  const { data, error } = await supabase
    .from("Notes")
    .insert([{ title: "Untitled Note", content: "" }])
    .select();

  if (!error && data) {
    setNotes((prev) => [data[0], ...prev]); // prepend new note
  }
};
const handlefetchNotes = async ()=>{
  const {data,error}=await supabase
  .from("Notes")
  .select("*")
  .order("updated_at",{ascending:false});
  if(!error && data){
    setNotes(data);
  }
}
useEffect(()=>{
  handlefetchNotes();
},[]);



  return (
    <aside className="min-h-screen
    fixed inset-0 z-40
    w-full h-full
    md:static md:inset-auto
    md:w-72 md:h-auto
    border-r border-gray-200 dark:border-gray-800
    flex flex-col
    bg-background-light dark:bg-background-dark
  "
>
      
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sage-green">
          <span className="material-symbols-outlined text-2xl">
            edit_note
          </span>
          <h2 className="text-xl font-bold tracking-tight">Write</h2>
        </div>

        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors">
        <span className="material-symbols-outlined">more_horiz</span>
        </button>
      </div>

      {/* New Note */}
      <div className="px-4 mb-4">
        <button onClick={handleNewNote} className="w-full flex items-center justify-center gap-2 bg-primary text-black dark:text-white py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-all shadow-sm">
          <span className="material-symbols-outlined text-sm">add</span>
          <span className="text-sm">New Note</span>
        </button>
      </div>

      {/* Notes List */}
      <div className="flex-1 overflow-y-auto px-2">
            <div className="space-y-1">
        <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Recent
        </div>

        {notes.map(note => (
          <div
            key={note.id}
            onClick={() => onOpenEditor?.(note.id)}
            className="group flex flex-col gap-0.5 px-4 py-3 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <p className="text-sm font-medium truncate">{note.title}</p>
            <p className="text-[11px] text-gray-500">
              {new Date(note.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
      </div>

      {/* User Footer */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex items-center gap-3">
    <Logout />
      </div>
    </aside>
  );
}
