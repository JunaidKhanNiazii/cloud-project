import { TodoModel } from "../models/Todo.js";

export const todoController = {
  getAll: async (req, res) => {
    try {
      const todos = await TodoModel.getAll();
      res.json({ success: true, data: todos });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  getById: async (req, res) => {
    try {
      const todo = await TodoModel.getById(Number(req.params.id));
      if (!todo) return res.status(404).json({ success: false, message: "Todo not found" });
      res.json({ success: true, data: todo });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const { title, description, priority, priority_num, due_date } = req.body;
      if (!title?.trim()) {
        return res.status(400).json({ success: false, message: "Title is required" });
      }
      const todo = await TodoModel.create({ title: title.trim(), description, priority, priority_num, due_date });
      res.status(201).json({ success: true, data: todo });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const updated = await TodoModel.update(id, req.body);
      if (!updated) return res.status(404).json({ success: false, message: "Todo not found" });
      res.json({ success: true, data: updated });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      const deleted = await TodoModel.delete(Number(req.params.id));
      if (!deleted) return res.status(404).json({ success: false, message: "Todo not found" });
      res.json({ success: true, message: "Todo deleted" });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },
};
