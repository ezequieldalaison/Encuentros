import React, {Component} from 'react';
import Home from './components/Home';
import Area from './components/pages/General/Area';
import Login from './components/Login';
import Navigation from './components/navigation/Navigation';
import Auth from './components/auth/Auth';
import Callback from './components/auth/Callback';
import Profile from './components/Profile';
import PrivateRoute from './components/navigation/PrivateRoute';
import PublicRoute from './components/navigation/PublicRoute';
import AuthContext from './contexts/AuthContext';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: new Auth(this.props.history)
    };
  }

  render(){
    const {auth} = this.state;
    return (
      <AuthContext.Provider value={auth}>
        <Navigation auth={auth} />
        <PublicRoute path="/" component={Home} exact />
        <PublicRoute path="/Login" component={Login} />
        <PublicRoute path="/Callback" component={Callback} />
        <PrivateRoute path="/Area" component={Area} />
        <PrivateRoute path="/Profile" component={Profile}/>
      </AuthContext.Provider>
    );
  }
}

export default App;