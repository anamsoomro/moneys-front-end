
import React, { Component } from "react";
import { PlaidLink, usePlaidLink }from "react-plaid-link";
import {connect} from 'react-redux'
import { trackPromise } from 'react-promise-tracker'


class Link extends Component {

  handleOnSuccess = (public_token, metadata) => {
    trackPromise(
    fetch("http://localhost:3000/get_access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({
        public_token: public_token,
        user_id: localStorage.user_id, 
        institution: metadata.institution.name 
      })
    })
    .then(resp => resp.json())
    .then(data => {
      if (data.error){
        alert(data.error)
      } else {
        // transactions have account_ids, need to add account_names and institution
        let transactions = data.transactions.map( tran => {
          let account = data.accounts.filter( acc => { 
            return acc.account_id === tran.account_id
          })
          return {...tran, account_name: account[0].name}

        })
        this.props.addData({ 
          transactions: transactions, 
          accounts: data.accounts
        })
        this.props.handleDisplay()
        
        this.props.setUserView()
      }
    })
    )
  }

  

  render(props) {
    return (
      <div>
        <PlaidLink
          style={this.props.styling}
          clientName="Moneymoon"
          env="sandbox" // "development"
          product={["auth", "transactions"]} 
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
