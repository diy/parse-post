var marked = require('marked');

var options = {
    gfm: true,
    breaks: true,

    tables: false,
    smartLists: false,

};

var lexer = new marked.Lexer(options);
var noop = { exec: function () {} };

// @todo extend w/ options in the future?
var whitelist = ['paragraph', 'codespan'];

for (r in lexer.rules) {
    if (whitelist.indexOf(r) > -1) continue;

    lexer.rules[r] = noop;
}

module.exports = function (text) {
    return marked.parser(lexer.lex(text), options);
}
