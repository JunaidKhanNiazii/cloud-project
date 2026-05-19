import { useState } from "react";

const PRIORITIES = ["low", "medium", "high"];

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    await onAdd({ title, description, priority });
    setTitle("");
    setDescription("");
    setPriority("medium");
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-4">
      <h2 className="text-lg font-semibold text-slate-700">New Task</h2>

      <input
        type="text"
        placeholder="Task title *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-400 text-slate-700 placeholder-slate-400 text-sm"
        required
      />

      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={2}
        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-400 text-slate-700 placeholder-slate-400 text-sm resize-none"
      />

      <div className="flex items-center gap-3">
        <div className="flex gap-2">
          {PRIORITIES.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPriority(p)}
              className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-all ${
                priority === p
                  ? p === "high"
                    ? "bg-red-100 text-red-600 ring-2 ring-red-300"
                    : p === "medium"
                    ? "bg-amber-100 text-amber-600 ring-2 ring-amber-300"
                    : "bg-green-100 text-green-600 ring-2 ring-green-300"
                  : "bg-slate-100 text-slate-400 hover:bg-slate-200"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading || !title.trim()}
          className="ml-auto px-5 py-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white text-sm font-medium rounded-xl transition-colors"
        >
          {loading ? "Adding…" : "Add Task"}
        </button>
      </div>
    </form>
  );
}
