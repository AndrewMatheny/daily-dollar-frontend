import React from 'react'
import { Button, Form, Input, Checkbox, Container, Header } from 'semantic-ui-react'

export default class CreateBudgetContainer extends React.Component {

 state = {
    check: false,
    name: "",
    limit: ""
 }
    
      handleChange = (e) => {
          this.setState({
              [e.target.name]: e.target.value
          })
      }

      handleCheck = () => {
        this.setState(prevState => ({
          check: !prevState.check
        }))
      }

      handleSubmit = (e) => {
        let formData = {name: this.state.name, limit: parseInt(this.state.limit), daily: this.state.check, user_id: this.props.userId}
        this.setState({
            check: false,
            name: "",
            limit: ""
        })
        alert("Budget Submitted")
        fetch(`http://localhost:3000/budgets`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id: formData.user_id,
                name: formData.name,
                limit: formData.limit,
                daily: formData.daily
                
            })
        }).then(res => res.json())
        .then(data => this.props.updateBudgetState(data))
      }


      render() {
        return (
        <Container>
        {/* style={{opacity: 0.9}} */}
        <div style={{margin: '40px', padding: '3rem'}}>
          <Form inverted onSubmit={(e) =>this.handleSubmit(e)}> 
              <Header textAlign='center' style={{color: "White"}}>Add a Budget</Header>
              
            <Form.Group widths='equal'>
              <Form.Field
                control={Input}
                name="name"
                label='Name'
                placeholder='Name of Budget'
                value={this.state.name}
                onChange={this.handleChange}
              />
    
            </Form.Group>
            <Form.Group widths='equal'>
             <Form.Field
                control={Input}
                name="limit"
                label='Budget Monthly Limit'
                placeholder='Budget Monthly Limit ex: 1500 for $1500'
                value={this.state.limit}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
            <Checkbox 
                label="Daily Budget?"
                checked={this.state.check}
                onClick={() => this.handleCheck()}/>
            </Form.Group>

           
            <Form.Field control={Button}>Submit</Form.Field>
          </Form>
        </div>
        </Container>
        )
      }
    }
