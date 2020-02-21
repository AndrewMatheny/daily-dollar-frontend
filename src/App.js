import React from 'react';
import logo from './logo.svg';
import './App.css';

import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';


class App extends React.Component {

  render() {

    const responseFacebook = (response) => {
      console.log(response);
    }

    const responseGoogle = (response) => {
      console.log(response);
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
        onFailure={responseGoogle}
      />

      </div>
    );
  }

}

export default App;