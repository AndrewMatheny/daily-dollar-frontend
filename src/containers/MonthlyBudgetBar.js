import React from 'react'
import { Button } from 'semantic-ui-react'
import TransactionTable from './TransactionTable'
import CustomBar from './CustomBar'


export default class MonthlyBudgetBar extends React.Component {

    state = {
        showTransactions: false
        // monthlyTransactions: ""
    }

    // componentDidMount() {
    //     this.setMonthlyTransactions()
    // }

    // componentWillReceiveProps() {
    //     this.setMonthlyTransactions()
    // }

    handleClick = () => {
        this.setState(prevState => ({
          showTransactions: !prevState.showTransactions
        }))
    }

    // setMonthlyTransactions = () => {
    //     let monthlyT = this.matchTransactionDate()
    //     this.setState({
    //         monthlyTransactions: monthlyT
    //     })
    // }

    // filterMonthlyTransactions = transactionObj => {
    //     this.props.deleteTransaction(transactionObj)
        // this.showTransactions()
        // this.setMonthlyTransactions()
        // let newMonthly = this.state.monthlyTransactions.filter(transaction => transaction !== transactionObj)
        // this.setState({
        //     monthlyTransactions: newMonthly
        // })
    // }

    showTransactions = () => {
        if(this.state.showTransactions) {
            let monthlyBudget = { transactions: this.matchTransactionDate()}
            return (
                <TransactionTable budget={monthlyBudget} deleteTransaction={this.props.deleteTransaction}/>
            )
        }
    }

    formatTransactionDate = (dateObjFromRails) => {
        let transactionDate = new Date(dateObjFromRails)
        let tmonth = transactionDate.getMonth() + 1
        if(tmonth < 10) {
            tmonth = `0${tmonth}`
        }
        let formatTransactionDate = `${tmonth}/${transactionDate.getFullYear()}`
        return formatTransactionDate
    }


    matchTransactionDate = () => {
        let allTransactions = this.props.budget.transactions

        let currentDate = this.props.currentDateObj
        let month = currentDate.getMonth() + 1
        if(month < 10) {
            month = `0${month}`
        }
        let formatDate = `${month}/${currentDate.getFullYear()}`

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
        // console.log(spent)
        let totalSpent = spent.reduce((a,b) => a + b, 0).toFixed(2)
        // console.log("TOTAL SPENT", totalSpent)
        return totalSpent
    }

    render() {
        // console.log(this.props.budget)
        let spend = this.calculateSpent()
        return (
            <div style={{color: "white", textAlign: "center"}}>
                <br></br>
                <br></br>
                <h1>{this.props.budget.name} Monthly Budget</h1>
                <h1>{spend} / {this.props.budget.limit}</h1>
                <CustomBar value={spend} total={this.props.budget.limit}/>
                <br></br>
                <Button inverted color="red" onClick={() => this.props.deleteBudget(this.props.budget)}>Delete Budget</Button>
                <Button inverted color="green"
                onClick={() => this.handleClick()}>
                    Show Transactions
                </Button>
                {this.showTransactions()}
            </div>
        )
    }
}