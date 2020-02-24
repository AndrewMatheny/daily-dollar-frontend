import React from 'react';
// import logo from './images/DailyDollarNoBack.png';
import './style.css';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
// import { Menu } from 'semantic-ui-react'
// import FacebookLogin from 'react-facebook-login';
// import GoogleLogin from 'react-google-login';
import NavBar from './components/Navbar'
import Home from './components/Home'
import LoginContainer from './containers/LoginContainer'
import DailyContainer from './containers/DailyContainer'
import MonthlyContainer from './containers/MonthlyContainer';
import CreateBudgetContainer from './containers/CreateBudgetContainer';




export default class App extends React.Component {

  state = {
    name: "",
    email: "",
    outId: "",
    loggedIn: false
    }

    //hard-coded logged in to true to avoid logging in constantly during testing

    logout = () => {
      this.setState({
        name: "",
        email: "",
        outId: "",
        loggedIn: false
      })
    }

    setUserStates = (data) => {
      this.setState({
        name: data.name,
        email: data.email,
        outId: data.indiv,
        loggedIn: true
      })
    }

    navigation = () => {
      if(this.state.loggedIn) {
        return (
          <div>
            <Router>
              <NavBar logout={this.logout}/>
              <Route 
                path="/"
                exact
                render={props => <Home {...props} />}/>

              <Route
                path="/daily"
                render={props => <DailyContainer {...props} />}
                />
              <Route
                path="/monthly"
                render={props => <MonthlyContainer {...props} />}
              />
              <Route
                path="/createbudget"
                render={props => <CreateBudgetContainer {...props} />}
              />
            </Router>
          </div>
        )
      }
      else {
        return (
          <div>
            
            <Router>
              <Route 
                path="/"
                exact
                render={props => <LoginContainer {...props} setUserStates={this.setUserStates}/>}
                />
            </Router>
          </div>
        )
      }
    }
    
  render() {
    return (
      <div>
        {this.navigation()}
      </div>
    );
  };
}