import React from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import styles from "assets/jss/material-kit-react/views/components.js";
import BestsPage from "./BestsPageComponents/BestsPage";

const useStyles = makeStyles(styles);

export default function Bests(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        brand="Ödülün Adresi"
        rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />
      <Parallax image={require("assets/img/background.jpeg")}>
        <div className={classes.container}>
          <GridContainer>
            {/* <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>Ödülün Adresi Turnuva Sitesi</h1>
                <h3 className={classes.subtitle}>
                  Hem eğlendirir hem kazandırır.
                </h3>
              </div>
            </GridItem> */}
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <BestsPage />
      </div>
      <Footer />
    </div>
  );
}
