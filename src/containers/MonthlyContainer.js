import React from 'react'
import MonthlyBudgetBar from './MonthlyBudgetBar'
import { Button } from 'semantic-ui-react'


export default class MonthlyContainer extends React.Component {


    showBudgets = () => {
        console.log(this.props.allBudgets)
        return this.props.allBudgets.map(budget => {
            return <MonthlyBudgetBar budget={budget} deleteTransaction={this.props.deleteTransaction} currentDateObj={this.props.currentDateObj} deleteBudget={this.props.deleteBudget}/>
        })
    }

    showCurrentDate = () => {
        // let date = new Date()
        return (
            <h1>{this.props.currentMonth}</h1>
            // <h1>{`${date}`}</h1>
        )
    }

    render() {
        return (
            <div style={{color: "white", textAlign: "center"}}>
                <br></br>
                {this.showCurrentDate()}
                <Button inverted color="yellow" onClick={() => this.props.changeMonth(-1)}>Previous</Button>
                <Button inverted color="blue" onClick={() => this.props.changeMonth(1)}>Next</Button>
                <br></br>
                <br></br>
                {this.showBudgets()}
                <br></br>
            </div>
        )
    }
}