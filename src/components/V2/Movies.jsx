import React from "react";
import Movie from "./Movie";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: theme.spacing(1)
  }
}));

export default function Movies(props) {
  const theme = useTheme();
  const classes = useStyles(theme);

  const { movies, loading, searched } = props;
  if (!searched && !loading && movies.length < 1) {
    return (
      <div>
        <p>No results</p>
      </div>
    );
  }
  return (
    <div className={classes.root}>
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
