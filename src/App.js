import React from 'react';
import logo from './images/DailyDollarNoBack.png';
import './style.css';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Menu } from 'semantic-ui-react'
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';



class App extends React.Component {

  state = {
    name: "",
    email: "",
    outId: "",
    loggedIn: false
  }

  render() {

    const setUserStates = (data) => {
      this.setState({
        name: data.name,
        email: data.email,
        outId: data.indiv
      })
    }

    const responseFacebook = (res) => {
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
      .then(data => setUserStates(data))
    }

    const responseGoogle = (res) => {
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
      .then(data => setUserStates(data))
    }
    
    const responseGoogleFailure = (response) => {
      alert("Login Failed")
      console.log("LOGIN FAILED : ", response)
    }

    return (
      <div className="App" style={{textAlign: "center"}}>
        <br></br>
        <br></br>
        {/* <h1>Daily Dollar</h1> */}
        <img className="mainLogo" src={logo} alt="Daily Dollar Logo"></img>
        {/* <h2>Login with Google or Facebook</h2> */}

        <br></br>
        <br></br>

      <FacebookLogin
        appId="585146412339575"
        fields="name,email,picture"
        callback={responseFacebook}
      />
      <br />
      <br />


      <GoogleLogin
        clientId="1003783796325-kaolh7f7iul1uph6nt6hulv0mb5ami75.apps.googleusercontent.com"
        buttonText="LOGIN WITH GOOGLE"
        onSuccess={responseGoogle}
        onFailure={responseGoogleFailure}
      />

      </div>
    );
  }

}

export default App;