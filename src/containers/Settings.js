import React from "react"
import { connect } from 'react-redux'
import UsersBanks from '../components/UsersBanks'

const Settings = (props) => {

  const banks = (user) => { 
    let bankAccounts = []
    props.accounts.reduce((arr, account) => {
      if (!arr.includes(account.item_id) && account.user.username === user.username){
        arr.push(account.item_id)
        bankAccounts.push({name: account.institution, id: account.item_id})
      }
      return arr
    }, [])
    console.log( bankAccounts)
    return bankAccounts
  }


  return (
    <div>
      {props.users.map(user => user ? <UsersBanks user={user} banks={banks(user)} /> : null )}
    </div>

    // <div id="modal2" class="modal bottom-sheet" style={{display: "block"}}>
    //   <div class="modal-content">
    //     <h4>Modal Header</h4>
    //     {props.users.map(user => user ? <UsersBanks user={user} banks={banks(user)} /> : null )}
    //   </div>
    //   <div class="modal-footer">
    //     <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
    //   </div>
    // </div>
  )
}

const mapStateToProps = (state) => {
  return {
    users : state.authReducer.account.users,
    accounts: state.linkReducer.accounts,
  }
}

const mapDispacthToProps = (dispatch) => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(Settings)



