import { useState, useEffect } from "react";
import { searchMovies } from "../services/api";

export default function SearchBar({ onSelectMovie }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length > 2) {
        searchMovies(query).then(setResults);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div style={{ marginLeft: "40px" }}>
      <input
        placeholder="Search movies..."
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* 🔍 RESULT LIST */}
      <div style={{ background: "#222", width: "300px" }}>
        {results.map(movie => (
          <p
            key={movie.id}
            style={{ padding: "10px", cursor: "pointer" }}
            onClick={() => {
              onSelectMovie(movie);   // 🔥 send to Home
              setQuery("");           // clear input
              setResults([]);         // hide list
            }}
          >
            {movie.primaryTitle}
          </p>
        ))}
      </div>
    </div>
  );
}