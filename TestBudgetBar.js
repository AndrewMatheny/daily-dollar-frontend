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

    formatTransactionDate = (dateObjFromRails) => {
        let transactionDate = new Date(dateObjFromRails)
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

        const filteredTransactions = allTransactions.filter(transaction => {
            return this.formatTransactionDate(transaction.date) === formatDate
            })
        return filteredTransactions
        // let filterTransactions = []

        // return allTransactions.map(transaction => {
        //     let transactionDate = new Date(transaction.date)
        //     let tday = transactionDate.getDate()
        //     if(tday < 10) {
        //         tday = `0${tday}`
        //     }
        //     let tmonth = transactionDate.getMonth() + 1
        //     if(tmonth < 10) {
        //         tmonth = `0${tmonth}`
        //     }
        //     let formatTransactionDate = `${tmonth}/${tday}/${transactionDate.getFullYear()}`

            // if(formatTransactionDate === formatDate) {
            //     filterTransactions.push(transaction)
            //     return transaction
            // }
    }

    calculateSpent = () => {
        let transactions = this.matchTransactionDate()
        console.log(transactions)
    }

    render() {
        // console.log(this.props.budget)
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