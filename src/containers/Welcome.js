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
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
    .then(resp => resp.json())
    .then(user => {
      if(user.token){
        props.setCurrentUser(user) 
        console.log(user.token) 
        localStorage.token = user.token 
        localStorage.user_id = user.user_id // idk if i need this actually
        getData(user.account_id, user.token) // get their transactions and accounts related to their account
      } else { 
        alert("wrong credentials")
      }
    })

    const getData = (account_id, token) => {  // this is their user auth token, not paid token. plaid token is related to items
      fetch(`http://localhost:3000/accounts/${account_id}/get_data`, {
        method: "GET", // remember GET cant have a body
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
      .then(resp => resp.json())
      .then(data => {
        // for as many items this acount has. each object in array is a link item
        let allAccounts = []
        data.accounts.map( item => item.accounts.map(account => allAccounts.push(account)))
        let allTransactions = [] 
        data.transactions.map( item => item.transactions.map(transaction => allTransactions.push(transaction)))
        props.storeData({transactions: allTransactions, accounts: allAccounts})
      })
    }
  }

  const handleSignUp = (event) => {
    event.preventDefault()
    let user = {
      email: event.target[0].value,
      username: event.target[1].value,
      password: event.target[2].value
    }
    fetch("http://localhost:3000/users", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
    .then(resp => resp.json())
    .then(user => {
      if(user.token){ 
        props.setCurrentUser(user) 
        console.log(user.token)
        localStorage.token = user.token
        localStorage.user_id = user.user_id
      }
      else{
        alert("anam dont forget to put validations in here")
      }
    })
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="username" /> 
        <input type="text" placeholder="password"/> 
        <input type="submit" />
      </form>

      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <input type="text" placeholder="email"/> 
        <input type="text" placeholder="username" /> 
        <input type="text" placeholder="password"/> 
        <input type="submit" />
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return(
    // something: state.somethingReduced.something
    state
  )
}

const mapDispatchToProps = (dispatch) => {
  return{
    setCurrentUser: ( (user) => dispatch({type: "setCurrentUser", user: user})),
    storeData: ( (data) => dispatch({type: "storeData", data: data}) ) // data = {transactions: [...], accounts: [...]}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);


