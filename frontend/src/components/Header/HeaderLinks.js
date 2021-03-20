/*eslint-disable*/
import React, { useState } from "react";
import { fetchLogin, fetchLogout } from "../../redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { AccountCircle, Apps, Group, Home } from "@material-ui/icons";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";
import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
const useStyles = makeStyles(styles);

function HeaderLinks(props) {
  const classes = useStyles();
  const [isLoggedIn, setLoggedIn] = useState(false);

  const notLoggedInProfileList = [
    <Link to="/login-page" className={classes.dropdownLink}>
      Giriş Yap
    </Link>,
    <Link to="/signup-page" className={classes.dropdownLink}>
      Kayıt Ol
    </Link>,
    <Link to="/admin" className={classes.dropdownLink}>
      Admin Paneli
    </Link>,
  ];

  const loggedInProfileList = [
    <Link to="/profile-page" className={classes.dropdownLink}>
      Profil
    </Link>,
    <Link to="/#" className={classes.dropdownLink} onClick={props.fetchLogout}>
      Çıkış Yap
    </Link>,
  ];

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button href="/#" color="transparent" className={classes.navLink}>
          <Home className={classes.icons} /> Anasayfa
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Etkinlikler"
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Link to="/tournament-page" className={classes.dropdownLink}>
              Turnuvalar
            </Link>,
            <Link to="/sweepstake-page" className={classes.dropdownLink}>
              Çekilişler
            </Link>,
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button href="/bests-page" color="transparent" className={classes.navLink}>
          <Group className={classes.icons} /> En İyiler
        </Button>
      </ListItem>
      {
        props.isLogin &&
        <ListItem className={classes.listItem}>
          <CustomDropdown
            noLiPadding
            buttonText="Profile"
            buttonProps={{
              className: classes.navLink,
              color: "transparent",
            }}
            buttonIcon={AccountCircle}
            dropdownList={
              loggedInProfileList
            }
          />
        </ListItem>
      }

    </List>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.authentication.user,
    isLogin: state.authentication.isLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchLogin: (payload) => dispatch(fetchLogin(payload)),
    fetchLogout: () => dispatch(fetchLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLinks);
