import { Redirect } from "umi";
import React from 'react';


export default (props: any): any => {
    const account = localStorage.getItem('account');
    if (account) {
      return props.children;
    } else {
        return <Redirect to="/user/login" />
    }
  }