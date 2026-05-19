import { db } from "../config/db.js";

/**
 * Todo Model — all DB interaction lives here.
 * When you switch to Azure SQL, only this file + db.js need to change.
 */
export const TodoModel = {
  getAll: () => db.query("GET_ALL"),

  getById: (id) => db.query("GET_BY_ID", { id }),

  create: ({ title, description, priority }) =>
    db.query("INSERT", { title, description, priority }),

  update: (id, fields) => db.query("UPDATE", { id, ...fields }),

  delete: (id) => db.query("DELETE", { id }),
};
