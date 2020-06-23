import React, { useEffect, useState } from "react";

export default function TestAPI() {
  const [searchResultsState, setSearchResultsState] = useState([]);

  // Using like componentDidMount
  useEffect(() => {
    const title = "Sherlock Holmes";
    fetch(
      `https://www.omdbapi.com/?apikey=60f47463&s=${title}&type=movie&r=json`
    )
      .then(res => res.json())
      .then(res => {
        // console.log(res.Search);
        setSearchResultsState(res.Search);
      });
  }, []);

  const [moviesState, setMoviesState] = useState([]);

  async function getMovies() {
    let movies = [];
    let movie;
    for (let i = 0; i < searchResultsState.length; i++) {
      movie = searchResultsState[i];
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

  useEffect(() => {
    if (searchResultsState.length > 0) {
      getMovies().then(movies => {
        setMoviesState(movies);
      });
    }
  }, [searchResultsState]);

  function Movie(props) {
    const { title } = props;
    return <p>{title}</p>;
  }

  function Movies(props) {
    const { movies } = props;
    if (movies.length < 1) {
      return (
        <div>
          <h2>Movies:</h2>
          <p>Loading...</p>;
        </div>
      );
    }
    return (
      <div>
        <h2>Movies:</h2>
        {props.movies.map((movie, index) => {
          return <Movie title={movie.Title} key={index} />;
        })}
      </div>
    );
  }

  return <Movies movies={moviesState} />;
}
