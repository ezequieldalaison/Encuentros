import React, { Component } from "react";
import Home from "./components/Home";
import Area from "./components/pages/General/Area";
import Login from "./components/Login";
import NavigationBar from "./components/navigation/NavigationBar";
import Auth from "./components/auth/Auth";
import Callback from "./components/auth/Callback";
import Profile from "./components/Profile";
import PrivateRoute from "./components/navigation/PrivateRoute";
import PublicRoute from "./components/navigation/PublicR
import FetchHelper from "./components/helpers/FetchHelpers";
import Configuration from "./components/pages/General/Configuration";
import PageNotFound from "./components/pages/PageNotFound";
import { Route, Switch } from "react-router-dom";
import Professionals from "./components/pages/ConsultingRoom/Professionals/ProfessionalPage";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: new Auth(this.props.history),
      fetchHelper: new FetchHelper()
    };
  }

  render() {
    const { auth, fetchHelper } = this.state;
    return (
      <AuthContext.Provider value={auth}>
        <NavigationBar auth={auth} />
        <Switch>
          <PublicRoute path="/" component={Home} exact />
          <PublicRoute path="/Login" component={Login} />
          <PublicRoute path="/Callback" component={Callback} />

          <PrivateRoute path="/Area" component={Area} />
          <PrivateRoute path="/Profile" component={Profile} />
          <PrivateRoute path="/Configuration" component={Configuration} />
          <PrivateRoute path="/Professionals" component={Professionals} />

          <Route component={PageNotFound} />
        </Switch>
      </AuthContext.Provider>
    );
  }
}

export default App;
