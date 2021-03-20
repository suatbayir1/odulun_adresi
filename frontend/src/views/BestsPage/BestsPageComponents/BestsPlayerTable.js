import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { fetchGetPlayer } from "../../../redux";
import axios from "axios";
import { API_URL } from 'config'

const useStyles = makeStyles(styles);

function BestsPlayerTable(props) {
  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [champion, setChampion] = React.useState("");

  useEffect(() => {
    props.fetchGetPlayer({ limit: rowsPerPage, skip: 0 });
    getChampionUser();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    props.fetchGetPlayer({
      limit: rowsPerPage,
      skip: newPage * rowsPerPage,
    });
  };

  const handleChangeRowsPerPage = async (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
    await props.fetchGetPlayer({
      limit: event.target.value,
      skip: 0,
    });
  };

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

  const columns = [
    { id: "nameSurname", label: "Ad Soyad", minWidth: 100 },
    { id: "nickname", label: "Oyundaki isim", minWidth: 170 },
    { id: "age", label: "Yaş", minWidth: 100 },
    { id: "numberOfWins", label: "Zafer sayısı", minWidth: 100 },
    { id: "teamId", label: "Takım İsmi", minWidth: 100 },
    { id: "title", label: "Ünvan", minWidth: 100 },
    { id: "email", label: "Email", minWidth: 100 },
  ];

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
              {props.playerList.map((row, index) => {
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
            count={props.playerListRecordCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Paper>
    </React.Fragment >
  );
}

const mapStateToProps = (state) => {
  return {
    playerList: state.player.playerList,
    playerListRecordCount: state.player.playerListRecordCount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGetPlayer: (payload) => dispatch(fetchGetPlayer(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BestsPlayerTable);
