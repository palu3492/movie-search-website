import React from "react";
import Movie from "./Movie";

export default function Movies(props) {
  const { movies, loading } = props;

  if (!loading && movies.length < 1) {
    return (
      <div>
        <p>No results</p>
      </div>
    );
  }
  return (
    <div style={containerStyle}>
      {props.movies.map((movie, index) => {
        return (
          <Movie
            title={movie.Title}
            rated={movie.Rated}
            rating={movie.Rating}
            runtime={movie.Runtime}
            poster={movie.Poster}
            key={index}
          />
        );
      })}
    </div>
  );
}

const containerStyle = {
  margin: "auto",
  width: "fit-content"
};
