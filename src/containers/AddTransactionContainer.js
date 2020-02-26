import React from 'react'
import { Button, Form, Input, Container, Header, Dropdown } from 'semantic-ui-react'
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

export default class AddTransactionContainer extends React.Component {

 state = {
    name: "",
    amount: "",
    date: new Date(),
    budget: "",
    budgets: [],
 }

    componentDidMount() {
        this.setBudgets()
    }

    setBudgets = () => {
        let options = []
        this.props.allBudgets.forEach(budget => {
            let optionObj = { key: `${budget.name}`, text: `${budget.name}`, value: budget.id}
            options.push(optionObj)
        })
        this.setState({
            budgets: options
        })
    }
    
      handleChange = (e) => {
          this.setState({
              [e.target.name]: e.target.value
          })
      }


      handleDateChange = date => {
          this.setState({
              date: date
          })
      }

      handleBudgetChange = (e, value) => {
          console.log(e.target)
        this.setState({
            budget: value.value
        })
      }

      handleSubmit = (e) => {
        let formData = {name: this.state.name, amount: parseFloat(this.state.amount), date: this.state.date, budget_id: this.state.budget, user_id: this.props.userId}
        this.setState({
            name: "",
            amount: "",
            date: "",
            budgetId: ""
        })
        // console.log(formData)
        alert("Transaction Submitted")
        fetch(`http://localhost:3000/transactions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id: formData.user_id,
                name: formData.name,
                amount: formData.amount,
                date: formData.date,
                budget_id: formData.budget_id
                
            })
        }).then(res => res.json())
        // .then(console.log)
            .then(data => this.props.fetchBudgets(data.user.id))
      }


      render() {
        return (
        <Container>
        <div style={{margin: '40px', padding: '3rem'}}>
          <Form inverted onSubmit={(e) =>this.handleSubmit(e)}> 
              <Header textAlign='center' style={{color: "White"}}>Add a Transaction</Header>
              
            <Form.Group widths='equal'>
              <Form.Field
                control={Input}
                name="name"
                label='Name of Transaction'
                placeholder='Name of Transaction ex: Amazon'
                value={this.state.name}
                onChange={this.handleChange}
              />
    
            </Form.Group>
            <Form.Group widths='equal'>
             <Form.Field
                control={Input}
                name="amount"
                label='Amount of Transaction'
                placeholder='Ex: 150.27 for $150.27'
                value={this.state.amount}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
                <DatePicker
                    selected={this.state.date}
                    onChange={this.handleDateChange}
                />
            </Form.Group>
            <Form.Group>
                <Dropdown
                fluid
                label='Budget'
                selection
                placeholder='Budget'
                value={this.state.budget}
                options={this.state.budgets}
                onChange={this.handleBudgetChange}
                />
            </Form.Group>

           
            <Form.Field control={Button}>Submit</Form.Field>
          </Form>
        </div>
        </Container>
        )
      }
    }
