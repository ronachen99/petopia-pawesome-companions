// import necessary dependencies
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import css
import "./index.css";
// import rerquired modules form the apollo client
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// the GraphQL endpoint that the client will connect to
const httpLink = createHttpLink({
  uri: "/graphql",
});

// adds the auth token to the headers of each GraphQL request
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// renders the root component App within the apolloprovider that gives the appolo client instance to all components int he app via React context
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,

  document.getElementById("root")
);
