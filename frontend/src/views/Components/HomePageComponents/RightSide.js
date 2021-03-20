import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import List from "@material-ui/core/List";
import { connect } from "react-redux";
import { fetchGetBestPlayer, fetchGetBestTeam } from "../../../redux";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
import GroupIcon from "@material-ui/icons/Group";
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import LanguageIcon from '@material-ui/icons/Language';
import Button from "../../../components/CustomButtons/Button";
import Typography from '@material-ui/core/Typography';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import axios from "axios";
import { API_URL } from 'config'
import {
  Avatar,
  Badge,
  Card,
  CardContent,
  CardHeader,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";

const useStyles = makeStyles(styles);


function RightSide(props) {
  const classes = useStyles();

  const [champion, setChampion] = React.useState("");

  useEffect(() => {
    props.fetchGetBestTeam({ limit: 3 });
    props.fetchGetBestPlayer({ limit: 5 });
    getChampionUser();
  }, []);

  const getChampionUser = () => {
    let url = `${API_URL}user/getChampionUser`;
    axios.post(url)
      .then((response) => {
        setChampion(response.data.data.username);
      })
      .catch(error => {
        console.log(error);
      })
  };

  const getTitle = (score) => {
    if (score < 100) {
      return "Demir";
    } else if (score >= 100 && score < 500) {
      return "Bronz";
    } else if (score >= 500 && score < 2000) {
      return "Gümüş";
    } else if (score >= 2000 && score < 10000) {
      return "Altın";
    } else if (score) {
      return "Elmas";
    }
  }

  return (
    <div>
      {
        !props.isLogin &&
        <GridContainer>
          <GridItem xs={12} sm={12} md={12} lg={6}>
            <Link to="/login-page">
              <Button
                color="success"
                style={{
                  width: "100%",
                  fontSize: "20px",
                }}
              >
                <ExitToAppIcon />
                Giriş Yap
              </Button>
            </Link>

          </GridItem>
          <GridItem xs={12} sm={12} md={12} lg={6}>
            <Link to="/signup-page">
              <Button
                color="info"
                style={{
                  width: "100%",
                  fontSize: "20px",
                }}
              >
                <PersonAddIcon />
                Kayıt Ol
              </Button>
            </Link>

          </GridItem>
        </GridContainer>
      }


      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <Card
            className={classes.root}
            style={{ backgroundColor: "#212121", color: "#ffffff" }}
          >
            <CardHeader title="İlk 3 Takım" color={"red"} />
            <CardContent>
              <List className={classes.root} key={"list1"}>
                {props.bestTeams.length > 0
                  ? props.bestTeams.map((team) => {
                    return (
                      <React.Fragment key={team["name"]}>
                        <ListItem key={team["name"]} button>
                          <ListItemAvatar>
                            <Avatar>
                              <GroupIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary={team["name"]} />

                          <SportsEsportsIcon style={{ color: 'red' }} />
                          <Badge
                            style={{ marginRight: '7%', marginBottom: '10%', color: 'red' }}
                            badgeContent={team["numberOfWins"]}
                            max={999}
                          />

                          <EmojiEventsIcon style={{ color: '#33adff' }} />
                          <Badge
                            style={{ marginBottom: '10%', color: '#33adff' }}
                            badgeContent={team["rank"]}
                            max={999}
                          />

                        </ListItem>
                        <Divider light={true} />
                      </React.Fragment>
                    );
                  })
                  : null}
              </List>
            </CardContent>
          </Card>
        </GridItem>
      </GridContainer>

      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <Card
            className={classes.root}
            style={{ backgroundColor: "#323232", color: "#ffffff" }}
          >
            <CardHeader title="İlk 5 Oyuncu" />
            <CardContent>
              <List className={classes.root} key={"list2"}>
                {props.bestPlayers.length > 0
                  ? props.bestPlayers.map((player, index) => {
                    return (
                      <React.Fragment key={player["username"]}>
                        <ListItem alignItems="flex-start" style={{ background: index === 0 ? '#558b2f' : null }}>
                          <ListItemAvatar>
                            <Avatar
                              alt="Remy Sharp"
                              src={player.image !== null ? `images/${player.image}` : 'images/profile_default.jpeg'}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={player["nameSurname"]}
                            secondary={
                              <React.Fragment>
                                <Typography
                                  component="span"
                                  variant="body2"
                                  className={classes.inline}
                                  color="textPrimary"
                                >
                                  <span style={{ color: '#C6CAD3', fontSize: '12px' }}>{player["username"] === champion ? "Şampiyon" : getTitle(player["title"])} - {player["title"]}</span>
                                </Typography>
                              </React.Fragment>
                            }
                          />
                          <SportsEsportsIcon style={{ color: 'red' }} />
                          <Badge
                            style={{ marginRight: '7%', marginBottom: '10%', color: 'red' }}
                            badgeContent={player["numberOfWins"]}
                            max={999}
                          />

                          <CardGiftcardIcon style={{ color: 'yellow' }} />
                          <Badge
                            style={{ marginRight: '7%', marginBottom: '10%', color: 'yellow' }}
                            badgeContent={player["numberOfSweepstakeWins"]}
                            max={999}
                          />

                          <AttachMoneyIcon style={{ color: '#00ff00' }} />
                          <Badge
                            style={{ marginBottom: '7%', color: '#00ff00' }}
                            badgeContent={player["totalPrize"]}
                            max={999}
                          />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                      </React.Fragment>
                    );
                  })
                  : null}
              </List>
            </CardContent>
          </Card>
        </GridItem>
      </GridContainer>
    </div >
  );
}

const mapStateToProps = (state) => {
  return {
    bestTeams: state.team.bestTeamList,
    bestPlayers: state.player.bestPlayerList,
    isLogin: state.authentication.isLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGetBestTeam: (payload) => dispatch(fetchGetBestTeam(payload)),
    fetchGetBestPlayer: (payload) => dispatch(fetchGetBestPlayer(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RightSide);
