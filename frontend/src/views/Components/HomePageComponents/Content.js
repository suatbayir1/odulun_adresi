import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import Card from "../../../components/Card/Card";
import Carousel from "react-slick";
import DescriptionIcon from '@material-ui/icons/Description';
import image1 from "assets/img/bg.jpg";
import image2 from "assets/img/bg2.jpg";
import image3 from "assets/img/bg3.jpg";
import LocationOn from "@material-ui/icons/LocationOn";
import {
  Box,
  CardContent,
  IconButton,
  Typography,
} from "@material-ui/core";
import Button from "../../../components/CustomButtons/Button";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import PeopleIcon from "@material-ui/icons/People";
import CountUp from "react-countup";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from '../../../config'

const useStyles = makeStyles(styles);

export default function Content() {
  const classes = useStyles();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };


  const [generalInfo, setGeneralInfo] = React.useState({});
  const [youtubeVideos, setYoutubeVideos] = React.useState([]);

  useEffect(() => {
    getGeneralInfo();
    getYoutubeVideos();
  }, []);

  const getYoutubeVideos = async () => {
    let url = `${API_URL}home/getYoutubeVideos`;
    axios
      .get(url)
      .then((response) => {
        if (response.status !== 200) return;

        setYoutubeVideos(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const getGeneralInfo = async () => {
    const url = `${API_URL}general/getHomeGeneralInfo`;

    axios.get(url)
      .then((response) => {
        setGeneralInfo(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <div>
      <GridContainer justify="center">
        {
          youtubeVideos.length > 0 && youtubeVideos.map(video => (
            <React.Fragment>
              <GridItem xs={12} sm={12} md={12} lg={6} style={{ marginBottom: '20px' }}>
                <iframe
                  width="100%"
                  height="345"
                  src={video["url"]}
                  frameborder="0"
                  allowFullScreen="true"
                  webkitallowfullscreen="true"
                  mozallowfullscreen="true"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
              </GridItem>
            </React.Fragment>
          ))
        }
      </GridContainer>

      {/* <GridContainer justify="center" style={{ marginTop: '50px' }}>
        <GridItem xs={12} sm={12} md={12}>
          <Box mt={-3}>
            <Card carousel>
              <Carousel {...settings}>
                <div>
                  <img src={image1} alt="First slide" className="slick-image" />
                  <div className="slick-caption">
                    <h4>
                      <LocationOn className="slick-icons" />
                      Mevcut Turnuvaları İncele
                    </h4>
                    <Link to="/tournament-page">
                      <Button color="primary">Detay</Button>
                    </Link>
                  </div>
                </div>
                <div>
                  <img
                    src={image2}
                    alt="Second slide"
                    className="slick-image"
                  />
                  <div className="slick-caption">
                    <h4>
                      <LocationOn className="slick-icons" />
                      Mevcut Çekilişleri İncele
                    </h4>
                    <Link to="sweepstake-page">
                      <Button color="primary">Detay</Button>
                    </Link>
                  </div>
                </div>
                <div>
                  <img src={image3} alt="Third slide" className="slick-image" />
                  <div className="slick-caption">
                    <h4>
                      <LocationOn className="slick-icons" />
                      En İyileri İncele
                    </h4>
                    <Link to="bests-page">
                      <Button color="primary">Detay</Button>
                    </Link>
                  </div>
                </div>
              </Carousel>
            </Card>
          </Box>
        </GridItem>
      </GridContainer> */}

      <GridContainer>
        <GridItem xs={12} sm={12} md={3}>
          <Card
            className={classes.root}
            variant="outlined"
            style={{ textAlign: "center", border: "2px solid #3f51b5" }}
          >
            <CardContent>
              <Typography variant="body2" component="p">
                <IconButton>
                  <PeopleIcon
                    color={"primary"}
                    style={{ height: "60px", fontSize: "60px" }}
                  />
                </IconButton>
              </Typography>
              <Typography
                style={{ fontSize: "30px" }}
              >
                {Number(generalInfo.totalUserCount)}
              </Typography>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Kullanıcıya ulaştık
              </Typography>
            </CardContent>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={3}>
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
              <Typography
                style={{ fontSize: "30px" }}
              >
                {Number(generalInfo.totalPrize)} TL
              </Typography>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Ödül verdik
              </Typography>
            </CardContent>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={3}>
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
              <Typography
                style={{ fontSize: "30px" }}
              >
                {Number(generalInfo.tournamentCount)}
              </Typography>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Turnuva tamamlandı
              </Typography>
            </CardContent>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={3}>
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
              <Typography
                style={{ fontSize: "30px" }}
              >
                {Number(generalInfo.sweepstakeCount)}
              </Typography>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Çekiliş tamamlandı
              </Typography>
            </CardContent>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
