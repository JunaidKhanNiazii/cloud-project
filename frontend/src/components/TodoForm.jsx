import { useState } from "react";

const PRIORITIES = [
  { label: "1 - High", value: 1, color: "bg-red-100 text-red-600 ring-red-300" },
  { label: "2 - Medium", value: 2, color: "bg-amber-100 text-amber-600 ring-amber-300" },
  { label: "3 - Low", value: 3, color: "bg-green-100 text-green-600 ring-green-300" },
];

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priorityNum, setPriorityNum] = useState(2);
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    const priorityMap = { 1: "high", 2: "medium", 3: "low" };
    await onAdd({
      title,
      description,
      priority: priorityMap[priorityNum],
      priority_num: priorityNum,
      due_date: dueDate || null,
    });
    setTitle("");
    setDescription("");
    setPriorityNum(2);
    setDueDate("");
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 space-y-4">
      <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200">New Task</h2>

      <input
        type="text"
        placeholder="Task title *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-400 text-slate-700 dark:text-slate-200 placeholder-slate-400 text-sm"
        required
      />

      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={2}
        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-400 text-slate-700 dark:text-slate-200 placeholder-slate-400 text-sm resize-none"
      />

      <div className="flex flex-wrap items-center gap-3">
        {/* Numeric priority */}
        <div className="flex gap-2">
          {PRIORITIES.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => setPriorityNum(p.value)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                priorityNum === p.value
                  ? `${p.color} ring-2`
                  : "bg-slate-100 text-slate-400 hover:bg-slate-200"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Due date */}
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm text-slate-600 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
        />

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
