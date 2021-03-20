import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
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
import { history } from "../../../history";

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Turnuva Adı', width: 200 },
    { field: 'type', headerName: 'Tür', width: 200 },
    { field: 'prize', headerName: 'Ödül', width: 200 },
    { field: 'numberOfUsers', headerName: 'Toplam Kullanıcı', type: 'number', width: 200 },
    { field: 'numberOfTeams', headerName: 'Toplam Takım', type: 'number', width: 200 },
    { field: 'createdAt', headerName: 'Başlangıç Tarihi', type: 'number', width: 200 },
    { field: 'finishedAt', headerName: 'Bitiş Tarihi', type: 'number', width: 200 },
];


const useStyles = makeStyles(styles);

const currencies = [
    {
        value: 'individual',
        label: 'Bireysel',
    },
    {
        value: 'team',
        label: 'Takım',
    },
];

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";


function AdminTournament(props) {
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function () {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();
    const { ...rest } = props;

    const handleOnChangeInput = (e) => {
        console.log(e.target.value);
        switch (e.target.name) {
        }
    };
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarColor, setSnackbarColor] = useState("error");
    const [datetime, setDatetime] = React.useState("");
    const [classicModal, setClassicModal] = React.useState(false);
    const [tournamentSelection, setTournamentSelection] = React.useState([]);
    const [files, setFiles] = React.useState([]);
    const [tournamentName, setTournamentName] = React.useState("");
    const [tournamentType, setTournamentType] = React.useState('team');
    const [prize, setPrize] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [rows, setRows] = React.useState([]);

    const handleChangeImage = (files) => {
        setFiles(files);
    }

    const handleClose = () => {
        setOpenSnackbar(false);
    };

    const handleChangeDatetime = (e) => {
        console.log(e);
        setDatetime(e);
    }

    const handleClickCreateTournament = async () => {
        if (tournamentName.trim() === "" || prize.trim() === "" || description.trim() === "" || datetime.trim() === "") {
            setSnackbarMessage("Lütfen bilgileri eksiksiz doldurun");
            setOpenSnackbar(true);
            setSnackbarColor("error");
            return;
        }

        const formData = new FormData();
        formData.append('filename', `${tournamentName}_image.${files[0]["name"].split(".").pop()}`);
        formData.append('image', files[0]);
        formData.append("tournamentName", tournamentName);
        formData.append("tournamentType", tournamentType);
        formData.append("prize", prize);
        formData.append("description", description);
        formData.append("finishedAt", datetime);

        var headers = {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        }

        let url = `${API_URL}tournament/createTournament`;
        axios.post(url, formData, headers)
            .then(function (response) {
                if (response.status !== 200) return;

                if (response.data.message.text[0] === "tournament_exists") {
                    setSnackbarMessage("Bu isme sahip bir turnuva zaten oluşturulmuş");
                    setOpenSnackbar(true);
                    setSnackbarColor("error");
                } else {
                    setSnackbarMessage("Turnuva başarıyla oluşturuldu");
                    setOpenSnackbar(true);
                    setSnackbarColor("success");
                    getTournamentList();
                }
            })
            .catch(function (response) {
                console.log(response)
            });



        // const payload = {
        //     "tournamentName": tournamentName,
        //     "tournamentType": tournamentType,
        //     "prize": prize,
        //     "description": description,
        //     "finishedAt": datetime,
        //     "image": files[0],
        // }

        // let url = `${API_URL}tournament/createTournament`;
        // axios
        //     .post(url, payload, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data'
        //         }
        //     })
        //     .then((response) => {
        //         if (response.status !== 200) return;

        //         if (response.data.message.text[0] === "tournament_exists") {
        //             setSnackbarMessage("Bu isme sahip bir turnuva zaten oluşturulmuş");
        //             setOpenSnackbar(true);
        //             setSnackbarColor("error");
        //         } else {
        //             setSnackbarMessage("Turnuva başarıyla oluşturuldu");
        //             setOpenSnackbar(true);
        //             setSnackbarColor("success");
        //             getTournamentList();
        //         }
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
    }

    const getTournamentList = async () => {
        const payload = {};
        let url = `${API_URL}tournament/getAllTournament`;
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

    const removeSelectedTournaments = async () => {
        if (tournamentSelection.length === 0) {
            setSnackbarMessage("Lütfen önce bir turnuva seçin");
            setOpenSnackbar(true);
            setSnackbarColor("error");
            return;
        }

        const payload = {
            "selectedTournaments": tournamentSelection.rowIds
        };

        let url = `${API_URL}tournament/removeTournament`;
        axios.post(url, payload)
            .then((response) => {
                if (response.status !== 200) return;

                if (response.data.message.text[0] === "deleted") {
                    setSnackbarMessage("Seçili turnuvalar başarıyla silindi");
                    setOpenSnackbar(true);
                    setSnackbarColor("success");
                    getTournamentList();
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const routeSelectedTournament = async () => {
        if (tournamentSelection.length === 0) {
            setSnackbarMessage("Lütfen önce bir turnuva seçin");
            setOpenSnackbar(true);
            setSnackbarColor("error");
            return;
        }

        if (tournamentSelection.rowIds.length > 1) {
            setSnackbarMessage("Lütfen sadece bir turnuva seçin");
            setOpenSnackbar(true);
            setSnackbarColor("error");
            return;
        }

        let selectedRow;

        rows.map(row => {
            if (row["id"] === tournamentSelection.rowIds[0]) {
                selectedRow = row;
            }
        })


        if (selectedRow.winner !== null) {
            setSnackbarMessage("Bu turnuva daha önce gerçekleştirilmiş");
            setOpenSnackbar(true);
            setSnackbarColor("error");
            return;
        }

        console.log(selectedRow);

        if (selectedRow["type"] === "team") {
            history.push(`/admin/tournament/team/${tournamentSelection.rowIds[0]}`);
        } else if (selectedRow["type"] === "individual") {
            history.push(`/admin/tournament/individual/${tournamentSelection.rowIds[0]}`);
        }
    }

    useEffect(() => {
        getTournamentList();
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
                        Turnuva Yönetim Paneli
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
                        Turnuva Ekle
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
                                    <h4 className={classes.modalTitle}>Turnuva Oluşturma Sayfası</h4>
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
                                                <h4>Turnuva Oluştur</h4>
                                            </CardHeader>
                                            <CardBody>
                                                <GridItem xs={12} sm={12} md={12}>
                                                    <Box display="flex">
                                                        <Box width={'50%'} mr={2} mb={2}>
                                                            <TextField
                                                                fullWidth={true}
                                                                id="outlined-select-currency"
                                                                label="Turnuva Adı"
                                                                variant="outlined"
                                                                defaultValue="Turnuva ismini giriniz.."
                                                                onChange={(e) => setTournamentName(e.target.value)}
                                                            />
                                                        </Box>

                                                        <Box width={'25%'} mr={2}>
                                                            <TextField
                                                                fullWidth={true}
                                                                id="outlined-select-currency"
                                                                select
                                                                label="Select"
                                                                value={tournamentType}
                                                                onChange={(e) => setTournamentType(e.target.value)}
                                                                variant="outlined"
                                                            >
                                                                {currencies.map((option) => (
                                                                    <MenuItem key={option.value} value={option.value}>
                                                                        {option.label}
                                                                    </MenuItem>
                                                                ))}
                                                            </TextField>
                                                        </Box>


                                                        <Box width={'25%'}>
                                                            <TextField
                                                                fullWidth={true}
                                                                id="outlined-select-currency"
                                                                label="Ödül"
                                                                variant="outlined"
                                                                defaultValue="Ödül bilgisi"
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
                                                            label="Turnuva Açıklama"
                                                            multiline
                                                            rows={4}
                                                            variant="outlined"
                                                            value={description}
                                                        />
                                                    </GridItem>

                                                    <GridItem xs={12} sm={12} md={3}>
                                                        <br />
                                                        <FormControl fullWidth>
                                                            <label>Bitiş Tarihi</label>
                                                            <input
                                                                type="datetime-local"
                                                                id="birthdaytime"
                                                                name="birthdaytime"
                                                                value={datetime}
                                                                onChange={(e) => setDatetime(e.target.value)}
                                                            />

                                                            {/* <Datetime
                                                                value={datetime}
                                                                onChange={handleChangeDatetime}
                                                                inputProps={{ placeholder: "Son kayıt tarihi" }}
                                                            /> */}
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
                                                    onClick={handleClickCreateTournament}
                                                >
                                                    Turnuva Oluştur
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
                                            setTournamentSelection(newSelection);
                                        }}
                                    />
                                </div>
                            </CardBody>
                            <CardFooter className={classes.cardFooter} >
                                <Button
                                    color="primary"
                                    size="lg"
                                    onClick={removeSelectedTournaments}
                                >
                                    Turnuvaları Sil
                                </Button>
                                <Button
                                    color="success"
                                    size="lg"
                                    onClick={routeSelectedTournament}
                                >
                                    Turnuvayı Gerçekleştir
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>



    );
}

export default AdminTournament;
