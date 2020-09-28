const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const { getCurrentSelectionData } = require("./currentSelectionAdapter.js");

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type SelectionData {
    html: String,
    plainText: String,
    subject: String
  }

  type Query {
    current: SelectionData
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  current: {
    html: async function () {
      const { html } = await getCurrentSelectionData();

      return html;
    },
    plainText: async function () {
      const { plainText } = await getCurrentSelectionData();

      return plainText;
    },
    subject: async function () {
      const { subject } = await getCurrentSelectionData();

      return subject;
    },
  },
};

const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
