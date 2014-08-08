var emoji = require('./lib/parse-emoji');
var twitter = require('./lib/parse-twitter');
var markdown = require('./lib/parse-markdown');

module.exports = function (text, options) {
    options = options || {};

    // Parse w/ twitter first to catch links and THEN emojify
    text = markdown(text);
    text = twitter(text, options);
    text = emoji(text, options);

    return text;
};

module.exports.emoji = require('./lib/vendor/emoji');
