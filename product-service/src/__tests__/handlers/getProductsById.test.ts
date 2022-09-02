import { handler } from "@handlers/getProductsById";

describe("getProductsById function handler", () => {
  it("should return status 200", async () => {
    const event = {
      pathParameters: {
        id: "7567ec4b-b10c-48c5-9345-fc73c48a80a3",
      },
    };
    const res = await handler(event, null);
    expect(res.statusCode).toEqual(200);
  });
});
