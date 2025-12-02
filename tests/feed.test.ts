import { describe, expect, it } from "vitest";
import { Feed } from "../src/index.ts";

describe("Feed.generate()", () => {
  it("generates required fields wrapped in CDATA", () => {
    const feed = new Feed({
      title: "My Blog",
      link: "https://example.com",
      description: "Latest updates",
      items: [],
    });

    const xml = feed.generate();

    expect(xml).toContain("<rss");
    expect(xml).toContain("<channel>");

    // CDATA expectations
    expect(xml).toContain("<title><![CDATA[My Blog]]></title>");
    expect(xml).toContain("<link><![CDATA[https://example.com]]></link>");
    expect(xml).toContain(
      "<description><![CDATA[Latest updates]]></description>",
    );
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

  it("includes optional fields with CDATA", () => {
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

    expect(xml).toContain("<language><![CDATA[en]]></language>");
    expect(xml).toContain("<generator><![CDATA[Rivu]]></generator>");
    expect(xml).toContain("<category><![CDATA[Tech]]></category>");
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

  it("includes items wrapped in CDATA when provided", () => {
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

    expect(xml).toContain("<title><![CDATA[Item One]]></title>");
    expect(xml).toContain(
      "<description><![CDATA[Description for item]]></description>",
    );
  });

  it("skips unsupported item fields (even if CDATA present)", () => {
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
    expect(xml).toContain("<title><![CDATA[Item Title]]></title>");
    expect(xml).toContain("<description><![CDATA[Item Desc]]></description>");

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

    // still validating pretty-printing behavior
    expect(xml).toMatch(/\n\s*<channel>/);
  });
});
