import React from 'react'
import BudgetBar from './BudgetBar'


export default class DailyContainer extends React.Component {

    showBudgets = () => {
        console.log(this.props.dailyBudgets)
        return this.props.dailyBudgets.map(budget => {
            return <BudgetBar budget={budget}/>
        })
    }

    render() {
        return (
            <div>
                <h1 style={{color: "white"}}>DAILY CONTAINER</h1>
                {this.showBudgets()}
            </div>
        )
    }
}