const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/todolist')
.then(() => console.log('✅ Successfully connected to MongoDB!'))
.catch(err => console.error('Could not connect to MongoDB:', err));

// Routes
const todosRouter = require('./routes/todos');
app.use('/api/todos', todosRouter);

// Base route
app.get('/', (req, res) => {
  res.send('Welcome to the To-Do List API!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
