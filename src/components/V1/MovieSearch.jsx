import React, { useState, useRef } from "react";
import SearchBar from "./SearchBar";
import Movies from "./Movies";

export default function MovieSearch() {
  const [searchTerm, setSearchTerm] = useState("");

  function handleChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleSubmit(event) {
    if (searchTerm.length > 0) {
      searchMovies(searchTerm)
        .then(getMovies)
        .then(movies => {
          formatMovies(movies);
        });
    }
    event.preventDefault();
  }

  // const [searchResultsState, setSearchResultsState] = useState([]);
  const searchResults = useRef([]);
  const [loading, setLoading] = useState(false);

  // Searches movies using title typed into search box
  // GET request to API for movies with supplied title
  // Recursively searches each page of results up to 100 pages
  async function searchMovies(title, page = 1) {
    setMoviesState([]);
    setLoading(true);
    // console.log("call");
    await fetch(
      `https://www.omdbapi.com/?apikey=60f47463&s=${title}&type=movie&r=json&page=${page}`
    )
      .then(res => res.json())
      .then(res => {
        if (res.Response === "True" && page <= 100) {
          res.Search.forEach(result => {
            if (result.Title === title) {
              searchResults.current.push(result);
            }
          });
          return searchMovies(title, page + 1);
        }
      });
  }

  const [moviesState, setMoviesState] = useState([]);

  async function getMovies() {
    let movies = [];
    let movie;
    for (let i = 0; i < searchResults.current.length; i++) {
      movie = searchResults.current[i];
      await fetch(
        `https://www.omdbapi.com/?apikey=60f47463&i=${movie.imdbID}&r=json`
      )
        .then(res => res.json())
        .then(res => {
          // console.log(res);
          movies.push(res);
        });
    }
    // console.log("movies");
    // console.log(movies);
    return movies;
  }

  function formatMovies(movies) {
    let formattedMovies = [];
    movies.forEach(movie => {
      console.log(movie.Poster);
      if (movie.Poster === "N/A") {
        movie.Poster = "https://i.ibb.co/pJ30Vh4/dvd-Default.jpg";
      }
      // Find Rotten Tomatoes rating in Ratings array
      for (let i = 0; i < movie.Ratings.length; i++) {
        if (movie.Ratings[i].Source === "Rotten Tomatoes") {
          movie.Rating = movie.Ratings[i].Value;
          break;
        }
      }
      formattedMovies.push(movie);
    });
    setMoviesState(formattedMovies);
    setLoading(false);
  }

  // useEffect(() => {
  //   if (searchResultsState.length > 0) {
  //     getMovies().then(movies => {
  //       setMoviesState(movies);
  //     });
  //   }
  // }, [searchResultsState]);

  return (
    <div>
      <SearchBar
        searchTerm={searchTerm}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      {loading && <p>Loading...</p>}
      <Movies movies={moviesState} loading />
    </div>
  );
}
