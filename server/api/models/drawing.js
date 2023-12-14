const mongoose = require('mongoose');

const shapeSchema = new mongoose.Schema({
  type: String,
  position: { x: Number, y: Number },
  size: { width: Number, height: Number },
  color: String,
});

const drawingSchema = new mongoose.Schema({
  name: String,
  lines: [
    {
      points: [{ x: Number, y: Number }],
      color: String,
      strokeWidth: Number,
    }
  ],
  shapes: [shapeSchema], // Use the generic shape schema
  textAnnotations: [
    {
      text: String,
      position: { x: Number, y: Number },
      color: String,
      fontSize: Number,
    }
  ],
});

const Drawing = mongoose.model('Drawing', drawingSchema);

module.exports = Drawing;
