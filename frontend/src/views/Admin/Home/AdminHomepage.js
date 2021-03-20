import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import AddIcon from '@material-ui/icons/Add';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {
    Box,
    CardContent,
    IconButton,
    Typography,
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import axios from "axios";
import { API_URL } from "config";
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function AdminHomepage() {
    const classes = useStyles();

    const [videoTitle, setVideoTitle] = React.useState("");
    const [videoUrl, setVideoUrl] = React.useState("");
    const [videoRank, setVideoRank] = React.useState(0);
    const [showVideoAddArea, setShowVideoAddArea] = React.useState(false);
    const [rows, setRows] = React.useState([]);

    const getYoutubeVideos = async () => {
        let url = `${API_URL}home/getYoutubeVideos`;
        axios
            .get(url)
            .then((response) => {
                if (response.status !== 200) return;

                setRows(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleAddVideo = async () => {
        if (videoTitle.trim() === "" || videoUrl.trim === "") {
            alert("Video başlığı ve url'si boş bırakılamaz");
            return;
        }

        const payload = {
            "title": videoTitle,
            "url": videoUrl,
            "rank": videoRank
        };

        let url = `${API_URL}home/addYoutubeVideo`;
        axios
            .post(url, payload)
            .then((response) => {
                if (response.status !== 200) return;

                if (response.data.message.text[0] === "inserted_video") {
                    setShowVideoAddArea(false);
                    getYoutubeVideos();
                    alert("Video başarıyla eklendi");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const deleteYoutubeVideo = (item) => {
        const payload = {
            "videoId": item["id"]
        };

        let url = `${API_URL}home/deleteYoutubeVideo`;
        axios
            .post(url, payload)
            .then((response) => {
                if (response.status !== 200) return;

                if (response.data.message.text[0] === "deleted_video") {
                    setShowVideoAddArea(false);
                    getYoutubeVideos();
                    alert("Video başarıyla silindi");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        getYoutubeVideos();
    }, []);

    const onChangeLogo = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('filename', `${window.localStorage.getItem("username")}_profile.${e.target.files[0]["name"].split(".").pop()}`);
        formData.append('image', e.target.files[0]);

        var headers = {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        }

        console.log(formData);

        let url = `${API_URL}general/changeLogo`;
        axios.post(url, formData, headers)
            .then(function (response) {
                if (response.data.message.text[0] === "image_changed") {
                    alert("Logo başarıyla güncellendi");
                }
            })
            .catch(function (response) {
                console.log(response)
            });
    }


    return (
        <React.Fragment>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12} lg={12}>
                    <h2 style={{ marginTop: '-20px' }}>
                        Anasayfa Yönetim Paneli
                    </h2>
                </GridItem>
            </GridContainer>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12} lg={12}>
                    <h3>
                        Youtube Videoları
                    </h3>
                </GridItem>
                <GridItem xs={6} sm={6} md={3} lg={2} style={{ marginBottom: '20px' }}>
                    <Button
                        color="success"
                        block
                        onClick={() => setShowVideoAddArea(!showVideoAddArea)}
                    >
                        <AddIcon className={classes.icon} />
                        Video Ekle
                    </Button>
                </GridItem>

                {
                    showVideoAddArea &&
                    <GridItem xs={12} sm={12} md={12} lg={12}>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={4} lg={4}>
                                <TextField
                                    fullWidth={true}
                                    id="outlined-select-currency"
                                    label="Video Başlık"
                                    variant="outlined"
                                    defaultValue="Video başlığını giriniz.."
                                    onChange={(e) => setVideoTitle(e.target.value)}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4} lg={4}>
                                <TextField
                                    fullWidth={true}
                                    id="outlined-select-currency"
                                    label="Video Url"
                                    variant="outlined"
                                    defaultValue="Video Url giriniz.."
                                    onChange={(e) => setVideoUrl(e.target.value)}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={2} lg={2}>
                                <TextField
                                    fullWidth={true}
                                    id="outlined-select-currency"
                                    label="Video Sırası"
                                    variant="outlined"
                                    defaultValue="0"
                                    type="number"
                                    onChange={(e) => setVideoRank(e.target.value)}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={1} lg={1}>
                                <Button
                                    color="danger"
                                    block
                                    onClick={() => setShowVideoAddArea(false)}
                                >
                                    <DeleteIcon className={classes.icon} />
                                İptal
                            </Button>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={1} lg={1}>
                                <Button
                                    color="success"
                                    block
                                    onClick={() => handleAddVideo()}
                                >
                                    <AddIcon className={classes.icon} />
                                Ekle
                            </Button>
                            </GridItem>
                        </GridContainer>
                    </GridItem>
                }

                <GridItem xs={12} sm={12} md={12} lg={12} style={{ marginTop: '20px' }}>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell align="right">Başlık</TableCell>
                                    <TableCell align="right">Url</TableCell>
                                    <TableCell align="right">Sıra</TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell align="right">{row.title}</TableCell>
                                        <TableCell align="right">{row.url}</TableCell>
                                        <TableCell align="right">{row.rank}</TableCell>
                                        <TableCell align="right">
                                            <IconButton aria-label="delete" color="secondary" onClick={() => { deleteYoutubeVideo(row) }}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </GridItem>
            </GridContainer>

            <GridContainer>
                <GridItem xs={12} sm={12} md={12} lg={12}>
                    <h3>
                        Logo Değiştirme
                    </h3>
                </GridItem>

                <GridItem xs={12} sm={12} md={6} lg={6}>
                    <IconButton>
                        <input type="file" id="upload" onChange={onChangeLogo} hidden accept=".jpg,.jpeg,.png" />
                        <label for="upload">
                            <CloudUploadIcon
                                color={"secondary"}
                                style={{ height: "40px", fontSize: "40px", }}
                            />
                        </label>
                    </IconButton>
                </GridItem>
            </GridContainer>
        </React.Fragment>

    );
}