import React from "react";

export default function SearchBar(props) {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <input
          type="text"
          placeholder="Movie Title"
          value={props.searchTerm}
          onChange={props.handleChange}
        />
        <input type="submit" value="Search" />
      </form>
    </div>
  );
}
