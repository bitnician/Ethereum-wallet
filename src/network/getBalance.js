import getContract from './getContract';

const getBalance = async (address) => {
  const TDS = await getContract();
  try {
    const balance = await TDS.methods.balanceOf(address).call();
    const decimals = await TDS.methods.decimals().call();
    return Math.trunc(balance / Math.pow(10, decimals));
  } catch (error) {}
};

export default getBalance;
