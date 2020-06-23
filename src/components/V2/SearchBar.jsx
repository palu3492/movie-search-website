import React from "react";
import { TextField, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  form: {
    display: "flex",
    alignItems: "center"
  },
  searchBoxContainer: {
    background: "#fff",
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1),
    flexGrow: 1
  },
  searchBox: {
    background: "#fff",
    width: "100%"
  },
  searchButton: {
    flexShrink: 0,
    flexGrow: 0,
    marginLeft: theme.spacing(2),
    background: "#fff",
    padding: theme.spacing(2)
  }
}));

export default function SearchBar(props) {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <div>
      <form onSubmit={props.handleSubmit} noValidate autoComplete="off">
        <div className={classes.form}>
          <div className={classes.searchBoxContainer}>
            <TextField
              label="Movie Title"
              value={props.searchTerm}
              onChange={props.handleChange}
              className={classes.searchBox}
            />
          </div>
          <IconButton
            aria-label="search"
            type="submit"
            className={classes.searchButton}
          >
            <SearchIcon />
          </IconButton>
        </div>
      </form>
    </div>
  );
}
