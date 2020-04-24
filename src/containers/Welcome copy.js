// import React from "react"
// import { connect } from "react-redux"

// const Welcome = (props) => {

//   const handleLogin = (event) => {
//     event.preventDefault()
//     let user = {
//       username: event.target[0].value,
//       password: event.target[1].value
//     }
//     fetch("http://localhost:3000/login", {
//       method: "POST", 
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(user)
//     })
//     .then(resp => resp.json())
//     .then(user => {
//       if(user.token){
//         props.setCurrentUser(user) 
//         console.log(user.token) 
//         localStorage.token = user.token
//         localStorage.user_id = user.user_id
//       } else { 
//         alert("wrong credentials")
//       }
//     })
//   }

//   const handleSignUp = (event) => {
//     event.preventDefault()
//     let user = {
//       email: event.target[0].value,
//       username: event.target[1].value,
//       password: event.target[2].value
//     }
//     fetch("http://localhost:3000/users", {
//       method: "POST", 
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(user)
//     })
//     .then(resp => resp.json())
//     .then(user => {
//       if(user.token){ 
//         props.setCurrentUser(user) 
//         console.log(user.token)
//         localStorage.token = user.token
//         localStorage.user_id = user.user_id
//       }
//       else{
//         alert("anam dont forget to put validations in here")
//       }
//     })
//   }

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <input type="text" placeholder="username" /> 
//         <input type="text" placeholder="password"/> 
//         <input type="submit" />
//       </form>

//       <h2>Sign Up</h2>
//       <form onSubmit={handleSignUp}>
//         <input type="text" placeholder="email"/> 
//         <input type="text" placeholder="username" /> 
//         <input type="text" placeholder="password"/> 
//         <input type="submit" />
//       </form>
//     </div>
//   )
// }

// const mapStateToProps = (state) => {
//   return(
//     // something: state.somethingReduced.something
//     state
//   )
// }

// const mapDispatchToProps = (dispatch) => {
//   return{
//     setCurrentUser: ( (user) => dispatch({type: "setCurrentUser", user: user}))
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Welcome);

