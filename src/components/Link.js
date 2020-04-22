import React, { Component } from "react";
import { PlaidLink }from "react-plaid-link";
// import axios from "axios";

class Link extends Component {
  constructor() {
    super();
    this.state = {
      transactions: [],
      accounts: []
    };
  }

  handleOnSuccess(public_token, metadata) {
    // fetch("http://localhost:8000/auth/public_token", {
    fetch("http://localhost:3000/get_access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        public_token: public_token
      })
    })
    // .then(resp => resp.json()) //parse error, so switch to text for now 
    .then(resp => resp.text())
    .then(accessTokenAndItemId => {
      // {access_token: "access-sandbox-bef691d6-406d-4691-8fba-d9cd98de2727", item_id: "kn7qgzy89QcKqQvMZdG3cDy93VAMwBtWKlLRy"}
      console.log("sweet now you got a access token")
    })
  }

  handleOnExit() {
    // handle the case when your user exits Link
  }

  handleClickTransactions(res) {
    fetch("http://localhost:3000/transactions")
    // fetch("http://localhost:8000/transactions")
    .then(resp => resp.json())
    .then(transactions => {
      console.log(transactions)
    })
  }

  handleClickAccounts(res){
    fetch("http://localhost:3000/accounts")
    // fetch("http://localhost:8000/accounts")

    .then(resp => resp.json())
    .then(accounts => {
      console.log(accounts)
    })
  }


  showTransaction = (transaction) => {
    return(
      <div>
        <p><strong>{transaction.name}</strong></p>
        <p>account_id: {transaction.account_id}</p>
        {/* so i need to save account and account ids to give it account names  */}
        <p> amount: {transaction.amount}</p>
        <p> category: {transaction.category}</p>
        <p> date: {transaction.date}</p>
      </div>
    )
  }

  render() {
    return (
      <div>
        <PlaidLink
          clientName="front-end"
          // env="development"
          env="sandbox"
          product={["transactions"]}
          // product={["auth", "transactions"]} what ddoes this actually do 
          publicKey="38e9fa8478f20a384db53c1176e9b7"
          onExit={this.handleOnExit}
          onSuccess={this.handleOnSuccess}
          className="test"
        >
          Open Link and connect your bank!
        </PlaidLink>
        <div>
          <button onClick={this.handleClickTransactions}>Get Transactions</button>
          <button onClick={this.handleClickAccounts}>Get Accounts</button>
          {/* {this.state.transactions.map (transaction => this.showTransaction(transaction))} */}
        </div>
      </div>
    );
  }
}

export default Link;