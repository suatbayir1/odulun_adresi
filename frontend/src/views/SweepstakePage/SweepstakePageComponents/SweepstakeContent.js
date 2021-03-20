import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import PersonIcon from "@material-ui/icons/Person";
import { fetchSweepstakeList, fetchGetUserInfo } from "../../../redux";
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


const useStyles = makeStyles(styles);

function SweepstakeContent(props) {
  const classes = useStyles();

  const [page, setPage] = useState(1);

  useEffect(() => {
    props.fetchSweepstakeList({ limit: 9, skip: 0 });
    props.fetchGetUserInfo({
      "username": window.localStorage.getItem("username")
    });
  }, []);

  const handlePageClick = (event, value) => {
    setPage(value);
    props.fetchSweepstakeList({ limit: 9, skip: (value - 1) * 9 });
  };


  const [open, setOpen] = useState(false);
  const [selectedSweepstake, setSelectedSweepstake] = useState({});


  const handleClickOpen = (sweepstake) => {
    if (window.localStorage.getItem("username") === null) {
      alert("Lütfen önce giriş yapınız");
      return;
    }

    const finishTime = new Date(sweepstake["finishedAt"]);

    if (finishTime < Date.now()) {
      alert("Bu çekilişe kayıt süresi doldu");
      return;
    }

    setSelectedSweepstake(sweepstake);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getSweepstakeStyle = (item) => {
    return {
      margin: "10px",
      border: `2px solid ${new Date(item["finishedAt"]) < Date.now() ? 'red' : 'green'}`
    }
  }

  const cardList =
    props.sweepStakeList.length !== 0 ? (
      props.sweepStakeList.map((item) => {
        return (
          <GridItem xs={12} sm={12} md={4} key={item["title"]}>
            <Card
              className={classes.root}
              style={getSweepstakeStyle(item)}
            >
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    T
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
              {/* <img src="images/cekilis.jpg" height={300} width={"100%"} /> */}
              <img src={item["image"] !== null ? `images/${item["image"]}` : 'images/cekilis.jpg'} height={300} width={"100%"} />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {item["description"]}
                </Typography>
              </CardContent>
              <CardActions>
                <Grid justify="space-between" container>
                  <IconButton aria-label="add to favorites" size={"small"}>
                    <AttachMoneyIcon />
                    {item["prize"]}
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
        Henüz bir çekiliş oluşturulmamış
        </Alert>
      );

  return (
    <div>
      <GridContainer key={"sweepstake-key"}>
        {cardList}
        <GridItem xs={12} sm={12} md={12} key={"sweepstake-pagination"}>
          <div className={classes.space50} />
          <Pagination
            size={"large"}
            count={Math.ceil(props.sweepStakeListTotalRecordCount / 9)}
            color="primary"
            page={page}
            onChange={handlePageClick}
          />
        </GridItem>

        <RegisterPopup
          open={open}
          selectedSweepstake={selectedSweepstake}
          handleClose={handleClose}
          handleClickOpen={handleClickOpen}
        />
      </GridContainer>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    sweepStakeList: state.sweepstake.sweepStakeList,
    sweepStakeListError: state.sweepstake.sweepStakeListError,
    sweepStakeListTotalRecordCount:
      state.sweepstake.sweepStakeListTotalRecordCount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSweepstakeList: (payload) => dispatch(fetchSweepstakeList(payload)),
    fetchGetUserInfo: (payload) => dispatch(fetchGetUserInfo(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SweepstakeContent);
