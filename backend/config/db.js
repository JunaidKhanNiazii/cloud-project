/**
 * Database configuration
 *
 * Currently uses an in-memory store as a placeholder.
 * To connect Azure SQL later:
 *   1. npm install mssql
 *   2. Fill in the .env variables below
 *   3. Uncomment the mssql block and remove the mock export
 *
 * Required .env variables for Azure SQL:
 *   DB_SERVER=your-server.database.windows.net
 *   DB_NAME=your-database
 *   DB_USER=your-username
 *   DB_PASSWORD=your-password
 */

// ─── Azure SQL (uncomment when ready) ────────────────────────────────────────
// import sql from "mssql";
//
// const config = {
//   server: process.env.DB_SERVER,
//   database: process.env.DB_NAME,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   options: {
//     encrypt: true,           // required for Azure
//     trustServerCertificate: false,
//   },
//   pool: {
//     max: 10,
//     min: 0,
//     idleTimeoutMilliseconds: 30000,
//   },
// };
//
// let pool;
// export const getPool = async () => {
//   if (!pool) pool = await sql.connect(config);
//   return pool;
// };
// ─────────────────────────────────────────────────────────────────────────────

// ─── In-memory placeholder (remove when Azure SQL is connected) ───────────────
let _id = 1;
const store = [];

export const db = {
  query: async (operation, params = {}) => {
    switch (operation) {
      case "GET_ALL":
        return [...store];

      case "GET_BY_ID": {
        const item = store.find((t) => t.id === params.id);
        return item || null;
      }

      case "INSERT": {
        const newTodo = {
          id: _id++,
          title: params.title,
          description: params.description ?? "",
          completed: false,
          priority: params.priority ?? "medium",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        store.push(newTodo);
        return newTodo;
      }

      case "UPDATE": {
        const idx = store.findIndex((t) => t.id === params.id);
        if (idx === -1) return null;
        store[idx] = {
          ...store[idx],
          ...params,
          updated_at: new Date().toISOString(),
        };
        return store[idx];
      }

      case "DELETE": {
        const idx = store.findIndex((t) => t.id === params.id);
        if (idx === -1) return null;
        const [deleted] = store.splice(idx, 1);
        return deleted;
      }

      default:
        throw new Error(`Unknown DB operation: ${operation}`);
    }
  },
};
