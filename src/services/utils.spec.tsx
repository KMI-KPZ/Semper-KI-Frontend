import { log } from "console";
import {
  getFileSizeAsString,
  getTimeAsText,
  isNumber,
  getCurrentTimeInSeconds,
  removeItem,
  getUserType,
  parseAddress,
  removeItemByIndex,
  getModelURI,
  checkForSelectedData,
  isKey,
  getStatusByIndex,
  splitFindArray,
  splitArray,
} from "./utils";
import logger from "@/hooks/useLogger";
import { UserType } from "@/hooks/useUser/types";

describe("Utils", () => {
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
  describe("Test getUserType", () => {
    it("should return client", () => {
      const value = getUserType("client");
      expect(value).toBe(0);
    });
    it("should return manufacturer", () => {
      const value = getUserType("manufacturer");
      expect(value).toBe(1);
    });
    it("should return admin", () => {
      const value = getUserType("admin");
      expect(value).toBe(2);
    });
    it("should return anonym", () => {
      const value = getUserType("anonym");
      expect(value).toBe(3);
    });
    it("should return anonym when empty", () => {
      const value = getUserType("");
      expect(value).toBe(3);
    });
    it("should return anonym when something else", () => {
      const value = getUserType("else");
      expect(value).toBe(3);
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
    it("should return array without item", () => {
      const array = ["a", "b", "c"];
      const value = removeItemByIndex(array, 3);
      expect(value).toStrictEqual(["a", "b", "c"]);
    });
    it("should return emtpy array", () => {
      const array: any[] = [];
      const value = removeItemByIndex(array, 1);
      expect(value).toStrictEqual([]);
    });
  });
});
