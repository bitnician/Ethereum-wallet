const ethers = require('ethers');

const createAccount = () => {
  const userMnemonic = ethers.Wallet.createRandom().mnemonic;
  const userWallet = ethers.Wallet.fromMnemonic(userMnemonic.phrase);
  return {
    mnemonic: userMnemonic.phrase,
    address: userWallet.address,
    publicKey: userWallet.publicKey,
    privateKey: userWallet.privateKey,
  };
};

export default createAccount;
