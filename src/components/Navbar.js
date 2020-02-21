import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import {Redirect, Link} from 'react-router-dom'

// let background = 'https://www.smartertravel.com/uploads/2017/06/road_trip_tips_hero-1400x500.jpg'

export default class NavBar extends Component {
//   state = { activeItem: 'home' }

//   handleItemClick = (e, { name }) => this.setState({ activeItem: name })

//   style = {
//   color: "white",
//   fontSize: "1.25em"
//   }

//   handleLogout = () => {
//     this.props.logout()
//       return (
//         <Redirect to="/" />
//       )
//   }

  render() {
	const { activeItem } = this.state
	
    return (
      <div style={this.style}>
        <Menu pointing secondary>
          {/* <Menu.Item
		  	    style={this.style}
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          /> */}
          <Link to="/">
          <Menu.Item
		  	    style={this.style}
            name='trips'
            active={activeItem === 'trips'}
            onClick={this.handleItemClick}
          /></Link>
          
          <Menu.Menu position='right'>
            <Link to="/">
            <Menu.Item
			        style={this.style}
              name='logout'
              active={activeItem === 'logout'}
              onClick={this.handleLogout}
            /></Link>
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}