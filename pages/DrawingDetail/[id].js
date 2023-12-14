import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const DrawingDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [drawing, setDrawing] = useState(null);
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Fetch drawing details based on the ID from the URL
    if (id) {
      axios.get(`http://localhost:3001/api/drawings/${id}`)
        .then(response => {
          setDrawing(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching drawing details:', error);
          setLoading(false);
        });
    }
  }, [id]);

  useEffect(() => {
    // Draw on the canvas when the drawing data is available
    if (drawing && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      // Clear the canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Draw lines
      drawing.lines.forEach(line => {
        context.beginPath();
        context.strokeStyle = line.color;
        context.lineWidth = line.strokeWidth;
        line.points.forEach((point, index) => {
          if (index === 0) {
            context.moveTo(point.x, point.y);
          } else {
            context.lineTo(point.x, point.y);
          }
        });
        context.stroke();
      });

      // Draw shapes (for example, rectangles and circles)
      drawing.shapes.forEach(shape => {
        context.beginPath();
        context.fillStyle = shape.color;
        // Render shapes based on their type, position, and size
        if (shape.type === 'rectangle') {
          context.rect(shape.position.x, shape.position.y, shape.size.width, shape.size.height);
        } else if (shape.type === 'circle') {
          context.arc(shape.position.x, shape.position.y, shape.size.width / 2, 0, 2 * Math.PI);
        }
        context.fill();
      });

      // Draw text annotations
      drawing.textAnnotations.forEach(textAnnotation => {
        context.fillStyle = textAnnotation.color;
        context.font = `${textAnnotation.fontSize}px Arial`;
        context.fillText(textAnnotation.text, textAnnotation.position.x, textAnnotation.position.y);
      });
    }
  }, [drawing]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!drawing) {
    return <div>Drawing not found</div>;
  }

  return (
    <div>
      <h1>Drawing Detail</h1>
      <p>Name: {drawing.name}</p>
      <canvas ref={canvasRef} width={800} height={600} style={{ border: '1px solid #000' }} />
    </div>
  );
};

export default DrawingDetail;
