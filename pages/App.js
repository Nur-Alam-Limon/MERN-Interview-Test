// src/App.js
import React from 'react';
import { useRouter } from 'next/router';
import DrawingList from './DrawingList';
import Whiteboard from './WhiteBoard';

const App = () => {
  const router = useRouter();

  return (
    <div>
      <DrawingList router={router} />
      <Whiteboard router={router}/>
    </div>
  );
};

export default App;
