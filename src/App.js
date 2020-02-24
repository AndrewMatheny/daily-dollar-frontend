import React from 'react';
import logo from './images/DailyDollarNoBack.png';
import './style.css';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Menu } from 'semantic-ui-react'
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import NavBar from './components/Navbar'
import Home from './components/Home'




export default class App extends React.Component {

  state = {
    name: "",
    email: "",
    outId: "",
    loggedIn: true
    }

    //hard-coded logged in to true to avoid logging in constantly during testing

 

    setUserStates = (data) => {
      this.setState({
        name: data.name,
        email: data.email,
        outId: data.indiv,
        loggedIn: true
      })
    }

    responseFacebook = (res) => {
      console.log(res);
      console.log(res.name)
      console.log(res.email)
      console.log(res.userID)
      fetch(`http:localhost:3000/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          indiv: res.userID,
          name: res.name,
          email: res.email
        })
      }).then(res => res.json())
      .then(data => this.setUserStates(data))
    }

    responseGoogle = (res) => {
      console.log(res);
      console.log(res.profileObj.name)
      console.log(res.profileObj.email)
      console.log(res.googleId)
      fetch(`http:localhost:3000/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          indiv: res.googleId,
          name: res.profileObj.name,
          email: res.profileObj.email
        })
      }).then(res => res.json())
      .then(data => this.setUserStates(data))
    }
    
    responseGoogleFailure = (response) => {
      alert("Login Failed")
      console.log("LOGIN FAILED : ", response)
    }

    navigation = () => {
      if(this.state.loggedIn) {
        return (
          <div>
            <Router>
              <NavBar />
              <Route 
                path="/"
                exact
                render={props => <Home {...props} />}/>

              {/* <div className="App" style={{textAlign: "center"}}>
              <br></br>
              <br></br>
              <img className="mainLogo" src={logo} alt="Daily Dollar Logo"></img> */}
              {/* </div> */}

            </Router>
          </div>
        )
      }
      else {
        return (
          <div>

            <div className="App" style={{textAlign: "center"}}>
              <br></br>
              <br></br>
              {/* <h1>Daily Dollar</h1> */}
              <img className="mainLogo" src={logo} alt="Daily Dollar Logo"></img>
              <h2 style={{color: "white"}}>Login with Google or Facebook</h2>
            

            <br></br>
            <br></br>
      
              <FacebookLogin
                appId="585146412339575"
                fields="name,email,picture"
                callback={this.responseFacebook}
              />
              <br />
              <br />
      
      
              <GoogleLogin
                clientId="1003783796325-kaolh7f7iul1uph6nt6hulv0mb5ami75.apps.googleusercontent.com"
                buttonText="LOGIN WITH GOOGLE"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogleFailure}
              />
            </div>
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