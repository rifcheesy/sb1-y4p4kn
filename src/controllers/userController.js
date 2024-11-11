import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { initializeDB } from '../services/db.js';

export const userController = {
  async register(req, res) {
    try {
      const db = await initializeDB();
      const { email, password, name } = req.body;
      
      const hashedPassword = await bcrypt.hash(password, 10);
      
      await db.run(
        'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
        [email, hashedPassword, name]
      );
      
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async login(req, res) {
    try {
      const db = await initializeDB();
      const { email, password } = req.body;
      
      const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
      
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid credentials');
      }
      
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );
      
      res.json({ token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
};