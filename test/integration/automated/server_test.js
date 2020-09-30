const request = require("supertest");

//Mocks setup
const {
  getDataFromCurrentSelection,
} = require("digestible-wcag-email-selection");
jest.mock("digestible-wcag-email-selection");

describe("GraphQL endpoint", () => {
  let server;

  beforeEach(() => {
    ({ server } = require("../../../packages/api/server.js"));
  });

  afterEach((done) => {
    server.close(() => {
      done();
    });
  });

  it("Doesn't re-use the first response on subsequent requests", async () => {
    //ARRANGE
    getDataFromCurrentSelection
      .mockReturnValueOnce({ subject: "1st subject" })
      .mockReturnValueOnce({ subject: "2nd subject" });

    //ACT
    const response1 = await request(server)
      .post("/graphql")
      .type("form")
      .set("Accept", "application/json")
      .send({
        query: `
                {
                  current {
                    subject
                  }
                }
              `,
      });
    const response1AsJsObj = JSON.parse(response1.text);

    //ASSERT
    expect(response1AsJsObj).toEqual({
      data: {
        current: {
          subject: "1st subject",
        },
      },
    });

    //ACT
    const response2 = await request(server)
      .post("/graphql")
      .type("form")
      .set("Accept", "application/json")
      .send({
        query: `
                {
                  current {
                    subject
                  }
                }
              `,
      });
    const response2AsJsObj = JSON.parse(response2.text);

    //ASSERT
    expect(response2AsJsObj).toEqual({
      data: {
        current: {
          subject: "2nd subject",
        },
      },
    });
  });
});
