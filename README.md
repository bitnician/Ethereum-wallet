# Getting Started

Clone the repo, install the dependencies using `npm install` and start the app with the command `npm start`

# Creating a wallet

After starting the project, go to /login for creating a new wallet. fill the email and password and hit the button. After that, you will be redirected to the dashboard and see your mnemonic, private key, and address.

# Getting some fake Ethers

You need some ethers to cover your transaction fee. since this application lives on the rinkeby testnet, you have to get some fake Ethers on Rinkeby.
Copy your address from your dashboard. then, go to [Rinkeby Faucet](https://faucet.rinkeby.io) for getting some Ethers for your address. (You need to provide a link to Facebook/Twitter public post with your Ethereum address embedded into the content and use the link of this post on the Rinkeby Faucet website)

# Getting some fake TDS token

Now you need some TDS tokens to transfer them and test the wallet.
go to /faucet and copy your address and specify how much TDS token you need.

# Transfering your tokens

Go to your dashboard, fill the form with the receiver address and the number of tokens that you want to send, and hit the button. whenever your transaction submitted to the blockchain, you will get a link that helps you check transaction details on rinkeby explorer.

# Check the receiver balance

After transferring the tokens, you may need to check the receiver's balance. to do that, go to the /get-balance and fill the input with the receiver address, and hit the button.
The balance of the receiver will be shown!

**Notice that this wallet is not ready for the real-world application**
