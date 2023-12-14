import React, { useEffect, useState } from 'react';
import { Stage, Layer, Line, Rect, Circle, Text } from 'react-konva';
import axios from 'axios';
import { useRouter } from 'next/router';

const DrawingDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [drawing, setDrawing] = useState(null);
  const [loading, setLoading] = useState(true);

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
      <div className='drawings'>
      <Stage width={800} height={600}>
        <Layer>
          {/* Draw lines */}
          {drawing.lines.map((line, i) => (
            <Line
              key={i}
              points={line.points.reduce((acc, point) => acc.concat(point.x, point.y), [])}
              stroke={line.color}
              strokeWidth={line.strokeWidth}
            />
          ))}

          {/* Draw shapes */}
          {drawing.shapes.map((shape, i) => {
            if (shape.type === 'rectangle') {
              return (
                <Rect
                  key={i}
                  x={shape.position.x}
                  y={shape.position.y}
                  width={shape.size.width}
                  height={shape.size.height}
                  fill={shape.color}
                />
              );
            } else if (shape.type === 'circle') {
              return (
                <Circle
                  key={i}
                  x={shape.position.x}
                  y={shape.position.y}
                  radius={shape.size.width / 2}
                  fill={shape.color}
                />
              );
            }
            return null;
          })}

          {/* Draw text annotations */}
          {drawing.textAnnotations.map((textAnnotation, i) => (
            <Text
              key={i}
              x={textAnnotation.position.x}
              y={textAnnotation.position.y}
              text={textAnnotation.text}
              fontSize={textAnnotation.fontSize}
              fill={textAnnotation.color}
            />
          ))}
        </Layer>
      </Stage>
      </div>
    </div>
  );
};

export default DrawingDetail;
