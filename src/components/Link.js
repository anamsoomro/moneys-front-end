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
        user_id: localStorage.user_id // shouldnt this come from store. no store will go blank on page refresh 
      })
    })
    .then(resp => resp.json())
    .then(response => {
      console.log("sweet now you got a access token and some data")
      console.log(response)
      if (response.error){
        alert(response.error)
      } else {
        this.props.storeData(response) // this props is undefined here. arrow functions implicitly carry context of this
      }
    })
  }

  render() {
    // console.log("Link", this.props) 
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
    state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    storeData: ( (data) => dispatch({type: "storeData", data: data}) )
  }
} 

export default connect(mapStateToProps, mapDispatchToProps)(Link);
