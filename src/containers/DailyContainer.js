import React from 'react'
import BudgetBar from './BudgetBar'


export default class DailyContainer extends React.Component {


    showBudgets = () => {
        console.log(this.props.dailyBudgets)
        return this.props.dailyBudgets.map(budget => {
            return <BudgetBar budget={budget}/>
        })
    }

    showCurrentDate = () => {
        return (
            <h1>{this.props.currentDate}</h1>
        )
    }

    render() {
        return (
            <div style={{color: "white", textAlign: "center"}}>
                <br></br>
                {this.showCurrentDate()}
                <br></br>
                <br></br>
                {this.showBudgets()}
            </div>
        )
    }
}