import type { ChannelElements } from "./types.ts";

/**
 * Represents an RSS feed generator instance.
 *
 * The `RSS` class stores channel-level metadata which describes the feed,
 * including required fields such as `title`, `link` and `description`, as well
 * as optional metadata like publication dates, editor information and
 * fetch/skip rules.
 */
export class RSS {
  /**
   * The RSS `<channel>` metadata used to describe the feed.
   *
   * This value is supplied when constructing the `RSS` instance and is stored
   * without modification. It is expected that validation, normalization or
   * transformation (if necessary) will be handled externally or in future
   * enhancements.
   */
  channelElements: ChannelElements;

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
}
