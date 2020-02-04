import React from 'react'

let currentDate = new Date()
let month = currentDate.getMonth() + 1
if(month < 10) {
    month = `0${month}`
}
let day = currentDate.getDate()
if(day < 10) {
    day = `0${day}`
}

let formatDate = `${month}/${day}/${currentDate.getFullYear()}`

export default class BudgetBar extends React.Component {

    calculateSpent = () => {
        let allTransactions = this.props.budget.transactions
        // console.log(formatDate)
        let filterTransactions = []
        // console.log(allTransactions)
        return allTransactions.map(transaction => {
            let transactionDate = new Date(transaction.date)
            let tday = transactionDate.getDate()
            if(tday < 10) {
                tday = `0${tday}`
            }
            let tmonth = transactionDate.getMonth() + 1
            if(tmonth < 10) {
                tmonth = `0${tmonth}`
            }
            let formatTransactionDate = `${tmonth}/${tday}/${transactionDate.getFullYear()}`
            console.log(formatTransactionDate)
            console.log(formatDate)
            if(formatTransactionDate === formatDate) {
                return transaction
            }
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