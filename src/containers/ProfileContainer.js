import React from 'react'
// import { Button } from 'semantic-ui-react'


export default class ProfileContainer extends React.Component {


    render() {
        return (
            <div style={{color: "white", textAlign: "center"}}>
                <h1>PROFILE CONTAINER</h1>
                <h1>{this.props.name}</h1>
                <h2>{this.props.email}</h2>
            </div>
        )
    }
}