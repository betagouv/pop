import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import Avatar from '../../components/avatar'

import authAction from './../../redux/auth/actions'
const { logout } = authAction


import './user.css'

class User extends Component {

  state = {
    dropdownOpen: false
  }

  logout() {
    this.props.logout()
  }

  renderSigninSignup() {
    if (this.props.account) {
      return <div />
    }
    return (
      <Link className='label connect' to='/auth/signin'>Register</Link>
    )
  }

  renderPicto() {
    if (!this.props.account) {
      return <div />
    }
    return (
      <Dropdown
        isOpen={true}
        className="DropDownCont"
        toggle={() => { }}
      >
        <DropdownToggle className="UserImageContainer">
          <Avatar
            email={this.props.account.email}
            photoURL={this.props.account.photoURL}
            toggle={() => this.setState({ dropdownOpen: !this.state.dropdownOpen })}
            isOpen={this.state.dropdownOpen}
          />
        </DropdownToggle>
        <DropdownMenu className="DropDown">
          <DropdownItem className="dropdown-header" header>Settings</DropdownItem>
          <DropdownItem className="dropdown-item"> <Link to='/settings'>My Account</Link></DropdownItem>
          <DropdownItem className="dropdown-item" onClick={this.logout.bind(this)}>Logout</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    )
  }

  render() {
    return (
      <div className="User">
        {this.renderSigninSignup()}
        {this.renderPicto()}
      </div>
    )
  }
}

const mapStateToProps = ({ Auth }) => {
  return { account: Auth.account }
}

export default connect(mapStateToProps, { logout })(User)

