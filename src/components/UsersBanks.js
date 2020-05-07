import React from "react"
import { connect } from 'react-redux'
import Avatar from '@material-ui/core/Avatar'


const UsersBanks = (props) => {

  const removeItem = (bank) => {
      fetch(`http://localhost:3000/remove_bank/${bank.id}`, {
      method: "DELETE", 
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      },
    })
    .then(resp => resp.json())
    .then(removedItem => {
      props.removeBank(removedItem.item_id)
      props.handleDisplay()
    })
  }

  const bankAvatar = (bank) => {
    switch(bank) {
      case "Chase":
         return <Avatar src="https://vestar.com/wp-content/uploads/2015/05/chase-logo.jpg" />
      case "Wells Fargo":
        return <Avatar src="https://www.logo-designer.co/wp-content/uploads/2019/01/2019-wells-fargo-bank-new-logo-design.png"/>
      case "Citi":
        return <Avatar src="https://lh3.googleusercontent.com/proxy/9sYIPRx6rR2betsyF7I3q5TjmlcKow3Iui_z0DsUWqRQwelH_lM9rEc4hb4aGVR1MO171uD2ke1eKs4hoZeY9erBjq2axYKArCselxt_VZmC"/>
      default:
        return <Avatar> tbd </Avatar>
    } 
  }

  return (
    <div className="card" style={{width: "60%", margin: "0 auto", marginBottom: "20px", marginTop: "20px"}}>
      <div className="card-header" style={{backgroundColor: "black", color: "white"}}> <h5>{props.user.username}'s banks </h5></div>
      <ul className="list-group list-group-flush">
        {props.banks.map(bank => 
          <li key={bank.id}className="list-group-item">

              <div className="account-grid-container" >

                <div className="account-bank"  style={{ padding: "9px 0px"}}>
                 {bankAvatar(bank.name)}
                </div>

                <div className="account-account" style={{display: "inline-block", padding: "15px 0px"}} >
                  <div style={{display: "inline-block"}}>{bank.name}</div>
                  <span className="badge badge-danger" style={{color:"white"}} onClick={() => removeItem(bank)}> REMOVE </span>
                </div>
                  
              </div>

          </li>
        )}
      </ul>
    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    state
  }
}

const mapDispacthToProps = (dispatch) => {
  return {
    removeBank: ( (item_id) => dispatch({type: "removeBank", item_id: item_id})),
    handleDisplay: ( () => dispatch({type: "handleDisplay"}))
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(UsersBanks)