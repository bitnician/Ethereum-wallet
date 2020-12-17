import React from 'react';
import { removeLocalStorage } from '../utils/utils';
import { Redirect } from 'react-router-dom';

const Logout = () => {
  removeLocalStorage({ key: 'account' });
  return (window.location = '/login');
};

export default Logout;
