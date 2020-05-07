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
        // if error render json: {error: "wrong credentials, please try again"}
        let error = document.querySelector("#error-login")
        error.style.display = "block"
      }
    })
  }

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
        let error = document.querySelector("#error-signup")
        // if username is already taken user = ["Username is already taken"]
        // if account code is invalid = ["Invalid account code"]
        error.innerText = user[0]
        error.style.display = "block"
      }
    })
  }

  const style = {
    position: "fixed",
    top: "0%",
    left: "0%",
    height: "100%",
    width: "40%",
    textAlign: "left",
    backgroundColor: "black",
    color: "white",
    padding: "30px"
  }

  const container = {
    marginLeft: "40%",
  }

  // const createTiles = () => {
  //   const { innerWidth: width, innerHeight: height } = window;
  //   const itemsRow = 10; // how many items in a row
  //   const itemsCol = 10; // how many columns on  page 
  //   const rowSize = (width * .6) / itemsRow; // rowsize  = width of container / # of rows
  //   const colSize = height / itemsCol;
  //   const size = Math.floor(Math.max(rowSize, colSize));
  //   let row = []
  //   for (var i = 0; i < itemsRow; i++) {
  //     let column = []
  //     for(let j=0; j<itemsCol; j++) {
  //       let rotation = `rotate(${Math.floor(Math.random() * 4) * 90}deg)`
  //       column.push(
  //         <div className="element">
  //           <div name="item" style={{width: size+"px", height: size+"px", transform: rotation}}>
  //             <p class="circle" style={{margin: "0px"}}>
  //               <span class="ouro ouro2">
  //                 <span class="left"><span class="anim" style={{background:  "none repeat scroll 0 0 #d84315" }}></span></span>
  //                 <span class="right"><span class="anim"></span></span>
  //               </span>
  //             </p>
  //           </div>
  //         </div>
  //       )
  //     }
  //     row.push(
  //       <div name="row">
  //         {column}
  //       </div>
  //     )
  //   }
  //   return (
  //     <div id="container" class="container">
  //       {row}
  //     </div>
  //   )
  // }
  // let rotation = `rotate(${Math.floor(Math.random() * 4) * 90}deg)`
  // const spinner = 
  //          <div className="element">
  //           <div name="item" style={{transform: rotation}}>
  //           {/* <div name="item" style={{width: "100%", height: "100%", transform: 'rotate(90deg)'}}> */}
  //             <p className="circle" style={{margin: "0px"}}>
  //               <span className="ouro ouro2">
  //                 <span className="left"><span className="anim" style={{background:  "none repeat scroll 0 0 #d84315" }}></span></span>
  //                 <span className="right"><span className="anim"></span></span>
  //               </span>
  //             </p>
  //           </div>
  //         </div>

  const spinners = []
  for (let i=0; i<4; i++){
    let rotation = `rotate(${Math.floor(Math.random() * 4) * 90}deg)`
    let color1 = ["#d84315", "#618685", "#034f84", "#ffc400", "##0055ff", "##d84315"][Math.floor(Math.random()*6)]
    // let color2 = ["#d84315", "#618685", "#034f84"][Math.floor(Math.random()*3)]
    let color2 = ["#d84315", "#618685", "#034f84", "#ffc400", "##0055ff", "##d84315"][Math.floor(Math.random()*6)]
    spinners.push(
      <div className="element">
        <div name="item" style={{transform: rotation}}>
          <p className="circle" style={{margin: "0px"}}>
            <span className="ouro ouro2">
              <span className="left"><span className="anim" style={{background:  `none repeat scroll 0 0 ${color1}` }}></span></span>
              <span className="right"><span className="anim" style={{background:  `none repeat scroll 0 0 ${color2}`}}></span></span>
            </span>
          </p>
        </div>
      </div>
    )

  }

  return (

    <div>
      <div style={style} >

        <h4 className="title">WELCOME TO THE </h4>
        <h4 className="title">MONEYMOON PHASE</h4>

        <h5>LOGIN</h5>
        <form onSubmit={handleLogin}>

          <div className="input-field">
            <label for="username-login">USERNAME</label>
            <input id="username-login" type="text"  /> 
          </div>
          <div className="input-field">
            <label for="password-login">PASSWORD</label>
            <input type="password" id="password-login" style={{color: "white"}}/> 
          </div>

          <h5 id="error-login" className="error" style={{display: "none"}}> WRONG USERNAME OR PASSWORD </h5>

          <input type="submit" value="SUBMIT" className="white btn-small" style={{color: "black"}} />

        </form>

        <h5>SIGN UP</h5>
        <form onSubmit={handleSignUp}>
          <div className="input-field">
          <label for="email-signup">EMAIL</label>
          <input type="text" id="email-signup" />
          </div>

          <div className="input-field">
          <label for="username-signup">USERNAME</label>
          <input type="text" id="username-signup" /> 
          </div>

          <div className="input-field">
          <label for="password-signup">PASSWORD</label>
          <input type="password" id="password-signup" style={{color: "white"}}/> 
          </div>

          <h6> LINKING TO AN ACCOUNT? ENTER CODE BELOW</h6>

          <div className="input-field">
            <input type="text" id="account-code" />
            <label for="account-code">ACCOUNT CODE</label>
          </div>

          <h5 id="error-signup" className="error" style={{display: "none"}}></h5>
          <input type="submit" value="SUBMIT" className="white btn-small" style={{color: "black"}} />
        </form>

      </div>

      <div style={container}>
        <div className="welcome-grid-container" >
          <div className="welcome-one" >
            {spinners[0]}
          </div>
          <div className="welcome-two" >
            {spinners[1]}
          </div>
          <div className="welcome-three" >
            {spinners[2]}
          </div>
          <div className="welcome-four" >
            {spinners[3]}
          </div>
        </div>
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


