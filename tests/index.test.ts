import { describe, expect, it } from "vitest";
import { RSS } from "../src/index";

describe("src/index.ts", () => {
  const feed = new RSS({
    title: "Lorem Ipsum",
    description: "Lorem Ipsum",
    siteUrl: "https://example.com",
  });

  it("RSS class can be properly instantiated", () => {
    expect(feed).toBeInstanceOf(RSS);
  });

  it('RSS class accepts appropriate "feedOptions"', () => {
    expect(feed.feedOptions.title).toBeTypeOf("string");
    expect(feed.feedOptions.description).toBeTypeOf("string");
    expect(feed.feedOptions.siteUrl).toBeTypeOf("string");
  });
});
