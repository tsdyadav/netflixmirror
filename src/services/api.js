import axios from "axios";

const BASE_URL = "https://api.imdbapi.dev";

/* 🔥 FETCH MOVIES (NO TOKEN DEPENDENCY) */
export const fetchMovies = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/titles`, {
      params: {
        types: "MOVIE",
        limit: 50
      }
    });

    return res.data.titles || [];
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
};

/* 🔍 SEARCH */
export const searchMovies = async (query) => {
  try {
    const res = await axios.get(`${BASE_URL}/search/titles`, {
      params: { query }
    });

    return res.data.titles || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};