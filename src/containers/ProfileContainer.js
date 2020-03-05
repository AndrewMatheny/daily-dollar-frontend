import React from 'react'
import { Button, Form, Container, Input, Header } from 'semantic-ui-react'


export default class ProfileContainer extends React.Component {

    state = {
        incomeInput: ""
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        let submitIncome = this.state.incomeInput
        //reset field on submit
        this.setState({
            incomeInput: ""
        })
        alert("Income Submitted")
        fetch(`http://localhost:3000/users/${this.props.userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id: this.props.userId,
                income: submitIncome
                
            })
        }).then(res => res.json())
        // .then(console.log)
        .then(data => this.props.updateUserState(data))
      }

    render() {
        return ( 
        <Container>
            <div style={{margin: '40px', padding: '3rem'}}>

                <div style={{color: "white", textAlign:"center"}}>
                    {/* <h1>PROFILE CONTAINER</h1> */}
                    <h1>{this.props.name}</h1>
                    <h2>{this.props.email}</h2>
                    <h2>Monthly Income - {this.props.income}</h2>
                    <br></br>

                </div>

                    <Form inverted onSubmit={(e) =>this.handleSubmit(e)}>
                    {/* <Header textAlign='center' style={{color: "White"}}>{this.props.name}</Header>
                    <Header textAlign='center' style={{color: "White"}}>{this.props.income}</Header> */}
                        <Header textAlign='center' style={{color: "White", justifyContent: "center"}}>Add/Update Monthly Income</Header>
                        <Form.Group style={{justifyContent: "center"}}>
                            <Form.Input
                                control={Input}
                                name="incomeInput"
                                // label='Monthly Income'
                                placeholder='Monthly Income - ex: $3000'
                                value={this.state.incomeInput}
                                onChange={this.handleChange}
                            />
                            <Form.Field control={Button}>Submit</Form.Field>
                        </Form.Group>
                        
                    </Form>
                
            </div>
            </Container>
        )
    }
}