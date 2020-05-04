import React from "react"
import { connect } from "react-redux"

const Welcome = (props) => {

  const handleLogin = (event) => {
    event.preventDefault()
    let user = {
      username: event.target[0].value,
      password: event.target[1].value
    }
    fetch("http://localhost:3000/login", {
      method: "POST", 
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(user)
    })
    .then(resp => resp.json())
    .then(user => {
      if(user.token){
        props.setCurrentUser(user) 
        localStorage.token = user.token 
        localStorage.user_id = user.user.id
        localStorage.account_id = user.account.id
        localStorage.user1 = user.account.users[0].username
        if(user.account.users[1]){ localStorage.user2 = user.account.users[1].username  } 
        if(!user.account.users[1]){ localStorage.account_code = user.account.code }


      } else { 
        alert("wrong credentials")
      }
    })}

  const handleSignUp = (event) => {
    event.preventDefault()
    let user = {
      email: event.target[0].value,
      username: event.target[1].value,
      password: event.target[2].value,
      account_code: event.target[3].value 
    }
    fetch("http://localhost:3000/users", {
      method: "POST", 
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(user)
    })
    .then(resp => resp.json())
    .then(user => {
      if(user.token){ 
        props.setCurrentUser(user) 
        localStorage.token = user.token
        localStorage.user_id = user.user.id
        localStorage.account_id = user.account.id
        localStorage.user1 = user.account.users[0].username
        if(user.account.users[1]){ localStorage.user2 = user.account.users[1].username  } 
        if(!user.account.users[1]){ localStorage.account_code = user.account.code }
      }
      else{
        alert("anam dont forget to put validations in here")
      }
    })
  }

  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "left",
    backgroundColor: "black",
    color: "white"
  }




  return (

    <div style={{width:"auto", height:"100vh", backgroundColor:"black"}}>
    {/* <div style={{position:"relative", paddingBottom: "calc(100.00% + 44px)"}}><iframe src='https://gfycat.com/ifr/RewardingHelplessAlligatorgar' frameborder='0' scrolling='no' width='100%' height='100%' style={{position: "absolute",top:"0",left:"0"}} allowfullscreen></iframe></div><p> <a href="https://gfycat.com/rewardinghelplessalligatorgar">via Gfycat</a></p> */}

    <div style={style} >
      <h4>WELCOME TO THE <strong> MONEYMOON </strong> PHASE</h4>
      <h5>LOGIN</h5>
      <form onSubmit={handleLogin}   >
        <input type="text" placeholder="USERNAME"  /> 
        <input type="text" placeholder="PASSWORD"/> 
        <input type="submit" value="SUBMIT" />
      </form>

      <h5>SIGN UP</h5>
      <form onSubmit={handleSignUp}>
        <input type="text" placeholder="EMAIL" /> 
        <input type="text" placeholder="USERNAME" /> 
        <input type="text" placeholder="PASSWORD"/> 
        <h6> LINKING TO AN ACCOUONT? ENTER CODE BELOW</h6>
        <input type="text" placeholder="ACCOUNT CODE" />
        <input type="submit" value="SUBMIT"/>
      </form>
    </div>
    </div>
  )
}


const mapStateToProps = (state) => {
  return(
    state
  )
}

const mapDispatchToProps = (dispatch) => {
  return{
    setCurrentUser: ( (user) => dispatch({type: "setCurrentUser", user: user})),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);


