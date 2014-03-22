# diy-parse-post

#### Helper for parsing posts (comments and groups messages) for links, hashtags, @ mentions and emojis!

Useful for parsing group posts/comments. Uses
[iamcal/js-emoji](https://github.com/iamcal/js-emoji) for emoji parsing
and [twitter-text](https://www.npmjs.org/package/twitter-text) for links,
@ mentions and hashtags.

# Installation

```
npm install --save diy/parse-post
```

# Usage

```js
var parsePost = require('diy-parse-post');

var post = 'Hey :hamburger: diy.org so #chill @drk!';
parsePost(post);
```

# API

## parse(text, [options])

Out of the box it is optimized to work for the www repo which just means when
rendering links it will render at the top level path: `/drk`, `/tags/beep` etc.
You can provide render functions as options to full customize the replacement
string for matched tokens.

### options.renderLink = function (link) {}

### options.renderMention = function (nickname) {}

### options.renderHash = function (hashtag) {}

### options.emojiPath

Full url path to where emoji replacement images can be found for
user agents that can't render native emojis.
