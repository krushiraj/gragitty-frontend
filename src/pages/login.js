import React from "react";

import Loading from "../components/common/loading"
import BearerAuthButton from "../components/common/bearer-auth-button"
import { getCookie, setCookie } from "../utils/cookie";
import { AUTH_URL } from "../utils/constants";

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

const GragittyTokenInfo = ({ token, fetched, error }) =>
  getCookie("x-token", false) ? (
    <p>
      All details fetched. Loggin you in. <br />
      You'll be redirected to home page in a few moments.
    </p>
  ) : fetched ? (
    <>
      {token ? (
        <p>
          Token recieved from server. Logging you in. You'll be redirected to
          home page in a few moments.
        </p>
      ) : (
        error && (
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
        )
      )}
    </>
  ) : (
    <p>Almost done. Fetching the token.</p>
  );


const UserNotLoggedInView = ({ search, state }) => (
    search &&
    (search['bearer-success'] || search.success)
  ) ? (
    <div className="flex items-center flex-col my-auto">
      <p>We are logging you in.</p>
      <BearerAuthInfo bearerSuccess={search["bearer-success"]} />
      <GragittyAuthInfo success={search.success} />
      <GragittyTokenInfo {...state} />
      <Loading />
    </div>
  ) : (
    <>
      <p>
        Please click the button below to login, so that we can get started
        with awesomeness!
      </p>
      <BearerAuthButton />
    </>
  );

const UserLoggedInView = () => <>
  <p>You have already been logged in. Please continue with the cool stuff.</p>
</>

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = { token: '', fetched: false, error: false }
  }

  componentDidMount() {
    if (this.props.isLoggedIn) {
      fetch("https://gragitty.herokuapp.com/", {
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "x-token": getCookie("x-token")
        },
        method: "GET"
      })
        .then(res => res.json())
        .then(({ auth, token, newToken }) => {
          if (auth && newToken) {
            setCookie('x-token', token)
            console.log('Token has been refreshed', {auth, newToken})
          } else {
            console.log('Token has not been refreshed', {auth, newToken})
          }
        })
        .catch(console.error);
    }
    const search = this.props.search
    if (this.state.token === '') {
      if (search['bearer-success'] === 'true') {
        window.location = AUTH_URL;
      }
      if (search['success'] === 'true') {
        const { auth, newToken, token } = search
        if (auth === 'true' && newToken === 'true') {
          this.setState({ token, fetched: true, error: false }, () => {
            setCookie("x-token", token);
            window.location = "/";
          });
        } else {
          this.setState({ fetched: true, error: true })
        }
      }
    }
  }

  render() {
    const { search, isLoggedIn } = this.props
    return <div className="flex items-center flex-col h-auto">
      {
        isLoggedIn ?
        <UserLoggedInView/> :
        <UserNotLoggedInView search={search} state={this.state} />
      }
    </div>
  }
}
