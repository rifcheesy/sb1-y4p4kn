import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = join(__dirname, '../../garage.db');

let db = null;

export function getDb() {
  if (!db) {
    db = new sqlite3.Database(dbPath);
  }
  return db;
}

export function closeDb() {
  return new Promise((resolve, reject) => {
    if (db) {
      db.close((err) => {
        if (err) {
          reject(err);
        } else {
          db = null;
          resolve();
        }
      });
    } else {
      resolve();
    }
  });
}

// User operations
export function createUser(userData) {
  return new Promise((resolve, reject) => {
    const db = getDb();
    const { id, email, name, phone, address, user_type } = userData;
    
    db.run(
      `INSERT INTO users (id, email, name, phone, address, user_type)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id, email, name, phone, address, user_type],
      function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      }
    );
  });
}

export function getUserByEmail(email) {
  return new Promise((resolve, reject) => {
    const db = getDb();
    db.get(
      'SELECT * FROM users WHERE email = ?',
      [email],
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      }
    );
  });
}

// Appointment operations
export function createAppointment(appointmentData) {
  return new Promise((resolve, reject) => {
    const db = getDb();
    const { id, user_id, service_type, description, scheduled_date } = appointmentData;
    
    db.run(
      `INSERT INTO appointments (id, user_id, service_type, description, scheduled_date)
       VALUES (?, ?, ?, ?, ?)`,
      [id, user_id, service_type, description, scheduled_date],
      function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      }
    );
  });
}

export function getAppointmentsByUser(userId) {
  return new Promise((resolve, reject) => {
    const db = getDb();
    db.all(
      'SELECT * FROM appointments WHERE user_id = ? ORDER BY scheduled_date DESC',
      [userId],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
}

// Technician operations
export function createTechnician(technicianData) {
  return new Promise((resolve, reject) => {
    const db = getDb();
    const { id, user_id, certification, specialization, experience } = technicianData;
    
    db.run(
      `INSERT INTO technicians (id, user_id, certification, specialization, experience)
       VALUES (?, ?, ?, ?, ?)`,
      [id, user_id, certification, specialization, experience],
      function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      }
    );
  });
}

export function getTechnicianByUserId(userId) {
  return new Promise((resolve, reject) => {
    const db = getDb();
    db.get(
      'SELECT * FROM technicians WHERE user_id = ?',
      [userId],
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      }
    );
  });
}