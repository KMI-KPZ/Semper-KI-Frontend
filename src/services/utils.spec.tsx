import { UserType } from "@/hooks/useUser";
import {
  getFileSizeAsString,
  getTimeAsText,
  isNumber,
  getCurrentTimeInSeconds,
  removeItem,
  getAuthorizedUserType,
  parseAddress,
  removeItemByIndex,
  isKey,
  splitFindArray,
  splitArray,
} from "./utils";

describe("Utils", () => {
  describe("Test getFileSizeAsString", () => {
    it("should return 1B as string", () => {
      const value = getFileSizeAsString(1);
      expect(value).toBe("1 B");
      expect(typeof value).toBe("string");
    });
    it("should return 1KB", () => {
      const value = getFileSizeAsString(1000);
      expect(value).toBe("1 KB");
    });
    it("should return 1MB", () => {
      const value = getFileSizeAsString(1000000);
      expect(value).toBe("1 MB");
    });
    it("should return 0MB", () => {
      const value = getFileSizeAsString(-1);
      expect(value).toBe("0 B");
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
  describe("Test getTimeAsText", () => {
    it("should return 1 Sekunden", () => {
      const value = getTimeAsText(60);
      expect(value).toBe("1 Sekunden");
    });
    it("should return 1 Stunde", () => {
      const value = getTimeAsText(60 * 60);
      expect(value).toBe("1 Stunde");
    });
    it("should return 1 Tage", () => {
      const value = getTimeAsText(24 * 60 * 60);
      expect(value).toBe("1 Tage");
    });
    it("should return 1 Tage 1 Stunde 1 Sekunden", () => {
      const value = getTimeAsText(24 * 60 * 60 + 60 * 60 + 60);
      expect(value).toBe("1 Tage 1 Stunde 1 Sekunden");
    });
  });
  describe("Test getCurrentTimeInSeconds", () => {
    it("should return number", () => {
      const value = getCurrentTimeInSeconds();
      expect(typeof value).toBe("number");
    });
    it("should return right time", () => {
      const value = getCurrentTimeInSeconds();
      const now = new Date();
      const nowInSeconds = Math.round(now.getTime() / 1000);
      expect(value).toBe(nowInSeconds);
    });
  });
  describe("Test removeItem", () => {
    it("should return array without item", () => {
      const array = ["a", "b", "c"];
      const value = removeItem(array, "b");
      expect(value).toStrictEqual(["a", "c"]);
    });
    it("should return array without item", () => {
      const array = ["a", "b", "c"];
      const value = removeItem(array, "d");
      expect(value).toStrictEqual(["a", "b", "c"]);
    });
  });
  describe("Test getAuthorizedUserType", () => {
    it("should return client", () => {
      const value = getAuthorizedUserType("user");
      expect(value).toBe(UserType.USER);
    });
    it("should return manufacturer", () => {
      const value = getAuthorizedUserType("organization");
      expect(value).toBe(UserType.ORGANIZATION);
    });
    it("should return admin", () => {
      const value = getAuthorizedUserType("admin");
      expect(value).toBe(UserType.ADMIN);
    });
    it("should return user when empty", () => {
      const value = getAuthorizedUserType("");
      expect(value).toBe(UserType.USER);
    });
    it("should return user when something else", () => {
      const value = getAuthorizedUserType("else");
      expect(value).toBe(UserType.USER);
    });
  });
  describe("Test parseAddress", () => {
    it("should return address", () => {
      const value = parseAddress(
        `{"city": "Leipzig", "number": "42", "street": "Nowherestreet", "country": "Germany", "zipcode": "12345"}`
      );
      expect(value).toStrictEqual({
        city: "Leipzig",
        houseNumber: "42",
        street: "Nowherestreet",
        country: "Germany",
        zipcode: "12345",
      });
    });
  });
  describe("Test removeItemByIndex", () => {
    it("should return array without item", () => {
      const array = ["a", "b", "c"];
      const value = removeItemByIndex(array, 1);
      expect(value).toStrictEqual(["a", "c"]);
    });
    it("should return emtpy array", () => {
      const array: any[] = [];
      const value = removeItemByIndex(array, 1);
      expect(value).toStrictEqual([]);
    });
    it("should the same array", () => {
      const array = ["a", "b", "c"];
      const value = removeItemByIndex(array, -1);
      const value2 = removeItemByIndex(array, 3);
      expect(value).toStrictEqual(["a", "b", "c"]);
      expect(value2).toStrictEqual(["a", "b", "c"]);
    });
  });
  describe("Test isKey", () => {
    it("should return true when key is key of object", () => {
      const value = isKey({ test: "test" }, "test");
      expect(value).toBe(true);
    });
    it("should return false when key is not key of object", () => {
      const value = isKey({ test: "test" }, "test2");
      expect(value).toBe(false);
    });
  });
  describe("Test splitArray", () => {
    it("should split array in arrayTrue and arrayFalse on condition", () => {
      const array = [1, 2, 3, 4, 5, 6, 7, 8];
      const value = splitArray(array, (x) => x > 5);
      expect(value).toStrictEqual({
        arrayFalse: [1, 2, 3, 4, 5],
        arrayTrue: [6, 7, 8],
      });
    });
    it("should return empty arrays", () => {
      const array: any[] = [];
      const value = splitArray(array, (x) => x > 5);
      const array_undefined: any[] | undefined = undefined;
      const function_undefined = (a: number): boolean => a > 5;
      const value_undefined = splitArray(array_undefined, function_undefined);
      expect(value).toStrictEqual({
        arrayFalse: [],
        arrayTrue: [],
      });
      expect(value_undefined).toStrictEqual({
        arrayFalse: [],
        arrayTrue: [],
      });
    });
    it("should return emtpy arrayFalse when everything is true", () => {
      const array = [6, 7, 8];
      const value = splitArray(array, (x) => x > 5);
      expect(value).toStrictEqual({
        arrayFalse: [],
        arrayTrue: [6, 7, 8],
      });
    });
    it("should return emtpy arrayTrue when everything is false", () => {
      const array = [1, 2, 3, 4];
      const value = splitArray(array, (x) => x > 5);
      expect(value).toStrictEqual({
        arrayFalse: [1, 2, 3, 4],
        arrayTrue: [],
      });
    });
  });
  describe("test splitFindArray", () => {
    it("should split array in item and otherArray on condition", () => {
      const array_number = [1, 2, 3, 4, 5, 6, 7, 8];
      const value_number = splitFindArray(array_number, (x) => x === 5);
      const array_string = ["1", "2", "3", "4", "5", "6", "7", "8"];
      const value_string = splitFindArray(array_string, (x) => x === "5");
      expect(value_number).toStrictEqual({
        item: 5,
        otherArray: [1, 2, 3, 4, 6, 7, 8],
      });
      expect(value_string).toStrictEqual({
        item: "5",
        otherArray: ["1", "2", "3", "4", "6", "7", "8"],
      });
    });
    it("should return empty array and item when the only item satifys condition", () => {
      const array = [5];
      const value = splitFindArray(array, (x) => x === 5);
      expect(value).toStrictEqual({
        item: 5,
        otherArray: [],
      });
    });
    it("should return array and undefined when no item satifys condition", () => {
      const array = [1, 2, 3, 4];
      const value = splitFindArray(array, (x) => x === 5);
      expect(value).toStrictEqual({
        item: undefined,
        otherArray: [1, 2, 3, 4],
      });
    });
    it("should return empty array and undefined when array is empty or undefined", () => {
      const array_empty: any[] = [];
      const value_empty = splitFindArray(array_empty, (x) => x === 5);
      const array_undefined = undefined;
      const value_undefined = splitFindArray(array_undefined, (x) => x === 5);
      expect(value_empty).toStrictEqual({
        item: undefined,
        otherArray: [],
      });
      expect(value_undefined).toStrictEqual({
        item: undefined,
        otherArray: [],
      });
    });
  });
});
