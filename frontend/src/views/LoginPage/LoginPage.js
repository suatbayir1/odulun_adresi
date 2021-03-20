import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import { history } from "../../history";
import Icon from "@material-ui/core/Icon";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { fetchLogin } from "../../redux";
import { connect } from "react-redux";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles(styles);

function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleOnChangeInput = (e) => {
    switch (e.target.name) {
      case "username":
        setUsername(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
    }
  };

  const handleUserMessage = () => {
    if (props.loginMessage === "user_not_found") {
      setSnackbarMessage("Kullanıcı adı veya şifre hatalı");
      setOpenSnackbar(true);
    } else if (props.loginMessage === "login_success") {
      setSnackbarMessage("Giriş başarılı");
      setOpenSnackbar(true);
    } else if (props.loginMessage === "username_is_banned") {
      setSnackbarMessage("Bu kullanıcı admin tarafından banlanmıştır.");
      setOpenSnackbar(true);
    }
  };

  const handleClose = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    handleUserMessage();
  }, [props.isLogin, props.loginMessage]);

  const handleLoginClick = async () => {
    if (username.trim() === "" || password.trim() === "") {
      setSnackbarMessage("Kullanıcı adı ve şifre boş bırakılamaz");
      setOpenSnackbar(true);
      return;
    }

    const payload = {
      username: username,
      password: password,
    };

    await props.fetchLogin(payload);

    handleUserMessage();
  };

  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="Ödülün Adresi"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={openSnackbar}
          onClose={handleClose}
          autoHideDuration={5000}
          message={snackbarMessage}
        >
          <MuiAlert
            elevation={6}
            variant={"filled"}
            onClose={handleClose}
            severity={props.isLogin ? "success" : "error"}
          >
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>

        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Giriş Yap</h4>
                  </CardHeader>
                  <CardBody>
                    <CustomInput
                      labelText="Kullanıcı Adı..."
                      id="username"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: (e) => handleOnChangeInput(e),
                        name: "username",
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <AccountBoxIcon
                              className={classes.inputIconsColor}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText="Şifre..."
                      id="pass"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: (e) => handleOnChangeInput(e),
                        name: "password",
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button
                      simple
                      color="primary"
                      size="lg"
                      onClick={handleLoginClick}
                    >
                      Giriş Yap
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.authentication.isLogin,
    loginMessage: state.authentication.loginMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchLogin: (payload) => dispatch(fetchLogin(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
