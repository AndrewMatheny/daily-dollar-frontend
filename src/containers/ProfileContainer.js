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
            <div style={{color: "white", textAlign: "center", margin: '40px', padding: '3rem'}}>
                <h1>PROFILE CONTAINER</h1>
                <h1>{this.props.name}</h1>
                <h2>{this.props.email}</h2>
                <h2>{this.props.income}</h2>
                <Container>
                    <Form inverted onSubmit={(e) =>this.handleSubmit(e)}>
                        <Header textAlign='center' style={{color: "White"}}>Add/Update Monthly Income</Header>
                        <Form.Group widths='equal'>
                            <Form.Field
                                control={Input}
                                name="incomeInput"
                                label='Monthly Income'
                                placeholder='Monthly Income - ex: $3000'
                                value={this.state.incomeInput}
                                onChange={this.handleChange}
                            />
        
                        </Form.Group>
                        <Form.Field control={Button}>Submit</Form.Field>
                    </Form>
                </Container>
            </div>
        )
    }
}