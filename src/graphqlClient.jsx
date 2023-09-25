import { GraphQLClient } from "graphql-request";
const endpoint = "http://54.94.34.59:1337/graphql";
const graphQLClient = new GraphQLClient(endpoint);
export default graphQLClient;
