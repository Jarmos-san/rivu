import { describe, expect, it } from "vitest";
import { RSS } from "../src/index";
import { ChannelElements } from "../src/types";

describe("src/index.ts", () => {
  it("should initialise with required fields only", () => {
    const feedOptions: ChannelElements = {
      title: "Example Feed",
      link: "https://example.com/rss.xml",
      description: "An example RSS feed",
    };

    const rss = new RSS(feedOptions);

    expect(rss.feedOptions).toBe(feedOptions);
  });

  it("should allow all optional fields", () => {
    const feedOptions: ChannelElements = {
      title: "Extended Feed",
      link: "https://example.com",
      description: "An example RSS feed",
      language: "en-US",
      copyright: "2025 Example Corp",
      managingEditor: "editor@example.com",
      webMaster: "webmaster@example.com",
      pubDate: new Date("2025-01-10"),
      lastBuildDate: new Date("2025-01-10"),
      category: "Technology",
      generator: "Node.js (powered by Rivu)",
      docs: "https://www.rssboard.org/rss-specification",
      ttl: 60,
      image: "https://example.org/logo.png",
      textInput: {
        title: "Search",
        description: "Search the site",
        name: "q",
        link: new URL("https://example.org/search"),
      },
      skipDays: "Sunday",
      skipHours: 13,
    };

    const rss = new RSS(feedOptions);

    expect(rss.feedOptions).toEqual(feedOptions);
  });

  it("should accept null values for nullable optional fields", () => {
    const feedOptions: ChannelElements = {
      title: "Nullable Feed",
      link: "https://null.example",
      description: "Feed testing nulls",
      language: null,
      copyright: null,
      managingEditor: null,
      webMaster: null,
      pubDate: null,
      lastBuildDate: null,
      category: null,
      generator: null,
      docs: null,
      ttl: null,
      image: null,
      textInput: null,
      skipHours: null,
      skipDays: null,
    };

    const rss = new RSS(feedOptions);

    expect(rss.feedOptions).toEqual(feedOptions);
  });
});
