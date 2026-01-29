import { useEffect, useState,useRef } from "react";
import { supabase } from "@/lib/supabaseClient";

type EditorProps = {
  noteId: string;
  onBackToSidebar?: () => void;
  onNoteDeleted?: () => void; 
  onTitleChange?: (noteId: string, title: string) => void;
};
export default function Editor({ noteId, onBackToSidebar, onNoteDeleted, onTitleChange }: EditorProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const editorRef = useRef<HTMLDivElement>(null);
  const [saved, setSaved] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const lastScroll = useRef(0);
  const [focusMode, setFocusMode] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [showMenu, setShowMenu] = useState(false);
  const titleStack = useRef<string[]>([]);
  const contentStack = useRef<string[]>([]);
  const stackPointer = useRef<number>(-1); 
  const maxStackSize = 50;
  const lastPushedContent = useRef<string>("");
  const enterFocusMode = () => {
  setFocusMode(true); 

  if (editorRef.current && !document.fullscreenElement) {
    editorRef.current.requestFullscreen().catch(console.error);
  }
};
useEffect(() => {
  const handleFullscreenChange = () => {
    if (!document.fullscreenElement) {
      setFocusMode(false); 
    }
  };

  document.addEventListener("fullscreenchange", handleFullscreenChange);
  return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
}, []);
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
    lastPushedContent.current = data.content || "";
    };

    fetchNote();
  }, [noteId]);

  // Auto-save function
  const handleSave = async () => {
    if (!noteId) return;

    const { data, error } = await supabase
      .from("Notes")
      .update({ title, content, updated_at: new Date().toISOString() })
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

 const handleDelete = async () => {
  const ok = confirm("Are you sure you want to delete this note?");
  if (!ok) return;

  const { error } = await supabase
    .from("Notes")
    .delete()
    .eq("id", noteId);

  if (error) {
    console.error("Failed to delete note:", error.message);
    return;
  }

  // close menu
  setShowMenu(false);

 
  onNoteDeleted?.();
};
const pushStack = (newTitle: string, newContent: string) => {
  
  titleStack.current = titleStack.current.slice(0, stackPointer.current + 1);
  contentStack.current = contentStack.current.slice(0, stackPointer.current + 1);

  titleStack.current.push(newTitle);
  contentStack.current.push(newContent);

  if (titleStack.current.length > maxStackSize) {
    titleStack.current.shift();
    contentStack.current.shift();
  } else {
    stackPointer.current++;
  }
};
const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
  if (e.key === "Enter") {
    pushStack(title, content);
    lastPushedContent.current = content;
  }
};
useEffect(() => {
  const handleScroll = () => {
    const currentScroll = window.scrollY;
    if (currentScroll > lastScroll.current && currentScroll > 50) {
      // scrolling down → hide
      setShowHeader(false);
    } else {
      // scrolling up → show
      setShowHeader(true);
    }
    lastScroll.current = currentScroll;
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);



  return (
    <main className="h-full flex flex-col relative bg-background-light dark:bg-background-dark overflow-y-auto">
      
      {/* Top Bar */}
      <header
       className={`h-16 flex items-center justify-between px-6 md:px-10 bg-background-light dark:bg-background-dark z-20 transition-transform duration-300 ${
    showHeader ? "translate-y-4" : "-translate-y-full"
  }`}
>  
  
        {/* Back button – mobile only */}
        <button
            onClick={onBackToSidebar}
            className="md:hidden text-gray-400 hover:text-gray-600 transition-colors"
        >
            <span className="material-symbols-outlined">arrow_back</span>
        </button>

        {/* Right actions */}
        <div className="flex items-center gap-6 ml-auto">
          <div className="relative">
          <button
            onClick={() => setShowMenu((v) => !v)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined">more_horiz</span>
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-40 rounded-lg bg-white dark:bg-neutral-900 shadow-lg border border-gray-200 dark:border-neutral-700 z-20">
              <button
                onClick={handleDelete}
                className="w-full px-4 py-2 text-left text-sm rounded-lg cursor-pointer dark:text-white text-black"
              >
              Delete note
              </button>
            </div>
          )}
        </div>
        </div>
        </header>


       {/* Editor Content */}
      <div ref={editorRef} className="flex-1 flex flex-col items-center pt-12 pb-32 px-6">
        <article className="w-full max-w-full sm:max-w-[90%] md:max-w-[720px] lg:max-w-[900px] mx-auto">
          
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
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 md:mb-12 focus:outline-none"
          onInput={(e) => {
            const rawTitle = (e.currentTarget as HTMLDivElement).innerText;
            setTitle(rawTitle);
            onTitleChange?.(noteId, rawTitle);
          }}
          onBlur={() => {
          if (!titleRef.current) return;

          const raw = titleRef.current.innerText;
          const safeTitle =
            raw.trim().length === 0
              ? "Untitled Note"
              : raw.trim().slice(0, 60);

          titleRef.current.innerText = safeTitle;
          setTitle(safeTitle);
          onTitleChange?.(noteId, safeTitle);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            contentRef.current?.focus();
          }
        }}
        >

        </h1>

        <div
          ref={contentRef}
          contentEditable
          suppressContentEditableWarning
          className="text-base sm:text-lg md:text-xl leading-relaxed md:leading-[1.8] min-h-[300px] sm:min-h-[400px] md:min-h-[500px] focus:outline-none"
           onKeyDown={handleKeyDown}
          onInput={(e) => {
          const newContent = (e.currentTarget as HTMLDivElement).innerText;
          setContent(newContent);

          const lastChar = newContent.slice(-1);

      
          const isWordBoundary =
            lastChar === " " ||
            lastChar === "\n" ||
            [".", ",", "!", "?", ";", ":"].includes(lastChar);

          if (isWordBoundary && newContent !== lastPushedContent.current) {
            pushStack(title, newContent);
            lastPushedContent.current = newContent;
          }
        }}

        >
       
        </div>
        </article>
      </div>
      {!focusMode && (
  <div className="fixed bottom-8 right-10 hidden md:block dark:block">
    <button
      onClick={enterFocusMode}
      className="flex items-center gap-2 py-2 px-4 rounded-full bg-primary text-black dark:text-white shadow-md hover:bg-primary/90 transition hidden dark:block cursor-pointer"
    >
      <span className="text-xs font-medium uppercase tracking-widest">
        Focus Mode
      </span>
    </button>
  </div>
)}

    </main>
  );
}
