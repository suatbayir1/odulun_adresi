import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import CakeIcon from "@material-ui/icons/Cake";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import PhoneIcon from "@material-ui/icons/Phone";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
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
import { fetchSignup } from "../../redux";
import { connect } from "react-redux";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from "axios";
import { API_URL } from "config";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import image from "assets/img/bg7.jpg";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(styles);

function SignupPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  const [nameSurname, setNameSurname] = useState("");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(0);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarColor, setSnackbarColor] = useState("error");

  const [selectedCity, setSelectedCity] = React.useState("");
  const [selectedTown, setSelectedTown] = React.useState("");

  const [cityList, setCityList] = React.useState([]);
  const [townList, setTownList] = React.useState([]);
  const [isClicked, setIsClicked] = React.useState(false);

  const [selectedGames, setSelectedGames] = React.useState([]);
  const [gamesList, setGamesList] = React.useState(["Wild Rift", "Pubg Mobile", "Brawl Stars", "Mobile Legends", "Free Fire", "Kafa Topu", "Lol", "Valorant", "Fifa", "Pes"]);

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
    }
  };

  const handleSignupClick = async () => {
    if (nameSurname === "" || age === 0 || email === "" || username === "" || password === "" || phone === 0 || selectedCity === "" || selectedTown === "") {
      setSnackbarMessage("Lütfen formu eksiksiz doldurun.");
      setOpenSnackbar(true);
      setSnackbarColor("error");
      return;
    }

    const payload = {
      nameSurname: nameSurname,
      age: age,
      email: email,
      username: username,
      password: password,
      phone: phone,
      city: selectedCity.CityName,
      town: selectedTown.TownName,
      games: selectedGames.join(),
    };

    setIsClicked(true);

    await props.fetchSignup(payload);

    await handleUserMessage();
  };

  const handleUserMessage = () => {
    if (props.signupMessage === "user_saved_successfully") {
      setSnackbarMessage("Kullanıcı başarılı bir şekilde eklendi");
      setOpenSnackbar(true);
      setSnackbarColor("success");

    } else if (props.signupMessage === "empty_username_password") {
      setSnackbarMessage("Kullanıcı adı ve şifre boş bırakılamaz");
      setOpenSnackbar(true);
      setSnackbarColor("error");
    } else if (props.signupMessage === "user_already_exists") {
      setSnackbarMessage("Bu isme sahip bir kullanıcı zaten var");
      setOpenSnackbar(true);
      setSnackbarColor("error");
    } else if (props.signupMessage === "empty_city_town") {
      setSnackbarMessage("Lütfen il ve ilçe seçiniz");
      setOpenSnackbar(true);
      setSnackbarColor("error");
    }
  };

  const handleChangeCity = (newValue) => {
    if (newValue === null) {
      return;
    }

    setSelectedCity(newValue);

    const payload = {
      "cityId": newValue.CityID
    }

    let url = `${API_URL}general/getTowns`;
    axios
      .post(url, payload)
      .then((response) => {
        if (response.status !== 200) return;
        setTownList(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const getAllCities = () => {
    let url = `${API_URL}general/getAllCities`;
    axios
      .get(url)
      .then((response) => {
        if (response.status !== 200) return;
        setCityList(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (isClicked) {
      handleUserMessage();
    }
    getAllCities();
  }, [props.isSaved, props.signupMessage]);

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
        {/*<Snackbar*/}
        {/*  anchorOrigin={{ vertical: "top", horizontal: "right" }}*/}
        {/*  open={openSnackbar}*/}
        {/*  onClose={handleClose}*/}
        {/*  autoHideDuration={5000}*/}
        {/*  message={snackbarMessage}*/}
        {/*  action={*/}
        {/*    <React.Fragment>*/}
        {/*      <IconButton*/}
        {/*        size="small"*/}
        {/*        aria-label="close"*/}
        {/*        color="inherit"*/}
        {/*        onClick={handleClose}*/}
        {/*      >*/}
        {/*        <CloseIcon fontSize="small" />*/}
        {/*      </IconButton>*/}
        {/*    </React.Fragment>*/}
        {/*  }*/}
        {/*>*/}
        {/*  <MuiAlert elevation={6} variant="filled" />*/}
        {/*</Snackbar>*/}

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
            severity={snackbarColor}
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
                    <h4>Kayıt Ol</h4>
                  </CardHeader>
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
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
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
                        endAdornment: (
                          <InputAdornment position="end">
                            <PhoneIcon className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
                    />
                    <Autocomplete
                      id="combo-box-demo"
                      value={selectedCity}
                      onChange={(event, newValue) => {
                        handleChangeCity(newValue);
                      }}
                      options={cityList}
                      getOptionLabel={(option) => option.CityName}
                      style={{ width: '100%' }}
                      renderInput={(params) => <TextField {...params} label="İl Seçiniz.." />}
                    />
                    <Autocomplete
                      id="combo-box-demo"
                      value={selectedTown}
                      onChange={(event, newValue) => {
                        setSelectedTown(newValue);
                      }}
                      options={townList}
                      getOptionLabel={(option) => option.TownName}
                      style={{ width: '100%', marginTop: '20px' }}
                      renderInput={(params) => <TextField {...params} label="İlçe Seçiniz.." />}
                    />

                    <FormControl className={classes.formControl} style={{ width: '100%', marginTop: '20px' }}>
                      <InputLabel id="demo-mutiple-checkbox-label">Oynadığınız Oyunlar</InputLabel>
                      <Select
                        labelId="demo-mutiple-checkbox-label"
                        id="demo-mutiple-checkbox"
                        multiple
                        value={selectedGames}
                        onChange={(e) => setSelectedGames(e.target.value)}
                        input={<Input />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                      >
                        {gamesList.map((name) => (
                          <MenuItem key={name} value={name}>
                            <Checkbox checked={selectedGames.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button
                      simple
                      color="primary"
                      size="lg"
                      onClick={handleSignupClick}
                    >
                      Kayıt Ol
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
    isSaved: state.authentication.isSaved,
    signupMessage: state.authentication.signupMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSignup: (payload) => dispatch(fetchSignup(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
