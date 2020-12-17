import React, { useCallback, useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { setLocalStorage, getLocalStorage } from '../utils/utils';
import createAccount from '../network/createAccount';
import bcrypt from 'bcryptjs';
import Loader from './loader';

const Login = () => {
  const [credential, setCredential] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleOnChange = useCallback(
    ({ target: input }) => {
      const data = { ...credential };
      data[input.name] = input.value;
      setCredential(data);
    },
    [credential]
  );

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    const salt = await bcrypt.genSalt(5);
    const hashedPassword = await bcrypt.hash(credential.password, salt);

    const accountInfo = createAccount();
    setLoading(false);

    setLocalStorage({ key: 'password', value: hashedPassword });
    setLocalStorage({ key: 'account', value: accountInfo });
    window.location = '/dashboard';
  }, [credential]);

  if (getLocalStorage({ key: 'account' }) !== null) return <Redirect to="/dashboard" />;

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center">Create a wallet</h1>
          <Form>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input
                onChange={handleOnChange}
                type="email"
                name="email"
                id="exampleEmail"
                value={credential['email']}
                required
                placeholder="example@domain.com"
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                onChange={handleOnChange}
                name="password"
                id="examplePassword"
                value={credential['password']}
                required
                placeholder="your secure password"
              />
            </FormGroup>
            <Button onClick={handleSubmit}>{loading ? <Loader /> : 'Submit'}</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
