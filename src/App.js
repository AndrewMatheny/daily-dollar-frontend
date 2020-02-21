import React from 'react';
// import logo from './logo.svg';
import './App.css';

import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';


class App extends React.Component {

  state = {
    name: "",
    email: "",
    outId: ""
  }

  render() {

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
      .then(console.log)
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
      .then(console.log)
    }
    
    const responseGoogleFailure = (response) => {
      alert("Login Failed")
      console.log("LOGIN FAILED : ", response)
    }

    return (
      <div className="App">
        <h1>Daily Dollar</h1>
        <h2>Login with Google or Facebook</h2>

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