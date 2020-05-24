
# MONEYMOON

Personal finance application for couples to track their financial health, spending habits and ooverall trends together.

Created using React, Redux and the Plaid API.

## dependencies: 
```
npm install 
```

## plaid: 
to link financial institutions, [sign up with Plaid](https://dashboard.plaid.com/signup). 
replace line 59 in 'src/components/Link.js' with your public key.
```
publicKey="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

## running: 
make sure you are [running the server](https://github.com/anamsoomro/moneymoon-backend), before running the client. 
```
npm start
```
you should now be able to view in the browser at http://localhost:3001.

