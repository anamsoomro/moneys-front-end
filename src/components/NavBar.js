import React from "react";
import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'


const NavBar = (props) => {

  const logout = () => {
    localStorage.clear()
    props.resetApp()
  }

  return (
    // https://materializecss.com/navbar.html
    // hmmm if i get rid of the a tag i lose some padding. come back later
    <div> 
      <nav className="nav-extended">
        <div className="nav-wrapper">
          <a className="brand-logo">props.cool_logo_and_app_name</a>
          <a data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a>Month</a></li>
            <li><a>Trends</a></li>
            <li onClick={logout}><a>Logout</a></li>
          </ul>
        </div>
        <div className="nav-content">
          <ul className="tabs tabs-transparent">
            <li className="tab"><a>User 1</a></li>
            <li className="tab"><a>User 2</a></li>
            <li className="tab"><a>User 1 + 2</a></li>
          </ul>
        </div>
      </nav>

      <ul className="sidenav" id="mobile-demo"> {/* this does not work */}
        <li><a>Month</a></li>
        <li><a>Trends</a></li>
        <li onClick={logout}><a>Logout</a></li>
      </ul>
      {/* 
      <div id="test1" className="col s12">Test 1</div>
      <div id="test2" className="col s12">Test 2</div>
      <div id="test3" className="col s12">Test 3</div>
      <div id="test4" className="col s12">Test 4</div> */}
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
    resetApp: ( () => dispatch({type: "resetApp"}) )
  }
} 


export default connect(mapStateToProps, mapDispatchToProps)(NavBar);






