import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import TextField from '@material-ui/core/TextField';
import FormControl from "@material-ui/core/FormControl";
import Box from '@material-ui/core/Box';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Close from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import Slide from "@material-ui/core/Slide";
import AddIcon from '@material-ui/icons/Add';
import { DropzoneArea } from 'material-ui-dropzone'
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { DataGrid } from '@material-ui/data-grid';
import axios from "axios";
import { API_URL } from "../../../config";
import { Link } from "react-router-dom";
import { history } from "../../../history";



const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Çekiliş Adı', width: 400 },
    { field: 'prize', headerName: 'Ödül', width: 200 },
    { field: 'numberOfUsers', headerName: 'Toplam Kullanıcı', type: 'number', width: 200 },
    { field: 'winner', headerName: 'Kazanan', type: 'number', width: 200 },
    { field: 'createdAt', headerName: 'Başlangıç Tarihi', type: 'number', width: 200 },
    { field: 'finishedAt', headerName: 'Bitiş Tarihi', type: 'number', width: 200 },
];

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";


function AdminSweepstake(props) {
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function () {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();
    const { ...rest } = props;

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarColor, setSnackbarColor] = useState("error");
    const [datetime, setDatetime] = React.useState("");
    const [classicModal, setClassicModal] = React.useState(false);
    const [sweepstakeSelection, setSweepstakeSelection] = React.useState([]);
    const [files, setFiles] = React.useState([]);
    const [sweepstakeName, setSweepstakeName] = React.useState("");
    const [prize, setPrize] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [rows, setRows] = React.useState([]);
    const [didMount, setDidMount] = React.useState(false);


    const handleChangeImage = (files) => {
        setFiles(files);
    }

    const handleClose = () => {
        setOpenSnackbar(false);
    };

    const handleClickCreateSweepstake = async () => {
        // if (sweepstakeName.trim() === "" || prize.trim() === "" || description.trim() === "" || datetime.trim() === "") {
        //     setSnackbarMessage("Lütfen bilgileri eksiksiz doldurun");
        //     setOpenSnackbar(true);
        //     setSnackbarColor("error");
        //     return;
        // }

        const formData = new FormData();
        formData.append('filename', `${sweepstakeName}_image.${files[0]["name"].split(".").pop()}`);
        formData.append('image', files[0]);
        formData.append("sweepstakeName", sweepstakeName);
        formData.append("prize", prize);
        formData.append("description", description);
        formData.append("finishedAt", datetime);

        var headers = {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        }

        let url = `${API_URL}sweepstake/createSweepstake`;
        axios.post(url, formData, headers)
            .then(function (response) {
                if (response.status !== 200) return;

                if (response.data.message.text[0] === "sweepstake_exists") {
                    setSnackbarMessage("Bu isme sahip bir çekiliş zaten oluşturulmuş");
                    setOpenSnackbar(true);
                    setSnackbarColor("error");
                } else {
                    setSnackbarMessage("Çekiliş başarıyla oluşturuldu");
                    setOpenSnackbar(true);
                    setSnackbarColor("success");
                    getSweepstakeList();
                }
            })
            .catch(function (response) {
                console.log(response)
            });


        // const payload = {
        //     "sweepstakeName": sweepstakeName,
        //     "prize": prize,
        //     "description": description,
        //     "finishedAt": datetime,
        //     "image": files[0],
        // }

        // let url = `${API_URL}sweepstake/createSweepstake`;
        // axios
        //     .post(url, payload, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data'
        //         }
        //     })
        //     .then((response) => {
        //         if (response.status !== 200) return;

        //         if (response.data.message.text[0] === "sweepstake_exists") {
        //             setSnackbarMessage("Bu isme sahip bir çekiliş zaten oluşturulmuş");
        //             setOpenSnackbar(true);
        //             setSnackbarColor("error");
        //         } else {
        //             setSnackbarMessage("Çekiliş başarıyla oluşturuldu");
        //             setOpenSnackbar(true);
        //             setSnackbarColor("success");
        //             getSweepstakeList();
        //         }
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
    }

    const getSweepstakeList = async () => {
        const payload = {};
        let url = `${API_URL}sweepstake/getAllSweepstake`;
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

    const removeSelectedSweepstake = async () => {
        if (sweepstakeSelection.length === 0) {
            setSnackbarMessage("Lütfen önce bir çekiliş seçin");
            setOpenSnackbar(true);
            setSnackbarColor("error");
            return;
        }

        const payload = {
            "selectedSweepstakes": sweepstakeSelection.rowIds
        };

        let url = `${API_URL}sweepstake/removeSweepstake`;
        axios.post(url, payload)
            .then((response) => {
                if (response.status !== 200) return;

                if (response.data.message.text[0] === "deleted") {
                    setSnackbarMessage("Seçili çekilişler başarıyla silindi");
                    setOpenSnackbar(true);
                    setSnackbarColor("success");
                    getSweepstakeList();
                    setSweepstakeSelection([]);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const routeSelectedSweepstake = async () => {
        if (sweepstakeSelection.length === 0) {
            setSnackbarMessage("Lütfen önce bir çekiliş seçin");
            setOpenSnackbar(true);
            setSnackbarColor("error");
            return;
        }

        if (sweepstakeSelection.length > 1) {
            setSnackbarMessage("Lütfen sadece bir çekiliş seçin");
            setOpenSnackbar(true);
            setSnackbarColor("error");
            return;
        }

        let selectedRow;

        rows.map(row => {
            if (row["id"] === sweepstakeSelection.rowIds[0]) {
                selectedRow = row;
            }
        })

        if (selectedRow.winner !== null) {
            setSnackbarMessage("Bu çekiliş daha önce gerçekleştirilmiş");
            setOpenSnackbar(true);
            setSnackbarColor("error");
            return;
        }


        history.push(`/admin/sweepstake/${sweepstakeSelection.rowIds[0]}`);
    }

    useEffect(() => {
        setDidMount(true);
        getSweepstakeList();
        return () => setDidMount(false);
    }, []);

    if (!didMount) {
        return null;
    }

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
                        Çekiliş Yönetim Paneli
                    </h2>
                </GridItem>
            </GridContainer>
            <GridContainer>
                <GridItem xs={12} sm={12} md={3} lg={2}>
                    <Button
                        color="success"
                        block
                        onClick={() => setClassicModal(true)}
                    >
                        <AddIcon className={classes.icon} />
                        Çekiliş Ekle
                    </Button>
                    <Dialog
                        classes={{
                            root: classes.center,
                            paper: classes.modal
                        }}
                        open={classicModal}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={() => setClassicModal(false)}
                        aria-labelledby="classic-modal-slide-title"
                        aria-describedby="classic-modal-slide-description"
                        fullWidth={true}
                        maxWidth={'lg'}
                    >
                        <DialogTitle
                            id="classic-modal-slide-title"
                            disableTypography
                            className={classes.modalHeader}
                        >
                            <Box display="flex">
                                <Box width="95%">
                                    <h4 className={classes.modalTitle}>Çekiliş Oluşturma Sayfası</h4>
                                </Box>
                                <Box>
                                    <IconButton
                                        className={classes.modalCloseButton}
                                        key="close"
                                        aria-label="Close"
                                        color="inherit"
                                        onClick={() => setClassicModal(false)}
                                    >
                                        <Close className={classes.modalClose} />
                                    </IconButton>
                                </Box>
                            </Box>
                        </DialogTitle>
                        <DialogContent
                            id="classic-modal-slide-description"
                            className={classes.modalBody}
                        >
                            <GridContainer justify={"center"}>
                                <GridItem xs={12} sm={12} md={12}>
                                    <Card className={classes[cardAnimaton]}>
                                        <form className={classes.form}>
                                            <CardHeader color="info" className={classes.cardHeader}>
                                                <h4>Çekiliş Oluştur</h4>
                                            </CardHeader>
                                            <CardBody>
                                                <GridItem xs={12} sm={12} md={12}>
                                                    <Box display="flex">
                                                        <Box width={'50%'} mr={2} mb={2}>
                                                            <TextField
                                                                fullWidth={true}
                                                                id="outlined-select-currency"
                                                                label="Çekiliş Adı"
                                                                variant="outlined"
                                                                defaultValue="Çekiliş ismini giriniz.."
                                                                onChange={(e) => setSweepstakeName(e.target.value)}
                                                            />
                                                        </Box>

                                                        <Box width={'25%'}>
                                                            <TextField
                                                                fullWidth={true}
                                                                id="outlined-select-currency"
                                                                label="Ödül"
                                                                variant="outlined"
                                                                value={prize}
                                                                onChange={(e) => setPrize(e.target.value)}
                                                            />
                                                        </Box>
                                                    </Box>
                                                </GridItem>

                                                <GridContainer>
                                                    <GridItem xs={12} sm={12} md={9}>
                                                        <TextField
                                                            onChange={(e) => setDescription(e.target.value)}
                                                            name="description"
                                                            fullWidth={true}
                                                            id="outlined-multiline-static"
                                                            label="Açıklama"
                                                            multiline
                                                            rows={4}
                                                            defaultValue="Default Value"
                                                            variant="outlined"
                                                            value={description}
                                                        />
                                                    </GridItem>

                                                    <GridItem xs={12} sm={12} md={3}>
                                                        <br />
                                                        <FormControl fullWidth>
                                                            <label>Bitiş tarihi</label>
                                                            <input
                                                                type="datetime-local"
                                                                id="birthdaytime"
                                                                name="birthdaytime"
                                                                value={datetime}
                                                                onChange={(e) => setDatetime(e.target.value)}
                                                            />
                                                        </FormControl>
                                                    </GridItem>
                                                </GridContainer>


                                                <GridContainer style={{ marginTop: '20px' }}>
                                                    <GridItem xs={12} sm={12} md={12}>
                                                        <DropzoneArea
                                                            onChange={handleChangeImage}
                                                        />
                                                    </GridItem>
                                                </GridContainer>

                                            </CardBody>
                                            <CardFooter className={classes.cardFooter}>
                                                <Button
                                                    color="info"
                                                    size="lg"
                                                    onClick={handleClickCreateSweepstake}
                                                >
                                                    Çekiliş Oluştur
                                                </Button>
                                            </CardFooter>
                                        </form>
                                    </Card>
                                </GridItem>
                            </GridContainer>
                        </DialogContent>
                    </Dialog>
                </GridItem>
            </GridContainer>

            <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={12}>
                    <Card className={classes[cardAnimaton]}>
                        <form className={classes.form}>
                            <CardBody>
                                <div style={{ height: 400, width: '100%' }}>
                                    <DataGrid
                                        rows={rows}
                                        columns={columns}
                                        pageSize={5}
                                        checkboxSelection
                                        onSelectionChange={(newSelection) => {
                                            setSweepstakeSelection(newSelection);
                                        }}
                                    />
                                </div>
                            </CardBody>
                            <CardFooter className={classes.cardFooter}>
                                <Button
                                    color="primary"
                                    size="lg"
                                    onClick={removeSelectedSweepstake}
                                >
                                    Çekilişleri Sil
                                </Button>
                                <Button
                                    color="success"
                                    size="lg"
                                    onClick={routeSelectedSweepstake}
                                >
                                    Çekilişi Gerçekleştir
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>



    );
}

export default AdminSweepstake;
