import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'

export default class NavBar extends Component {
  state = { activeItem: '' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  style = {
  color: "#A7A7A9",
  // borderBottomColor: "#A7A7A9",
  backgroundColor: "#494949"
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
        <Menu pointing secondary style={this.style}>
          {/* <Menu.Item
		  	  
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          /> */}
          <Menu.Item style={this.style}
            as={NavLink}
            to="/daily"
            name='daily'
            active={activeItem === 'daily'}
            onClick={this.handleItemClick}
          />

          <Menu.Item style={this.style}
            as={NavLink}
            to="/monthly"
            name='monthly'
            active={activeItem === 'monthly'}
            onClick={this.handleItemClick}
          />
          
          <Menu.Menu position='right'>

            <Menu.Item style={this.style}
              as={NavLink}
              to="/createbudget"
              name='create a budget'
              active={activeItem === 'create a budget'}
              onClick={this.handleItemClick}
            />

            <Menu.Item style={this.style}
			      
              name='logout'
              active={activeItem === 'logout'}
              onClick={this.props.logout}
            />
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}