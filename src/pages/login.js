import React from "react";

import Loading from "../components/common/loading"
import BearerAuthButton from "../components/common/bearer-auth-button"
import { getCookie, setCookie } from "../utils/cookie";

const BearerAuthInfo = ({ bearerSuccess }) =>
  bearerSuccess === "true" && getCookie("bearer-auth-id", false) ? (
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

class GragittyTokenInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = { token: '' }
  }

  componentDidMount() {
    const search = this.props.search
    if (this.state.token === '') {
      if (search['bearer-success'] === 'true') {
        window.location = "https://gragitty.herokuapp.com/auth";
      }
      if (search['success'] === 'true') {
        fetch("https://gragitty.herokuapp.com/").then(
          ({ auth, newToken, token }) => {
            if (auth === true && newToken === true) {
              this.setState({ token }, () => setCookie("x-token", token));
            }
          }
        );
      }
    } else {
      window.location = '/'
    }
  }

  render() {
    return getCookie("x-token", false) ? (
      <p>
        All details fetched. Loggin you in. <br />
        You'll be redirected to home page in a few moments.
      </p>
    ) : (
      <p>
        There is a problem in fetching details. Please try logging in again.{" "}
        <br />
        If you think there is something wrong at our end please feel free to
        raise an issue at{" "}
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
  }
}

export default class LoginPage extends React.Component {
  render() {
    const search = this.props.search
    console.log(search)
    return search && (search['bearer-success'] || search.success) ? (
      <div className="flex items-center flex-col h-auto">
        <div className="flex items-center flex-col my-auto">
          <p>We are logging you in.</p>
          <BearerAuthInfo bearerSuccess={search["bearer-success"]} />
          <GragittyAuthInfo success={search.success} />
          <GragittyTokenInfo search={search} />
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
