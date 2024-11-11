import { initializeDB } from '../services/db.js';

export const taskController = {
  async create(req, res) {
    try {
      const db = await initializeDB();
      const { title, description, dueDate } = req.body;
      const userId = req.user.userId;

      const result = await db.run(
        'INSERT INTO tasks (title, description, due_date, user_id) VALUES (?, ?, ?, ?)',
        [title, description, dueDate, userId]
      );

      res.status(201).json({
        id: result.lastID,
        message: 'Task created successfully'
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async list(req, res) {
    try {
      const db = await initializeDB();
      const userId = req.user.userId;

      const tasks = await db.all(
        'SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC',
        [userId]
      );

      res.json(tasks);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const db = await initializeDB();
      const { id } = req.params;
      const { title, description, status, dueDate } = req.body;
      const userId = req.user.userId;

      const result = await db.run(
        `UPDATE tasks 
         SET title = ?, description = ?, status = ?, due_date = ? 
         WHERE id = ? AND user_id = ?`,
        [title, description, status, dueDate, id, userId]
      );

      if (result.changes === 0) {
        return res.status(404).json({ error: 'Task not found' });
      }

      res.json({ message: 'Task updated successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const db = await initializeDB();
      const { id } = req.params;
      const userId = req.user.userId;

      const result = await db.run(
        'DELETE FROM tasks WHERE id = ? AND user_id = ?',
        [id, userId]
      );

      if (result.changes === 0) {
        return res.status(404).json({ error: 'Task not found' });
      }

      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};