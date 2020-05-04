
import React from  "react"
import Link from '../components/Link'

const NoAccounts = () => {

  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center"
  }


  return (
    <div style={style}> 
      <h1>you aint got no accounts</h1>
      <Link text={"add an account"} styling={{background: "transparent", color: "black"}}/> 
    </div>
  )
}

export default NoAccounts


