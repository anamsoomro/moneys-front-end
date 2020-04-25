import React, { Component } from "react";
import { PlaidLink }from "react-plaid-link";
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
        user_id: this.props.user_id 
      })
    })
    .then(resp => resp.json())
    .then(data => {
      console.log("sweet now you got a access token and some data")
      console.log(data)
      if (data.error){
        alert(data.error)
      } else {
        this.props.addData({ 
          transactions: data.transactions, 
          accounts: data.accounts
        })
      }
    })
  }

  render() {
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
          Open Link and connect your bank!
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
    addData: ( (data) => dispatch({type: "addData", data: data}))
  }
} 

export default connect(mapStateToProps, mapDispatchToProps)(Link);
