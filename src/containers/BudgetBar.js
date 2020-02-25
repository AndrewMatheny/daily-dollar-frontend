import React from 'react'

export default class BudgetBar extends React.Component {

    calculateSpent = () => {
        let allTransactions = this.props.budget.transactions 
        console.log(allTransactions)
        return allTransactions.map(transaction => {
            return console.log(new Date(transaction.date))
        })
    }

    render() {
        console.log(this.props.budget)
        this.calculateSpent()
        return (
            <div style={{color: "white", textAlign: "center"}}>
                <br></br>
                <br></br>
                <h1>{this.props.budget.name} Daily Budget</h1>
                <h1>Spent / {((this.props.budget.limit)/30.4).toFixed(2)}</h1>
            </div>
        )
    }
}