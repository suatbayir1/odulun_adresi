import React, { useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.js";
import styles from "assets/jss/material-kit-react/views/components.js";
import HomePage from "./HomePageComponents/HomePage";
import { setIsLogin } from "../../redux"
import { connect } from "react-redux";

const useStyles = makeStyles(styles);

function Components(props) {
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
      {/* <img src={require("assets/img/background.jpeg")} width={window.innerWidth} /> */}
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
        <HomePage />
      </div>
      <Footer />
    </div>
  );
}


export default Components;