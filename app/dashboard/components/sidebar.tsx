"use client";

import Logout from "./logout";
import { useState } from "react";


type Note = {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
};

type SidebarProps = {
  notes: Note[];
  onOpenEditor?: (id: string) => void;
  onCreateNote?: () => void;
  onDeleteMany?: (ids: string[]) => void;
};


export default function Sidebar({ notes, onOpenEditor, onCreateNote, onDeleteMany }: SidebarProps) {
const [menuOpen, setMenuOpen] = useState(false);
const [selectMode, setSelectMode] = useState(false);
const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  return (
    <aside 
     className="
    fixed inset-0 z-40
    w-full
    h-screen h-[100dvh]
    md:static md:inset-auto md:w-72
    border-r border-gray-200 dark:border-gray-800
    flex flex-col
    bg-background-light dark:bg-background-dark
    pb-[env(safe-area-inset-bottom)]
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

        
        <div className="relative">
        <button
          onClick={() => {
            if (selectMode) {
              setSelectMode(false); // exit select mode
              setSelectedIds(new Set());
            } else {
              setMenuOpen((v) => !v); // open dropdown
            }
          }}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined">
            {selectMode ? "check" : "more_horiz"}
          </span>
        </button>

        {/* Only show dropdown if not in select mode */}
        {!selectMode && menuOpen && (
          <div className="absolute right-0 mt-2 w-40 rounded-lg bg-white dark:bg-neutral-900 shadow-lg border border-gray-200 dark:border-neutral-700 z-20">
            
            {/* Select Mode Toggle */}
            <button
              onClick={() => {
                setSelectMode(true);
                setMenuOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm rounded-lg cursor-pointer dark:text-white text-black"
            >
              Select
            </button>

            {/* Logout */}
            <div className="px-4 py-2">
              <Logout />
            </div>
          </div>
        )}
        </div>
      </div>




      {/* New Note */}
      <div className="px-4 mb-4">
        <button  onClick={onCreateNote} className="w-full flex items-center justify-center gap-2 cursor-pointer dark:border-white border-black bg-primary text-black dark:text-white py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-all shadow-sm">
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
          className={`relative group flex items-center gap-2 px-4 py-3 rounded-lg cursor-pointer
            ${selectMode && selectedIds.has(note.id)
              ? "bg-primary/20"
              : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
        >
          {/* Selection checkbox area */}
          {selectMode && (
            <div
              onClick={(e) => {
                e.stopPropagation(); // prevent opening note
                setSelectedIds((prev) => {
                  const next = new Set(prev);
                  next.has(note.id) ? next.delete(note.id) : next.add(note.id);
                  return next;
                });
              }}
              className={`flex-shrink-0 w-5 h-5 flex items-center justify-center border rounded-md 
                ${selectedIds.has(note.id) ? "bg-primary border-primary text-white" : "border-gray-400 dark:border-gray-600"}
              `}
            >
              {selectedIds.has(note.id) && (
                <span className="material-symbols-outlined text-xs dark:text-white text-black">check</span>
              )}
            </div>
          )}

          {/* Note content */}
          <div
            onClick={() => {
              if (!selectMode) onOpenEditor?.(note.id);
            }}
            className="flex-1 flex flex-col"
          >
            <p className="text-sm font-medium truncate overflow-hidden w-full max-w-[calc(100%-1.25rem)]">{note.title}</p>
            <p className="text-[11px] text-gray-500">
              {new Date(note.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

           
        ))}
      </div>
      </div>

      {/* User Footer */}
      {/* <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex items-center gap-3">
    <Logout />
      </div> */}
            {selectMode && (
  <div className="px-4 mb-4">
    <button
      onClick={() => {
        onDeleteMany?.(Array.from(selectedIds));
        setSelectedIds(new Set());
        setSelectMode(false);
      }}
      disabled={selectedIds.size === 0}
      className="w-full flex items-center justify-center gap-2 cursor-pointer dark:border-white border-black bg-primary text-black dark:text-white py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-all shadow-sm disabled:opacity-40"
    >
      Delete
    </button>
  </div>
)}
    </aside>
  );
}
