import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";
import {
    Typography,
} from "@material-ui/core";
import Button from "../../../components/CustomButtons/Button";
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { withStyles } from '@material-ui/core/styles';
import { fetchSweepstakeRegister, fetchSweepstakeList } from "../../../redux"
import { connect } from "react-redux";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { Alert, AlertTitle } from "@material-ui/lab";



const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

const useStyles = makeStyles(styles);

function RegisterPopup(props) {
    const classes = useStyles();

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [isClickedRequest, setIsClickedRequest] = React.useState(false);

    const handleClose = () => {
        setOpenSnackbar(false);
        setIsClickedRequest(false);
    };

    const handleRegisterClick = () => {
        const payload = {
            "sweepstakeId": props.selectedSweepstake["id"],
            "username": window.localStorage.getItem("username")
        }

        props.fetchSweepstakeRegister(payload);
        setIsClickedRequest(true);
    }

    const handleUserMessage = () => {
        if (props.registerToSweepstakeMessage === "record_saved_successfully") {
            setSnackbarMessage("Çekilişe başarılı bir şekilde kayıt oldunuz");
            setOpenSnackbar(true);
        } else if (props.registerToSweepstakeMessage === "username_already_exists") {
            setSnackbarMessage("Bu çekilişe bu hesaptan zaten kayıt yapılmış");
            setOpenSnackbar(true);
        }
    };

    useEffect(() => {
        props.fetchSweepstakeList({ limit: 9, skip: 0 });

        if (isClickedRequest) {
            handleUserMessage();
        }
        return () => {
        }
    }, [props.selectedSweepstake, props.registerToSweepstakeMessage, props.isClickedRegisterButton])


    return (
        <div>
            <Snackbar
                style={{ marginTop: '50px' }}
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
                    severity={props.registerToSweepstakeMessage === "record_saved_successfully" ? "success" : "error"}
                >
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
            <Dialog onClose={props.handleClose} aria-labelledby="customized-dialog-title" open={props.open}>
                <DialogTitle id="customized-dialog-title">
                    {props.selectedSweepstake["title"]}
                </DialogTitle>
                <DialogContent dividers>
                    <p>Bu çekilişe kaydolmak istiyor musunuz ? Kayıt ol butonuna basarsanız sistemde bulunan bilgileriniz ile
                    çekilişe kayıt işleminiz gerçekleşecektir. Bilgilerinizi Profil sayfasından güncelleyebilirsiniz.
                    </p>
                </DialogContent>
                <DialogActions>
                    <Button color="danger" onClick={props.handleClose}>
                        İptal
                    </Button>
                    <Button autoFocus onClick={handleRegisterClick} color="success">
                        Kayıt Ol
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        registerToSweepstakeMessage: state.sweepstake.registerToSweepstakeMessage,
        isClickedRegisterButton: state.sweepstake.isClickedRegisterButton,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSweepstakeRegister: (payload) => dispatch(fetchSweepstakeRegister(payload)),
        fetchSweepstakeList: (payload) => dispatch(fetchSweepstakeList(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPopup);
