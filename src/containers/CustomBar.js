import React from "react"
import { Progress, Segment } from 'semantic-ui-react'
// import { Link } from 'react-router-dom'

class CustomBar extends React.Component {

    renderBar = () => {
        let value = this.props.value
        let total = this.props.total
        if(value/total > 0.8) {
            return (
                <div style={{display: 'inline-block', width: "80%"}}>
                <Segment inverted>
                            <Progress inverted value={this.props.value} total={this.props.total} progress='ratio' color="red" size="large"/>
                    </Segment>
            </div>
            )
        } else if(value/total <= 0.5) {
            return (
                <div style={{display: 'inline-block', width: "80%"}}>
                <Segment inverted>
                            <Progress inverted value={this.props.value} total={this.props.total} progress='ratio' color="green" size="large"/>
                    </Segment>
            </div>
            )
        } else {
            return (
                <div style={{display: 'inline-block', width: "80%"}}>
                <Segment inverted>
                            <Progress inverted value={this.props.value} total={this.props.total} progress='ratio' color="yellow" size="large"/>
                    </Segment>
            </div>
            )
        }
    }

    render() {
        return (
            this.renderBar()
            );
        };
}

export default CustomBar