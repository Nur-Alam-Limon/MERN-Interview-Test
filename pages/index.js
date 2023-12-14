import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <h1>Whiteboard App</h1>
      <Link href="/drawingList">View All Drawings</Link>
    </div>
  );
};

export default Home;
