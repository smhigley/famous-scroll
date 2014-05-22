define(function(require, exports, module) {
    var PhotoData = {
        userId: '109813050055185479846',
        albumId: '6013105701911614529',
        picasaUrl: 'https://picasaweb.google.com/data/feed/api/user/',
        queryParams: '?alt=json&hl=en_US&access=visible&fields=entry(id,media:group(media:content,media:description,media:keywords,media:title))',
        defaultImage: 'https://lh4.googleusercontent.com/-HbYp2q1BZfQ/U3LXxmWoy7I/AAAAAAAAAJk/VqI5bGooDaA/s1178-no/1.jpg'
    };

    PhotoData.getUrl = function() {
        return PhotoData.picasaUrl + PhotoData.userId + '/albumid/' + PhotoData.albumId + PhotoData.queryParams;
    };

    PhotoData.parse = function(data) {
        var urls = [];
        data = JSON.parse(data);
        var entries = data.feed.entry;
        for (var i = 0; i < entries.length; i++) {
            var media = entries[i].media$group;
            urls.push(media.media$content[0].url);
        }
        return urls;
    };

    module.exports = PhotoData;
});
