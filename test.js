var test = require('tape');
var p = require('./');

var sample = 'Hey :hamburger: diy.org so #chill @drk!';

test('Parse text defaults', function (t) {
    var wanted = 'Hey <span class="emoji" style="background-image:url(http://d1973c4qjhao9m.cloudfront.net/unicode/1f354.png)" title="hamburger">:hamburger:</span> <a href="http://diy.org" rel="nofollow">diy.org</a> so <a href="/tags/chill">#chill</a> <a href="/drk">@drk</a>!';

    t.equal(p(sample), wanted, 'Parsed defaults are chill');
    t.end();
});

test('Parse text with custom renderHash', function (t) {
    var wanted = 'Hey <span class="emoji" style="background-image:url(http://d1973c4qjhao9m.cloudfront.net/unicode/1f354.png)" title="hamburger">:hamburger:</span> <a href="http://diy.org" rel="nofollow">diy.org</a> so <a href="https://diy.org/tags/chill">#chill</a> <a href="/drk">@drk</a>!';

    var options = {
        renderHash: function (hashtag) {
            return '<a href="https://diy.org/tags/' + hashtag + '">#' + hashtag +'</a>';
        }
    };

    t.equal(p(sample, options), wanted, 'Custom renderHash');
    t.end();
});

test('Parse text with custom renderLink', function (t) {
    var wanted = 'Hey <span class="emoji" style="background-image:url(http://d1973c4qjhao9m.cloudfront.net/unicode/1f354.png)" title="hamburger">:hamburger:</span> <a href="http://test.diy.org" rel="nofollow">test.diy.org</a> so <a href="/tags/chill">#chill</a> <a href="/drk">@drk</a>!';

    var options = {
        renderLink: function (link) {
            link = 'test.' + link;
            var protoLink = link;
            if (link.indexOf('://') === -1) protoLink = 'http://' + link;
            return '<a href="' + protoLink + '" rel="nofollow">' + link +'</a>';
        }
    };

    t.equal(p(sample, options), wanted, 'Custom renderLink');
    t.end();
});

test('Parse text with custom renderMention', function (t) {
    var wanted = 'Hey <span class="emoji" style="background-image:url(http://d1973c4qjhao9m.cloudfront.net/unicode/1f354.png)" title="hamburger">:hamburger:</span> <a href="http://diy.org" rel="nofollow">diy.org</a> so <a href="/tags/chill">#chill</a> <a href="https://diy.org/drk">@drk</a>!';

    var options = {
        renderMention: function (mention) {
            return '<a href="https://diy.org/' + mention + '">@' + mention +'</a>';
        }
    };

    t.equal(p(sample, options), wanted, 'Custom renderLink');
    t.end();
});
