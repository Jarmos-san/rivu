import { describe, expect, it } from "vitest";
import { Feed } from "../src/index.ts";

describe("Feed.generate()", () => {
  it("generates required fields", () => {
    const feed = new Feed({
      title: "My Blog",
      link: "https://example.com",
      description: "Latest updates",
      items: [],
    });

    const xml = feed.generate();

    expect(xml).toContain("<rss");
    expect(xml).toContain("<channel>");
    expect(xml).toContain("<title>My Blog</title>");
    expect(xml).toContain("<link>https://example.com</link>");
    expect(xml).toContain("<description>Latest updates</description>");
  });

  it("omits null and undefined optional fields", () => {
    const feed = new Feed({
      title: "Test",
      link: "https://example.com",
      description: "Test feed",
      language: null,
      generator: undefined,
      items: [],
    });

    const xml = feed.generate();

    expect(xml).not.toContain("<language>");
    expect(xml).not.toContain("<generator>");
  });

  it("includes optional fields when provided", () => {
    const feed = new Feed({
      title: "Feed",
      link: "https://example.com",
      description: "Desc",
      language: "en",
      generator: "Rivu",
      category: "Tech",
      items: [],
    });

    const xml = feed.generate();

    expect(xml).toContain("<language>en</language>");
    expect(xml).toContain("<generator>Rivu</generator>");
    expect(xml).toContain("<category>Tech</category>");
  });

  it("formats dates in RFC 1123 format", () => {
    const feed = new Feed({
      title: "With Dates",
      link: "https://example.com",
      description: "Test dates",
      pubDate: new Date("2025-01-10T12:00:00Z"),
      lastBuildDate: new Date("2025-01-11T10:30:00Z"),
      items: [],
    });

    const xml = feed.generate();

    // date formatting must contain GMT
    expect(xml).toMatch(/<pubDate>.*GMT<\/pubDate>/);
    expect(xml).toMatch(/<lastBuildDate>.*GMT<\/lastBuildDate>/);
  });

  it("omits date fields when not valid Date instance", () => {
    const feed = new Feed({
      title: "Invalid dates",
      link: "https://example.com",
      description: "Null dates",
      pubDate: null,
      lastBuildDate: undefined,
      items: [],
    });

    const xml = feed.generate();

    expect(xml).not.toContain("<pubDate>");
    expect(xml).not.toContain("<lastBuildDate>");
  });

  it("includes items when provided", () => {
    const feed = new Feed({
      title: "Feed With Items",
      link: "https://example.com",
      description: "Has items",
      items: [
        {
          title: "Item One",
          description: "Description for item",
          pubDate: new Date("2025-10-10"),
        },
      ],
    });

    const xml = feed.generate();

    expect(xml).toContain("<item>");
    expect(xml).toContain("<title>Item One</title>");
    expect(xml).toContain("<description>Description for item</description>");
  });

  it("skips unsupported item fields", () => {
    // You do NOT currently support pubDate on items
    const feed = new Feed({
      title: "Unsupported Item Fields",
      link: "https://example.com",
      description: "Testing items",
      items: [
        {
          title: "Item Title",
          description: "Item Desc",
          pubDate: new Date(), // ignored
          category: "Ignored category",
        } as any,
      ],
    });

    const xml = feed.generate();

    expect(xml).toContain("<item>");
    expect(xml).toContain("<title>Item Title</title>");
    expect(xml).toContain("<description>Item Desc</description>");

    // assert unsupported fields are not added
    expect(xml).not.toContain("<pubDate>");
    expect(xml).not.toContain("<category>");
  });

  it("produces pretty printed XML", () => {
    const feed = new Feed({
      title: "Pretty",
      link: "https://example.com",
      description: "Test pretty",
      items: [],
    });

    const xml = feed.generate();

    expect(xml).toMatch(/\n\s*<channel>/); // detects indentation
  });
});
