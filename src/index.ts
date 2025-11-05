import type { ChannelElements } from "./types.ts";

export class RSS {
  feedOptions: ChannelElements;

  constructor(feedOptions: ChannelElements) {
    this.feedOptions = feedOptions;
  }
}
