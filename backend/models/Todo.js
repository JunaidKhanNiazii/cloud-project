import { getPool } from "../config/db.js";
import sql from "mssql";

export const TodoModel = {
  getAll: async () => {
    const pool = await getPool();
    const result = await pool.request().query("SELECT * FROM todos ORDER BY created_at DESC");
    return result.recordset;
  },

  getById: async (id) => {
    const pool = await getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .query("SELECT * FROM todos WHERE id = @id");
    return result.recordset[0] || null;
  },

  create: async ({ title, description, priority }) => {
    const pool = await getPool();
    const result = await pool.request()
      .input("title", sql.NVarChar, title)
      .input("description", sql.NVarChar, description ?? "")
      .input("priority", sql.NVarChar, priority ?? "medium")
      .query(`
        INSERT INTO todos (title, description, completed, priority, created_at, updated_at)
        OUTPUT INSERTED.*
        VALUES (@title, @description, 0, @priority, GETDATE(), GETDATE())
      `);
    return result.recordset[0];
  },

  update: async (id, fields) => {
    const pool = await getPool();
    const request = pool.request().input("id", sql.Int, id);

    const setClauses = [];

    if (fields.title !== undefined) {
      request.input("title", sql.NVarChar, fields.title);
      setClauses.push("title = @title");
    }
    if (fields.description !== undefined) {
      request.input("description", sql.NVarChar, fields.description);
      setClauses.push("description = @description");
    }
    if (fields.completed !== undefined) {
      request.input("completed", sql.Bit, fields.completed);
      setClauses.push("completed = @completed");
    }
    if (fields.priority !== undefined) {
      request.input("priority", sql.NVarChar, fields.priority);
      setClauses.push("priority = @priority");
    }

    if (setClauses.length === 0) return null;

    const result = await request.query(`
      UPDATE todos
      SET ${setClauses.join(", ")}, updated_at = GETDATE()
      OUTPUT INSERTED.*
      WHERE id = @id
    `);
    return result.recordset[0] || null;
  },

  delete: async (id) => {
    const pool = await getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .query("DELETE FROM todos OUTPUT DELETED.* WHERE id = @id");
    return result.recordset[0] || null;
  },
};
