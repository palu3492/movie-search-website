import React from "react";
import { Card, CardContent, CardActionArea, CardMedia, Typography, Link } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  card: {
    margin: theme.spacing(1.5),
    flexGrow: 1,
    minWidth: '280px'
  },
  items: {
    display: "flex",
    textDecoration: 'none!important'
  },
  image: {
    height: 150,
    width: 100
  },
  details: {
    display: "flex",
    marginTop: theme.spacing(1)
  },
  content: {
    flex: "1 0 auto"
  },
  rating: {
    justifyContent: "center"
  },
  rottentomatoes: {
    background:
      "transparent url(https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/certified_fresh.75211285dbb.svg) no-repeat",
    backgroundSize: "cover",
    height: "28px",
    width: "28px",
    marginRight: theme.spacing(1)
  }
}));

export default function Movie(props) {
  const theme = useTheme();
  const classes = useStyles(theme);

  const { title, rated, runtime, poster, rating, link } = props;

  return (
    <Card className={classes.card}>
      <CardActionArea component={Link} href={link} target="_blank" rel="noopener" className={classes.items}>
      <CardMedia className={classes.image} image={poster} title={"poster"} />
      <CardContent className={classes.content}>
        <Typography component="h5" variant="h5">
          {title}
        </Typography>
        <div className={classes.details}>
          {rated !== "N/A" && (
            <Typography
              variant="subtitle1"
              color="textSecondary"
              style={{ flex: "1 0 auto" }}
            >
              {rated}
            </Typography>
          )}
          {runtime !== "N/A" && (
            <Typography
              variant="subtitle1"
              color="textSecondary"
              style={{ flex: "1 0 auto" }}
            >
              {runtime}
            </Typography>
          )}
        </div>
        {rating && (
          <div className={classes.details + " " + classes.rating}>
            <span className={classes.rottentomatoes} />
            <Typography variant="subtitle1" color="textSecondary">
              {rating}
            </Typography>
          </div>
        )}
      </CardContent>
      </CardActionArea>
    </Card>
  );
}
