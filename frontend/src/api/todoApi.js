const API_URL = import.meta.env.VITE_API_URL || "";
const BASE = `${API_URL}/api/todos`;

const handle = async (res) => {
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data.data;
};

export const todoApi = {
  getAll: () => fetch(BASE).then(handle),
  create: (body) =>
    fetch(BASE, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }).then(handle),
  update: (id, body) =>
    fetch(`${BASE}/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }).then(handle),
  delete: (id) => fetch(`${BASE}/${id}`, { method: "DELETE" }).then(handle),
};
