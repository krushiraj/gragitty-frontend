import * as React from "react";
import { Bearer, factory } from "@bearer/react";

import { CLIENT_ID } from '../../utils/constants'
import { setCookie } from '../../utils/cookie'

import "../../styles/my-styles.css";

const { Connect } = factory("github"); // Integration ID

const BearerAuthButton = () => {
  const onSuccess = ({ authId }) => {
    setCookie('bearer-auth-id', authId)
    window.location = "/login?bearer-success=true"
  };
  return (
    // Initialize the Bearer provider with your client ID
    <Bearer clientId={CLIENT_ID}>
      <Connect
        onError={() => window.alert(
          "We couldn't log you in. Can you please check if you're logged into GitHub and gave permissions."
        )}
        onSuccess={onSuccess}
        render={({ connect }) => {
          return (
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-normal py-2 px-4 m-4"
              id="auth-github"
              onClick={connect}
            >
              Login to <span className="font-semibold">Gragitty</span>
            </button>
          );
        }}
      />
    </Bearer>
  );
};

export default BearerAuthButton;
