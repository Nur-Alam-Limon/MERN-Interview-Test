// src/app/api/sample-data.js
const Drawing = require('./models/drawing');

async function sampleData() {
  // Check if drawings already exist
  const existingDrawings = await Drawing.find();
  
  if (existingDrawings.length === 0) {
    // Create drawings only if none exist
    const drawing1 = new Drawing({
      name: 'Drawing 1',
      lines: [
        { points: [{ x: 10, y: 20 }, { x: 30, y: 40 }], color: 'blue', strokeWidth: 2 },
      ],
      shapes: [
        { type: 'rectangle', position: { x: 50, y: 60 }, size: { width: 30, height: 40 }, color: 'red' },
      ],
      textAnnotations: [
        { text: 'Hello!', position: { x: 100, y: 120 }, color: 'green', fontSize: 16 },
      ],
    });

    const drawing2 = new Drawing({
      name: 'Drawing 2',
      lines: [
        { points: [{ x: 15, y: 25 }, { x: 35, y: 45 }, { x: 55, y: 65 }], color: 'red', strokeWidth: 3 },
      ],
      shapes: [
        { type: 'circle', position: { x: 70, y: 80 }, size: { width: 20, height: 20 }, color: 'purple' },
      ],
      textAnnotations: [
        { text: 'Sample Text', position: { x: 120, y: 140 }, color: 'orange', fontSize: 18 },
      ],
    });

    // Save the drawings
    await Promise.all([drawing1.save(), drawing2.save()]);
  } else {
    console.log('Drawings already exist. Skipping sample data creation.');
  }
}

module.exports = sampleData;
