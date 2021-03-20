import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import GroupIcon from "@material-ui/icons/Group";
import PersonIcon from "@material-ui/icons/Person";
import { fetchTournamentList, fetchGetUserInfo } from "../../../redux";
import { connect } from "react-redux";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Alert, AlertTitle } from "@material-ui/lab";
import Button from "../../../components/CustomButtons/Button";
import Pagination from "@material-ui/lab/Pagination";
import RegisterPopup from "./RegisterPopup"
import axios from "axios";
import { API_URL } from "../../../config";
const useStyles = makeStyles(styles);

function TournamentContent(props) {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [selectedTournament, setSelectedTournament] = useState({});

  useEffect(() => {
    props.fetchTournamentList({ limit: 9, skip: 0 });
    props.fetchGetUserInfo({
      "username": window.localStorage.getItem("username")
    });
  }, []);

  const handlePageClick = (event, value) => {
    setPage(value);
    props.fetchTournamentList({ limit: 9, skip: (value - 1) * 9 });
  };

  const [open, setOpen] = useState(false);

  const isCurrentUserAdmin = async () => {
    const payload = {
      "userId": props.userInfo.id,
    };

    let url = `${API_URL}user/isUserAdmin`;
    const result = await axios
      .post(url, payload)
      .then((response) => {
        if (response.status !== 200) return;

        return response.data.message.text[0];
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
  }

  const isTeamMemberGreaterThanThree = async () => {
    const payload = {
      "teamId": props.userInfo.teamId,
    };

    let url = `${API_URL}user/isTeamMemberGreaterThanThree`;
    const result = await axios
      .post(url, payload)
      .then((response) => {
        if (response.status !== 200) return;

        return response.data.message.text[0];
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
  }

  const handleClickOpen = async (tournament) => {
    const finishTime = new Date(tournament["finishedAt"]);

    if (finishTime < Date.now()) {
      alert("Bu turnuvaya kayıt süresi doldu");
      return;
    }

    if (window.localStorage.getItem("username") === null) {
      alert("Lütfen önce giriş yapınız");
      return;
    }

    if (tournament["type"] === "team" && props.userInfo.teamId === null) {
      alert("Lütfen önce bir takıma kayıt olun");
      return;
    }

    // check user is admin ?
    if (tournament["type"] === "team" && await isCurrentUserAdmin() !== "admin") {
      alert("Turnuvaya sadece takım lideri kaydolabilir");
      return;
    }

    if (tournament["type"] === "team" && await isTeamMemberGreaterThanThree() !== "greater") {
      alert("Takımınız en az 3 kişi olmalıdır")
      return;
    }

    setSelectedTournament(tournament);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isUserAlreadyJoinTournament = async (item) => {
    const payload = {
      "username": window.localStorage.getItem("username"),
      "tournamentId": item.id,
    };

    let url = `${API_URL}tournament/isUsernameAlreadyRegistered`;
    const result = await axios
      .post(url, payload)
      .then((response) => {
        if (response.status !== 200) return;
        return response.data.message.text[0];
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
  }

  const getTournamentStyle = (item) => {
    // let result = await isUserAlreadyJoinTournament(item);

    // if (result == true) {
    //   return {
    //     margin: "10px",
    //     border: `2px solid green`
    //   }
    // }

    return {
      margin: "10px",
      border: `2px solid ${new Date(item["finishedAt"]) < Date.now() ? 'red' : 'green'}`
    }
  }

  const cardList =
    props.tournamentList.length !== 0 ? (
      props.tournamentList.map((item) => {
        return (
          <GridItem xs={12} sm={12} md={4} key={item["title"]}>
            <Card
              className={classes.root}
              style={getTournamentStyle(item)}
            // style={{
            //   margin: "10px",
            //   border: `2px solid ${new Date(item["finishedAt"]) < Date.now() ? 'red' : 'white'}`
            // }}
            >
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    {item["type"] === "team" ? 'T' : 'B'}
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={item["title"]}
                subheader={`${item["createdAt"]} - ${item["finishedAt"]}`}
              />
              {/* <img src="images/turnuva.png" height={300} width={"100%"} /> */}
              <img src={item["image"] !== null ? `images/${item["image"]}` : 'images/turnuva.png'} height={300} width={"100%"} />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {item["description"]}
                </Typography>
              </CardContent>
              <CardActions>
                <Grid justify="space-between" container>
                  <IconButton aria-label="add to favorites" size={"small"}>
                    <AttachMoneyIcon />
                    {item["prize"]} TL
                  </IconButton>
                  <IconButton aria-label="share" size={"small"}>
                    <GroupIcon />
                    {item["numberOfTeams"]}
                  </IconButton>
                  <IconButton aria-label="show more" size={"small"}>
                    <PersonIcon />
                    {item["numberOfUsers"]}
                  </IconButton>
                  <Button color="primary" onClick={() => handleClickOpen(item)}>
                    {new Date(item["finishedAt"]) < Date.now() ? "Süre Doldu" : "Kayıt Ol"}
                  </Button>
                </Grid>
              </CardActions>
            </Card>
          </GridItem>
        );
      })
    ) : (
        <Alert severity="error">
          <AlertTitle>Uyarı</AlertTitle>
        Henüz bir turnuva oluşturulmamış
        </Alert>
      );

  return (
    <div>
      <GridContainer>
        {cardList}
        <GridItem xs={12} sm={12} md={12} key={"pagination"}>
          <div className={classes.space50} />
          <Pagination
            size={"large"}
            count={Math.ceil(props.tournamentListTotalRecordCount / 9)}
            color="primary"
            page={page}
            onChange={handlePageClick}
          />
        </GridItem>

        <RegisterPopup
          open={open}
          selectedTournament={selectedTournament}
          handleClose={handleClose}
          handleClickOpen={handleClickOpen}
        />
      </GridContainer>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    tournamentList: state.tournament.tournamentList,
    tournamentListError: state.tournament.tournamentListError,
    tournamentListTotalRecordCount:
      state.tournament.tournamentListTotalRecordCount,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTournamentList: (payload) => dispatch(fetchTournamentList(payload)),
    fetchGetUserInfo: (payload) => dispatch(fetchGetUserInfo(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TournamentContent);
