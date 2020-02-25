import React from 'react'

export default class BudgetBar extends React.Component {

    

    render() {
        console.log(this.props.budget)
        return (
            <div style={{color: "white", textAlign: "center"}}>
                <br></br>
                <br></br>
                <h1>Spent / {this.props.budget.limit}</h1>
            </div>
        )
    }
}