interface FeedOptions {
  title: string;
  description: string;
  siteUrl: string;
}

export class RSS {
  feedOptions: FeedOptions;

  constructor(feedOptions: FeedOptions) {
    this.feedOptions = feedOptions;
  }
}
