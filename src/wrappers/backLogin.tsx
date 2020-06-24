// import { Redirect } from "umi";
// import React from 'react';
import React from 'react';
import { Redirect } from "umi";

export default (props: any) => {
    const account = localStorage.getItem('account');
    if (account) {
      return <Redirect to="/welcome" />;
    }
    return props.children;
}