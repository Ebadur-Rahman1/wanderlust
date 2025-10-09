const mongoose = require('mongoose');

const username = 'ebad_db_user';
const password = encodeURIComponent('QVK7bclD4ILINr7h');
const dbName = 'test';

const uri = `mongodb+srv://${username}:${password}@cluster0.wnexaww.mongodb.net/${dbName}?retryWrites=true&w=majority`;

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  heartbeatFrequencyMS: 30000,
};

mongoose.connect(uri, connectionOptions)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    console.log('💡 Make sure your IP is whitelisted in MongoDB Atlas');
  });

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});