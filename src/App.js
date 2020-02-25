import React from 'react';
// import logo from './images/DailyDollarNoBack.png';
import './style.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
// import { Menu } from 'semantic-ui-react'
// import FacebookLogin from 'react-facebook-login';
// import GoogleLogin from 'react-google-login';
import NavBar from './components/Navbar'
import Home from './components/Home'
import LoginContainer from './containers/LoginContainer'
import DailyContainer from './containers/DailyContainer'
import MonthlyContainer from './containers/MonthlyContainer';
import CreateBudgetContainer from './containers/CreateBudgetContainer';
import AddTransactionContainer from './containers/AddTransactionContainer'



export default class App extends React.Component {

  state = {
    userId: "",
    name: "",
    email: "",
    outId: "",
    loggedIn: false,
    allBudgets: "",
    dailyBudgets: ""
    }

    //hard-coded logged in to true to avoid logging in constantly during testing

    logout = () => {
      this.setState({
        userId: "",
        name: "",
        email: "",
        outId: "",
        loggedIn: false,
        allBudgets: "",
        dailyBudgets: ""
      })
    }

    fetchBudgets = (userId) => {
      fetch(`http://localhost:3000/userbudgets/${userId}`)
      .then(res => res.json())
      .then(data => this.setState({
        allBudgets: data
      }))
      fetch(`http://localhost:3000/dailybudgets/${userId}`)
      .then(res => res.json())
      .then(data => this.setState({
        dailyBudgets: data
      }))
    }

    // fetchDailyBudgets = (userId) => {
      
    // }

    setUserStates = (data) => {
      console.log(data)
      this.setState({
        userId: data.id,
        name: data.name,
        email: data.email,
        outId: data.indiv,
        loggedIn: true
      }, () => this.fetchBudgets(1))
    }

    

    navigation = () => {
      if(this.state.loggedIn) {
        // this.fetchUsersBudgets(this.state.userId)
        // this.fetchUsersBudgets(1)
        // this.fetchDailyBudgets(1)
        //hard coded to 1 for now to get data to play with
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
                render={props => <DailyContainer {...props} dailyBudgets={this.state.dailyBudgets}/>}
                />
              <Route
                path="/monthly"
                render={props => <MonthlyContainer {...props} allBudgets={this.state.allBudgets}/>}
              />
              <Route
                path="/addTransaction"
                render={props => <AddTransactionContainer {...props} />}
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