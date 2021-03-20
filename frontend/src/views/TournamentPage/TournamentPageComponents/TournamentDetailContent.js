import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";

const useStyles = makeStyles(styles);

function TournamentDetailContent(props) {
  const classes = useStyles();

  return (
    <div>
      <GridContainer>
        <h2>detail page</h2>
      </GridContainer>
    </div>
  );
}

export default TournamentDetailContent;
