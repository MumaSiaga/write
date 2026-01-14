type EditorProps = {
  onBackToSidebar?: () => void
}
export default function Editor({ onBackToSidebar }: EditorProps) {
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


      {/* Content Canvas */}
      <div className="flex-1 flex flex-col items-center pt-12 pb-32 px-6">
        <article className="w-full max-w-[720px]">
          
          {/* Meta */}
          <div className="mb-10 opacity-60">
            <p className="text-sm italic mb-2">
              Last edited: October 24, 2023
            </p>
          </div>

          {/* Title */}
          <h1
            contentEditable
            suppressContentEditableWarning
            className="text-[#111418] dark:text-white text-5xl font-bold leading-tight mb-12 focus:outline-none"
          >
            Morning Reflections
          </h1>

          {/* Body */}
          <div
            contentEditable
            suppressContentEditableWarning
            className="text-[#111418] dark:text-gray-200 text-xl leading-[1.8] space-y-8 focus:outline-none min-h-[500px]"
          >
            <p>
              The sun began to crest over the horizon, casting a soft, golden glow
              across the room. It's in these quiet moments that the most profound
              thoughts seem to emerge.
            </p>

            <p>
              There is something restorative about writing without the pressure
              of an audience.
            </p>

            <p>
              Today's focus:
              <br />1. Prioritizing deep work
              <br />2. Spending time in nature
              <br />3. Finalizing drafts
            </p>
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
