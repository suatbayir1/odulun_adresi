import React, { useEffect } from "react";
import ReactDOM from "react-dom";
// import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { history } from "./history";
import PrivateRoute from "./router/PrivateRoute";
import AdminPrivateRoute from "./router/AdminPrivateRoute";

import "assets/scss/material-kit-react.scss?v=1.9.0";

// pages for this product
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import SignupPage from "./views/SignupPage/SignupPage";
import Tournament from "./views/TournamentPage/Tournament";
import TournamentDetail from "./views/TournamentPage/TournamentDetail";
import Sweepstake from "./views/SweepstakePage/Sweepstake";
import Bests from "./views/BestsPage/Bests";
import AdminLayout from "./views/Admin/AdminLayout"
import AdminLogin from "./views/Admin/Login/AdminLogin";

// var hist = createBrowserHistory();


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/landing-page" component={LandingPage} />
        {/* <Route path="/profile-page" component={ProfilePage} /> */}
        <Route path="/login-page" component={LoginPage} />
        <Route path="/signup-page" component={SignupPage} />
        <Route path="/tournament-page" component={Tournament} />
        {/* <Route path="/tournament-detail" component={TournamentDetail} /> */}
        <Route path="/sweepstake-page" component={Sweepstake} />
        <Route path="/bests-page" component={Bests}></Route>
        <PrivateRoute path="/profile-page" component={ProfilePage}></PrivateRoute>

        <Route path="/admin-login-page" component={AdminLogin} />
        <AdminPrivateRoute path="/admin" component={AdminLayout} />

        <Route path="/" component={Components} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
