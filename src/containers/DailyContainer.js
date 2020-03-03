import React from 'react'
import BudgetBar from './BudgetBar'
import { Button } from 'semantic-ui-react'


export default class DailyContainer extends React.Component {


    showBudgets = () => {
        console.log(this.props.dailyBudgets)
        return this.props.dailyBudgets.map(budget => {
            return <BudgetBar budget={budget} deleteTransaction={this.props.deleteTransaction}/>
        })
    }

    showCurrentDate = () => {
        // let date = new Date()
        return (
            <h1>{this.props.currentDate}</h1>
        )
    }

    render() {
        return (
            <div style={{color: "white", textAlign: "center"}}>
                <br></br>
                <Button inverted color="yellow" onClick={() => this.props.changeDay(-1)}>Previous</Button>{this.showCurrentDate()}<Button inverted color="blue" onClick={() => this.props.changeDay(1)}>Next</Button>
                
                
                <br></br>
                <br></br>
                {this.showBudgets()}
                <br></br>
            </div>
        )
    }
}