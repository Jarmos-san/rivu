import { create } from "xmlbuilder2";
import type { ChannelElements, RSS } from "./types.ts";

/**
 * Represents an RSS feed generator instance.
 *
 * The `RSS` class stores channel-level metadata which describes the feed,
 * including required fields such as `title`, `link` and `description`, as well
 * as optional metadata like publication dates, editor information and
 * fetch/skip rules.
 */
export class Feed implements RSS {
  /**
   * The RSS `<channel>` metadata used to describe the feed.
   *
   * This value is supplied when constructing the `RSS` instance and is stored
   * without modification. It is expected that validation, normalization or
   * transformation (if necessary) will be handled externally or in future
   * enhancements.
   */
  readonly channelElements: ChannelElements;

  /**
   * Creates a new `RSS` feed instance with the provided channel metadata.
   *
   * @param channelElements - The mmetadata describing the RSS channel. This
   * must include the required properties defined in {@link ChannelElements},
   * such as `title`, `link` and `description`. The optional fields may also be
   * provided to supply extended metadata.
   */
  constructor(channelElements: ChannelElements) {
    this.channelElements = channelElements;
  }

  /**
   * Converts a JavaScript `Date` object into a valid RSS-approved date string.
   *
   * RSS 2.0 requires the date values to be formatted using the RFC 1123 format
   * which is achieved via the `Date.prototype.toUTCString()` method. If the
   * provided value is `undefined` or `null` or is not a `Date` instance, no
   * output is returned to ensure the optional date fields are ommited in the
   * rendered XML output.
   *
   * @param date - The date value format. Maybe a `Date` object, `null` or
   * `undefined`.
   *
   * @returns A UTC-formatted date string if `date` is a valid `Date` instance,
   * otherwise it is undefined allowing the caller to skip serialization.
   */
  private formatDate(date?: Date | null): string | undefined {
    return date instanceof Date ? date.toUTCString() : undefined;
  }

  /**
   * Generates an RSS 2.0 compliant XML string representation of the feed.
   *
   * This method constructs the `<rss>` and `<channel>` elements and then
   * populates them using the metadata stored in {@link channelElements}. All
   * required channel fields (`title`, `link` and `description`) are always
   * included in the output. Optional fields are only included if values have
   * been provided by the consumer of this class.
   *
   * Internally, the helper function `add()` is used to conditionally add XML
   * elements and avoid repetitive null/undefined checks. Undefined or null
   * values are silently skipped, ensuring a clean and standards-compliant RSS
   * output with no empty tags.
   *
   * @returns A formatted RSS feed XML string.
   *
   * @example
   * ```ts
   * const feed = new Feed({
   *   title: "My Blog",
   *   link: "https://example.com",
   *   description: "Latest updates"
   * });
   *
   * const xml = feed.generate();
   * console.log(xml);
   * ```
   */
  generate(): string {
    const doc = create({ version: "1.0" })
      .ele("rss", { version: "2.0" })
      .ele("channel");

    /**
     * Appends an XML element to this RSS `<channel>` only if a value exists.
     *
     * This helper prevents conditional boilerplate by ensuring that optional
     * channel fields (e.g., `language`, `generator`, `pubDate`) are ONLY
     * included in the final XML output if they're defined. Undefined and null
     * values are silently ignored.
     *
     * @param name - The name of the XML element corresponding to a key in the
     * {@link ChannelElements} interface.
     *
     * @param value - The value to assign to the XML element. If `undefined` or
     * `null`, no element will be added.
     */
    const add = (name: keyof ChannelElements, value: unknown) => {
      if (value !== undefined && value !== null) {
        doc.ele(name).txt(String(value)).up();
      }
    };

    // Required elements
    add("title", this.channelElements.title);
    add("link", this.channelElements.link);
    add("description", this.channelElements.description);

    // Optional elements which are added if they were configured
    add("language", this.channelElements.language);
    add("copyright", this.channelElements.copyright);
    add("managingEditor", this.channelElements.managingEditor);
    add("webMaster", this.channelElements.webMaster);
    add("pubDate", this.formatDate(this.channelElements.pubDate));
    add("lastBuildDate", this.formatDate(this.channelElements.lastBuildDate));
    add("category", this.channelElements.category);
    add("generator", this.channelElements.generator);
    add("docs", this.channelElements.docs);
    add("ttl", this.channelElements.ttl);

    // TODO: The following elements require some more logic to be handled. Also
    // the `textInput` field is missing and needs to be added here
    add("image", this.channelElements.image);
    add("skipHours", this.channelElements.skipHours);
    add("skipDays", this.channelElements.skipDays);

    if (Array.isArray(this.channelElements.items)) {
      for (const item of this.channelElements.items) {
        const itemEl = doc.ele("item");

        if (item.title) itemEl.ele("title").txt(item.title).up();
        if (item.link) itemEl.ele("link").txt(item.link.toString()).up();
        if (item.description)
          itemEl.ele("description").txt(item.description).up();
        if (item.author) itemEl.ele("author").txt(item.author).up();
        if (item.category) itemEl.ele("category").txt(item.category).up();
        if (item.comments)
          itemEl.ele("comments").txt(item.comments.toString()).up();
        if (item.pubDate)
          itemEl
            .ele("pubDate")
            .txt(this.formatDate(item.pubDate) ?? "")
            .up();
      }
    }

    return doc.end({ prettyPrint: true });
  }
}
