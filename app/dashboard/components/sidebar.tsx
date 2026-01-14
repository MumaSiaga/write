import Logout from "./logout";

type SidebarProps = {
  onOpenEditor?: () => void
}
export default function Sidebar({ onOpenEditor }: SidebarProps) {

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

        <button className="text-gray-400 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">view_sidebar</span>
        </button>
      </div>

      {/* New Note */}
      <div className="px-4 mb-4">
        <button className="w-full flex items-center justify-center gap-2 bg-primary text-white py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-all shadow-sm">
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

          {/* Active note */}
          <div  onClick={onOpenEditor} className="group flex flex-col gap-0.5 px-4 py-3 rounded-lg cursor-pointer bg-[rgba(48,140,232,0.1)] border-r-[3px] border-primary">
            <p className="text-sm font-semibold truncate">
              Morning Reflections
            </p>
            <p className="text-[11px] text-gray-500">Oct 24, 2023</p>
          </div>

          {/* Other notes */}
          {[
            ["Project Ideas", "Oct 22, 2023"],
            ["Weekly Goals", "Oct 20, 2023"],
            ["Book Reading List", "Oct 15, 2023"],
          ].map(([title, date]) => (
            <div
              key={title}
              onClick={onOpenEditor}
              className="group flex flex-col gap-0.5 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
            >
              <p className="text-sm font-medium truncate">{title}</p>
              <p className="text-[11px] text-gray-500">{date}</p>
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
