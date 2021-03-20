import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import { API_URL } from "../../../config";

const useStyles = makeStyles(styles);

function BestsSweepstakeTable(props) {
    const classes = useStyles();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [userList, setUserList] = React.useState([]);
    const [champion, setChampion] = React.useState("");

    useEffect(() => {
        getUsersBySweepstakeWins();
        getChampionUser();
    }, []);

    const getUsersBySweepstakeWins = async () => {
        let url = `${API_URL}user/getUsersBySweepstakeWins`;
        axios
            .get(url)
            .then((response) => {
                if (response.status !== 200) return;

                setUserList(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
        console.log("request");
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = async (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    };

    const columns = [
        { id: "nameSurname", label: "Ad Soyad", minWidth: 100 },
        { id: "nickname", label: "Oyundaki isim", minWidth: 170 },
        { id: "age", label: "Yaş", minWidth: 100 },
        { id: "numberOfSweepstakeWins", label: "Çekiliş Sayısı", minWidth: 100 },
        { id: "title", label: "Ünvan", minWidth: 100 },
        { id: "email", label: "Email", minWidth: 100 },
        { id: "totalPrize", label: "Toplam Ödül", minWidth: 100 },
    ];

    const getBackgroundColor = (index) => {
        let backgroundColor;

        if (index === 0) {
            backgroundColor = "green";
        }

        if (index === 1) {
            backgroundColor = "#066FC5";
        }

        if (index === 2) {
            backgroundColor = "#BF2FE5";
        }

        return {
            color: "#fff",
            backgroundColor: backgroundColor,
        }
    }

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

    return (
        <React.Fragment key={"player-table"}>
            <Paper className={classes.root}>
                <TableContainer style={{ background: "#333" }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{
                                            minWidth: column.minWidth,
                                            background: "#000000",
                                            color: "#ffffff",
                                        }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userList.map((row, index) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.id}
                                        style={{
                                            background: "#333",
                                        }}
                                    >
                                        {columns.map((column) => {
                                            const value = row[column.id];

                                            if (column.id === "title") {
                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        style={getBackgroundColor(index)}
                                                    >
                                                        {row["username"] === champion ? "Şampiyon" : getTitle(value)}
                                                    </TableCell>
                                                );
                                            } else {
                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        style={getBackgroundColor(index)}
                                                    >
                                                        {column.format && typeof value === "number"
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            }
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                    <TablePagination
                        style={{
                            color: "#fff",
                        }}
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={userList.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </Paper>
        </React.Fragment>
    );
}

export default BestsSweepstakeTable;
