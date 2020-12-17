import getWeb3 from './getWeb3';

const getAccount = (privateKey) => {
  const web3 = getWeb3();
  const account = web3.eth.accounts.privateKeyToAccount(privateKey);

  return account;
};

export default getAccount;
