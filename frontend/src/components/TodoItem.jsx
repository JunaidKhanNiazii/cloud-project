import { useState } from "react";

const priorityStyles = {
  high: "bg-red-50 text-red-500 border-red-100",
  medium: "bg-amber-50 text-amber-500 border-amber-100",
  low: "bg-green-50 text-green-500 border-green-100",
};

const priorityDot = {
  high: "bg-red-400",
  medium: "bg-amber-400",
  low: "bg-green-400",
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  const saveEdit = () => {
    if (!title.trim()) return;
    onEdit(todo.id, { title: title.trim(), description });
    setEditing(false);
  };

  const date = new Date(todo.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <div
      className={`group bg-white rounded-2xl border shadow-sm p-4 transition-all hover:shadow-md ${
        todo.completed ? "opacity-60" : ""
      }`}
    >
      {editing ? (
        <div className="space-y-2">
          <input
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-400 text-sm text-slate-700"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="w-full px-3 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-400 text-sm text-slate-500 resize-none"
          />
          <div className="flex gap-2 justify-end">
            <button onClick={() => setEditing(false)} className="px-3 py-1 text-xs text-slate-500 hover:text-slate-700">
              Cancel
            </button>
            <button onClick={saveEdit} className="px-3 py-1 bg-violet-600 text-white text-xs rounded-lg hover:bg-violet-700">
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-3">
          {/* Checkbox */}
          <button
            onClick={() => onToggle(todo.id, !todo.completed)}
            aria-label={todo.completed ? "Mark incomplete" : "Mark complete"}
            className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
              todo.completed
                ? "bg-violet-500 border-violet-500"
                : "border-slate-300 hover:border-violet-400"
            }`}
          >
            {todo.completed && (
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-medium text-slate-700 truncate ${todo.completed ? "line-through text-slate-400" : ""}`}>
              {todo.title}
            </p>
            {todo.description && (
              <p className="text-xs text-slate-400 mt-0.5 truncate">{todo.description}</p>
            )}
            <div className="flex items-center gap-2 mt-2">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border ${priorityStyles[todo.priority]}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${priorityDot[todo.priority]}`} />
                {todo.priority}
              </span>
              <span className="text-xs text-slate-300">{date}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setEditing(true)}
              aria-label="Edit task"
              className="p-1.5 rounded-lg text-slate-400 hover:text-violet-600 hover:bg-violet-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              aria-label="Delete task"
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
