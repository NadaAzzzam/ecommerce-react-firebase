import React, { useState, useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import firebase from '../config/fbConfig'
import { authContext } from '../store/context/authContext'


const SignedInLinks = (props) => {
  const openNav = {
    display: ' block',
    width: '200px',
    left: ' 0',
    top: '4rem',
    transformOrigin: '0px 0px',
    opacity: '1',
    transform: 'scaleX(1) scaleY(1)',

  }
  const closeNav = {
    opacity: '0',
    transform: 'scaleX(0) scaleY(0)',

  }

  const history = useHistory();

  useEffect(() => {
    firebase.getUserState().then(user => {
      if (user) {
        SetUserState(user)
      }
    })
  })
  const logOut = () => {
    firebase.logout();
    SetUserState(null)
    history.push("/login");
    return dispatch({
      type: "LOGOUT",
      payload: {}
    })
  }
  const { state, dispatch } = React.useContext(authContext)
  const [showNavToggState, SetshowNavToggState] = useState({ show: false })
  const [userState, SetUserState] = useState(null)
  const toggleNav = () => {

    const doesShow = showNavToggState.show;
    SetshowNavToggState({ show: !doesShow })
  }
  //START GET FIRST NAME AND LAST NAME LETTERS
  let name = 'Foo Bar 1Name too Long';
  let initials = name.match(/\b\w/g) || [];
  initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  // END GET FIRST NAME AND LAST NAME LETTERS


  let buttons;
  if (userState != null) {
    buttons = (
      <>
        <li><NavLink to='/products'> Product List</NavLink></li>
        <li><a onClick={logOut} >Logout</a></li>
      </>
    )
  }
  else {
    buttons = (<>
      <li><NavLink onClick={toggleNav} to='/registeration'>Signup</NavLink></li>
      <li><NavLink onClick={toggleNav} to='/login'>Login</NavLink></li>
    </>)
  }

  return (
    <div>
      <ul className="right">
        <div style={{ display: 'inline-block', position: 'relative' }}>
          <a onClick={toggleNav} className="btn btn-floating pink lighten-1" >{initials}</a>
          <ul id='dropdown1' style={showNavToggState.show ? openNav : closeNav} className='dropdown-content'>
            {buttons}
          </ul>
        </div>

      </ul>
    </div>
  )
}

export default SignedInLinks
