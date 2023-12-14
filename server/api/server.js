// server/api/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Drawing = require('./models/drawing');
const sampleData = require('./sample-data');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/drawings', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
  // Initialize sample data
  sampleData();
});

// Define API routes

// Create a new drawing
app.post('/api/drawings', async (req, res) => {
  try {
    const newDrawing = await Drawing.create(req.body);
    res.status(201).json(newDrawing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all drawings
app.get('/api/drawings', async (req, res) => {
  try {
    console.log('hello');
    const allDrawings = await Drawing.find();
    res.status(200).json(allDrawings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific drawing by ID
app.get('/api/drawings/:id', async (req, res) => {
  try {
    console.log("Called");
    const drawing = await Drawing.findById(req.params.id);
    console.log("Drawing", drawing);
    if (!drawing) {
      return res.status(404).json({ error: 'Drawing not found' });
    }
    res.status(200).json(drawing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a drawing
app.put('/api/drawings/:id', async (req, res) => {
  try {
    const updatedDrawing = await Drawing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated drawing
    );
    if (!updatedDrawing) {
      return res.status(404).json({ error: 'Drawing not found' });
    }
    res.status(200).json(updatedDrawing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a drawing
app.delete('/api/drawings/:id', async (req, res) => {
  try {
    const deletedDrawing = await Drawing.findByIdAndDelete(req.params.id);
    if (!deletedDrawing) {
      return res.status(404).json({ error: 'Drawing not found' });
    }
    res.status(200).json(deletedDrawing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
