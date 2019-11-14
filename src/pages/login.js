import React from "react";

import Loading from "../components/common/loading"
import BearerAuthButton from "../components/common/bearer-auth-button"
import { getCookie, setCookie } from "../utils/cookie";

const BearerAuthInfo = ({ bearerSuccess }) =>
  bearerSuccess === "true" || getCookie("bearer-auth-id", false) ? (
    <p>
      Connected to GitHub... <br />
      All ready to fetch your details from GitHub
    </p>
  ) : (
    <p>
      Connecting to GitHub... <br />
      Waiting your details to arrive from GitHub.
    </p>
  );

const GragittyAuthInfo = ({ success }) =>
  success === "true" ? (
    <p>
      Connected to Gragitty server... <br />
      Your detials have been fetched from Gragitty server.
    </p>
  ) : (
    <p>
      Connecting to Gragitty server... <br />
      Waiting your details to arrive from Gragitty server.
    </p>
  );

const GragittyTokenInfo = ({ token, fetched }) =>
  getCookie("x-token", false) ? (
    <p>
      All details fetched. Loggin you in. <br />
      You'll be redirected to home page in a few moments.
    </p>
  ) : !fetched ? (
    token ? (
      <p>
        Token recieved from server. Logging you in. You'll be redirected to home
        page in a few moments.
      </p>
    ) : (
      <p>Almost done. Fetching the token.</p>
    )
  ) : (
    <p>
      There is a problem in fetching details. Please try logging in again.{" "}
      <br />
      If you think there is something wrong at our end please feel free to raise
      an issue at{" "}
      <a
        className="bg-green-100 border-b-1 hover:bg-green-400 hover:border-red-200"
        href="https://github.com/gragitty/gragitty/issues"
        target="_blank"
        rel="noopener noreferrer"
      >
        Gragitty issues
      </a>
      .
    </p>
  );

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = { token: '', fetched: false }
  }

  componentDidMount() {
    const search = this.props.search
    if (this.state.token === '') {
      if (search['bearer-success'] === 'true') {
        window.location = "https://gragitty.herokuapp.com/auth";
      }
      if (search['success'] === 'true') {
        const { auth, newToken, token } = search
        if (auth === 'true' && newToken === 'true') {
          this.setState({ token, fetched: true }, () => {
            setCookie("x-token", token);
            window.location = "/";
          });
        } else {
          this.setState({ fetched: false })
        }
      }
    }
  }

  render() {
    const search = this.props.search
    return search && (search['bearer-success'] || search.success) ? (
      <div className="flex items-center flex-col h-auto">
        <div className="flex items-center flex-col my-auto">
          <p>We are logging you in.</p>
          <BearerAuthInfo bearerSuccess={search["bearer-success"]} />
          <GragittyAuthInfo success={search.success} />
          <GragittyTokenInfo {...this.state} />
          <Loading />
        </div>
      </div>
    ) : (
      <div className="flex items-center flex-col h-auto">
        <p>
          Please click the button below to login, so that we can get started
          with awesomeness!
        </p>
        <BearerAuthButton />
      </div>
    );
  }
}
