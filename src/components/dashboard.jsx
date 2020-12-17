import React, { useCallback, useEffect, useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import getBalance from '../network/getBalance';
import sendToken from '../network/sendToken';
import Loader from './loader';
import { getLocalStorage } from '../utils/utils';
import { Redirect } from 'react-router-dom';

const Dashboard = () => {
  //* User wallet
  const [wallet, setWallet] = useState({
    mnemonic: '',
    address: '',
    privateKey: '',
  });
  //* TDS token balance State
  const [balance, setBalance] = useState(0);

  //* The Hash of Transaction of sending token
  const [transactionHash, setTransactionHash] = useState(null);

  //* Loader on submit
  const [loading, setLoading] = useState(false);

  //* Disable button if form inputs are not valid
  const [disableButton, setDisableButton] = useState(true);

  //* Form data
  const [formData, setFormData] = useState({
    amount: '',
    receiver: '',
  });

  useEffect(() => {
    //* Store wallet information is localstorage (not secure)
    const newWallet = { ...wallet };

    const accountInfo = getLocalStorage({ key: 'account' });

    if (accountInfo === null) return;

    newWallet.mnemonic = accountInfo.mnemonic;
    newWallet.address = accountInfo.address;
    newWallet.privateKey = accountInfo.privateKey;

    setWallet(newWallet);

    //* Update the current TDS token balance
    getAccountBalance(newWallet.address);
  }, []);

  //* Get the TDS token balance
  const getAccountBalance = useCallback(async (address) => {
    const currentBalance = await getBalance(address);

    setBalance(currentBalance);
  }, []);

  //* Update the value of form inputs
  const handleOnChange = useCallback(
    ({ target: input }) => {
      const newFormData = { ...formData };
      const key = input.name;
      newFormData[key] = input.value;
      setFormData(newFormData);
    },
    [formData]
  );

  //* Sending transaction on submit
  const handleOnSubmit = useCallback(async () => {
    setLoading(true);
    const result = await sendToken(formData.receiver, formData.amount);
    if (result && result.transactionHash) setTransactionHash(result.transactionHash);
    setLoading(false);
  }, [formData]);

  useEffect(() => {
    if (formData.amount && formData.receiver) setDisableButton(false);
    else setDisableButton(true);
  }, [formData]);

  if (getLocalStorage({ key: 'account' }) === null) return <Redirect to="/login" />;

  return (
    <Container>
      <Row>
        <Col className="col-12">
          <div className="text-center">
            <p>
              <span className="font-weight-bold">Your mnemonic: </span>
              {wallet.mnemonic}
            </p>
            <p>
              <span className="font-weight-bold">Your private key: </span>

              {wallet.privateKey}
            </p>
            <p>
              <span className="font-weight-bold">Your address: </span>
              {wallet.address}
            </p>
            <hr />

            <p>
              <span className="font-weight-bold">Your current TDS balance: </span>
              {balance}
            </p>
            <hr />
          </div>
        </Col>
        <Col className="col-12">
          <h3 className="text-center">Send TDS Token</h3>
          <Form>
            <FormGroup>
              <Label for="amount">Amount</Label>
              <Input
                onChange={handleOnChange}
                type="number"
                name="amount"
                id="amount"
                value={formData['amount']}
                required
                placeholder="Amount of TDS Token"
              />
            </FormGroup>
            <FormGroup>
              <Label for="receiver">Reciver</Label>
              <Input
                onChange={handleOnChange}
                type="text"
                name="receiver"
                id="receiver"
                value={formData['receiver']}
                required
                placeholder="0x0000000000000000000000000000000000000000"
              />
            </FormGroup>
            <Button color="primary" disabled={disableButton} onClick={handleOnSubmit}>
              {loading ? <Loader /> : 'Submit'}
            </Button>
          </Form>
          {transactionHash ? (
            <p className="font-weight-bold">
              Success, click <a href={`https://rinkeby.etherscan.io/tx/${transactionHash}`}>here</a> for details
            </p>
          ) : (
            ''
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
