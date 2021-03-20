import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import TextField from '@material-ui/core/TextField';
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import AddIcon from '@material-ui/icons/Add';
import { DropzoneArea } from 'material-ui-dropzone'
import { Grid, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { DataGrid } from '@material-ui/data-grid';
import axios from "axios";
import { API_URL } from "../../../config";
import CustomInput from "components/CustomInput/CustomInput.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import PhoneIcon from '@material-ui/icons/Phone';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import YouTubeIcon from '@material-ui/icons/YouTube';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import TvIcon from '@material-ui/icons/Tv';

const useStyles = makeStyles(styles);

function AdminGeneral(props) {
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function () {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();
    const { ...rest } = props;

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarColor, setSnackbarColor] = useState("error");

    const [youtube, setYoutube] = React.useState("");
    const [facebook, setFacebook] = React.useState("");
    const [instagram, setInstagram] = React.useState("");
    const [discord, setDiscord] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [whoAreWe, setWhoAreWe] = React.useState("");
    const [twitch, setTwitch] = React.useState("");
    const [nimotv, setNimotv] = React.useState("");

    const handleClose = () => {
        setOpenSnackbar(false);
    };

    const getGeneralInfo = async () => {
        let url = `${API_URL}general/getGeneralInfo`;

        axios
            .get(url)
            .then((response) => {
                if (response.status !== 200) return;

                const result = response.data.data;
                setDiscord(result.discordUrl);
                setFacebook(result.facebookUrl);
                setInstagram(result.instagramUrl);
                setPhone(result.phone);
                setYoutube(result.youtubeUrl);
                setWhoAreWe(result.whoAreWe);
                setNimotv(result.nimotvUrl);
                setTwitch(result.twitchUrl)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        getGeneralInfo();
    }, []);

    const updateGeneralInfo = async () => {
        if (youtube.trim() === ""
            || facebook.trim() === ""
            || instagram.trim() === ""
            || discord.trim() === ""
            || phone.trim() === ""
            || whoAreWe.trim() === ""
            || twitch === ""
            || nimotv === ""
        ) {
            setSnackbarMessage("Tüm bilgiler eksiksiz doldurulmalıdır");
            setOpenSnackbar(true);
            setSnackbarColor("error");
        }

        const payload = {
            youtube,
            facebook,
            instagram,
            discord,
            phone,
            whoAreWe,
            nimotv,
            twitch
        }

        const url = `${API_URL}general/updateGeneralInfo`;

        axios
            .post(url, payload)
            .then((response) => {
                if (response.status !== 200) return;

                console.log(response);

                if (response.data.message.text[0] === "general_info_updated") {
                    setSnackbarMessage("Bilgiler başarıyla güncellendi");
                    setOpenSnackbar(true);
                    setSnackbarColor("success");
                } else {
                    setSnackbarMessage("Güncelleme yapılırken hata oluştu");
                    setOpenSnackbar(true);
                    setSnackbarColor("error");
                }
            })
            .catch((error) => {
                console.log(error);
            });

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
                        Genel Bilgiler Yönetim Paneli
                    </h2>
                </GridItem>
            </GridContainer>
            <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                        labelText="Youtube Adresi..."
                        formControlProps={{
                            fullWidth: true,
                        }}
                        inputProps={{
                            value: youtube,
                            onChange: (e) => setYoutube(e.target.value),
                            type: "text",
                            endAdornment: (
                                <InputAdornment position="end">
                                    <YouTubeIcon
                                        className={classes.inputIconsColor}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <CustomInput
                        labelText="Facebook Adresi..."
                        formControlProps={{
                            fullWidth: true,
                        }}
                        inputProps={{
                            value: facebook,
                            onChange: (e) => setFacebook(e.target.value),
                            type: "text",
                            endAdornment: (
                                <InputAdornment position="end">
                                    <FacebookIcon
                                        className={classes.inputIconsColor}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <CustomInput
                        labelText="Instagram Adresi..."
                        formControlProps={{
                            fullWidth: true,
                        }}
                        inputProps={{
                            value: instagram,
                            onChange: (e) => setInstagram(e.target.value),
                            type: "text",
                            endAdornment: (
                                <InputAdornment position="end">
                                    <InstagramIcon
                                        className={classes.inputIconsColor}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <CustomInput
                        labelText="Discord Adresi..."
                        id="username"
                        formControlProps={{
                            fullWidth: true,
                        }}
                        inputProps={{
                            value: discord,
                            onChange: (e) => setDiscord(e.target.value),
                            type: "text",
                            endAdornment: (
                                <InputAdornment position="end">
                                    <MeetingRoomIcon
                                        className={classes.inputIconsColor}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <CustomInput
                        labelText="Twitch Adresi..."
                        id="twitch"
                        formControlProps={{
                            fullWidth: true,
                        }}
                        inputProps={{
                            value: twitch,
                            onChange: (e) => setTwitch(e.target.value),
                            type: "text",
                            endAdornment: (
                                <InputAdornment position="end">
                                    <LiveTvIcon
                                        className={classes.inputIconsColor}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <CustomInput
                        labelText="Nimotv Adresi..."
                        id="twitch"
                        formControlProps={{
                            fullWidth: true,
                        }}
                        inputProps={{
                            value: nimotv,
                            onChange: (e) => setNimotv(e.target.value),
                            type: "text",
                            endAdornment: (
                                <InputAdornment position="end">
                                    <TvIcon
                                        className={classes.inputIconsColor}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <CustomInput
                        labelText="Telefon Numarası..."
                        formControlProps={{
                            fullWidth: true,
                        }}
                        inputProps={{
                            value: phone,
                            onChange: (e) => setPhone(e.target.value),
                            type: "text",
                            endAdornment: (
                                <InputAdornment position="end">
                                    <PhoneIcon
                                        className={classes.inputIconsColor}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />
                </GridItem>

                <GridItem xs={12} sm={12} md={6}>
                    <TextField
                        style={{ marginTop: '50px' }}
                        name="description"
                        fullWidth={true}
                        id="outlined-multiline-static"
                        label="Biz Kimiz ?"
                        multiline
                        rows={12}
                        defaultValue="Default Value"
                        variant="outlined"
                        onChange={(e) => setWhoAreWe(e.target.value)}
                        value={whoAreWe}
                    />
                </GridItem>
            </GridContainer>

            <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={2} style={{ marginTop: '50px' }}>
                    <Button
                        color="success"
                        block
                        onClick={updateGeneralInfo}
                    >
                        <AddIcon className={classes.icon} />
                        Güncelle
                    </Button>
                </GridItem>
            </GridContainer>
        </div>
    );
}

export default AdminGeneral;
