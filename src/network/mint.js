import getContract from './getContract';
import getWeb3 from './getWeb3';
import { getMultipliedByDecimalBN, getLocalStorage } from '../utils/utils';

const mint = async (account, amount) => {
  const web3 = getWeb3();
  const TDS = await getContract();
  const chainId = await web3.eth.net.getId();
  const decimals = await TDS.methods.decimals().call();
  const amountBN = getMultipliedByDecimalBN({ amount, decimals });
  const accountInfo = getLocalStorage({ key: 'account' });
  if (accountInfo === null) return;

  try {
    const data = TDS.methods.mint(account, amountBN);
    const gas = await data.estimateGas({ from: accountInfo.address });
    const nonce = await web3.eth.getTransactionCount(accountInfo.address);
    const tx = {
      nonce,
      to: process.env.REACT_APP_TDS_CONTRACT_ADDRESS,
      chainId,
      data: data.encodeABI(),
      gas,
    };

    const signed = await web3.eth.accounts.signTransaction(tx, accountInfo.privateKey);

    const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);

    return receipt;
  } catch (error) {}
};

export default mint;
