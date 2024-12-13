class Property {
    constructor(db) {
      this.db = db;
    }
  
    getAll() {
      return this.db.query("SELECT * FROM properties");
    }
  }
  
  const db = require("../db");
  module.exports = new Property(db);
  