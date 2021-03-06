import React, { Component } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import NavigationBar from "./components/navigation/NavigationBar";
import Auth from "./components/auth/Auth";
import Callback from "./components/auth/Callback";
import Profile from "./components/Profile";
import PrivateRoute from "./components/navigation/PrivateRoute";
import PublicRoute from "./components/navigation/PublicRoute";
import AuthContext from "./contexts/AuthContext";
import PageNotFound from "./components/pages/PageNotFound";
import { Route, Switch } from "react-router-dom";
import Professionals from "./components/pages/General/Professional/ProfessionalPage";
import Movements from "./components/pages/General/Movement/MovementPage";
import StudentPage from "./components/pages/Pilates/Students/StudentPage";
import WeeklyClassPage from "./components/pages/Pilates/WeeklyClass/WeeklyClassPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "react-datepicker/dist/react-datepicker.css";
import FeePage from "./components/pages/Pilates/Fee/FeePage";
import ClassManagementPage from "./components/pages/Pilates/ClassManagement/ClassManagementPage";
import ProfessionalWorkDayPage from "./components/pages/Pilates/ProfessionalWorkDay/ProfessionalWorkDayPage";
import ProfessionalPaymentPage from "./components/pages/Pilates/ProfessionalPayment/ProfessionalPaymentPage";
import ConfigurationPage from "./components/pages/Pilates/Configuration/ConfigurationPage";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: new Auth(this.props.history)
    };
  }

  render() {
    const { auth } = this.state;
    return (
      <AuthContext.Provider value={auth}>
        <NavigationBar auth={auth} />
        <Switch>
          <PublicRoute path="/" component={Home} exact />
          <PublicRoute path="/Login" component={Login} />
          <PublicRoute path="/Callback" component={Callback} />

          <PrivateRoute path="/Profile" component={Profile} />
          <PrivateRoute
            path="/General/Profesionales"
            component={Professionals}
          />
          <PrivateRoute path="/General/Movimientos" component={Movements} />

          <PrivateRoute path="/Pilates/Alumnos" component={StudentPage} />
          <PrivateRoute
            path="/Pilates/Horarios"
            component={ClassManagementPage}
          />
          <PrivateRoute path="/Pilates/Clases" component={WeeklyClassPage} />
          <PrivateRoute
            path="/Pilates/HorasProfesores"
            component={ProfessionalWorkDayPage}
          />
          <PrivateRoute
            path="/Pilates/PagoProfesores"
            component={ProfessionalPaymentPage}
          />
          <PrivateRoute path="/Pilates/Cuotas" component={FeePage} />
          <PrivateRoute
            path="/Pilates/Configuracion"
            component={ConfigurationPage}
          />

          <Route component={PageNotFound} />
        </Switch>
        <ToastContainer autoClose={5000} draggable={false} />
      </AuthContext.Provider>
    );
  }
}

export default App;
