import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Collapse from '@material-ui/core/Collapse';
import { Router, Route, Switch, Link } from "react-router-dom";
import { history } from "../../history";
import AdminTournament from "./Tournament/AdminTournament";
import AdminSweepstake from "./Sweepstake/AdminSweepstake";
import AdminUserTable from "./Users/AdminUserTable";
import AdminGeneral from "./General/AdminGeneral";
import AdminSweepstakeMake from "./Sweepstake/AdminSweepstakeMake";
import AdminTournamentIndividualMake from "./Tournament/AdminTournamentIndividualMake";
import AdminTournamentTeamMake from "./Tournament/AdminTournamentTeamMake";
import AdminMessage from "./Message/AdminMessage";
import AdminHomepage from "./Home/AdminHomepage";

const drawerWidth = 220;

const styles = theme => ({
    root: {
        display: "flex"
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36
    },
    menuButtonIconClosed: {
        transition: theme.transitions.create(["transform"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        transform: "rotate(0deg)"
    },
    menuButtonIconOpen: {
        transition: theme.transitions.create(["transform"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        transform: "rotate(180deg)"
    },
    hide: {
        display: "none"
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap"
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerClose: {
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        overflowX: "hidden",
        width: theme.spacing.unit * 7 + 1,
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing.unit * 9 + 1
        }
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        marginTop: theme.spacing.unit,
        justifyContent: "flex-end",
        padding: "0 8px",
        ...theme.mixins.toolbar
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3
    },
    grow: {
        flexGrow: 1
    }
});

const linkList = [
    { name: 'Anasayfa', route: '/admin' },
    { name: 'Turnuvalar', route: '/admin/tournament' },
    { name: 'Çekilişler', route: '/admin/sweepstake' },
    { name: 'Genel Bilgiler', route: '/admin/general-info' },
    { name: 'Kullanıcılar', route: '/admin/users' },
    { name: 'Sorular & İstekler', route: '/admin/message' }
];

class AdminLayout extends React.Component {
    state = {
        open: true,
        anchorEl: null,
        openCollapse: false,
        selectedLink: "Anasayfa",
    };


    handleOpenSettings = () => {
        this.setState({ openCollapse: !this.state.openCollapse });
    }

    handleDrawerOpen = () => {
        this.setState({ open: !this.state.open });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handlChangeListItem = (item) => {
        console.log(item["name"]);
        this.setState({ selectedLink: item["name"] });
    }

    handleClickLogout = () => {
        window.localStorage.removeItem("admin");
        history.push("/admin-login-page")
    }

    render() {
        const { classes, theme } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={classes.appBar}
                    fooJon={classNames(classes.appBar, {
                        [classes.appBarShift]: this.state.open
                    })}
                >
                    <Toolbar disableGutters={true}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classes.menuButton}
                        >
                            <MenuIcon
                                classes={{
                                    root: this.state.open
                                        ? classes.menuButtonIconOpen
                                        : classes.menuButtonIconClosed
                                }}
                            />
                        </IconButton>
                        <Typography
                            variant="h6"
                            color="inherit"
                            className={classes.grow}
                            noWrap
                        >
                            ÖDÜLÜN ADRESİ YÖNETİM PANELİ
                        </Typography>
                        <div>
                            <IconButton
                                aria-owns={open ? "menu-appbar" : undefined}
                                aria-haspopup="true"
                                onClick={this.handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right"
                                }}
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right"
                                }}
                                open={open}
                                onClose={this.handleClose}
                            >
                                {/* <MenuItem onClick={this.handleClose}>Profile</MenuItem> */}
                                <MenuItem onClick={this.handleClickLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    className={classNames(classes.drawer, {
                        [classes.drawerOpen]: this.state.open,
                        [classes.drawerClose]: !this.state.open
                    })}
                    classes={{
                        paper: classNames({
                            [classes.drawerOpen]: this.state.open,
                            [classes.drawerClose]: !this.state.open
                        })
                    }}
                    open={this.state.open}
                >
                    <div className={classes.toolbar} />
                    <List>
                        {
                            linkList.map(item => (
                                <Link
                                    to={item["route"]}
                                >
                                    <ListItem
                                        button
                                        selected={this.state.selectedLink === item["name"] ? true : false}
                                        onClick={() => { this.handlChangeListItem(item) }}
                                        classes={{ selected: 'red' }}
                                    >
                                        <ListItemIcon>
                                            <InboxIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={item["name"]} />
                                    </ListItem>
                                    <Divider />
                                </Link>
                            ))
                        }
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />

                    <Router history={history}>
                        <Switch>
                            <Route exact path="/admin" component={AdminHomepage} />
                            <Route exact path="/admin/tournament" component={AdminTournament} />
                            <Route exact path="/admin/tournament/team/:id" component={AdminTournamentTeamMake} />
                            <Route exact path="/admin/tournament/individual/:id" component={AdminTournamentIndividualMake} />
                            <Route exact path="/admin/sweepstake" component={AdminSweepstake} />
                            <Route exact path="/admin/sweepstake/:id" component={AdminSweepstakeMake} />
                            <Route exact path="/admin/users" component={AdminUserTable} />
                            <Route exact path="/admin/general-info" component={AdminGeneral} />
                            <Route exact path="/admin/message" component={AdminMessage} />
                        </Switch>
                    </Router>
                </main>
            </div>
        );
    }
}

AdminLayout.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(AdminLayout);
