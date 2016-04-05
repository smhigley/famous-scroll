define(function(require, exports, module) {
  var PhotoData = {
    flickrApiKey: '5f6652a08b32dd50ae264fb3f47a9632',
    flickrUrl: 'https://api.flickr.com/services/rest/',
    galleryID: '72157649847267217',
    queryParams: '?method=flickr.galleries.getPhotos&format=json&nojsoncallback=1&per_page=9'
  };

  PhotoData.getUrl = function() {
    return PhotoData.flickrUrl + PhotoData.queryParams + '&api_key=' + PhotoData.flickrApiKey + '&gallery_id=' + PhotoData.galleryID;
  };

  PhotoData.parse = function(data) {
    var urls = [];
    data = JSON.parse(data);
    var entries = data.photos.photo;
    for (var i = 0; i < entries.length; i++) {
      var url = 'https://farm'+entries[i].farm+'.staticflickr.com/'+entries[i].server+'/'+entries[i].id+'_'+entries[i].secret+'_m.jpg';
      urls.push(url);
    }
    return urls;
  };

  module.exports = PhotoData;
});
