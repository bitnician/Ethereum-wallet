import Web3 from 'web3';

const getWeb3 = () => {
  const providerUrl = new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/e739a44f28464e40aa066b903189dae4');

  const web3 = new Web3('http://');
  web3.setProvider(providerUrl);

  return web3;
};
export default getWeb3;
