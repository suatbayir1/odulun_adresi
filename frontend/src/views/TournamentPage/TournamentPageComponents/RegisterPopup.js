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
import NavPills from "components/NavPills/NavPills.js";
import InfoIcon from '@material-ui/icons/Info';
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import People from "@material-ui/icons/People";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import GridItem from "components/Grid/GridItem.js";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { fetchRegisterToTournament, fetchGetUnfilledTeamList, fetchTournamentList } from "../../../redux"
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography component={'span'} variant={'body2'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(styles);

function RegisterPopup(props) {
  const classes = useStyles();

  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [nickname, setNickname] = React.useState("");
  const [selectedTeam, setSelectedTeam] = React.useState("default");
  const [memberTeamNickname, setMemberTeamNickname] = React.useState("");
  const [newTeamNickname, setNewTeamNickname] = React.useState("");
  const [newTeamTeamName, setNewTeamTeamName] = React.useState("");

  const [value, setValue] = React.useState(0);
  const [isClickedRequest, setIsClickedRequest] = React.useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarColor, setSnackbarColor] = useState("error");

  const handleClose = () => {
    setOpenSnackbar(false);
    setIsClickedRequest(false);
  };

  const handleUserMessage = () => {
    if (props.registerToTournamentMessage === "record_saved_successfully") {
      setSnackbarMessage("Turnuvaya başarılı bir şekilde kayıt oldunuz");
      setSnackbarColor("success");
      setOpenSnackbar(true);
    } else if (props.registerToTournamentMessage === "username_already_exists") {
      setSnackbarMessage("Bu turnuvaya bu hesaptan zaten kayıt yapılmış");
      setSnackbarColor("error");
      setOpenSnackbar(true);
    } else if (props.registerToTournamentMessage === "nickname_already_exists") {
      setSnackbarMessage("Bu nickname zaten turnuvaya kayıtlı");
      setSnackbarColor("error");
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    // props.fetchGetUnfilledTeamList(props.selectedTournament);
    props.fetchTournamentList({ limit: 9, skip: 0 });


    if (isClickedRequest) {
      handleUserMessage();
    }

  }, [props.registerToTournamentMessage, props.selectedTournament, props.isClickedRegister]);

  const handleOnChangeInput = (e) => {
    switch (e.target.name) {
      case "nickname":
        setNickname(e.target.value);
        break;
      case "selectedTeam":
        console.log(e.target.value);
        setSelectedTeam(e.target.value);
        break;
      case "memberTeamNickname":
        setMemberTeamNickname(e.target.value);
        break;
      case "newTeamNickname":
        setNewTeamNickname(e.target.value);
        break;
      case "newTeamTeamName":
        setNewTeamTeamName(e.target.value);
        break;
    }
  };

  const handleRegisterClick = async () => {
    if (nickname.trim() === "") {
      setSnackbarMessage("Nickname boş bırakılamaz");
      setSnackbarColor("error");
      setOpenSnackbar(true);
      return;
    }

    const payload = {
      "tournamentId": props.selectedTournament["id"],
      "nickname": nickname,
      "username": window.localStorage.getItem("username"),
      "team": props.userInfo.teamId,
      "type": props.selectedTournament["type"],
    };

    props.fetchRegisterToTournament(payload);
    setIsClickedRequest(true);

    // let payload;
    // switch (value) {
    //   case 0:
    //     if (nickname.trim() === "") {
    //       setSnackbarMessage("Nickname boş bırakılamaz");
    //       setSnackbarColor("error");
    //       setOpenSnackbar(true);
    //       return;
    //     }
    //     payload = {
    //       "tournamentId": props.selectedTournament["id"],
    //       "type": "individual",
    //       "nickname": nickname,
    //       "username": window.localStorage.getItem("username"),
    //     }
    //     break;
    //   case 1:
    //     console.log(selectedTeam);
    //     console.log(memberTeamNickname);
    //     if (selectedTeam === "default" && memberTeamNickname.trim() === "") {
    //       setSnackbarMessage("Takım adı ve nickname boş bırakılamaz");
    //       setSnackbarColor("error");
    //       setOpenSnackbar(true);
    //       return;
    //     }
    //     payload = {
    //       "tournamentId": props.selectedTournament["id"],
    //       "type": "memberTeam",
    //       "nickname": memberTeamNickname,
    //       "selectedTeam": selectedTeam,
    //       "username": window.localStorage.getItem("username"),
    //     }
    //     break;
    //   case 2:
    //     if (newTeamNickname.trim() === "" && newTeamTeamName.trim() === "") {
    //       setSnackbarMessage("Takım adı ve nickname boş bırakılamaz");
    //       setSnackbarColor("error");
    //       setOpenSnackbar(true);
    //       return;
    //     }
    //     payload = {
    //       "tournamentId": props.selectedTournament["id"],
    //       "type": "newTeam",
    //       "nickname": newTeamNickname,
    //       "teamName": newTeamTeamName,
    //       "username": window.localStorage.getItem("username"),
    //     }
    //     break;
    // }

    // setIsClickedRequest(true);
    // await props.fetchRegisterToTournament(payload);
    // await props.fetchGetUnfilledTeamList(props.selectedTournament);
  }


  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
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
      <Dialog onClose={props.handleClose} aria-labelledby="customized-dialog-title" open={props.open}>
        <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
          {props.selectedTournament["title"]}
        </DialogTitle>
        <DialogContent dividers>
          <p>Bu turnuvaya katılmak istiyor musunuz ? Kayıt ol butonuna tıklarsanız sistemde mevcut bilgileriniz kullanılarak turnuvaya
          kayıt işleminiz gerçekleştirilecektir.
          </p>
          <Card className={classes[cardAnimaton]}>
            <form className={classes.form}>
              <CardBody>
                <CustomInput
                  labelText="Nickname..."
                  id="nickname"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    onChange: (e) => handleOnChangeInput(e),
                    name: "nickname",
                    type: "text",
                    endAdornment: (
                      <InputAdornment position="end">
                        <People className={classes.inputIconsColor} />
                      </InputAdornment>
                    ),
                  }}
                />
              </CardBody>
            </form>
          </Card>
          {/* <AppBar position="static">
            <Tabs value={value} onChange={handleChangeTab} aria-label="simple tabs example">
              <Tab label="Bireysel kayıt" {...a11yProps(0)} />
              <Tab label="TAKIMA KAYIT OL" {...a11yProps(1)} />
              <Tab label="TAKIM OLUŞTUR" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <Card className={classes[cardAnimaton]}>
              <form className={classes.form}>
                <CardBody>
                  <CustomInput
                    labelText="Nickname..."
                    id="nickname"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      onChange: (e) => handleOnChangeInput(e),
                      name: "nickname",
                      type: "text",
                      endAdornment: (
                        <InputAdornment position="end">
                          <People className={classes.inputIconsColor} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </CardBody>
              </form>
            </Card>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Card className={classes[cardAnimaton]}>
              <form className={classes.form}>
                <CardBody>
                  <InputLabel id="demo-simple-select-label">Takım Seç</InputLabel>
                  {
                    props.unfilledTeamList.length < 1
                      ? (
                        <Alert severity="error">
                          <AlertTitle>Uyarı</AlertTitle>
                            Kayıt olunabilecek boş bir takım bulunamadı
                        </Alert>
                      )
                      : <Select
                        style={{
                          width: '100%',
                        }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedTeam}
                        onChange={handleOnChangeInput}
                        name="selectedTeam"
                      >
                        {
                          props.unfilledTeamList.map(team => {
                            return (
                              <MenuItem key={team["team"]} value={team["team"]}>{team["team"]}</MenuItem>
                            )
                          })
                        }
                      </Select>
                  }
                  <CustomInput
                    labelText="Nickname..."
                    id="memberTeamNickname"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      onChange: (e) => handleOnChangeInput(e),
                      name: "memberTeamNickname",
                      type: "text",
                      endAdornment: (
                        <InputAdornment position="end">
                          <People className={classes.inputIconsColor} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </CardBody>
              </form>
            </Card>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Card className={classes[cardAnimaton]}>
              <form className={classes.form}>
                <CardBody>
                  <CustomInput
                    labelText="Takım Adı..."
                    id="newTeamTeamName"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      onChange: (e) => handleOnChangeInput(e),
                      name: "newTeamTeamName",
                      type: "text",
                      endAdornment: (
                        <InputAdornment position="end">
                          <GroupWorkIcon className={classes.inputIconsColor} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <CustomInput
                    labelText="Nickname..."
                    id="newTeamNickname"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      onChange: (e) => handleOnChangeInput(e),
                      name: "newTeamNickname",
                      type: "text",
                      endAdornment: (
                        <InputAdornment position="end">
                          <People className={classes.inputIconsColor} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </CardBody>
              </form>
            </Card>
          </TabPanel> */}
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
    registerToTournamentMessage: state.tournament.registerToTournamentMessage,
    unfilledTeamList: state.tournament.unfilledTeamList,
    unfilledTeamListMessage: state.tournament.unfilledTeamListMessage,
    isClickedRegister: state.tournament.isClickedRegister,
    userInfo: state.user.userInfo,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRegisterToTournament: (payload) => dispatch(fetchRegisterToTournament(payload)),
    fetchGetUnfilledTeamList: (payload) => dispatch(fetchGetUnfilledTeamList(payload)),
    fetchTournamentList: (payload) => dispatch(fetchTournamentList(payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPopup);
