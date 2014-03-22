var emoji = require('./vendor/emoji');

var EMOJI_PATH = '//d1973c4qjhao9m.cloudfront.net/unicode/';

emoji.include_title = true;

module.exports = function (text, options) {
    emoji.img_path = EMOJI_PATH;
    if (typeof options.emojiPath === 'string') {
        emoji.img_path = options.emojiPath;
    }

    text = emoji.replace_colons(text);
    text = emoji.replace_unified(text);

    /**
     * variation selectors help to tell the system what
     * version of an emoji to use
     * we need to remove them with anything other than the unified spec,
     * since otherwise they cause black squares
     * see: http://en.wikipedia.org/wiki/Variation_Selectors_(Unicode_block)
     * & http://stackoverflow.com/questions/15671256
     */
    if (emoji.replace_mode !== 'unified') {
        text = text.replace(/[\uFE00-\uFE0F]/g, '');
    }

    return text;
}
