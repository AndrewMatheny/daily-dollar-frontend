import React from "react"
import { Progress, Segment } from 'semantic-ui-react'
// import { Link } from 'react-router-dom'

class CustomBar extends React.Component {

    render() {
        return (
            <div style={{display: 'inline-block', width: "80%"}}>
                <Segment inverted>
                            <Progress inverted value={this.props.value} total={this.props.total} progress='ratio' color="green" size="large"/>
                    </Segment>
            </div>
            );
        };
}

export default CustomBar