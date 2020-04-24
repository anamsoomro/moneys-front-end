import React from "react";
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'


const NavBar = (props) => {

  const logout = () => {
    localStorage.clear()
    props.clearCurrentUser()
    // ok remember so when you logout the whole store doesnt clear out
  }

  return (
    // https://materializecss.com/navbar.html
    // hmmm if i get rid of the a tag i lose some padding. come back later
    <div> 
      <nav class="nav-extended">
        <div class="nav-wrapper">
          <a class="brand-logo">props.cool_logo_and_app_name</a>
          <a data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li><a>Month</a></li>
            <li><a>Trends</a></li>
            <li onClick={logout}><a>Logout</a></li>
          </ul>
        </div>
        <div class="nav-content">
          <ul class="tabs tabs-transparent">
            <li class="tab"><a>User 1</a></li>
            <li class="tab"><a>User 2</a></li>
            <li class="tab"><a>User 1 + 2</a></li>
          </ul>
        </div>
      </nav>

      <ul class="sidenav" id="mobile-demo"> {/* this does not work */}
        <li><a>Month</a></li>
        <li><a>Trends</a></li>
        <li onClick={logout}><a>Logout</a></li>
      </ul>
      {/* 
      <div id="test1" class="col s12">Test 1</div>
      <div id="test2" class="col s12">Test 2</div>
      <div id="test3" class="col s12">Test 3</div>
      <div id="test4" class="col s12">Test 4</div> */}
    </div>
  )

}

const mapStateToProps = (state) => {
  return { 
    state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearCurrentUser: ( () => dispatch({type: "clearCurrentUser"}) )
  }
} 


export default connect(mapStateToProps, mapDispatchToProps)(NavBar);






