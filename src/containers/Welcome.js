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
    // position: "fixed",
    // top: "50%",
    // left: "50%",
    // transform: "translate(-50%, -50%)",
    // textAlign: "left",
    // backgroundColor: "black",
    // color: "white"
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


  let rotation = `rotate(${Math.floor(Math.random() * 4) * 90}deg)`
  const spinner = 
           <div className="element">
            <div name="item" style={{transform: rotation}}>
            {/* <div name="item" style={{width: "100%", height: "100%", transform: 'rotate(90deg)'}}> */}
              <p class="circle" style={{margin: "0px"}}>
                <span class="ouro ouro2">
                  <span class="left"><span class="anim" style={{background:  "none repeat scroll 0 0 #d84315" }}></span></span>
                  <span class="right"><span class="anim"></span></span>
                </span>
              </p>
            </div>
          </div>

  const spinners = []
  for (let i=0; i<4; i++){
    let rotation = `rotate(${Math.floor(Math.random() * 4) * 90}deg)`
    let color = ["#d84315", "#618685", "#034f84"][Math.floor(Math.random()*3)]
    spinners.push(
      <div className="element">
        <div name="item" style={{transform: rotation}}>
          <p class="circle" style={{margin: "0px"}}>
            <span class="ouro ouro2">
              <span class="left"><span class="anim" style={{background:  `none repeat scroll 0 0 ${color}` }}></span></span>
              <span class="right"><span class="anim"></span></span>
            </span>
          </p>
        </div>
      </div>
    )

  }



  return (

    <div>
    {/* <div style={{width:"auto", height:"100vh", backgroundColor:"black"}}> */}
    {/* <div style={{position:"relative", paddingBottom: "calc(100.00% + 44px)"}}><iframe src='https://gfycat.com/ifr/RewardingHelplessAlligatorgar' frameborder='0' scrolling='no' width='100%' height='100%' style={{position: "absolute",top:"0",left:"0"}} allowfullscreen></iframe></div><p> <a href="https://gfycat.com/rewardinghelplessalligatorgar">via Gfycat</a></p> */}
      <div style={style} >
        <h4 className="title">WELCOME TO THE </h4>
        <h4 className="title">MONEYMOON PHASE</h4>
        <h5>LOGIN</h5>
        <form onSubmit={handleLogin}   >
          <input type="text" placeholder="USERNAME"  /> 
          <input type="password" placeholder="PASSWORD" style={{color: "white"}}/> 
          <input type="submit" value="SUBMIT" class="white btn-small" style={{color: "black"}}/>
        </form>

        <h5>SIGN UP</h5>
        <form onSubmit={handleSignUp}>
          <input type="text" placeholder="EMAIL" /> 
          <input type="text" placeholder="USERNAME" /> 
          <input type="text" placeholder="PASSWORD"/> 
          <h6> LINKING TO AN ACCOUONT? ENTER CODE BELOW</h6>
          <input type="text" placeholder="ACCOUNT CODE" />
          <input type="submit" value="SUBMIT" class="white btn-small" style={{color: "black"}}/>
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


