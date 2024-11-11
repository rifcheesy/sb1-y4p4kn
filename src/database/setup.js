import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = join(__dirname, '../../garage.db');

const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  // Create users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT,
      phone TEXT,
      address TEXT,
      user_type TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create appointments table
  db.run(`
    CREATE TABLE IF NOT EXISTS appointments (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      service_type TEXT NOT NULL,
      description TEXT,
      scheduled_date DATETIME NOT NULL,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  // Create technicians table
  db.run(`
    CREATE TABLE IF NOT EXISTS technicians (
      id TEXT PRIMARY KEY,
      user_id TEXT UNIQUE NOT NULL,
      certification TEXT,
      specialization TEXT,
      experience INTEGER,
      rating REAL DEFAULT 5.0,
      jobs_completed INTEGER DEFAULT 0,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  console.log('Database setup completed successfully');
});

db.close();