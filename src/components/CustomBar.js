import React from "react"
import { Progress, Segment } from 'semantic-ui-react'
// import { Link } from 'react-router-dom'

const CustomBar = props => {

  return (
      <div style={{display: 'inline-block', width: "80%"}}>
          <Segment inverted>
                    <Progress inverted value={props.value} total={props.total} progress='ratio' color="green" size="large"/>
            </Segment>
      </div>
  );
};

export default CustomBar