import { describe, expect, it } from "vitest";
import { Feed } from "../src/index";
import type { ChannelElements } from "../src/types";

describe("src/feed.ts:Feed", () => {
  it("should initialise with required fields only", () => {
    const channelElements: ChannelElements = {
      title: "Example Feed",
      link: "https://example.com/rss.xml",
      description: "An example RSS feed",
      items: [],
    };

    const feed = new Feed(channelElements);

    expect(feed.channelElements).toBe(channelElements);
  });

  it("should allow all optional fields", () => {
    const channelElements: ChannelElements = {
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
      textInput: null,
      skipDays: "Sunday",
      skipHours: 13,
      items: [],
    };

    const feed = new Feed(channelElements);

    expect(feed.channelElements).toBe(channelElements);
  });

  it("should accept null values for nullable optional fields", () => {
    const channelElements: ChannelElements = {
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
      items: [],
    };

    const feed = new Feed(channelElements);

    expect(feed.channelElements).toBe(channelElements);
  });

  it("should generate XML with required fields", () => {
    const feed = new Feed({
      title: "My Blog",
      link: "https://example.com",
      description: "Latest updates",
      items: [],
    });

    const xml = feed.generate();

    expect(xml).toContain("<title>My Blog</title>");
    expect(xml).toContain("<link>https://example.com</link>");
    expect(xml).toContain("<description>Latest updates</description>");
  });

  it("should not include optional fields if undefined or null", () => {
    const feed = new Feed({
      title: "Test Feed",
      link: "https://example.com",
      description: "Test",
      language: null,
      generator: undefined,
      items: [],
    });

    const xml = feed.generate();

    expect(xml).not.toContain("<language>");
    expect(xml).not.toContain("<generator>");
  });

  it("should include optional fields when provided", () => {
    const feed = new Feed({
      title: "Feed",
      link: "https://example.com",
      description: "Desc",
      language: "en",
      generator: "FeedGen",
      items: [],
    });

    const xml = feed.generate();

    expect(xml).toContain("<language>en</language>");
    expect(xml).toContain("<generator>FeedGen</generator>");
  });

  it("should include item elements when items are provided", () => {
    const feed = new Feed({
      title: "Feed With Items",
      link: "https://example.com",
      description: "Has items",
      items: [
        {
          title: "Item One",
          description: "Test item description",
          pubDate: new Date("2025-10-10"),
        },
      ],
    });

    const xml = feed.generate();

    expect(xml).toContain("<item>");
    expect(xml).toContain("<title>Item One</title>");
    expect(xml).toContain("<description>Test item description</description>");
  });
});
