import React from "react";

import Loading from "../components/common/loading"
import BearerAuthButton from "../components/common/bearer-auth-button"
import { getCookie } from "../utils/cookie";

export default ({ search }) =>
  search ? (
    <div className="flex items-center flex-col h-auto">
      <p>Please click the button below to login, so that we can get started with awesomeness!</p>
      <BearerAuthButton />
    </div>
  ) : (
    <div className="flex items-center flex-col h-auto">
      <div className="flex items-center flex-col my-auto">
        <p>We are logging you in.</p>
        {getCookie("bearer-auth-id", false) && (
          <p>
            Connected to GitHub... <br />
            All ready to fetch your details from GitHub
          </p>
        )}
        {getCookie("x-token", false) && (
          <p>
            Connected to Gragitty server... <br />
            Your detials have been fetched from GitHub
          </p>
        )}
        <Loading />
      </div>
    </div>
  );
