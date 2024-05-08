import { InMemoryCache, ApolloClient } from "@apollo/client";
import { createApolloProvider } from "@vue/apollo-option";

const cache = new InMemoryCache();
const developmentUri = "http://localhost:3000/graphql";
// const productionUri = "https://rails-backend-xks1.onrender.com/graphql";
const productionUri = "https://rails-backend-9sok.onrender.com/graphql";
const uri = process.env.NODE_ENV === "production" ? productionUri : developmentUri;

const apolloClient = new ApolloClient({
    cache,
    uri,
});

export const provider = createApolloProvider({
    defaultClient: apolloClient,
});
