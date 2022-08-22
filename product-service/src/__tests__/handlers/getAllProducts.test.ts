import { handler } from "@handlers/getProductsList";

describe("getProductsList function handler", () => {
  it("should return status 200", async () => {
    const res = await handler({}, null);
    expect(res.statusCode).toEqual(200);
  });
});
