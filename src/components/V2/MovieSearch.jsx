import React, { useState, useRef } from "react";
import SearchBar from "./SearchBar";
import Movies from "./Movies";
import Header from "./Header";
import { Container, CircularProgress } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    background: "#f4f7fa",
    minHeight: "100vh"
  },
  container: {
    marginTop: theme.spacing(1.2),
    textAlign: 'center'
  },
  loading: {
    margin: theme.spacing(2)
  }
}));

export default function MovieSearch() {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [searchTerm, setSearchTerm] = useState("");
  const [firstSearch, setFirstSearch] = useState(true);

  function handleChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleSubmit(event) {
    if (searchTerm.length > 0) {
      setFirstSearch(false);
      // Reset state
      setMoviesState([]);
      searchResults.current = [];
      setLoading(true);
      searchMovies(searchTerm)
        .then(getMovies)
        .then(movies => {
          formatMovies(movies);
        });
    }
    event.preventDefault();
  }

  const searchResults = useRef([]);
  const [loading, setLoading] = useState(false);

  // Searches movies using title typed into search box
  // GET request to API for movies with supplied title
  // Recursively searches each page of results up to 100 pages
  async function searchMovies(title, page = 1) {
    await fetch(
      `https://www.omdbapi.com/?apikey=60f47463&s=${title}&type=movie&r=json&page=${page}`
    )
      .then(res => res.json())
      .then(res => {
        if (res.Response === "True" && page <= 100) {
          res.Search.forEach(result => {
            // if (result.Title === title) {
            //   searchResults.current.push(result);
            // }
            if (result.Title.length < 50) {
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
          movies.push(res);
        });
    }
    return movies;
  }

  function formatMovies(movies) {
    let formattedMovies = [];
    movies.forEach(movie => {
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
      movie.link = "https://www.imdb.com/title/" + movie.imdbID;
      formattedMovies.push(movie);
    });
    console.log(formattedMovies);
    setMoviesState(formattedMovies);
    setLoading(false);
  }

  return (
    <div className={classes.root}>
      <Header />
      <Container maxWidth="md" className={classes.container}>
        <SearchBar
          searchTerm={searchTerm}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        {loading && <CircularProgress className={classes.loading} />}
        <Movies movies={moviesState} loading={loading} searched={firstSearch} />
      </Container>
    </div>
  );
}
