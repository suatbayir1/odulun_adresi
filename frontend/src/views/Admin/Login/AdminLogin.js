import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
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
import Header from "components/Header/Header.js";
import { connect } from "react-redux";
import { fetchAdminLogin } from "../../../redux/index"
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles(styles);

function AdminLogin(props) {
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

    const handleClose = () => {
        setOpenSnackbar(false);
    };

    const handleUserMessage = () => {
        if (props.adminLoginMessage === "user_not_found") {
            setSnackbarMessage("Kullanıcı adı veya şifre hatalı");
            setOpenSnackbar(true);
        } else if (props.adminLoginMessage === "login_success") {
            setSnackbarMessage("Giriş başarılı");
            setOpenSnackbar(true);
        }
    };

    useEffect(() => {
        handleUserMessage();
    }, [props.isAdminLogin, props.adminLoginMessage]);

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

        console.log(payload);

        props.fetchAdminLogin(payload);

        handleUserMessage();
    };

    return (
        <div>
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
            <Header
                absolute
                color="transparent"
                brand="Ödülün Adresi"
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
                <div className={classes.container}>
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={4}>
                            <Card className={classes[cardAnimaton]}>
                                <form className={classes.form}>
                                    <CardHeader color="primary" className={classes.cardHeader}>
                                        <h4>Admin Girişi</h4>
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
        isAdminLogin: state.authentication.isAdminLogin,
        adminLoginMessage: state.authentication.adminLoginMessage,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAdminLogin: (payload) => dispatch(fetchAdminLogin(payload)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(AdminLogin);