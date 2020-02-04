import React from 'react'

const currentDate = new Date()
let month = currentDate.getMonth() + 1
if(month < 10) {
    month = `0${month}`
}
let day = currentDate.getDate()
if(day < 10) {
    day = `0${day}`
}

const formatDate = `${month}/${day}/${currentDate.getFullYear()}`

export default class BudgetBar extends React.Component {

    formatTransactionDate = (dateObjFromRails) => {
        let transactionDate = new Date(dateObjFromRails)
        // console.log("RAILS DATE: ", dateObjFromRails)
        // console.log("TRANACTION DATE: ", transactionDate )
        let tday = transactionDate.getDate()
        if(tday < 10) {
            tday = `0${tday}`
        }
        let tmonth = transactionDate.getMonth() + 1
        if(tmonth < 10) {
            tmonth = `0${tmonth}`
        }
        let formatTransactionDate = `${tmonth}/${tday}/${transactionDate.getFullYear()}`
        return formatTransactionDate
    }


    matchTransactionDate = () => {
        let allTransactions = this.props.budget.transactions

        // console.log(this.formatTransactionDate(allTransactions[1].date))

        const filteredTransactions = allTransactions.filter(transaction => {
            return this.formatTransactionDate(transaction.date) === formatDate
        })

        return filteredTransactions

    }

    calculateSpent = () => {
        let transactions = this.matchTransactionDate()
        let spent = transactions.map(transaction => {
            return parseFloat(transaction.amount)
        })
        //array of all amounts
        console.log(spent)
        let totalSpent = spent.reduce((a,b) => a + b, 0).toFixed(2)
        console.log("TOTAL SPENT", totalSpent)
        return totalSpent
    }

    render() {
        // console.log(this.props.budget)
        let spend = this.calculateSpent()
        return (
            <div style={{color: "white", textAlign: "center"}}>
                <br></br>
                <br></br>
                <h1>{this.props.budget.name} Daily Budget</h1>
                <h1>{spend} / {((this.props.budget.limit)/30.4).toFixed(2)}</h1>
            </div>
        )
    }
}