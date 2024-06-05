const mongoose = require('mongoose');


// replace the hotelManagement with your database name
const mongoURL = 'mongodb://localhost:27017/hotelManagement'


// connect or establish a connection
mongoose.connect(mongoURL);


// connection to the MongoDB database, when we pass url in mongoURL , mongoose handle the connection precess and store the connection object in mongoose.connection.
const db = mongoose.connection; 


// define the event listeners for database connections

db.on('connected', () => {
    console.log('Connected to MongoDB server');
})

db.on('error' , (err) => {
    console.error('MongoDB connection error:', err);
})

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
})

module.exports = db;