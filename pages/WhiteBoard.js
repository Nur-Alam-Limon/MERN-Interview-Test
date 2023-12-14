import React, { useState, useEffect } from "react";
import { Stage, Layer, Line, Rect, Circle, Text } from "react-konva";

const Whiteboard = () => {
  const [stageDimensions, setStageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [lines, setLines] = useState([]);
  const [shapes, setShapes] = useState([]);
  const [textAnnotations, setTextAnnotations] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawMode, setDrawMode] = useState("line"); // Default draw mode
  const [textInput, setTextInput] = useState('');

  useEffect(() => {
    // Set initial stage dimensions after component mounts
    setStageDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Update dimensions on window resize
    const handleResize = () => {
      setStageDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const newPoint = { x: e.evt.clientX, y: e.evt.clientY };

    if (drawMode === "line") {
      setLines([...lines, { points: [newPoint.x, newPoint.y] }]);
    } else if (drawMode === "rectangle" || drawMode === "circle") {
      setShapes([
        ...shapes,
        { type: drawMode, start: newPoint, end: newPoint, color: "red" },
      ]);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const updatedLines = [...lines];
    const lastLine = updatedLines[updatedLines.length - 1];

    if (drawMode === "line") {
      const newPoint = { x: e.evt.clientX, y: e.evt.clientY };
      setLines([
        ...lines.slice(0, -1),
        { points: [...lastLine.points, newPoint.x, newPoint.y] },
      ]);
    } else if (drawMode === "rectangle" || drawMode === "circle") {
      const updatedShapes = [...shapes];
      const lastShape = updatedShapes[updatedShapes.length - 1];

      updatedShapes[updatedShapes.length - 1] = {
        ...lastShape,
        end: { x: e.evt.clientX, y: e.evt.clientY },
      };
      setShapes(updatedShapes);
    }
  };

  const handleMouseUp = () => setIsDrawing(false);

  const handleDrawModeChange = (mode) => setDrawMode(mode);

  const handleAddShape = (shapeType) => {
    setShapes([
      ...shapes,
      {
        type: shapeType,
        position: { x: 50, y: 50 },
        size: { width: 50, height: 50 },
        color: "red",
      },
    ]);
  };

  const handleTextInputChange = (e) => {
    setTextInput(e.target.value);
  };

  const handleAddTextAnnotation = () => {
    // Only add text annotation if there is some text input
    if (textInput.trim() !== '') {
      const newTextAnnotation = { text: textInput, position: { x: 100, y: 100 }, color: 'blue', fontSize: 16 };
      setTextAnnotations([...textAnnotations, newTextAnnotation]);
      setTextInput(''); // Clear the text input after adding the annotation
    }
  };

  const handleClear = () => {
    setLines([]);
    setShapes([]);
    setTextAnnotations([]);
  };

  return (
    <div>
      <h1>White Board</h1>
      <div className="buttons">
        {['line', 'rectangle', 'circle'].map((mode) => (
          <button key={mode} onClick={() => handleDrawModeChange(mode)}>
            Draw {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </button>
        ))}
        
        <button onClick={handleAddTextAnnotation}>Add Text</button>
        <button onClick={handleClear}>Clear</button>
        <input type="text" value={textInput} onChange={handleTextInputChange} />
      </div>
      <div className="stage-container">
      <Stage
        width={stageDimensions.width}
        height={stageDimensions.height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
          {shapes.map((shape, i) => (
            <React.Fragment key={i}>
              {shape.type === "rectangle" && (
                <Rect
                  x={Math.min(shape.start.x, shape.end.x)}
                  y={Math.min(shape.start.y, shape.end.y)}
                  width={Math.abs(shape.end.x - shape.start.x)}
                  height={Math.abs(shape.end.y - shape.start.y)}
                  fill={shape.color}
                />
              )}
              {shape.type === "circle" && (
                <Circle
                  x={(shape.start.x + shape.end.x) / 2}
                  y={(shape.start.y + shape.end.y) / 2}
                  radius={
                    Math.sqrt(
                      Math.pow(shape.end.x - shape.start.x, 2) +
                        Math.pow(shape.end.y - shape.start.y, 2)
                    ) / 2
                  }
                  fill={shape.color}
                />
              )}
            </React.Fragment>
          ))}

          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="black"
              strokeWidth={2}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation="source-over"
            />
          ))}
          {textAnnotations.map((text, i) => (
            <Text
              key={i}
              x={text.position.x}
              y={text.position.y}
              text={text.text}
              fontSize={text.fontSize}
              fill={text.color}
            />
          ))}
        </Layer>
      </Stage>
      </div>
    </div>
  );
};

export default Whiteboard;
