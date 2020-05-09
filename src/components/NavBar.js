import React from "react";
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'


const NavBar = (props) => {

  const logout = () => { 
    localStorage.clear()
    props.resetLink()
    props.resetAuth()
  } 

  const handleAddUser = (user) => {
   if (!props.users[1]){ // if theres no user, give them code to add one 
    props.setModalView()
   } else {                                                         
     handleUserView(user) // if there is a user, filter everything by it
   }
  }

  const sendInvite = (event) => {
    fetch("http://localhost:3000/invite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({
        username: props.users[0].username,

        email: event.target.previousSibling.value
      })
    })
    .then(resp => resp.json())
    .then(resp => {
      let invite = document.querySelector("#invite")
      invite.style.display = "block"
    })
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
    props.handleTrendDisplay(filter)
  }

  const copyToClipBoard =() => {
    let copyText = document.getElementById("code").innerText
    navigator.clipboard.writeText(copyText)
    let copied = document.querySelector("#copied")
    copied.style.display = "block"
  }


  return (
    <div>
    <div> 
      <nav className="nav-extended">
        <div className="nav-wrapper" style={{"background": "black"}}>
          <a className="brand-logo" className="title" style={{padding: "0px 12px", fontSize: "30px"}}>MONEYMOON</a>
          {/* <a data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a> */}
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li className="tab"><Link to="/">HOME</Link></li>
            <li className="tab"><Link to="/month">MONTH</Link></li>
            <li className="tab"><Link to="/trends">TRENDS</Link></li>
            <li className="tab"><Link to="/settings">SETTINGS</Link></li>
            <li onClick={logout}><Link to="/">LOGOUT</Link></li>
          </ul>
        </div>
        <div className="nav-content">
          <ul className="tabs tabs-transparent" style={{"background": "black"}}>
            {/* lol the Links are only for formatting right now */}
            <li className="tab" onClick={() => handleUserView("user1")}><Link> 
              {props.users[0] ? props.users[0].username :null }
            </Link></li>
            <li className="tab"  onClick = {() => handleAddUser("user2")}><Link>       
              {!!props.users[1] ? props.users[1].username : " + USER" }                    
            </Link></li>
            <li className="tab"  onClick={() => handleUserView("both")}><Link>
              {!!props.users[1] ? props.users[0].username + '+' + props.users[1].username : null}
            </Link></li>
          </ul>
        </div>
      </nav>

    {/* <ul className="sidenav" id="mobile-demo"> 
      <li>Month</li>
      <li>Trends</li>
      <li onClick={logout}><Link to="/">Logout</Link></li> 
    </ul> */}

    </div>
    {
      props.show
      ? <div className="overlay">
          <div id="modal1" className="modal modal-fixed-footer" style={{display: "block", height: "60%", width: "60%", display: "inline-block", textAlign: "center" }}>
            <div className="modal-content"style={{height: "100%"}}>
              <h4 style={{letterSpacing: "0.02em", marginTop: "20px"}}>your partner can sign up with the account code below</h4>

              <h5 style={{textTransform: "none", margin: "30px 0px"}}> 
                <span id="code" >{props.account_code}</span>
                <i class="material-icons" onClick={copyToClipBoard}>content_copy</i>
              </h5>
              <h5 id="copied" style={{display: "none", color: "#26a69a"}}> copied </h5>

              <h5>
                <input type="text" placeholder="ENTER PARTNER'S EMAIL" style={{color: "black", width: "70%"}} />
                <i class="material-icons" onClick={sendInvite}>send</i>
              </h5>

              <h5 id="invite" style={{display: "none", color: "#26a69a"}}> invitation sent </h5>

            </div>
            <div className="modal-footer black">
              <div className="modal-action modal-close waves-effect btn-flat black text-white" onClick={props.setModalView}>close</div>
            </div>
          </div>
        </div>
      : null
    }
    </div>
  )

}

const mapStateToProps = (state) => {
  return { 
    users: state.authReducer.account.users,
    account_code:  state.authReducer.account.code,
    show: state.authReducer.show,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetAuth: ( () => dispatch({type: "resetAuth"}) ),
    resetLink: ( () => dispatch({type: "resetLink"}) ),
    setUserView: ( (username) => dispatch({type: "setUserView", username: username})),
    handleDisplay: ( () => dispatch({type:"handleDisplay"}) ),
    setModalView: ( () => dispatch({type: "setModalView"})),
    handleTrendDisplay: ((filter) => dispatch({type: "handleTrendDisplay", filter: filter}))
  }
} 


export default connect(mapStateToProps, mapDispatchToProps)(NavBar);






