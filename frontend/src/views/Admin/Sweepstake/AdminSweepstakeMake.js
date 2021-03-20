import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { API_URL } from "../../../config";
import { history } from "../../../history";
import "./styles.css";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import TextField from '@material-ui/core/TextField';
import Button from "components/CustomButtons/Button.js";
import AddIcon from '@material-ui/icons/Add';
import LoopIcon from '@material-ui/icons/Loop';
import Box from '@material-ui/core/Box';
import { DataGrid } from '@material-ui/data-grid';


export default class AdminSweepstakeMake extends React.Component {
    state = {
        columns: [
            { field: 'id', headerName: 'ID', width: 150 },
            { field: 'winner', headerName: 'Kazanan', width: 400 },
            { field: 'prize', headerName: 'Ödül', width: 200 },
        ],
        rows: [],
        list: [],
        radius: 75, // PIXELS
        rotate: 0, // DEGREES
        easeOut: 0, // SECONDS
        angle: 0, // RADIANS
        top: null, // INDEX
        offset: null, // RADIANS
        net: null, // RADIANS
        result: null, // INDEX
        spinning: false,
        winnerInput: "",
        prizeInput: 0,
    };

    async componentDidMount() {
        await this.getAllRegisteredUser();
        // generate canvas wheel on load
        // this.renderWheel();
    }

    getAllRegisteredUser = async () => {
        const payload = {
            "sweepstakeId": this.props.match.params.id,
        }

        let url = `${API_URL}sweepstake/getAllRegisteredUser`;
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
                }, () => this.renderWheel())
            })
            .catch((error) => {
                console.log(error);
            });
    }

    renderWheel() {
        // determine number/size of sectors that need to created
        let numOptions = this.state.list.length;
        let arcSize = (2 * Math.PI) / numOptions;
        this.setState({
            angle: arcSize
        });

        // get index of starting position of selector
        this.topPosition(numOptions, arcSize);

        // dynamically generate sectors from state list
        let angle = 0;
        for (let i = 0; i < numOptions; i++) {
            let text = this.state.list[i];
            this.renderSector(i + 1, text, angle, arcSize, this.getColor());
            angle += arcSize;
        }
    }

    topPosition = (num, angle) => {
        // set starting index and angle offset based on list length
        // works upto 9 options
        let topSpot = null;
        let degreesOff = null;
        if (num === 9) {
            topSpot = 7;
            degreesOff = Math.PI / 2 - angle * 2;
        } else if (num === 8) {
            topSpot = 6;
            degreesOff = 0;
        } else if (num <= 7 && num > 4) {
            topSpot = num - 1;
            degreesOff = Math.PI / 2 - angle;
        } else if (num === 4) {
            topSpot = num - 1;
            degreesOff = 0;
        } else if (num <= 3) {
            topSpot = num;
            degreesOff = Math.PI / 2;
        }

        this.setState({
            top: topSpot - 1,
            offset: degreesOff
        });
    };

    renderSector(index, text, start, arc, color) {
        // create canvas arc for each list element
        let canvas = document.getElementById("wheel");
        let ctx = canvas.getContext("2d");
        let x = canvas.width / 2;
        let y = canvas.height / 2;
        let radius = this.state.radius;
        let startAngle = start;
        let endAngle = start + arc;
        let angle = index * arc;
        let baseSize = radius * 3.33;
        let textRadius = baseSize - 150;

        ctx.beginPath();
        ctx.arc(x, y, radius, startAngle, endAngle, false);
        ctx.lineWidth = radius * 2;
        ctx.strokeStyle = color;

        ctx.font = "17px Arial";
        ctx.fillStyle = "black";
        ctx.stroke();

        ctx.save();
        ctx.translate(
            baseSize + Math.cos(angle - arc / 2) * textRadius,
            baseSize + Math.sin(angle - arc / 2) * textRadius
        );
        ctx.rotate(angle - arc / 2 + Math.PI / 2);
        ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
        ctx.restore();
    }

    getColor() {
        // randomly generate rbg values for wheel sectors
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        return `rgba(${r},${g},${b},0.4)`;
    }

    spin = () => {
        // set random spin degree and ease out time
        // set state variables to initiate animation
        let randomSpin = Math.floor(Math.random() * 900) + 500;
        this.setState({
            rotate: randomSpin,
            easeOut: 2,
            spinning: true
        });

        // calcalute result after wheel stops spinning
        setTimeout(() => {
            this.getResult(randomSpin);
        }, 2000);
    };

    getResult = spin => {
        // find net rotation and add to offset angle
        // repeat substraction of inner angle amount from total distance traversed
        // use count as an index to find value of result from state list
        const { angle, top, offset, list } = this.state;
        let netRotation = ((spin % 360) * Math.PI) / 180; // RADIANS
        let travel = netRotation + offset;
        let count = top + 1;
        while (travel > 0) {
            travel = travel - angle;
            count--;
        }
        let result;
        if (count >= 0) {
            result = count;
        } else {
            result = list.length + count;
        }

        // set state variable to display result
        this.setState({
            net: netRotation,
            result: result,
            winnerInput: this.state.list[result]
        });
    };

    reset = () => {
        // reset wheel and result
        this.setState({
            rotate: 0,
            easeOut: 0,
            result: null,
            spinning: false,
            winnerInput: "",
            prizeInpput: "",
        });
    };

    setWinner = () => {
        // const winner = this.state.list[this.state.result];

        let winner = "";
        this.state.rows.map(item => {
            winner += item["winner"] + ",";
        });

        const payload = {
            "sweepstakeId": this.props.match.params.id,
            "username": winner,
            "rows": this.state.rows
        }

        let url = `${API_URL}sweepstake/setWinner`;
        axios
            .post(url, payload)
            .then((response) => {
                if (response.status !== 200) return;

                console.log(response);
                if (response.data.message.text[0] === "finished") {
                    history.push(`/admin/sweepstake`);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    addWinnerToTable = () => {
        if (this.state.winnerInput === "" && this.state.prizeInput === 0) {
            alert("Kazanan ve ödül miktarı boş bırakılamaz");
            return;
        }
        const newRow = {
            "id": this.makeid(10),
            "winner": this.state.winnerInput,
            "prize": this.state.prizeInput
        }

        this.setState({
            rows: [...this.state.rows, newRow]
        }, () => {
            this.setState({
                winnerInput: "",
                prizeInput: 0,
            })
        })
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

    render() {
        return (
            <div className="App">
                {
                    this.state.rows.length > 0 ? (
                        <GridContainer style={{ marginBottom: '40px' }}>
                            <GridItem xs={12} sm={12} md={3} lg={2}>
                                <Button
                                    onClick={this.setWinner}
                                    color="success"
                                    block
                                >
                                    <LoopIcon />
                                Çekilişi Sonlandır
                            </Button>
                            </GridItem>
                        </GridContainer>
                    ) : null
                }

                <GridContainer>
                    <GridItem xs={12} sm={12} md={6} lg={6}>
                        <GridContainer>
                            <TextField
                                name="description"
                                fullWidth={true}
                                id="outlined-multiline-static"
                                label="Çekilişe kaydolanlar"
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
                            <GridItem xs={12} sm={12} md={5} lg={5}>
                                <TextField
                                    name="winnerInput"
                                    fullWidth={true}
                                    label="Kazanan"
                                    variant="outlined"
                                    value={this.state.winnerInput}
                                    onChange={(e) => { this.setState({ winnerInput: e.target.value }) }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={5} lg={5}>
                                <TextField
                                    type="number"
                                    name="prizeInput"
                                    fullWidth={true}
                                    label="Ödül"
                                    variant="outlined"
                                    value={this.state.prizeInput}
                                    onChange={(e) => { this.setState({ prizeInput: e.target.value }) }}
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
                    <GridItem xs={12} sm={12} md={6} lg={6}>
                        <canvas
                            id="wheel"
                            width="500"
                            height="500"
                            style={{
                                WebkitTransform: `rotate(${this.state.rotate}deg)`,
                                WebkitTransition: `-webkit-transform ${this.state.easeOut
                                    }s ease-out`
                            }}
                        />

                        <Box display="flex" justifyContent="center">

                            <GridItem xs={12} sm={12} md={4} lg={4}>
                                {
                                    this.state.spinning ? (
                                        <Button
                                            onClick={this.reset}
                                            color="danger"
                                            block
                                        >
                                            <LoopIcon />
                                        Reset
                                        </Button>
                                    ) : (
                                            <Button
                                                onClick={this.spin}
                                                color="success"
                                                block
                                            >
                                                <LoopIcon />
                                            Çevir
                                            </Button>
                                        )
                                }
                            </GridItem>
                        </Box>

                        <h2>Kazanan: {this.state.list[this.state.result]}</h2>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}
