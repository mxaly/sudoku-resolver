import { test, expect } from "vitest";
import { unique } from "./common";

test("unique", () => {
  expect(unique([1, 2, 3])).toEqual([1, 2, 3]);
  expect(unique([1, 2, 2, 3, 4, 4])).toEqual([1, 2, 3, 4]);
});
