import { describe, expect, it } from "vitest";
import { greet } from "../src/index";

describe("index.ts", () => {
  it("greet returns correct message", () => {
    expect(greet("World!")).toBe("Hello, World!");
  });
});
