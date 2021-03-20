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
import { fetchGetTeam } from "../../../redux";

const useStyles = makeStyles(styles);

function BestsTeamTable(props) {
  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    props.fetchGetTeam({ limit: rowsPerPage, skip: 0 });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    props.fetchGetTeam({
      limit: rowsPerPage,
      skip: newPage * rowsPerPage,
    });
  };

  const handleChangeRowsPerPage = async (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
    await props.fetchGetTeam({
      limit: event.target.value,
      skip: 0,
    });
  };

  const columns = [
    { id: "nameSurname", label: "Takım Kurucusu", minWidth: 100 },
    { id: "name", label: "Takım Adı", minWidth: 170 },
    { id: "rank", label: "Takım Seviyesi", minWidth: 100 },
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

  return (
    <React.Fragment key={"team-table"}>
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
              {props.teamList.map((row, index) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.name}
                    style={{
                      background: "#333",
                    }}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
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
            count={props.teamListTotalRecordCount}
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

const mapStateToProps = (state) => {
  return {
    teamList: state.team.teamList,
    teamListTotalRecordCount: state.team.teamListTotalRecordCount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGetTeam: (payload) => dispatch(fetchGetTeam(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BestsTeamTable);
