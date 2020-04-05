import React from "react"
import { Progress, Segment } from 'semantic-ui-react'
// import { Link } from 'react-router-dom'

class CustomBar extends React.Component {

    renderBar = () => {
        let value = this.props.value
        let total = this.props.total
        let barColor = null
        if(value/total > 0.8) {
            barColor = "red"
        } else if(value/total <= 0.5) {
            barColor = "green"
        } else {
            barColor = "yellow"
        }

        return(
            <div style={{display: 'inline-block', width: "80%"}}>
                <Segment inverted>
                        <Progress inverted value={this.props.value} total={this.props.total} progress='ratio' color={barColor} size="large"/>
                </Segment>
            </div>
        )
    }

    render() {
        return (
            this.renderBar()
            );
        };
}

export default CustomBar