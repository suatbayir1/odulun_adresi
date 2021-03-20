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
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { history } from '../../../history';
import Box from '@material-ui/core/Box';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Close from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import CardHeader from "components/Card/CardHeader.js";


const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nameSurname', headerName: 'Ad Soyad', width: 200 },
    { field: 'age', headerName: 'Yaş', width: 100 },
    { field: 'email', headerName: 'Email', type: 'number', width: 200 },
    { field: 'name', headerName: 'Takım', type: 'number', width: 200 },
    { field: 'status', headerName: 'Durum', type: 'number', width: 100 },
    { field: 'phone', headerName: 'Telefon', type: 'number', width: 200 },
    { field: 'title', headerName: 'Derece', type: 'number', width: 200 },
    { field: 'numberOfWins', headerName: 'Turnuva Galibiyet', type: 'number', width: 200 },
    { field: 'numberOfSweepstakeWins', headerName: 'Çekiliş Galibiyet', type: 'number', width: 200 },
    { field: 'totalPrize', headerName: 'Toplam Ödül', type: 'number', width: 200 },
    { field: 'city', headerName: 'Şehir', type: 'number', width: 200 },
    { field: 'town', headerName: 'İlçe', type: 'number', width: 200 },
    { field: 'games', headerName: 'Oyunlar', type: 'number', width: 200 },
];

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";


function AdminUserTable(props) {
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function () {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();
    const { ...rest } = props;

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarColor, setSnackbarColor] = useState("error");
    const [userSelection, setUserSelection] = React.useState([]);
    const [files, setFiles] = React.useState([]);
    const [sweepstakeName, setSweepstakeName] = React.useState("");
    const [prize, setPrize] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [rows, setRows] = React.useState([]);
    const [filteredRows, setFilteredRows] = React.useState([]);
    const [loaded, setLoaded] = React.useState(false);
    const [name, setName] = React.useState("");
    const [openAddRemoveDialog, setOpenAddRemoveDialog] = React.useState(false);
    const [selectedUsername, setSelectedUsername] = React.useState("");
    const [scoreAmount, setScoreAmount] = React.useState(0);

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const handleChangeCity = (event) => {
        setSelectedCity(event.target.value);
        setSelectedTown([]);
        const payload = {
            "cities": event.target.value,
        };

        let url = `${API_URL}general/getMultipleTowns`;
        axios
            .post(url, payload)
            .then((response) => {
                if (response.status !== 200) return;

                setTownList(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleChangeTown = (event) => {
        setSelectedTown(event.target.value);
    }

    const [selectedCity, setSelectedCity] = React.useState([]);
    const [selectedTown, setSelectedTown] = React.useState([]);
    const [cityList, setCityList] = React.useState([]);
    const [townList, setTownList] = React.useState([]);

    const getAllCities = async () => {
        const payload = {};
        let url = `${API_URL}general/getAllCities`;
        axios
            .post(url, payload)
            .then((response) => {
                if (response.status !== 200) return;

                const cityList = [];

                response.data.data.map(item => {
                    cityList.push(item["CityName"]);
                })

                setCityList(cityList);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleClose = () => {
        setOpenSnackbar(false);
    };

    const getUserList = async () => {
        const payload = {};
        let url = `${API_URL}user/getAllUsers`;
        axios
            .post(url, payload)
            .then((response) => {
                if (response.status !== 200) return;

                setRows(response.data.data);
                setFilteredRows(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const removeSelectedUsers = async () => {
        if (userSelection.length === 0) {
            setSnackbarMessage("Lütfen önce bir kullanıcı seçin");
            setOpenSnackbar(true);
            setSnackbarColor("error");
            return;
        }

        const payload = {
            "selectedUsers": userSelection.rowIds
        };

        let url = `${API_URL}user/removeUser`;
        axios.post(url, payload)
            .then((response) => {
                if (response.status !== 200) return;

                if (response.data.message.text[0] === "removed_user") {
                    setSnackbarMessage("Seçili kullanıcılar başarıyla silindi");
                    setOpenSnackbar(true);
                    setSnackbarColor("success");
                    getUserList();
                    setUserSelection([]);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const setPassiveUser = async () => {
        if (userSelection.length === 0) {
            setSnackbarMessage("Lütfen önce bir kullanıcı seçin");
            setOpenSnackbar(true);
            setSnackbarColor("error");
            return;
        }

        const payload = {
            "selectedUsers": userSelection.rowIds
        };

        let url = `${API_URL}user/passiveUser`;
        axios.post(url, payload)
            .then((response) => {
                if (response.status !== 200) return;

                if (response.data.message.text[0] === "passive_user") {
                    setSnackbarMessage("Seçili kullanıcılar pasif hale getirildi");
                    setOpenSnackbar(true);
                    setSnackbarColor("success");
                    getUserList();
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const setActiveUser = async () => {
        if (userSelection.length === 0) {
            setSnackbarMessage("Lütfen önce bir kullanıcı seçin");
            setOpenSnackbar(true);
            setSnackbarColor("error");
            return;
        }

        const payload = {
            "selectedUsers": userSelection.rowIds
        };

        let url = `${API_URL}user/activeUser`;
        axios.post(url, payload)
            .then((response) => {
                if (response.status !== 200) return;

                if (response.data.message.text[0] === "active_user") {
                    setSnackbarMessage("Seçili kullanıcılar aktif hale getirildi");
                    setOpenSnackbar(true);
                    setSnackbarColor("success");
                    getUserList();
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const getFilterRows = () => {
        let newRows = [];

        rows.map(row => {
            if (selectedCity.includes(row["city"])) {
                if (selectedTown.length === 0) {
                    newRows = [...newRows, row];
                } else {
                    if (selectedTown.includes(row["town"])) {
                        newRows = [...newRows, row];
                    }
                }
            }
        })

        setFilteredRows(newRows);
    };

    const handleOpenAddRemoveDialog = () => {
        if (userSelection.length === 0) {
            setSnackbarMessage("Lütfen önce bir kullanıcı seçin");
            setOpenSnackbar(true);
            setSnackbarColor("error");
            return;
        }

        console.log(userSelection.rowIds);
        console.log(rows);
        let names = '';


        rows.forEach(item => {
            if (userSelection.rowIds.includes(item.id)) {
                names += item.nameSurname + ", ";
            }
        })

        setOpenAddRemoveDialog(true);
        setSelectedUsername(names);
    }

    const handleClickAddRemoveValueFromUser = () => {
        const payload = {
            "selectedUsers": userSelection.rowIds,
            "score": scoreAmount
        };

        let url = `${API_URL}user/addRemoveScore`;
        axios.post(url, payload)
            .then((response) => {
                if (response.status !== 200) return;

                console.log(response);
                if (response.data.message.text[0] === "updated") {
                    setSnackbarMessage("Seçili kullanıcıların puanları güncellendi");
                    setOpenSnackbar(true);
                    setSnackbarColor("success");
                    return;
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }


    useEffect(() => {
        if (!loaded) {
            getUserList();
            getAllCities();
            setLoaded(true);
        }

        getFilterRows();
    }, [selectedCity, selectedTown, name]);

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
                        Kullanıcılar Yönetim Paneli
                    </h2>
                </GridItem>
            </GridContainer>
            <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={12}>
                    <Card className={classes[cardAnimaton]}>
                        <form className={classes.form}>
                            <CardBody>

                                <GridContainer>
                                    {/* <GridItem xs={6} sm={6} md={3} lg={2}>
                                        <TextField
                                            fullWidth={true}
                                            id="outlined-select-currency"
                                            label="Kullanıcı Adı"
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </GridItem> */}

                                    <GridItem xs={6} sm={6} md={3} lg={2}>
                                        <FormControl className={classes.formControl} style={{ width: '100%' }}>
                                            <InputLabel id="demo-mutiple-checkbox-label">Şehir</InputLabel>
                                            <Select
                                                labelId="demo-mutiple-checkbox-label"
                                                id="demo-mutiple-checkbox"
                                                multiple
                                                value={selectedCity}
                                                onChange={handleChangeCity}
                                                input={<Input />}
                                                renderValue={(selected) => selected.join(', ')}
                                                MenuProps={MenuProps}
                                            >
                                                {cityList.map((name) => (
                                                    <MenuItem key={name} value={name}>
                                                        <Checkbox checked={selectedCity.indexOf(name) > -1} />
                                                        <ListItemText primary={name} />
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </GridItem>

                                    <GridItem xs={6} sm={6} md={3} lg={2}>
                                        <FormControl className={classes.formControl} style={{ width: '100%' }}>
                                            <InputLabel id="demo-mutiple-checkbox-label">İlçe</InputLabel>
                                            <Select
                                                labelId="demo-mutiple-checkbox-label"
                                                id="demo-mutiple-checkbox"
                                                multiple
                                                value={selectedTown}
                                                onChange={handleChangeTown}
                                                input={<Input />}
                                                renderValue={(selected) => selected.join(', ')}
                                                MenuProps={MenuProps}
                                            >
                                                {townList.map((name) => (
                                                    <MenuItem key={name} value={name}>
                                                        <Checkbox checked={selectedTown.indexOf(name) > -1} />
                                                        <ListItemText primary={name} />
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </GridItem>
                                </GridContainer>

                                <div style={{ height: 400, width: '100%', marginTop: '40px' }}>
                                    <DataGrid
                                        rows={filteredRows}
                                        columns={columns}
                                        pageSize={5}
                                        checkboxSelection
                                        onSelectionChange={(newSelection) => {
                                            setUserSelection(newSelection);
                                        }}
                                    />
                                </div>
                            </CardBody>
                            <CardFooter className={classes.cardFooter} >
                                <Button
                                    color="danger"
                                    size="lg"
                                    onClick={removeSelectedUsers}
                                >
                                    <DeleteForeverIcon></DeleteForeverIcon>
                                    Kullanıcıları Sil
                                </Button>
                                <Button
                                    color="info"
                                    size="lg"
                                    onClick={setPassiveUser}
                                >
                                    <ThumbDownIcon></ThumbDownIcon>
                                    Pasif yap
                                </Button>
                                <Button
                                    color="success"
                                    size="lg"
                                    onClick={setActiveUser}
                                >
                                    <ThumbUpIcon></ThumbUpIcon>
                                    Aktif yap
                                </Button>
                                <Button
                                    color="warning"
                                    size="lg"
                                    onClick={() => { handleOpenAddRemoveDialog() }}
                                >
                                    <AddIcon /> / <RemoveIcon />
                                    Puan ekle / çıkar
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </GridItem>

                <Dialog
                    classes={{
                        root: classes.center,
                        paper: classes.modal
                    }}
                    open={openAddRemoveDialog}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => setOpenAddRemoveDialog(false)}
                    aria-labelledby="classic-modal-slide-title"
                    aria-describedby="classic-modal-slide-description"
                    fullWidth={true}
                    maxWidth={'lg'}
                >
                    <DialogTitle
                        disableTypography
                        className={classes.modalHeader}
                    >
                        <Box display="flex">
                            <Box width="95%">
                                <h4 className={classes.modalTitle}>Puan Ekle / Çıkar</h4>
                            </Box>
                            <Box>
                                <IconButton
                                    className={classes.modalCloseButton}
                                    key="close"
                                    aria-label="Close"
                                    color="inherit"
                                    onClick={() => setOpenAddRemoveDialog(false)}
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
                                            <h4>Puan Ekle / Çıkar</h4>
                                        </CardHeader>
                                        <CardBody>

                                            <GridContainer>
                                                <GridItem xs={12} sm={12} md={6}>
                                                    <TextField
                                                        name="description"
                                                        fullWidth={true}
                                                        id="outlined-multiline-static"
                                                        label="Seçili Kullanıcılar"
                                                        multiline
                                                        rows={4}
                                                        variant="outlined"
                                                        value={selectedUsername}
                                                    />
                                                </GridItem>

                                                <GridItem xs={12} sm={12} md={4}>
                                                    <TextField
                                                        onChange={(e) => setScoreAmount(e.target.value)}
                                                        name="description"
                                                        fullWidth={true}
                                                        label="Puan Miktarı"
                                                        variant="outlined"
                                                        value={scoreAmount}
                                                        type="number"
                                                    />
                                                </GridItem>
                                            </GridContainer>


                                        </CardBody>
                                        <CardFooter className={classes.cardFooter}>
                                            <Button
                                                color="success"
                                                size="md"
                                                onClick={(e) => { handleClickAddRemoveValueFromUser(e.target.value) }}
                                            >
                                                Onayla
                                            </Button>
                                        </CardFooter>
                                    </form>
                                </Card>
                            </GridItem>
                        </GridContainer>
                    </DialogContent>
                </Dialog>
            </GridContainer>
        </div>



    );
}

export default AdminUserTable;
