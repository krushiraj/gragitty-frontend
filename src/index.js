import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";

import * as serviceWorker from "./serviceWorker";
import App from "./App/App";

import "./index.css";
import { getCookie } from "./utils/cookie";
import { GRAPHQL_URL } from "./utils/constants";

const httpLink = new HttpLink({
  uri: GRAPHQL_URL
});

const authLink = setContext((_, { headers }) => {
  const token = getCookie('x-token', "");
  return {
    headers: {
      ...headers,
      'x-token': token
    }
  };
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
