import React from 'react';
// import logo from './images/DailyDollarNoBack.png';
import './style.css';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
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
    dailyBudgets: "",
    currentDate: "",
    currentMonth: ""
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
        dailyBudgets: "",
        currentDate: "",
        currentMonth: ""
      })
    }

    // changeCurrentDate

    setCurrentDate = () => {
      let dateObj = new Date()
      let year = dateObj.getFullYear()
      let month = dateObj.getMonth() + 1
      let day = dateObj.getDate()
      let date = `${month} / ${day} / ${year}`
      let mdate = `${month} / ${year}`
      this.setState({
          currentDate: date,
          currentMonth: mdate
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
      .then(this.setCurrentDate())
    }

    updateBudgetState = (budgetObj) => {
      let prevAll = this.state.allBudgets
      let prevDaily = this.state.dailyBudgets
      if(budgetObj.daily) {
        prevAll.push(budgetObj)
        prevDaily.push(budgetObj)
        this.setState({
          allBudgets: prevAll,
          dailyBudgets: prevDaily
        })
      } else {
        prevAll.push(this.state.allBudgets)
        this.setState({
          allBudgets: prevAll
        })
      }
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
      }, () => this.fetchBudgets(this.state.userId)) //hard coded to user 1 currently to have data to play with
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
                render={props => <DailyContainer {...props} dailyBudgets={this.state.dailyBudgets} currentDate={this.state.currentDate}/>}
                />
              <Route
                path="/monthly"
                render={props => <MonthlyContainer {...props} allBudgets={this.state.allBudgets} currentMonth={this.state.currentMonth}/>}
              />
              <Route
                path="/addTransaction"
                render={props => <AddTransactionContainer {...props} userId={this.state.userId} allBudgets={this.state.allBudgets} fetchBudgets={this.fetchBudgets}/>}
              />
              <Route
                path="/createbudget"
                render={props => <CreateBudgetContainer {...props} userId={this.state.userId} updateBudgetState={this.updateBudgetState}/>}
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
                <Redirect to="/"/>
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