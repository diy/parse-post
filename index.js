var emoji = require('./lib/parse-emoji');
var twitter = require('./lib/parse-twitter');

module.exports = function (text, options) {
    options = options || {};

    // Parse w/ twitter first to catch links and THEN emojify
    text = twitter(text, options);
    text = emoji(text, options);

    return text;
};
