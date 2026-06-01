export default function Footer({ counts }) {
  return (
    <footer className="mt-12 border-t border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 backdrop-blur">
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Stats */}
          <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-violet-500" />
              <span>{counts.all} Total</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>{counts.active} Active</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              <span>{counts.completed} Done</span>
            </div>
          </div>

          {/* Branding */}
          <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
            <div className="w-5 h-5 bg-violet-600 rounded-md flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span>TaskApp — Built with React & Azure</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
