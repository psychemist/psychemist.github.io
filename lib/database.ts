import Database from 'better-sqlite3'
import { join } from 'path'

// Database setup
const dbPath = join(process.cwd(), 'data', 'portfolio.db')
let db: Database.Database

try {
  db = new Database(dbPath)
  
  // Create subscribers table if it doesn't exist
  db.exec(`
    CREATE TABLE IF NOT EXISTS subscribers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      name TEXT,
      subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      confirmed BOOLEAN DEFAULT 0,
      unsubscribed_at DATETIME DEFAULT NULL
    )
  `)

  // Create contacts table for form submissions
  db.exec(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      responded BOOLEAN DEFAULT 0
    )
  `)

  console.log('✅ Database initialized successfully')
} catch (error) {
  console.error('❌ Database initialization failed:', error)
  // Fallback to in-memory database for development
  db = new Database(':memory:')
  db.exec(`
    CREATE TABLE subscribers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      name TEXT,
      subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      confirmed BOOLEAN DEFAULT 0,
      unsubscribed_at DATETIME DEFAULT NULL
    )
  `)
  db.exec(`
    CREATE TABLE contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      responded BOOLEAN DEFAULT 0
    )
  `)
}

// Prepared statements for better performance
const statements = {
  addSubscriber: db.prepare(`
    INSERT INTO subscribers (email, name, confirmed) 
    VALUES (?, ?, 1)
  `),
  
  getSubscriber: db.prepare(`
    SELECT * FROM subscribers 
    WHERE email = ? AND unsubscribed_at IS NULL
  `),
  
  unsubscribeUser: db.prepare(`
    UPDATE subscribers 
    SET unsubscribed_at = CURRENT_TIMESTAMP 
    WHERE email = ? AND unsubscribed_at IS NULL
  `),
  
  getActiveSubscribers: db.prepare(`
    SELECT * FROM subscribers 
    WHERE confirmed = 1 AND unsubscribed_at IS NULL
  `),
  
  addContact: db.prepare(`
    INSERT INTO contacts (name, email, message) 
    VALUES (?, ?, ?)
  `),
  
  getContacts: db.prepare(`
    SELECT * FROM contacts 
    ORDER BY submitted_at DESC 
    LIMIT ?
  `)
}

export { db, statements }