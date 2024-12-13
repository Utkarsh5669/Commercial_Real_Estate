class User {
    constructor(db) {
      this.db = db;
    }
  
    findByUsername(username) {
      return this.db.query("SELECT * FROM users WHERE username = ?", [username]);
    }
  
    save(username, hashedPassword) {
      return this.db.query("INSERT INTO users (username, password) VALUES (?, ?)", [
        username,
        hashedPassword,
      ]);
    }
  }
  
  const db = require("../db");
  module.exports = new User(db);
  