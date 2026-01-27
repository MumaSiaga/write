import { useEffect, useState,useRef } from "react";
import { supabase } from "@/lib/supabaseClient";

type EditorProps = {
  noteId: string; 
  onBackToSidebar?: () => void;
};
export default function Editor({ noteId, onBackToSidebar }: EditorProps) {
    const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saved, setSaved] = useState(false);

  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Load note on mount
  useEffect(() => {
    const fetchNote = async () => {
      const { data, error } = await supabase
        .from("Notes")
        .select("*")
        .eq("id", noteId)
        .single();

      if (error) {
        console.error("Failed to load note:", error.message);
        return;
      }

      setTitle(data.title || "");
      setContent(data.content || "");
      if (titleRef.current) titleRef.current.innerText = data.title || "Untitled Note";
    if (contentRef.current) contentRef.current.innerText = data.content || "Start writing here...";
    };

    fetchNote();
  }, [noteId]);

  // Auto-save function
  const handleSave = async () => {
    if (!noteId) return;

    const { data, error } = await supabase
      .from("Notes")
      .update({ title, content })
      .eq("id", noteId);

    if (error) {
      console.error("Failed to save note:", error.message);
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    }
  };

  // Debounce auto-save
  useEffect(() => {
    const timer = setTimeout(() => handleSave(), 1000);
    return () => clearTimeout(timer);
  }, [title, content]);

  return (
    <main className="flex-1 flex flex-col relative bg-background-light dark:bg-background-dark overflow-y-auto">
      
      {/* Top Bar */}
      <header className="h-16 flex items-center justify-between px-6 md:px-10 sticky top-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md z-10">
  
        {/* Back button – mobile only */}
        <button
            onClick={onBackToSidebar}
            className="md:hidden text-gray-400 hover:text-gray-600 transition-colors"
        >
            <span className="material-symbols-outlined">arrow_back</span>
        </button>

        {/* Right actions */}
        <div className="flex items-center gap-6">
            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors">
            <span className="material-symbols-outlined">share</span>
            </button>
            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors">
            <span className="material-symbols-outlined">more_horiz</span>
            </button>
        </div>
        </header>


       {/* Editor Content */}
      <div className="flex-1 flex flex-col items-center pt-12 pb-32 px-6">
        <article className="w-full max-w-[720px]">
          
          {/* Meta */}
          <div className="mb-10 opacity-60">
            <p className="text-sm italic mb-2">
              Last edited: {new Date().toLocaleDateString()}
            </p>
          </div>

          <h1
          ref={titleRef}
          contentEditable
          suppressContentEditableWarning
          className="text-5xl font-bold mb-12 focus:outline-none"
          onInput={(e) =>
            setTitle((e.currentTarget as HTMLDivElement).innerText)
          }
        >
          {/* Set initial content once */}
        </h1>

        <div
          ref={contentRef}
          contentEditable
          suppressContentEditableWarning
          className="text-xl leading-[1.8] min-h-[500px] focus:outline-none"
          onInput={(e) =>
            setContent((e.currentTarget as HTMLDivElement).innerText)
          }
        >
          {/* Set initial content once */}
        </div>
        </article>
      </div>

      {/* Floating Saved Indicator */}
      <div className="fixed bottom-8 right-10 flex items-center gap-2 py-2 px-4 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-700 shadow-sm">
        <span className="material-symbols-outlined text-sage-green text-sm">
          check_circle
        </span>
        <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">
          Saved
        </span>
      </div>
    </main>
  );
}
