
import React, { Component } from "react";
import { PlaidLink, usePlaidLink }from "react-plaid-link";
import {connect} from 'react-redux'

class Link extends Component {

  handleOnSuccess = (public_token, metadata) => {
    fetch("http://localhost:3000/get_access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({
        public_token: public_token,
        user_id: localStorage.user_id, 
        institution: metadata.institution.name // always inject it in the back end
      })
    })
    .then(resp => resp.json())
    .then(data => {
      console.log("sweet now you got a access token and some data")
      if (data.error){
        alert(data.error)
      } else {

        // transactions have account_ids, need to add account_names and institution
        let transactions = data.transactions.map( tran => {
          let account = data.accounts.filter( acc => { // this seems expensive way of doing this
            return acc.account_id === tran.account_id
          })
          // return {...tran, account_name: account[0].name, institution: metadata.institution.name}
          return {...tran, account_name: account[0].name}

        })
        this.props.addData({ 
          transactions: transactions, 
          accounts: data.accounts
        })
        this.props.handleDisplay()
      }
    })
  }

  

  render(props) {
    return (
      <div>
        <PlaidLink
          clientName="front-end"
          env="sandbox" // "development"
          product={["transactions"]} // product={["auth", "transactions"]} what ddoes this actually do 
          publicKey="38e9fa8478f20a384db53c1176e9b7"
          onExit={this.handleOnExit}
          onSuccess={this.handleOnSuccess}
          className="test">
          {this.props.text}
        </PlaidLink>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { 
    user_id: state.authReducer.user.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addData: ( (data) => dispatch({type: "addData", data: data})),
    handleDisplay: ( () => dispatch({type: "handleDisplay"}))
  }
} 

export default connect(mapStateToProps, mapDispatchToProps)(Link);
