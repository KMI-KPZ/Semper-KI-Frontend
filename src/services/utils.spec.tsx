import { getFileSizeAsString, isNumber } from "./utils";

describe.skip("Utils", () => {
  describe("Test getFileSizeAsString", () => {
    it("should return 1B as string", () => {
      const value = getFileSizeAsString(1);

      expect(value).toBe("1B");
      expect(typeof value).toBe("string");
    });
    it("should return 1KB", () => {
      const value = getFileSizeAsString(1000);
      expect(value).toBe("1KB");
    });
    it("should return 1MB", () => {
      const value = getFileSizeAsString(1000000);
      expect(value).toBe("1MB");
    });
    it("should return 0MB", () => {
      const value = getFileSizeAsString(-1);
      expect(value).toBe("0B");
    });
  });
  describe("Test isNumber", () => {
    it("should return true", () => {
      const value = isNumber(5);
      expect(value).toBe(true);
    });
    it("should return false", () => {
      let value = isNumber("no Number");
      expect(value).toBe(false);
      value = isNumber(true);
      expect(value).toBe(false);
      value = isNumber(undefined);
      expect(value).toBe(false);
    });
  });
});
