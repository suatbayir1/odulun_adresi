import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { API_URL } from "../../../config";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import TextField from '@material-ui/core/TextField';
import Button from "components/CustomButtons/Button.js";
import AddIcon from '@material-ui/icons/Add';
import LoopIcon from '@material-ui/icons/Loop';
import Box from '@material-ui/core/Box';
import { DataGrid } from '@material-ui/data-grid';
import { history } from "../../../history";



export default class AdminTournamentIndividualMake extends React.Component {
    state = {
        columns: [
            { field: 'id', headerName: 'ID', width: 150 },
            { field: 'username', headerName: 'Kullanıcı adı', width: 350 },
            { field: 'prize', headerName: 'Ödül', width: 150 },
            { field: 'score', headerName: 'Puan', width: 150 },
        ],
        rows: [],
        list: [],
        usernameInput: "",
        prizeInput: 0,
        scoreInput: 0,
    };

    async componentDidMount() {
        await this.getAllRegisteredUser();
    }

    getAllRegisteredUser = async () => {
        const payload = {
            "tournamentId": this.props.match.params.id,
        }

        let url = `${API_URL}tournament/getAllRegisteredUser`;
        axios
            .post(url, payload)
            .then((response) => {
                if (response.status !== 200) return;
                const list = [];

                response.data.data.map(item => {
                    list.push(item["username"]);
                })

                this.setState({
                    list,
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    makeid = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    addWinnerToTable = () => {
        if (this.state.usernameInput === "") {
            alert("Kullanıcı adı, ödül ve puan boş bırakılamaz");
            return;
        }
        const newRow = {
            "id": this.makeid(10),
            "username": this.state.usernameInput,
            "prize": this.state.prizeInput,
            "score": this.state.scoreInput,
        }

        this.setState({
            rows: [...this.state.rows, newRow]
        }, () => {
            this.setState({
                usernameInput: "",
                prizeInput: 0,
                scoreInput: 0,
            })
        })
    }

    setWinner = () => {
        let winner = "";
        this.state.rows.map(item => {
            winner += item["username"] + ",";
        });

        const payload = {
            "tournamentId": this.props.match.params.id,
            "username": winner,
            "rows": this.state.rows,
        }

        let url = `${API_URL}tournament/setIndividualWinner`;
        axios
            .post(url, payload)
            .then((response) => {
                if (response.status !== 200) return;

                if (response.data.message.text[0] === "finished") {
                    history.push(`/admin/tournament`);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={6} lg={6}>
                    {
                        this.state.rows.length > 0 &&
                        <GridItem xs={12} sm={12} md={4} lg={4}>
                            <Button
                                color="success"
                                block
                                onClick={this.setWinner}
                            >
                                <AddIcon />
                                Turnuvayı Sonlandır
                            </Button>
                        </GridItem>
                    }


                    <GridContainer style={{ marginTop: '40px' }}>
                        <TextField
                            name="description"
                            fullWidth={true}
                            id="outlined-multiline-static"
                            label="Turnuvaya kaydolanlar"
                            multiline
                            rows={5}
                            variant="outlined"
                            value={this.state.list}
                        />
                    </GridContainer>

                    {
                        this.state.rows.length > 0 ? (
                            <GridContainer style={{ marginTop: '40px' }}>
                                <div style={{ height: 400, width: '100%' }}>
                                    <DataGrid
                                        rows={this.state.rows}
                                        columns={this.state.columns}
                                        pageSize={5}
                                    />
                                </div>
                            </GridContainer>
                        ) : null
                    }

                    <GridContainer style={{ marginTop: '40px' }}>
                        <GridItem xs={12} sm={12} md={6} lg={6}>
                            <TextField
                                fullWidth={true}
                                label="Kullanıcı adı"
                                variant="outlined"
                                value={this.state.usernameInput}
                                onChange={(e) => { this.setState({ usernameInput: e.target.value }) }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={2} lg={2}>
                            <TextField
                                type="number"
                                fullWidth={true}
                                label="Ödül"
                                variant="outlined"
                                value={this.state.prizeInput}
                                onChange={(e) => { this.setState({ prizeInput: e.target.value }) }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={2} lg={2}>
                            <TextField
                                type="number"
                                fullWidth={true}
                                label="Puan"
                                variant="outlined"
                                value={this.state.scoreInput}
                                onChange={(e) => { this.setState({ scoreInput: e.target.value }) }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={2} lg={2}>
                            <Button
                                color="success"
                                block
                                onClick={this.addWinnerToTable}
                            >
                                <AddIcon />
                                        Ekle
                                </Button>
                        </GridItem>
                    </GridContainer>
                </GridItem>
            </GridContainer>
        )
    }
}
