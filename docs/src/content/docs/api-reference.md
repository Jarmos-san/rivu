---
title: API Reference
---

Rivu provides an intuitive and accessible public API for its users to generate a
RSS 2.0-compliant feed in Node.js. The detailed descriptions of the public API
is provided below for reference.

## Class `Feed`

The `Feed` class provides programmatic interface for generating RSS 2.0
compliant XML feeds. It implements the [`RSS`](#interface-rss) interface and
accepts channel-level metadata like title, link, description, etc and serializes
it along with optional item entries into a string of valid RSS 2.0 XML feed.

### Constructor

#### `new Feed(channelElements: ChannelElements)`

Creates a new RSS feed instance with the provided channel metadata.

##### Parameters

| Name              | Type                                            | Description                                                                                                                                                                       |
| ----------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `channelElements` | [`ChannelElements`](#interface-channelelements) | Object representing the RSS `<channel>` metadata. Must include `title`, `link` and `description`. Optional fields maybe provided to include additional channel-level information. |

##### Example

```typescript
import { Feed } from "rivu";

const feed = new Feed({
  title: "Lorem Ipsum",
  description: "Lorem ipsum",
  link: "https://example.com/rss.xml",
});
```

### Instance Methods

#### `generate(): string`

Generates an RSS 2.0 compliant XML string representation of the feed. The method
performs the following tasks:

1. Creates the `<rss>` and `<channel>` root nodes.
2. Appends required channel fields (`title`, `link`, `description`).
3. Includes optional metadata only when provided.
4. Serializes all `<item>` elements when defined.
5. Provides pretty-printed XML output.

##### Returns

| Type     | Description                       |
| -------- | --------------------------------- |
| `string` | Fully rendered RSS 2.0 XML string |

##### Example

```typescript
import { Feed } from "rivu";

const feed = new Feed({
  title: "Lorem ipsum",
  description: "Lorem ipsum",
  link: "https://example.com/rss.xml",
});

console.log(feed.generate());
```

The code above will produce the following output:

```xml
<rss version="2.0">
  <channel>
    <title><![CDATA[Lorem Ipsum]]></title>
    <link><![CDATA[https://jarmos.dev/feed.xml]]></link>
    <description><![CDATA[Lorem ipsum]]></description>
    <item>
      <title><![CDATA[lorem ipsum]]></title>
      <description><![CDATA[lorem ipsum]]></description>
    </item>
  </channel>
</rss>
```

## Interface `RSS`

The `RSS` interface represents the structure and data required for constructing
an RSS feed in accordance to the official
[RSS 2.0 specifications](https://www.rssboard.org/rss-specification). It stores
the `<channel>` level metadata which also includes information such as the
'title', 'link', 'description' and other optional publishing metadata.

### Methods

#### `generate(): string`

The `generate()` method returns a stringified representation of the RSS 2.0 XML
output. The output can be used in any Node.js runtime environments to produce a
valid RSS 2.0 feed.

## Interface `ChannelElements`

The `ChannelElements` interface represents the metadata that defines an RSS
`<channel>` which includes the required core information such as the `title`,
`link`, `description` and other optional publishing metadata.

### Attributes

#### `title: string`

(**REQUIRED**) Represents the name of the feed which is often the site name or
the publication title.

#### `link: string`

(**REQUIRED**) Represents the canonical URL corresponding to the feed's website,
e.g. `"https://jarmos.dev/rss.xml"`

#### `description: string`

(**REQUIRED**) A short explanation of the feed's purpose and its description.

#### `language?: string | null`

The language of the content specified as an IETF language tag, e.g. `"en-US"`.

#### `copyright?: string | null`

The copyright notice for the content, e.g. `"Somraj Saha © 2025"`.

#### `managingEditor?: string | null`

The email address and name of the person responsible for the editorial content,
e.g. `"Sagar Kapoor <sagar.kapoor@weburz.com>"`

#### `webMaster?: string | null`

The email address and name of the technical contact responsible for the feed's
maintenance, e.g.` "Somraj Saha <somraj.saha@weburz.com>"`.

#### `pubDate?: string | null`

The publication date of the feed's content, e.g. `"2025-12-07T12:29:17.127Z"`.

#### `lastBuildDate?: Date | null`

The last time the feed content was modified, e.g. `"2025-12-07T12:29:17.127Z"`.

#### `category?: string | null`

The category or classification of the feed, e.g. `"Technology"`, `"Finance"`,
`"World News"`, `"Podcasts"` and so on.

#### `generator?: string | null`

The software used to generate the feed, e.g. `"Node.js v25"`.

#### `docs?: "https://www.rssboard.org/rss-specification" | null`

The URL to the official RSS specification which is usually left unchanged and is
set to the default string - `"https://www.rssboard.org/rss-specification"`.

#### `ttl?: number | null`

The number of minutes a feed can be cached before refreshing it, e.g. `1440` (a
single day).

#### `image?: URL | string | null`

A [`URL`](https://developer.mozilla.org/en-US/docs/Web/API/URL) object
representing the remote location of an image asset for the channel, e.g.
`new URL('https://example.com/assets/rss-channel.jpeg')` or
`https://example.com/assets/rss-channel.jpeg`.

#### `textInput?: TextInput | null`

Represents an embedded text input interface inside RSS-capable clients which can
be used to perform search indexing of the feed. Read the
"[`<textInput>` sub-element of `<channel>`](https://www.rssboard.org/rss-specification#lttextinputgtSubelementOfLtchannelgt)"
section for more information. See [`Textinput`](#interface-textinput) for
implementation details.

#### `skipHours?: Hour | null`

The hours of the day during which aggregators should refrain from fetching the
feed. It can be useful for managing predictable server load windows or
maintenance periods, e.g. `22`, `10`, `8` and so on. See
[`Hour`](#interface-hour) for more implementation details.

#### `skipDays?: Day | null`

The days of the week during which aggregators should avoid retrieving the feed.
It helps publishers avoid unnecessary fetches during predictable no-update days,
e.g. `"Sunday"`, `"Wednesday"` and so on. See [`Day`](#interface-days) for more
implementation details.

#### `items: Item`

The collection of published entries associated with the channel wherein each
entry is represented by an `<item>` element describing an article, update or any
other meaningful piece of content. See [`Item`](#interface-item) for more
implementation details.

## Interface `TextInput`

Represents the `<textInput>` element in a RSS feed which is used to define a
form interface that allows users to submit feedback or search queries from RSS
readers which support that feature.

### Attributes

#### `title: string`

The label of the submit button, e.g. `"Search"` or `"Submit"` and so on.

#### `description: string`

A description of the text input's purpose, e.g.
`"Search the RSS feed for the queried keywords"` and so on.

#### `name: string`

The name attribute for the input element, e.g. `"search"`.

#### `link: URL`

The URL where the text input form is submitted, e.g.
`"https://example.com/rss/search"`.

## Type `Hour`

Represents the hours of the day (0-23) based on a 24-hour clock used in the RSS
`<skipHours>` metadata. If a feed specifies the `<skipHours>` element, then
aggregators may choose not to fetch the feed during the specified hours which is
primarily helpful for rate-limiting or predictable downtime periods.

## Type `Day`

Represents the days of the week used in the RSS `<skipDays>` metadata element.
If a feed specifies the `<skipDays>` element, then aggregators may choose not to
fetch the feed on the listed days of the week.

## Interface `Item`

Represents a single `<item>` element in a RSS feed wherein each item typically
corresponds to a piece of published content such as a blog post, podcast episode
or update. All the fields are optional but the logic is implemented such that at
least a title of description is provided.

### Attributes

#### `title?: string | null`

The title of the item which is usually the name of the article or a post, e.g.
`"Example RSS Feed"`.

#### `link?: string | URL | null`

The canonical URL where the full content of the item can be accessed, e.g.
`"https://jarmos.dev/rss.xml"`.

#### `description?: string | null`

A short summary or description of the item, e.g.
`"This is a sample description of an article in an RSS feed."`.

#### `author?: string | null`

The author of the item, typically formatted as a `Name <Email>` but the format
may vary, e.g. `"Somraj Saha <somraj.saha@weburz.com>"`.

#### `category?: string | null`

A category or tag describing the topic of the item, e.g. `"Python Programming"`,
`"UI/UX"` and so on.

#### `comments?: string | URL`

A link to the comments page or discussion thread related to the item, e.g.
`"https://jarmos.dev/vim-vs-neovim/comments"`.

#### `pubDate?: Date | null`

The publication date for the item, e.g. `"2025-12-07T12:29:17.127Z"`.
