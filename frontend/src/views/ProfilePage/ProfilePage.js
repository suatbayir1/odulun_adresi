import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
import Card from "../../components/Card/Card";
import InfoIcon from '@material-ui/icons/Info';
import StarsIcon from '@material-ui/icons/Stars';
import TextField from '@material-ui/core/TextField';
import {
  Box,
  CardContent,
  IconButton,
  Typography,
} from "@material-ui/core";
import CountUp from "react-countup";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import People from "@material-ui/icons/People";
import CakeIcon from "@material-ui/icons/Cake";
import PhoneIcon from "@material-ui/icons/Phone";
import Email from "@material-ui/icons/Email";
import { Snackbar } from "@material-ui/core";
import UpdateIcon from '@material-ui/icons/Update';
import MuiAlert from "@material-ui/lab/Alert";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import LockIcon from '@material-ui/icons/Lock';
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import AddIcon from '@material-ui/icons/Add';
import GroupIcon from '@material-ui/icons/Group';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import axios from "axios";
import { API_URL } from '../../config'
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import { connect } from "react-redux";
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import {
  fetchGetUserInfo,
  fetchUpdateUser,
  fetchChangePassword,
  fetchGetFoundTeam,
  fetchRegisterToTeam,
  fetchCreateTeam
} from "../../redux";


import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'nameSurname', headerName: 'Takım Kurucusu', width: 200 },
  { field: 'name', headerName: 'Takım Adı', width: 200 },
  { field: 'memberCountOfUser', headerName: 'Üye Sayısı', width: 100 },
  { field: 'rank', headerName: 'Derece', type: 'number', width: 100 },
];

const useStyles = makeStyles(styles);

function ProfilePage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);


  const [isMounted, setIsMounted] = useState(false);
  const [nameSurname, setNameSurname] = useState("");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isClickedUpdate, setIsClickedUpdate] = useState(false);
  const [isClickedRegister, setIsClickedRegister] = useState(false);
  const [isClickCreateTeam, setIsClickCreateTeam] = useState(false);
  const [phone, setPhone] = useState(0);
  const [createTeamName, setCreateTeamName] = useState("");
  const [aboutUser, setAboutUser] = useState("");

  const [previousPassword, setPreviousPassowrd] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarColor, setSnackbarColor] = useState("error");

  const [teamSelection, setTeamSelection] = useState([]);

  const [teamRequests, setTeamRequests] = useState([]);

  const [rank, setRank] = useState("");
  const [rankColor, setRankColor] = useState("");

  const handleClose = () => {
    setOpenSnackbar(false);
  };

  const handleOnChangeInput = (e) => {
    switch (e.target.name) {
      case "nameSurname":
        setNameSurname(e.target.value);
        break;
      case "age":
        setAge(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "username":
        setUsername(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "phone":
        setPhone(e.target.value);
        break;
      case "previousPassword":
        setPreviousPassowrd(e.target.value);
        break;
      case "newPassword":
        setNewPassword(e.target.value);
        break;
      case "repeatNewPassword":
        setRepeatNewPassword(e.target.value);
        break;
      case "createTeamName":
        setCreateTeamName(e.target.value);
        break;
    }
  };

  const handleCreateNewTeam = () => {
    if (createTeamName.trim() === "") {
      setSnackbarMessage("Lütfen önce bir takım adı girin");
      setOpenSnackbar(true);
      setSnackbarColor("error");
      return;
    }

    const payload = {
      "createdUser": props.userInfo.id,
      "teamName": createTeamName
    };

    props.fetchCreateTeam(payload);
    setIsClickCreateTeam(true);
    props.fetchGetFoundTeam();
  }

  const handleRegisterToTeam = () => {
    if (teamSelection.rowIds === undefined) {
      setSnackbarMessage("Lütfen önce takım seçin");
      setOpenSnackbar(true);
      setSnackbarColor("error");
      return;
    }

    if (teamSelection.rowIds.length !== 1) {
      setSnackbarMessage("Lütfen sadece bir takım seçin");
      setOpenSnackbar(true);
      setSnackbarColor("error");
      return;
    }

    const payload = {
      "userId": props.userInfo.id,
      "teamId": teamSelection.rowIds[0]
    }

    props.fetchRegisterToTeam(payload);
    setIsClickedRegister(true);
    props.fetchGetFoundTeam();
  }

  const handleChangePassword = async () => {
    if (previousPassword.trim() === "" && newPassword.trim() === "" && repeatNewPassword.trim() === "") {
      setSnackbarMessage("Lütfen formu eksiksiz doldurunuz");
      setOpenSnackbar(true);
      setSnackbarColor("error");
      return;
    }

    if (newPassword !== repeatNewPassword) {
      setSnackbarMessage("Yeni şifre ve tekrarı uyuşmuyor");
      setOpenSnackbar(true);
      setSnackbarColor("error");
      return;
    }

    const payload = {
      "username": window.localStorage.getItem("username"),
      "previousPassword": previousPassword,
      "newPassword": newPassword,
      "repeatNewPassword": repeatNewPassword,
    }

    props.fetchChangePassword(payload);
  }

  const handleUpdateClick = async () => {
    const payload = {
      "username": window.localStorage.getItem("username"),
      "nameSurname": nameSurname,
      "age": age,
      "email": email,
      "phone": phone,
      "about": aboutUser
    }

    await props.fetchUpdateUser(payload);
    setIsMounted(false);
    setIsClickedUpdate(true);
  };

  const handleUserMessage = () => {
    if (props.updateUserMessage === "update_user_successfully") {
      setSnackbarMessage("Kullanıcı başarılı bir şekilde güncellendi");
      setOpenSnackbar(true);
      setSnackbarColor("success");
    } else if (props.updateUserMessage === "user_could_not_be_updated") {
      setSnackbarMessage("Kullanıcı güncellenirken bir hata oluştu");
      setOpenSnackbar(true);
      setSnackbarColor("error");
    }
  };

  const logoutFromTeam = async () => {
    if (props.userInfo.teamId === null || props.userInfo.teamId.trim() === "") {
      setSnackbarMessage("Bir takıma üye değilsiniz");
      setOpenSnackbar(true);
      setSnackbarColor("error");
      return
    }

    const payload = {
      "userId": props.userInfo.id,
      "teamId": props.userInfo.teamId
    };

    let url = `${API_URL}team/logoutFromTeam`;
    axios
      .post(url, payload)
      .then((response) => {
        if (response.status !== 200) return;

        if (response.data.message.text[0] === "user_not_member") {
          setSnackbarMessage("Bir takıma üye değilsiniz");
          setOpenSnackbar(true);
          setSnackbarColor("error");
        } else {
          setSnackbarMessage("Takımdan başarıyla çıktınız");
          setOpenSnackbar(true);
          setSnackbarColor("success");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const getTeamRegisterRequests = async () => {
    const payload = {
      "userId": props.userInfo.id,
      "teamId": props.userInfo.teamId,
    };

    let url = `${API_URL}team/getTeamRequest`;
    axios
      .post(url, payload)
      .then((response) => {
        if (response.status !== 200) return;

        setTeamRequests(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const getChampionUser = () => {
    let url = `${API_URL}user/getChampionUser`;
    axios.post(url)
      .then((response) => {
        if (response.data.data.id === props.userInfo.id) {
          setRank("Şampiyon");
          setRankColor("#EE1C25");
        }
      })
      .catch(error => {
        console.log(error);
      })
  };

  useEffect(() => {
    if (props.userInfo !== undefined && props.userInfo["title"] !== null) {
      if (props.userInfo["title"] < 100) {
        setRank("Demir");
        setRankColor("#cd7f32");
      } else if (props.userInfo["title"] >= 100 && props.userInfo["title"] < 500) {
        setRank("Bron");
        setRankColor("#aaa9ad");
      } else if (props.userInfo["title"] >= 500 && props.userInfo["title"] < 2000) {
        setRank("Gümüş");
        setRankColor("#FFD700");
      } else if (props.userInfo["title"] >= 2000 && props.userInfo["title"] < 10000) {
        setRank("Altın");
        setRankColor("#a0b2c6");
      } else if (props.userInfo["title"]) {
        setRank("Elmas");
        setRankColor("#b9f2ff");
      }
    }

    getTeamRegisterRequests();
    getChampionUser();

    if (!isMounted) {
      props.fetchGetFoundTeam();

      props.fetchGetUserInfo({
        "username": window.localStorage.getItem("username")
      });
      setIsMounted(true);
    }

    setNameSurname(props.userInfo["nameSurname"]);
    setAge(props.userInfo["age"]);
    setEmail(props.userInfo["email"]);
    setPhone(props.userInfo["phone"]);
    setAboutUser(props.userInfo["about"]);

    if (isClickedUpdate) {
      handleUserMessage();
      setIsClickedUpdate(false);
    }

    if (isClickedRegister) {
      setIsClickedRegister(false);
      if (props.registerToTeamMessage === "register_team_request_added") {
        setSnackbarMessage("Takıma kayıt olma isteğiniz alındı. Takım kurucusu kabul ederse takıma kayıt olacaksınız");
        setOpenSnackbar(true);
        setSnackbarColor("success");
      } else if (props.registerToTeamMessage === "user_already_request") {
        setSnackbarMessage("Bu takıma zaten kayıt olma isteği gönderdiniz");
        setOpenSnackbar(true);
        setSnackbarColor("error");
      } else if (props.registerToTeamMessage === "user_already_registered_team") {
        setSnackbarMessage("Zaten bir takıma üyesiniz. Lütfen önce üye olduğunuz takımdan çıkın");
        setOpenSnackbar(true);
        setSnackbarColor("error");
      }
    }

    if (isClickCreateTeam) {
      setIsClickCreateTeam(false);
      if (props.createTeamMessage === "team_created") {
        setSnackbarMessage("Takım başarıyla oluşturuldu");
        setOpenSnackbar(true);
        setSnackbarColor("success");
      } else if (props.createTeamMessage === "team_name_already_exists") {
        setSnackbarMessage("Bu isme sahip bir takım zaten mevcut");
        setOpenSnackbar(true);
        setSnackbarColor("error");
      } else if (props.createTeamMessage === "user_already_registered_team") {
        setSnackbarMessage("Zaten bir takıma üyesiniz");
        setOpenSnackbar(true);
        setSnackbarColor("error");
      }
    }
    return () => {
    }
  }, [
    props.userInfo,
    props.updateUserMessage,
    props.updateUserClick,
    props.registerToTeamMessage,
    props.registerToTeamClick,
    props.createTeamMessage,
    props.createTeamClick
  ]);

  const rejectTeamRegisterRequest = (row) => {
    let url = `${API_URL}team/deleteTeamRegisterRequest`;
    axios.post(url, row)
      .then((response) => {
        if (response.data.message.text[0] === "record_deleted") {
          setSnackbarMessage("Takım isteği reddedildi");
          setOpenSnackbar(true);
          setSnackbarColor("success");
          getTeamRegisterRequests();
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  const acceptTeamRegisterRequest = (row) => {
    let url = `${API_URL}team/acceptTeamRegisterRequest`;
    axios.post(url, row)
      .then((response) => {
        if (response.data.message.text[0] === "request_accepted") {
          setSnackbarMessage("Takım isteği kabul edildi");
          setOpenSnackbar(true);
          setSnackbarColor("success");
          getTeamRegisterRequests();
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  const onChange = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('filename', `${window.localStorage.getItem("username")}_profile.${e.target.files[0]["name"].split(".").pop()}`);
    formData.append('image', e.target.files[0]);
    formData.append('username', window.localStorage.getItem("username"));

    var headers = {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*"
    }

    let url = `${API_URL}user/changeUserProfileImage`;
    axios.post(url, formData, headers)
      .then(function (response) {
        if (response.data.message.text[0] === "image_changed") {
          setSnackbarMessage("Profil resmi değiştirildi");
          setOpenSnackbar(true);
          setSnackbarColor("success");
          props.fetchGetUserInfo({
            "username": window.localStorage.getItem("username")
          });
        }
      })
      .catch(function (response) {
        console.log(response)
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
      <Header
        color="transparent"
        brand="Ödülün Adresi"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white"
        }}
        {...rest}
      />
      <Parallax small filter image={require("assets/img/background.jpeg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img src={props.userInfo.image !== null ? `images/${props.userInfo.image}` : 'images/profile_default.jpeg'} alt="..." className={imageClasses} style={{ border: `5px solid ${rankColor}` }} />
                    {/* <img src={require(`../../../build/images/${props.userInfo.image}`)} alt="..." className={imageClasses} style={{ border: `5px solid ${rankColor}` }} /> */}
                    <IconButton
                      style={{ marginLeft: '-60px' }}
                    >

                      <input type="file" id="upload" onChange={onChange} hidden accept=".jpg,.jpeg,.png" />
                      <label for="upload">
                        <CameraAltIcon
                          color={"secondary"}
                          style={{ height: "40px", fontSize: "40px", }}
                        />
                      </label>
                    </IconButton>
                  </div>
                  <div style={{ marginTop: '-70px' }}>
                    <h3>{window.localStorage.getItem("username")}</h3>
                    <h4>{props.userInfo["nameSurname"]}</h4>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <GroupIcon style={{ marginTop: '11px', marginRight: '5px' }} />
                      <h4> {props.userInfo["teamName"] !== null ? props.userInfo["teamName"] : "Takım Yok"}</h4>
                    </div>

                    <div>
                      <StarsIcon style={{ fontSize: '50px' }} />
                      <h5> {rank} - {props.userInfo["title"]} </h5>
                    </div>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <div className={classes.description}>
              {
                props.userInfo["about"] === "" ? (
                  <p>
                    Bu sayfa size ait kişisel profil sayfasıdır. Aşağıdaki butonları kullanarak
                    şimdiye kadar kazandığınız turnuvalar ve çekilişler hakkında özet görüntüleyebilir,
                  bilgilerinizi güncelleyebilir ve yeni bir ekibe üye olabilirsiniz{" "}
                  </p>
                ) : (
                    <p>{props.userInfo["about"]}</p>
                  )
              }

            </div>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                <NavPills
                  alignCenter
                  color="primary"
                  tabs={[
                    {
                      tabButton: "ÖZET",
                      tabIcon: InfoIcon,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={4}>
                            <Card
                              className={classes.root}
                              variant="outlined"
                              style={{ textAlign: "center", border: "2px solid #388e3c" }}
                            >
                              <CardContent>
                                <Typography variant="body2" component="p">
                                  <IconButton>
                                    <MonetizationOnIcon
                                      style={{
                                        height: "60px",
                                        fontSize: "60px",
                                        color: "#388e3c",
                                      }}
                                    />
                                  </IconButton>
                                </Typography>
                                <Typography>
                                  <CountUp
                                    start={1}
                                    end={Number(props.userInfo["totalPrize"])}
                                    suffix={" TL"}
                                    duration={5}
                                    style={{ fontSize: "30px" }}
                                  />
                                </Typography>
                                <Typography
                                  className={classes.title}
                                  color="textSecondary"
                                  gutterBottom
                                >
                                  Ödül kazandınız
                                </Typography>
                              </CardContent>
                            </Card>
                          </GridItem>

                          <GridItem xs={12} sm={12} md={4}>
                            <Card
                              className={classes.root}
                              variant="outlined"
                              style={{ textAlign: "center", border: "2px solid #f50057" }}
                            >
                              <CardContent>
                                <Typography variant="body2" component="p">
                                  <IconButton>
                                    <SportsEsportsIcon
                                      color={"secondary"}
                                      style={{ height: "60px", fontSize: "60px" }}
                                    />
                                  </IconButton>
                                </Typography>
                                <Typography>
                                  <CountUp
                                    start={1}
                                    end={Number(props.userInfo["numberOfWins"])}
                                    duration={5}
                                    style={{ fontSize: "30px" }}
                                  />
                                </Typography>
                                <Typography
                                  className={classes.title}
                                  color="textSecondary"
                                  gutterBottom
                                >
                                  Turnuva kazandınız
                                </Typography>
                              </CardContent>
                            </Card>
                          </GridItem>

                          <GridItem xs={12} sm={12} md={4}>
                            <Card
                              className={classes.root}
                              variant="outlined"
                              style={{ textAlign: "center", border: "2px solid #00acc1" }}
                            >
                              <CardContent>
                                <Typography variant="body2" component="p">
                                  <IconButton>
                                    <CardGiftcardIcon
                                      style={{
                                        height: "60px",
                                        fontSize: "60px",
                                        color: "#00acc1",
                                      }}
                                    />
                                  </IconButton>
                                </Typography>
                                <Typography>
                                  <CountUp
                                    start={1}
                                    end={Number(props.userInfo["numberOfSweepstakeWins"])}
                                    duration={5}
                                    style={{ fontSize: "30px" }}
                                  />
                                </Typography>
                                <Typography
                                  className={classes.title}
                                  color="textSecondary"
                                  gutterBottom
                                >
                                  Çekiliş kazandınız
                                </Typography>
                              </CardContent>
                            </Card>
                          </GridItem>
                        </GridContainer>
                      )
                    },
                    {
                      tabButton: "Güncelle",
                      tabIcon: UpdateIcon,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={8}>
                            <Card className={classes[cardAnimaton]}>
                              <form className={classes.form}>
                                <CardBody>
                                  <CustomInput
                                    labelText="Ad Soyad..."
                                    id="nameSurname"
                                    formControlProps={{
                                      fullWidth: true,
                                    }}
                                    inputProps={{
                                      onChange: (e) => handleOnChangeInput(e),
                                      name: "nameSurname",
                                      type: "text",
                                      value: nameSurname,
                                      endAdornment: (
                                        <InputAdornment position="end">
                                          <People className={classes.inputIconsColor} />
                                        </InputAdornment>
                                      ),
                                    }}
                                  />
                                  <CustomInput
                                    labelText="Yaş..."
                                    id="age"
                                    formControlProps={{
                                      fullWidth: true,
                                    }}
                                    inputProps={{
                                      onChange: (e) => handleOnChangeInput(e),
                                      name: "age",
                                      type: "number",
                                      value: age,
                                      endAdornment: (
                                        <InputAdornment position="end">
                                          <CakeIcon className={classes.inputIconsColor} />
                                        </InputAdornment>
                                      ),
                                    }}
                                  />
                                  <CustomInput
                                    labelText="Email..."
                                    id="email"
                                    formControlProps={{
                                      fullWidth: true,
                                    }}
                                    inputProps={{
                                      onChange: (e) => handleOnChangeInput(e),
                                      name: "email",
                                      type: "email",
                                      value: email,
                                      endAdornment: (
                                        <InputAdornment position="end">
                                          <Email className={classes.inputIconsColor} />
                                        </InputAdornment>
                                      ),
                                    }}
                                  />
                                  <CustomInput
                                    labelText="Telefon..."
                                    id="pass"
                                    formControlProps={{
                                      fullWidth: true,
                                    }}
                                    inputProps={{
                                      onChange: (e) => handleOnChangeInput(e),
                                      name: "phone",
                                      type: "number",
                                      value: phone,
                                      endAdornment: (
                                        <InputAdornment position="end">
                                          <PhoneIcon className={classes.inputIconsColor} />
                                        </InputAdornment>
                                      ),
                                      autoComplete: "off",
                                    }}
                                  />
                                  <TextField
                                    onChange={(e) => setAboutUser(e.target.value)}
                                    name="description"
                                    fullWidth={true}
                                    id="outlined-multiline-static"
                                    label="Hakkımda"
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    value={aboutUser}
                                  />
                                </CardBody>
                                <CardFooter className={classes.cardFooter} >
                                  <Button
                                    color="primary"
                                    size="lg"
                                    onClick={handleUpdateClick}
                                    style={{ marginLeft: 'auto', marginRight: 'auto' }}
                                  >
                                    Güncelle
                                </Button>
                                </CardFooter>
                              </form>
                            </Card>
                          </GridItem>
                        </GridContainer>
                      )
                    },
                    {
                      tabButton: "Şifre Değiştir",
                      tabIcon: VpnKeyIcon,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={8}>
                            <Card className={classes[cardAnimaton]}>
                              <form className={classes.form}>
                                <CardBody>
                                  <CustomInput
                                    labelText="Eski Şifre..."
                                    id="previousPassword"
                                    formControlProps={{
                                      fullWidth: true,
                                    }}
                                    inputProps={{
                                      onChange: (e) => handleOnChangeInput(e),
                                      name: "previousPassword",
                                      type: "password",
                                      endAdornment: (
                                        <InputAdornment position="end">
                                          <LockIcon className={classes.inputIconsColor} />
                                        </InputAdornment>
                                      ),
                                      autoComplete: "off",
                                    }}
                                  />
                                  <CustomInput
                                    labelText="Yeni Şifre..."
                                    id="newPassword"
                                    formControlProps={{
                                      fullWidth: true,
                                    }}
                                    inputProps={{
                                      onChange: (e) => handleOnChangeInput(e),
                                      name: "newPassword",
                                      type: "password",
                                      endAdornment: (
                                        <InputAdornment position="end">
                                          <LockIcon className={classes.inputIconsColor} />
                                        </InputAdornment>
                                      ),
                                      autoComplete: "off",
                                    }}
                                  />
                                  <CustomInput
                                    labelText="Yeni Şifre Tekrar..."
                                    id="repeatNewPassword"
                                    formControlProps={{
                                      fullWidth: true,
                                    }}
                                    inputProps={{
                                      onChange: (e) => handleOnChangeInput(e),
                                      name: "repeatNewPassword",
                                      type: "password",
                                      endAdornment: (
                                        <InputAdornment position="end">
                                          <LockIcon className={classes.inputIconsColor} />
                                        </InputAdornment>
                                      ),
                                      autoComplete: "off",
                                    }}
                                  />
                                </CardBody>
                                <CardFooter className={classes.cardFooter} >
                                  <Button
                                    color="primary"
                                    size="lg"
                                    onClick={handleChangePassword}
                                    style={{ marginLeft: 'auto', marginRight: 'auto' }}
                                  >
                                    Şifre Değiştir
                                </Button>
                                </CardFooter>
                              </form>
                            </Card>
                          </GridItem>
                        </GridContainer>
                      )
                    },
                    {
                      tabButton: "Takım Bul",
                      tabIcon: GroupWorkIcon,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={12}>
                            <Card className={classes[cardAnimaton]}>
                              <form className={classes.form}>
                                <CardBody>
                                  <div style={{ height: 400, width: '100%' }}>
                                    <DataGrid
                                      rows={props.foundTeamList}
                                      columns={columns}
                                      pageSize={5}
                                      checkboxSelection
                                      onSelectionChange={(newSelection) => {
                                        setTeamSelection(newSelection);
                                      }}
                                    />
                                  </div>
                                </CardBody>
                                <CardFooter className={classes.cardFooter} >
                                  <Button
                                    color="primary"
                                    size="lg"
                                    style={{ marginLeft: 'auto', marginRight: 'auto' }}
                                    onClick={handleRegisterToTeam}
                                  >
                                    Takıma Kaydol
                                </Button>
                                </CardFooter>
                              </form>
                            </Card>
                          </GridItem>
                        </GridContainer>
                      )
                    },
                    {
                      tabButton: "Takım Oluştur",
                      tabIcon: AddIcon,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={8}>
                            <Card className={classes[cardAnimaton]}>
                              <form className={classes.form}>
                                <CardBody>
                                  <CustomInput
                                    labelText="Takım İsmi..."
                                    id="createTeamName"
                                    formControlProps={{
                                      fullWidth: true,
                                    }}
                                    inputProps={{
                                      onChange: (e) => handleOnChangeInput(e),
                                      name: "createTeamName",
                                      type: "text",
                                      endAdornment: (
                                        <InputAdornment position="end">
                                          <LockIcon className={classes.inputIconsColor} />
                                        </InputAdornment>
                                      ),
                                      autoComplete: "off",
                                    }}
                                  />
                                </CardBody>
                                <CardFooter className={classes.cardFooter} >
                                  <Button
                                    color="primary"
                                    size="lg"
                                    onClick={handleCreateNewTeam}
                                    style={{ marginLeft: 'auto', marginRight: 'auto' }}
                                  >
                                    Takım Oluştur
                                </Button>
                                </CardFooter>
                              </form>
                            </Card>
                          </GridItem>
                        </GridContainer>
                      )
                    },
                    {
                      tabButton: "Takımdan Çık",
                      tabIcon: DeleteForeverIcon,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={8}>
                            <Card className={classes[cardAnimaton]}>
                              <form className={classes.form}>
                                <CardFooter className={classes.cardFooter} >
                                  <Button
                                    color="primary"
                                    size="lg"
                                    onClick={logoutFromTeam}
                                    style={{ marginLeft: 'auto', marginRight: 'auto' }}
                                  >
                                    Takımdan Çık
                                  </Button>
                                </CardFooter>
                              </form>
                            </Card>
                          </GridItem>
                        </GridContainer>
                      )
                    },
                    {
                      tabButton: "Bildirimler",
                      tabIcon: NotificationsActiveIcon,
                      tabContent: (
                        <GridContainer justify="center">
                          {
                            teamRequests.length > 0 ? (
                              <GridItem xs={12} sm={12} md={12}>
                                <Card className={classes[cardAnimaton]}>
                                  <h4>Takımınıza Kayıt Olmak İsteyenler</h4>
                                  <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="simple table">
                                      <TableHead>
                                        <TableRow>
                                          <TableCell>Adı Soyadı</TableCell>
                                          <TableCell align="right">Yaş</TableCell>
                                          <TableCell align="right">Derece</TableCell>
                                          <TableCell align="right">Zafer Sayısı</TableCell>
                                          <TableCell align="right"></TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        {teamRequests.map((row) => (
                                          <TableRow key={row.id}>
                                            <TableCell component="th" scope="row">
                                              {row["nameSurname"]}
                                            </TableCell>
                                            <TableCell align="right">{row["age"]}</TableCell>
                                            <TableCell align="right">{row["rank"]}</TableCell>
                                            <TableCell align="right">{row["numberOfWins"]}</TableCell>
                                            <TableCell align="right">
                                              <IconButton aria-label="delete" color="secondary" onClick={() => rejectTeamRegisterRequest(row)}>
                                                <DeleteIcon />
                                              </IconButton>
                                              <IconButton aria-label="delete" style={{ color: 'green' }} onClick={() => acceptTeamRegisterRequest(row)}>
                                                <CheckIcon />
                                              </IconButton>
                                            </TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                </Card>
                              </GridItem>
                            ) :
                              <h3>
                                Herhangi bir bildiriminiz yok
                              </h3>
                          }
                        </GridContainer>
                      )
                    }
                  ]}
                />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
    updateUserMessage: state.user.updateUserMessage,
    updateUserClick: state.user.updateUserClick,
    foundTeamList: state.team.foundTeamList,
    registerToTeamClick: state.team.registerToTeamClick,
    registerToTeamMessage: state.team.registerToTeamMessage,
    createTeamMessage: state.team.createTeamMessage,
    createTeamClick: state.team.createTeamClick,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGetUserInfo: (payload) => dispatch(fetchGetUserInfo(payload)),
    fetchUpdateUser: (payload) => dispatch(fetchUpdateUser(payload)),
    fetchChangePassword: (payload) => dispatch(fetchChangePassword(payload)),
    fetchGetFoundTeam: () => dispatch(fetchGetFoundTeam()),
    fetchRegisterToTeam: (payload) => dispatch(fetchRegisterToTeam(payload)),
    fetchCreateTeam: (payload) => dispatch(fetchCreateTeam(payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);