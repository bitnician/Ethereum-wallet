import getWeb3 from './getWeb3';
import getContract from './getContract';
import { getMultipliedByDecimalBN, getLocalStorage } from '../utils/utils';

const sendToken = async (to, amount) => {
  const web3 = getWeb3();
  const TDS = await getContract();

  const decimals = await TDS.methods.decimals().call();
  const amountBN = getMultipliedByDecimalBN({ amount, decimals });
  const accountInfo = getLocalStorage({ key: 'account' });
  if (accountInfo === null) return;

  const chainId = await web3.eth.net.getId();

  try {
    const nonce = await web3.eth.getTransactionCount(accountInfo.address);

    const data = TDS.methods.transfer(to, amountBN);

    const tx = {
      nonce,
      to: process.env.REACT_APP_TDS_CONTRACT_ADDRESS,
      chainId,
      data: data.encodeABI(),
      gas: await data.estimateGas({ from: accountInfo.address }),
    };

    const signed = await web3.eth.accounts.signTransaction(tx, accountInfo.privateKey);

    const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);

    return receipt;
  } catch (error) {}
};

export default sendToken;
