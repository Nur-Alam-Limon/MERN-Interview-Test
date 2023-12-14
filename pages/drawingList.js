// DrawingList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const DrawingList = () => {
  const [drawings, setDrawings] = useState([]);

  useEffect(() => {
    // Fetch drawings from the server
    axios.get('http://localhost:3001/api/drawings')
      .then(response => setDrawings(response.data))
      .catch(error => console.error('Error fetching drawings:', error));
  }, []);

  return (
    <div>
      <h1>All Drawings</h1>
      <ul>
        {drawings.map(drawing => (
          <li key={drawing._id}>
            <Link href={`/DrawingDetail/${drawing._id}`} passHref>
              {drawing.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DrawingList;
