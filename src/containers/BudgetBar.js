import React from 'react'
import { Button, Progress, Segment } from 'semantic-ui-react'
import TransactionTable from './TransactionTable'


export default class BudgetBar extends React.Component {

    state = {
        showTransactions: false,
        dailyTransactions: ""
    }

    componentDidMount() {
        this.setDailyTransactions()
    }
    
    componentWillReceiveProps() {
        this.setDailyTransactions()
    }
    
    setDailyTransactions = () => {
        let dailyT = this.matchTransactionDate()
        this.setState({
            dailyTransactions: dailyT
        })
    }

    handleClick = () => {
        this.setState(prevState => ({
          showTransactions: !prevState.showTransactions
        }))
    }

    filterDailyTransactions = transactionObj => {
        this.props.deleteTransaction(transactionObj)
        let newDaily = this.state.dailyTransactions.filter(transaction => transaction !== transactionObj)
        this.setState({
            dailyTransactions: newDaily
        })
    }

    showTransactions = () => {
        
        if(this.state.showTransactions) {
            let dailyBudget = { transactions: this.state.dailyTransactions}
            // console.log("THIS BUDGET:", this.props.budget)
            // console.log("FORMATTED BUDGET:", dailyBudget)
            return (
                <TransactionTable budget={dailyBudget} deleteTransaction={this.filterDailyTransactions} />
            )
        }
    }

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
        // console.log("CURRENTDATEOBJ:", this.props.currentDateObj)
        let currentDate = this.props.currentDateObj
        let month = currentDate.getMonth() + 1
        if(month < 10) {
            month = `0${month}`
        }
        let day = currentDate.getDate()
        if(day < 10) {
            day = `0${day}`
        }

        let formatDate = `${month}/${day}/${currentDate.getFullYear()}`
        // console.log("FORMAT DATE", formatDate)
        // console.log("PROP DATE", this.props.currentDate)

        // let formatDate = this.props.currentDate

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
                <h1>{this.props.budget.name} Daily Budget</h1>
                <h1>{spend} / {((this.props.budget.limit)/30.4).toFixed(2)}</h1>
                <Segment inverted>
                    <Progress inverted value={spend} total={((this.props.budget.limit)/30.4).toFixed(2)} progress='ratio' color="green"/>
                </Segment>
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