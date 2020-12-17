import getWeb3 from './getWeb3';
import contracFile from '../abi/TDS.json';

const getContract = async () => {
  const web3 = getWeb3();

  const abi = contracFile.abi;
  const address = process.env.REACT_APP_TDS_CONTRACT_ADDRESS;

  const TDS = await new web3.eth.Contract(abi, address);

  return TDS;
};
export default getContract;
