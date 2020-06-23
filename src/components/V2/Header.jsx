import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

export default function Header(props) {
  return (
    <AppBar position="static">
      <Toolbar style={{ justifyContent: "center" }}>
        <Typography variant="h6">Movie Explorer</Typography>
      </Toolbar>
    </AppBar>
  );
}
