import React, {Component} from 'react';
import Home from './components/Home';
import Test from './components/Test';
import Login from './components/Login';
import Navigation from './components/Navigation/Navigation';
import Auth from './components/Auth/Auth';
import Callback from './components/Auth/Callback';
import Profile from './components/Profile';
import PrivateRoute from './components/Navigation/PrivateRoute';
import PublicRoute from './components/Navigation/PublicRoute';
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
        <PrivateRoute path="/Test" component={Test} />
        <PrivateRoute path="/Profile" component={Profile}/>
      </AuthContext.Provider>
    );
  }
}

export default App;