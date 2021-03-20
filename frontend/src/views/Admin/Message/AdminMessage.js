import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import Slide from "@material-ui/core/Slide";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { DataGrid } from '@material-ui/data-grid';
import axios from "axios";
import { API_URL } from "../../../config";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'status', headerName: 'Durum', width: 100 },
    { field: 'message', headerName: 'Mesaj', type: 'number', width: 800 },
];

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";


function AdminMessage(props) {
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function () {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();
    const { ...rest } = props;

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarColor, setSnackbarColor] = useState("error");
    const [rows, setRows] = React.useState([]);
    const [message, setMessage] = React.useState("");
    const handleClose = () => {
        setOpenSnackbar(false);
    };

    const getUserList = async () => {
        const payload = {};
        let url = `${API_URL}message/getAllMessage`;
        axios
            .post(url, payload)
            .then((response) => {
                if (response.status !== 200) return;
                setRows(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        getUserList();
    }, []);

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
                    severity={snackbarColor}
                >
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12} lg={12}>
                    <h2 style={{ marginTop: '-20px' }}>
                        Sorular & İstekler Yönetim Paneli
                    </h2>
                </GridItem>
            </GridContainer>
            <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={12}>
                    <Card className={classes[cardAnimaton]}>
                        <form className={classes.form}>
                            <CardBody>
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>ID</TableCell>
                                                <TableCell align="right">Email</TableCell>
                                                <TableCell align="right">Durum</TableCell>
                                                <TableCell align="right">Mesaj</TableCell>
                                                <TableCell align="right"></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map((row) => (
                                                <TableRow key={row.id}>
                                                    <TableCell component="th" scope="row">
                                                        {row.id}
                                                    </TableCell>
                                                    <TableCell align="right">{row.email}</TableCell>
                                                    <TableCell align="right">{row.status}</TableCell>
                                                    <TableCell align="right">{row.message.substring(0, 100)}</TableCell>
                                                    <TableCell align="right">
                                                        <IconButton aria-label="delete" color="primary" onClick={() => setMessage(row.message)}>
                                                            <EditIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                {
                                    message !== "" && <TextField
                                        style={{ color: '#ffffff', background: '#ffffff', marginTop: '50px' }}
                                        fullWidth={true}
                                        id="outlined-select-currency"
                                        label="Mesaj"
                                        variant="filled"
                                        value={message}
                                        multiline
                                        rows={4}
                                    />
                                }
                            </CardBody>
                        </form>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>



    );
}

export default AdminMessage;
