// src/app/pages/DrawingDetail.js
import React, { useEffect, useState } from 'react';

const DrawingDetail = ({ match }) => {
  const [drawing, setDrawing] = useState(null);

  useEffect(() => {
    // Fetch drawing by ID from the API
    // ...
  }, [match.params.id]);

  return (
    <div>
      <h1>Drawing Detail</h1>
      {/* Display drawing details */}
    </div>
  );
};

export default DrawingDetail;
