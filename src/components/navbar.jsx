import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavbarText } from 'reactstrap';
import { getLocalStorage } from '../utils/utils';
import { NavLink } from 'react-router-dom';

const Navigation = (props) => {
  const accountInfo = getLocalStorage({ key: 'account' });
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Wallet</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/faucet">Faucet</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/get-balance">Get Balance</NavLink>
            </NavItem>
          </Nav>
          <NavbarText>{accountInfo === null ? '' : <NavLink to="/logout">Logout</NavLink>}</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;
