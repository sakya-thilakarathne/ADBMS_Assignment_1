const mongoose = require('mongoose');

const dbName = 'inventory';
const mongoURI = `mongodb://127.0.0.1:27017/${dbName}`;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = db; // Export the database connection object, not mongoose itself
