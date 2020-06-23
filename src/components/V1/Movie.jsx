import React from "react";

export default function Movie(props) {
  const { title, rated, runtime, poster, rating } = props;

  return (
    <div style={movieStyle}>
      <img src={poster} alt={"poster"} height="120px" width="auto" />
      <div>
        {title && (
          <p style={textStyle}>
            <b>{title}</b>
          </p>
        )}
        {rated && <p style={textStyle}>Rated {rated}</p>}
        {runtime && <p style={textStyle}>Runtime {runtime}</p>}
        {rating && <p style={textStyle}>Raiting {rating}</p>}
      </div>
    </div>
  );
}

const movieStyle = {
  display: "flex",
  margin: "7px"
};

const textStyle = {
  margin: "0.6em"
};
