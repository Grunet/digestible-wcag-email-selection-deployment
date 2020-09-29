const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const {
  createCurrentSelectionAdapter,
} = require("./currentSelectionAdapter.js");

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
    html: async function (args, { getDataFromCurrentSelection }) {
      const { html } = await getDataFromCurrentSelection();

      return html;
    },
    plainText: async function (args, { getDataFromCurrentSelection }) {
      const { plainText } = await getDataFromCurrentSelection();

      return plainText;
    },
    subject: async function (args, { getDataFromCurrentSelection }) {
      const { subject } = await getDataFromCurrentSelection();

      return subject;
    },
  },
};

const app = express();
app.use("/graphql", (req, res) => {
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
    context: {
      getDataFromCurrentSelection: createCurrentSelectionAdapter()
        .getDataFromCurrentSelection, //Needs to be re-created on each request or else the caching will persist between requests
    },
  })(req, res);
});
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
