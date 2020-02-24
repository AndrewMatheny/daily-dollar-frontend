import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import {Redirect, Link} from 'react-router-dom'

// let background = 'https://www.smartertravel.com/uploads/2017/06/road_trip_tips_hero-1400x500.jpg'

export default class NavBar extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  style = {
  color: "white",
  fontSize: "1.25em"
  }

  // handleLogout = () => {
  //   this.props.logout()
  //     return (
  //       <Redirect to="/" />
  //     )
  // }

  render() {
	const { activeItem } = this.state
	
    return (
      <div>
        <Menu pointing secondary>
          {/* <Menu.Item
		  	  
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          /> */}
          <Menu.Item
		  	  
            name='daily'
            active={activeItem === 'daily'}
            onClick={this.handleItemClick}
          />
          
          <Menu.Menu position='right'>

            <Menu.Item
			      
              name='logout'
              active={activeItem === 'logout'}
              onClick={this.handleLogout}
            />
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}