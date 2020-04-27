import React from "react";
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'


const NavBar = (props) => {

  const logout = () => { // if youre logged in, refresh, logout. doesnt refresh page. 
    localStorage.clear()
    props.resetApp()
  } 

  const handleAddUser = (user) => {
   if (!props.users[1]){ // if theres no user, give them code to add one 
     alert( `account code: ${props.account_code}`)
   } else {
     handleUserView(user) // if there is a user, filter everything by it
   }
  }
  
  const handleUserView = (filter) => {
    let username
      switch (filter){
        case "user1":
          if (props.users[0]) { username = props.users[0].username }  
          break 
        case 'user2': 
          if (props.users[1]) { username = props.users[1].username }
          break
        case 'both':
          username = null
      }
    props.setUserView(username)
    props.handleDisplay()
  }
  return (
    <div> 
      <nav className="nav-extended">
        <div className="nav-wrapper">
          <a className="brand-logo">props.cool_logo_and_app_name</a>
          <a data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/month">Month</Link></li>
            <li><Link to="/trends">Trends</Link></li>
            <li onClick={logout}><Link to="/">Logout</Link></li>
          </ul>
        </div>
        <div className="nav-content">
          <ul className="tabs tabs-transparent">
            {/* lol the Links are only for formatting right now */}
            <li className="tab" onClick={() => handleUserView("user1")}><Link> 
              {props.users[0] ? props.users[0].username :null }
            </Link></li>
            <li className="tab"  onClick = {() => handleAddUser("user2")}><Link>       
              {!!props.users[1] ? props.users[1].username : " + USER" }                     {/*shows null instead of +user*/}
            </Link></li>
            <li className="tab"  onClick={() => handleUserView("both")}><Link>
              {!!props.users[1] ? props.users[0].username + '+' + props.users[1].username : null}
            </Link></li>
          </ul>
        </div>
      </nav>

      <ul className="sidenav" id="mobile-demo"> {/* this mobile menu does not work */}
        <li>Month</li>
        <li>Trends</li>
        <li onClick={logout}><Link to="/">Logout</Link></li> 
      </ul>
    </div>
  )

}

const mapStateToProps = (state) => {
  return { 
    users: state.authReducer.account.users,
    account_code:  state.authReducer.account.code
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetApp: ( () => dispatch({type: "resetApp"}) ),
    setUserView: ( (username) => dispatch({type: "setUserView", username: username})),
    handleDisplay: ( () => dispatch({type:"handleDisplay"}) )
  }
} 


export default connect(mapStateToProps, mapDispatchToProps)(NavBar);






