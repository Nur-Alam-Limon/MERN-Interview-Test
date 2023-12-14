import React, { useEffect, useState } from 'react';

const DrawingList = () => {
  const [drawings, setDrawings] = useState([]);

  useEffect(() => {
    // Fetch drawings from the API
    // ...
  }, []);

  return (
    <div>
      <h1>All Drawings</h1>
      {/* Display drawings */}
    </div>
  );
};

export default DrawingList;
