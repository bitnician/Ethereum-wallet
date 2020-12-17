import React, { useState, useCallback, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import mint from '../network/mint';
import getBalance from '../network/getBalance';
import Loader from './loader';

const Mint = () => {
  const [formData, setFormData] = useState({
    address: '',
    amount: '',
  });

  const [balance, setBalance] = useState(null);
  const [disableButton, setDisableButton] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleOnChange = useCallback(
    ({ target: input }) => {
      const newFormData = { ...formData };
      const key = input.name;
      newFormData[key] = input.value;

      setFormData(newFormData);
    },
    [formData]
  );

  const handleOnSubmit = useCallback(async () => {
    setLoading(true);
    setBalance(null);

    const result = await mint(formData.address, formData.amount);

    const balance = await getBalance(formData.address);
    setBalance(balance);
    setLoading(false);
  }, [formData]);

  useEffect(() => {
    if (formData.address && formData.amount) setDisableButton(false);
    else setDisableButton(true);
  }, [formData]);

  return (
    <Container>
      <Row>
        <Col>
          <h3 className="text-center">Get Some TDS Token</h3>

          <Form>
            <FormGroup>
              <Label for="address">Address</Label>
              <Input
                onChange={handleOnChange}
                type="text"
                name="address"
                id="address"
                value={formData['address']}
                required
                placeholder="Address"
              />
            </FormGroup>
            <FormGroup>
              <Label for="amount">Amount</Label>
              <Input
                onChange={handleOnChange}
                type="number"
                name="amount"
                id="amount"
                value={formData['amount']}
                required
                placeholder="amount"
              />
            </FormGroup>

            <Button disabled={disableButton} color="primary" onClick={handleOnSubmit}>
              {loading ? <Loader /> : 'Submit'}
            </Button>
          </Form>
          {balance === null ? (
            ''
          ) : (
            <p>
              The balance of <span className="font-weight-bold">{formData.address}</span> is{' '}
              <span className="font-weight-bold">{balance}</span> TDS
            </p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Mint;
