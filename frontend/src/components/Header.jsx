export default function Header({ darkMode, toggleDark, counts, completedPercent, total }) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo + title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-violet-600 rounded-xl flex items-center justify-center shadow">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800 dark:text-white leading-none">TaskApp</h1>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              {counts.completed} of {total} completed
            </p>
          </div>
        </div>

        {/* Progress + dark mode */}
        <div className="flex items-center gap-4">
          {total > 0 && (
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-32 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-violet-500 rounded-full transition-all duration-500"
                  style={{ width: `${completedPercent}%` }}
                />
              </div>
              <span className="text-xs text-slate-400 dark:text-slate-500">{completedPercent}%</span>
            </div>
          )}

          {/* Dark mode toggle */}
          <button
            onClick={toggleDark}
            aria-label="Toggle dark mode"
            className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-300 hover:bg-violet-100 dark:hover:bg-violet-900 transition-colors"
          >
            {darkMode ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
