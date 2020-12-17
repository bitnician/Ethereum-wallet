import React, { useCallback, useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import getBalance from '../network/getBalance';

const ShowBalance = () => {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState(null);
  const [disableButton, setDisableButton] = useState(true);

  const handleOnChange = useCallback(({ target: input }) => {
    setAddress(input.value);
  }, []);

  const handleOnSubmit = useCallback(async () => {
    const balance = await getBalance(address);
    setBalance(balance);
  }, [address]);

  useEffect(() => {
    if (address.length) setDisableButton(false);
    else setDisableButton(true);
  }, [address]);

  return (
    <Container>
      <Row>
        <Col>
          <h3 className="text-center">Get TDS Blanace of Account</h3>
          <Form>
            <FormGroup>
              <Label for="address">Address</Label>
              <Input
                onChange={handleOnChange}
                type="text"
                name="address"
                id="address"
                value={address}
                required
                placeholder="Address"
              />
            </FormGroup>

            <Button disabled={disableButton} color="primary" onClick={handleOnSubmit}>
              Submit
            </Button>
          </Form>
          {balance === null ? (
            ''
          ) : (
            <p>
              The balance of <span className="font-weight-bold">{address}</span> is{' '}
              <span className="font-weight-bold">{balance}</span> TDS
            </p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ShowBalance;
