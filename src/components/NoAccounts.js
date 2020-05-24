
import React from  "react"
import Link from '../components/Link'

const NoAccounts = () => {

  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
  }


  return (
    <div style={style}> 
      <h1 style={{letterSpacing: "0.1em"}}>YOU HAVE NO ACCOUNTS LINKED </h1>

      <Link text={"ADD ACCOUNT"} styling={{background: "black", color: "white", padding: "10px"}}/> 
    </div>
  )
}

export default NoAccounts


