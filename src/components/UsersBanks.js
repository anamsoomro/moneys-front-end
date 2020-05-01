import React from "react"
import { connect } from 'react-redux'

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
      console.log(removedItem)
      props.removeBank(removedItem.item_id)
      props.handleDisplay()
    })

    console.log(bank)
  }


  return (

    <div className="card" style={{"width": "60%", "margin": "0 auto", "margin-bottom": "20px", "margin-top": "20px"}}>
      <div className="card-header"> <h4>{props.user.username}'s linked banks </h4></div>
      <ul className="list-group list-group-flush">
        {props.banks.map(bank => 
          <li key={bank.id}className="list-group-item">
            <h5>{bank.name}
              <span className="badge badge-danger" style={{color:"white"}} onClick={() => removeItem(bank)}>
                Remove
              </span>
            </h5>
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