import React from "react"
// import { Link } from 'react-router-dom'
import logo from '../images/DailyDollarNoBack.png';
import { Container, Grid, Header, Divider, Image, List, Segment } from "semantic-ui-react"


const Home = () => (
    <div>
  
      <Container text style={{ marginTop: '7em', color:"white", textAlign: "center" }}>
        {/* <Header as='h1'>Semantic UI React Fixed Template</Header> */}
        
        <div style={{textAlign: 'center', color: "white"}}>
            <img className="mainLogo" src={logo} alt="Daily Dollar Logo"></img>
        </div>

        <h1>Welcome to Daily Dollar</h1>
        <br></br>
        <p>The concept behind Daily Dollar is to help people budget certain categories on a day to day basis.</p>
        <p>Giving people an amount that they can spend daily on lunch, shopping, entertainment, etc.</p>
        <p>
          This can help people stay within their monthly allocations for different budgets.
        </p>
  
      </Container>
  
      <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
        <Container textAlign='center'>
          <Grid divided inverted stackable>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Group 1' />
              <List link inverted>
                <List.Item as='a'>Link One</List.Item>
                <List.Item as='a'>Link Two</List.Item>
                <List.Item as='a'>Link Three</List.Item>
                <List.Item as='a'>Link Four</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Group 2' />
              <List link inverted>
                <List.Item as='a'>Link One</List.Item>
                <List.Item as='a'>Link Two</List.Item>
                <List.Item as='a'>Link Three</List.Item>
                <List.Item as='a'>Link Four</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Group 3' />
              <List link inverted>
                <List.Item as='a'>Link One</List.Item>
                <List.Item as='a'>Link Two</List.Item>
                <List.Item as='a'>Link Three</List.Item>
                <List.Item as='a'>Link Four</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header inverted as='h4' content='About The Creator' />
              <p>
                Drew Matheny is a full-stack developer in Seattle, WA.  
              </p>
            </Grid.Column>
          </Grid>
  
          <Divider inverted section />
          <Image centered size='mini' src={logo} />
          <List horizontal inverted divided link size='small'>
            <List.Item as='a' href='#'>
              Site Map
            </List.Item>
            <List.Item as='a' href='#'>
              Contact Us
            </List.Item>
            <List.Item as='a' href='#'>
              Terms and Conditions
            </List.Item>
            <List.Item as='a' href='#'>
              Privacy Policy
            </List.Item>
          </List>
        </Container>
      </Segment>
    </div>
  )
  

export default Home