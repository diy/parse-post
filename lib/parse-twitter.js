var twitter = require('twitter-text');

var renderHash = function (hashtag) {
    return '<a href="/tags/' + hashtag + '">#' + hashtag +'</a>';
};

var renderMention = function (mention) {
    return '<a href="/' + mention + '">@' + mention +'</a>';
};

var renderLink = function (link) {
    var protoLink = link;
    if (link.indexOf('://') === -1) protoLink = 'http://' + link;
    return '<a href="' + protoLink + '" rel="nofollow">' + link +'</a>';
};

module.exports = function (text, options) {
    /**
     * Links
     */
    if (typeof options.renderLink !== 'function') {
        options.renderLink = renderLink;
    }

    var links = twitter.extractUrls(text);
    for (var i = 0; i < links.length; i++) {
        var link = links[i];
        text = text.replace(links[i], options.renderLink(links[i]));
    }

    /**
     * Hashtags
     */
    var hashtags = twitter.extractHashtags(text);

    if (typeof options.renderHash !== 'function') {
        options.renderHash = renderHash;
    }

    for (var i = 0; i < hashtags.length; i++) {
        var hashtag = hashtags[i];
        text = text.replace('#' + hashtag, options.renderHash(hashtag));
    }

    /**
     * Mentions
     */
    if (typeof options.renderMention !== 'function') {
        options.renderMention = renderMention;
    }

    var mentions = twitter.extractMentions(text);
    for (var i = 0; i < mentions.length; i++) {
        var mention = mentions[i];
        text = text.replace('@' + mention, options.renderMention(mention));
    }

    return text;
};
