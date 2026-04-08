export default function Navbar({ setType }) {
  return (
    <div>
      <button onClick={() => setType("MOVIE")}>Movies</button>
      <button onClick={() => setType("TV_SERIES")}>TV Shows</button>
      <button onClick={() => setType("VIDEO_GAME")}>Games</button>
    </div>
  );
}