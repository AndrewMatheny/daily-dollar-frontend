import React from 'react'
import MonthlyBudgetBar from './MonthlyBudgetBar'


export default class MonthlyContainer extends React.Component {


    showBudgets = () => {
        console.log(this.props.allBudgets)
        return this.props.allBudgets.map(budget => {
            return <MonthlyBudgetBar budget={budget}/>
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
                <br></br>
                <br></br>
                {this.showBudgets()}
                <br></br>
            </div>
        )
    }
}