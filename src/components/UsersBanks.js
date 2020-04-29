import React from "react"
import { connect } from 'react-redux'

const UsersBanks = (props) => {

  const removeItem = (bank) => {
    //  to remove from plaid, you need client_id, secrent and access_token
    // to remove from my db i need item_id

    // fetch("http://localhost:3000/plaid_items", {
    //   method: "DELETE", 
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${localStorage.token}`
    //   },
    //   body: JSON.stringify({
    //     item_id: bank.account_id
    //   })
    // })
    // .then(resp => resp.json())
    // .then(resp => {
    //   // just refresh the page.
    //   // remove that account from the panel
    //   // i guess dispatch remove item which would go through delete related accounts and transactions
    // })

    // you want to delete your item with plaid first dont want access tokens floating around undocumented in db

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
      // I think i need to handle display here too 
    })

    console.log(bank)
  }


  return (

    <div className="card" style={{"width": "60%", "margin": "0 auto", "margin-bottom": "20px", "margin-top": "20px"}}>
      <div className="card-header"> <h4>{props.user.username} </h4></div>
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