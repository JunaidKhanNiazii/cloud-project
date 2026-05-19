const FILTERS = ["all", "active", "completed"];

export default function TodoFilter({ current, onChange, counts }) {
  return (
    <div className="flex items-center gap-2">
      {FILTERS.map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-all ${
            current === f
              ? "bg-violet-600 text-white shadow-sm"
              : "bg-white text-slate-500 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          {f}
          <span className={`ml-1.5 text-xs ${current === f ? "text-violet-200" : "text-slate-400"}`}>
            {counts[f]}
          </span>
        </button>
      ))}
    </div>
  );
}
