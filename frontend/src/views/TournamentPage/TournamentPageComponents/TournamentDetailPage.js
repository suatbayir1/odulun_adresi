import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";
import RightSide from "../../Components/HomePageComponents/RightSide";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import TournamentDetailContent from "./TournamentDetailContent";

const useStyles = makeStyles(styles);

export default function TournamentDetailPage() {
  const classes = useStyles();

  return (
    <div className={classes.sections}>
      <div style={{ margin: "25px" }}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={9}>
            <TournamentDetailContent />
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <RightSide />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
