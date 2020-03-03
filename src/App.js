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
    currentMonth: "",
    currentDateObj: ""
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
        currentMonth: "",
        currentDateObj: ""
      })
    }

    // changeCurrentDate
    changeDay = (num) => {
      let dateObj = this.state.currentDateObj
      dateObj.setDate(dateObj.getDate() + num)
      // console.log(dateObj)
      let year = dateObj.getFullYear()
      let month = dateObj.getMonth() + 1
      let day = dateObj.getDate()
      let date = `${month}/${day}/${year}`
      let mdate = `${month}/${year}`
      this.setState({
        currentDate: date,
        currentMonth: mdate
    })
    }

    changeMonth = (num) => {
      let dateObj = this.state.currentDateObj
      dateObj.setMonth(dateObj.getMonth() + num)
      // console.log(dateObj)
      let year = dateObj.getFullYear()
      let month = dateObj.getMonth() + 1
      let day = dateObj.getDate()
      let date = `${month}/${day}/${year}`
      let mdate = `${month}/${year}`
      this.setState({
        currentDate: date,
        currentMonth: mdate
    })
    }

    setCurrentDate = () => {
      let dateObj = new Date()
      let year = dateObj.getFullYear()
      let month = dateObj.getMonth() + 1
      let day = dateObj.getDate()
      let date = `${month}/${day}/${year}`
      let mdate = `${month}/${year}`
      this.setState({
          currentDate: date,
          currentMonth: mdate,
          currentDateObj: dateObj
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
        }, () => this.fetchBudgets(this.state.userId))
      } else {
        prevAll.push(this.state.allBudgets)
        this.setState({
          allBudgets: prevAll
        }, () => this.fetchBudgets(this.state.userId))
      }
    }



    setUserStates = (data) => {
      // console.log(data)
      this.setState({
        userId: data.id,
        name: data.name,
        email: data.email,
        outId: data.indiv,
        loggedIn: true
      }, () => this.fetchBudgets(this.state.userId)) //hard coded to user 1 currently to have data to play with
    }

    deleteTransaction = transaction => {
      fetch(`http://localhost:3000/transactions/${transaction.id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => res.json())
      .then(() => this.fetchBudgets(this.state.userId))
    }

    deleteBudget = budget => {
      // console.log(budget)
      fetch(`http://localhost:3000/budgets/${budget.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => res.json())
      .then(() => this.fetchBudgets(this.state.userId))
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
                render={props => <DailyContainer {...props} dailyBudgets={this.state.dailyBudgets} currentDate={this.state.currentDate} deleteTransaction={this.deleteTransaction} changeDay={this.changeDay} currentDateObj={this.state.currentDateObj} deleteBudget={this.deleteBudget}/>}
                />
              <Route
                path="/monthly"
                render={props => <MonthlyContainer {...props} allBudgets={this.state.allBudgets} currentMonth={this.state.currentMonth} deleteTransaction={this.deleteTransaction} changeMonth={this.changeMonth} currentDateObj={this.state.currentDateObj} deleteBudget={this.deleteBudget}/>}
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