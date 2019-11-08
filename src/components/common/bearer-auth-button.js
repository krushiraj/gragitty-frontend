import * as React from "react";
import { Bearer, factory } from "@bearer/react";

import { CLIENT_ID } from '../../utils'
import { setCookie } from '../../utils/cookie'

const { Connect } = factory("github"); // Integration ID

const BearerAuthButton = () => {
  const onSuccess = ({ authId }) => {
    console.log("AUTH_ID for this user", authId);
    setCookie(`bearer-auth-id`,authId)
  };
  return (
    // Initialize the Bearer provider with your client ID
    <Bearer clientId={CLIENT_ID}>
      <Connect
        onSuccess={onSuccess}
        render={({ connect }) => {
          return <button id="auth-github" onClick={connect}>Connect to GitHub</button>;
        }}
      />
    </Bearer>
  );
};

export default BearerAuthButton;
