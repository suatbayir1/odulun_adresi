/*eslint-disable*/
import React, { useState, useEffect } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui core components
import { List, ListItem, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";

import styles from "assets/jss/material-kit-react/components/footerStyle.js";
import GridItem from "../Grid/GridItem";
import Button from "../CustomButtons/Button";
import GridContainer from "components/Grid/GridContainer";
import PhoneIcon from '@material-ui/icons/Phone';
import Box from '@material-ui/core/Box';
import CustomInput from "components/CustomInput/CustomInput.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import { Snackbar } from "@material-ui/core";
import UpdateIcon from '@material-ui/icons/Update';
import MuiAlert from "@material-ui/lab/Alert";
import { API_URL } from "config";
import axios from "axios";



const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const { whiteFont } = props;

  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont,
  });

  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont,
  });

  const handleClose = () => {
    setOpenSnackbar(false);
  };

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarColor, setSnackbarColor] = useState("error");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [generalInfo, setGeneralInfo] = React.useState({});

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const handleClickSendMessage = () => {
    if (email.trim() === "" || message.trim() === "") {
      setSnackbarMessage("Email ve mesaj alanı boş bırakılamaz");
      setOpenSnackbar(true);
      setSnackbarColor("error");
      return;
    }

    if (!validateEmail(email)) {
      setSnackbarMessage("Lütfen geçerli bir email adresi giriniz");
      setOpenSnackbar(true);
      setSnackbarColor("error");
      return;
    }

    const payload = {
      "email": email,
      "message": message
    };

    let url = `${API_URL}general/sendMessageToAdmin`;

    axios
      .post(url, payload)
      .then((response) => {
        if (response.status !== 200) return;

        if (response.data.message.text[0] === "sent_message") {
          setSnackbarMessage("Mesajınız başarıyla gönderildi");
          setOpenSnackbar(true);
          setSnackbarColor("success");
          setEmail("");
          setMessage("");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const getGeneralInfo = async () => {
    let url = `${API_URL}general/getGeneralInfo`;

    axios
      .get(url)
      .then((response) => {
        if (response.status !== 200) return;

        const result = response.data.data;
        setGeneralInfo(result);
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    console.log("useEffect footer");
    getGeneralInfo();
  }, []);

  return (
    <React.Fragment>
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
      <GridContainer className={footerClasses} style={{ marginTop: '20px', background: '#3c4858', color: '#ffffff' }}>
        <GridItem xs={12} sm={12} md={4}>
          <h3>
            Biz Kimiz ?
          </h3>
          <p style={{ border: '1px solid #4fc3f7' }}></p>
          <span style={{ paddingLeft: '20px' }}>
            {generalInfo.whoAreWe}
          </span>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <h3>
            İletişim Adreslerimiz
          </h3>
          <p style={{ border: '1px solid #4fc3f7' }}></p>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <Tooltip
                id="instagram-twitter"
                title="Youtube'da bizi takip edin"
                placement={window.innerWidth > 959 ? "top" : "left"}
                classes={{ tooltip: classes.tooltip }}
              >
                <Button
                  href={generalInfo.youtubeUrl}
                  target="_blank"
                  color="transparent"
                  className={classes.navLink}
                >
                  <i className={classes.socialIcons + " fab fa-youtube"} />
                </Button>
              </Tooltip>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <Tooltip
                id="instagram-facebook"
                title="Facebook'da bizi takip edin"
                placement={window.innerWidth > 959 ? "top" : "left"}
                classes={{ tooltip: classes.tooltip }}
              >
                <Button
                  color="transparent"
                  href={generalInfo.facebookUrl}
                  target="_blank"
                  className={classes.navLink}
                >
                  <i className={classes.socialIcons + " fab fa-facebook"} />
                </Button>
              </Tooltip>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <Tooltip
                id="instagram-tooltip"
                title="İnstagram'da bizi takip edin"
                placement={window.innerWidth > 959 ? "top" : "left"}
                classes={{ tooltip: classes.tooltip }}
              >
                <Button
                  color="transparent"
                  href={generalInfo.instagramUrl}
                  target="_blank"
                  className={classes.navLink}
                >
                  <i className={classes.socialIcons + " fab fa-instagram"} />
                </Button>
              </Tooltip>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <Tooltip
                id="instagram-tooltip"
                title="Bizi discord'da takip edin"
                placement={window.innerWidth > 959 ? "top" : "left"}
                classes={{ tooltip: classes.tooltip }}
              >
                <Button
                  color="transparent"
                  href={generalInfo.discordUrl}
                  target="_blank"
                  className={classes.navLink}
                >
                  <i className={classes.socialIcons + " fab fa-discord"} />
                </Button>
              </Tooltip>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <Tooltip
                id="instagram-tooltip"
                title="Bizi twitch'de takip edin"
                placement={window.innerWidth > 959 ? "top" : "left"}
                classes={{ tooltip: classes.tooltip }}
              >
                <Button
                  color="transparent"
                  href={generalInfo.twitchUrl}
                  target="_blank"
                  className={classes.navLink}
                >
                  <i className={classes.socialIcons + " fab fa-twitch"} />
                </Button>
              </Tooltip>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <Tooltip
                id="instagram-tooltip"
                title="Bizi nimotv'de takip edin"
                placement={window.innerWidth > 959 ? "top" : "left"}
                classes={{ tooltip: classes.tooltip }}
              >
                <Button
                  color="transparent"
                  href={generalInfo.nimotvUrl}
                  target="_blank"
                  className={classes.navLink}
                >
                  <i className={classes.socialIcons + " fas fa-tv"} />
                </Button>
              </Tooltip>
            </ListItem>
          </List>

          <Box display='center' style={{ marginTop: '15px' }}>
            <PhoneIcon></PhoneIcon>
            <p style={{ marginLeft: '10px' }}>{generalInfo.phone} Numaralı hattan bize ulaşabilirsiniz</p>
          </Box>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <h3>
            Bize mesaj gönderin
          </h3>
          <p style={{ border: '1px solid #4fc3f7' }}></p>
          <p>Aşağıdaki formu doldurarak bize bir soru sorabilir veya isteklerinizi iletebilirsiniz</p>

          <Box width='90%' display='center' marginLeft='auto' marginRight="auto">
            <TextField
              style={{ color: '#ffffff', background: '#ffffff' }}
              fullWidth={true}
              id="outlined-select-currency"
              label="Email adresinizi girin"
              type="email"
              variant="filled"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box width='90%' display='center' style={{ marginTop: '10px' }} marginLeft='auto' marginRight="auto">
            <TextField
              style={{ color: '#ffffff', background: '#ffffff' }}
              fullWidth={true}
              id="outlined-select-currency"
              label="Mesajınızı girin"
              variant="filled"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              multiline
              rows={4}
            />
          </Box>
          <Box width="30%" marginLeft='auto' marginRight="auto" marginTop="10px">
            <Button
              color="info"
              block
              onClick={handleClickSendMessage}
            >
              <SendIcon className={classes.icon} />
              Gönder
          </Button>
          </Box>
        </GridItem>
      </GridContainer>
      <GridContainer className={footerClasses} justify="center" style={{ background: '#000000', color: '#ffffff' }}>
        <GridItem xs={12} sm={12} md={12}>
          &copy; {1900 + new Date().getYear()} Tüm Hakları Saklıdır{" "}
          <a
            href="https://www.creative-tim.com?ref=mkr-footer"
            className={aClasses}
            target="_blank"
            style={{ color: '#4fc3f7' }}
          >
            Ödülün Adresi
          </a> - {""}
          <a
            href="http://suatbayir.com/"
            className={aClasses}
            target="_blank"
            style={{ color: '#4fc3f7' }}
          >
            Suat Bayır
          </a>
          {" "}
          tarafından hazırlanmıştır
        </GridItem>

      </GridContainer>
    </React.Fragment >
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool,
};
