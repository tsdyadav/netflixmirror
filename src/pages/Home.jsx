import { useEffect, useState } from "react";
import { fetchMovies } from "../services/api";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [visibleCount, setVisibleCount] = useState(20);
  const [selected, setSelected] = useState(null);
  const [online, setOnline] = useState(navigator.onLine);

  const navigate = useNavigate();
  const bannerMovie = movies[0];
  const user = auth.currentUser;

  useEffect(() => {
    loadMovies();

    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  /* 🔥 LOAD ALL MOVIES */
  const loadMovies = async () => {
    const data = await fetchMovies();
    setMovies(data || []);
  };

  /* 🔥 LOAD MORE */
  const loadMore = () => {
    setVisibleCount(prev => prev + 20);
  };

  /* ⭐ WATCHLIST */
  const addToWatchlist = (movie) => {
    const list = JSON.parse(localStorage.getItem("watchlist")) || [];
    localStorage.setItem("watchlist", JSON.stringify([...list, movie]));
    alert("Added to Watchlist");
  };

  return (
    <div className="container">

      {/* 🔥 NAVBAR */}
      <div className="navbar">
        <h2 className="logo" onClick={() => navigate("/")}>
          NETFLIX
        </h2>

        <div className="navbar-right">
          {/* 🔍 SEARCH */}
          <SearchBar onSelectMovie={setSelected} />

          {/* 🌐 ONLINE STATUS */}
          <span className={`status-indicator ${online ? "online" : "offline"}`}>
            {online ? "Online" : "Offline"}
          </span>

          {/* 🔐 LOGIN / LOGOUT */}
          {user ? (
            <button
              className="btn-dark"
              onClick={() => auth.signOut()}
            >
              Logout
            </button>
          ) : (
            <button
              className="btn-light"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* 🎬 BANNER */}
      {bannerMovie && (
        <div className="banner">
          <img
            src={
              bannerMovie.primaryImage?.url ||
              "https://via.placeholder.com/1200x500"
            }
          />

          <div className="banner-content">
            <h1>{bannerMovie.primaryTitle}</h1>

            <p>
              {bannerMovie.plot || "Watch now on Netflix"}
            </p>

            <div className="banner-buttons">
              <button
                className="btn-light"
                onClick={() =>
                  alert("Playing " + bannerMovie.primaryTitle)
                }
              >
                ▶ Play
              </button>

              <button
                className="btn-dark"
                onClick={() => setSelected(bannerMovie)}
              >
                ℹ More Info
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🎞️ MOVIE ROW */}
      <div className="row">
        <h2>Trending Now</h2>

        <div className="row-posters">
          {movies.slice(0, visibleCount).map(movie => (
            <img
              key={movie.id}
              className="row-poster"
              src={
                movie.primaryImage?.url ||
                "https://via.placeholder.com/300"
              }
              onClick={() => setSelected(movie)}
            />
          ))}
        </div>
      </div>

      {/* 🔽 LOAD MORE */}
      <div className="load-more">
        <button onClick={loadMore} className="btn-dark">
          Load More
        </button>
      </div>

      {/* 🎬 MODAL */}
      {selected && (
        <div className="modal" onClick={() => setSelected(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{selected.primaryTitle}</h2>

            <img
              src={
                selected.primaryImage?.url ||
                "https://via.placeholder.com/300"
              }
              className="modal-img"
            />

            <p>{selected.plot || "No description available"}</p>

            <p>⭐ {selected.rating?.aggregateRating || "N/A"}</p>

            <button
              onClick={() => addToWatchlist(selected)}
              className="btn-light"
            >
              Add to Watchlist
            </button>
          </div>
        </div>
      )}
    </div>
  );
}