import React from "react"
import { Progress, Segment } from 'semantic-ui-react'
// import { Link } from 'react-router-dom'

const CustomBar = props => {

  return (
      <div style={{textAlign: 'center'}}>
          <Segment inverted>
                    <Progress inverted value={props.value} total={props.total} progress='ratio' color="green"/>
            </Segment>
      </div>
  );
};

export default CustomBar