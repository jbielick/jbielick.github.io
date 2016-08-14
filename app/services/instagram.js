var request = require('superagent');
var API_URL = 'https://api.instagram.com/v1';

var instagram = {

  getUserMedia: function(userId, count) {
    var url = API_URL + '/users/' + userId + '/media/recent/';
    var results = [];

    count || (count = 10);
    url += '?access_token=' + process.env.IG_ACCESS_TOKEN;
    url += '&count=' + count;

    console.log('IG: GET ' + count);

    function fetchAllPages(url, resolve, reject) {
      return request
        .get(url)
        .set('Accept', 'application/json')
        .end(function(err, resp) {
          if (err) return reject(err);

          results = results.concat(resp.body.data);

          if (!resp.body.pagination.next_url || results.length >= count) {
            return resolve(results);
          }

          return fetchAllPages(resp.body.pagination.next_url, resolve, reject);
        });
    }

    return new Promise(function(resolve, reject) {
      fetchAllPages(url, resolve, reject);
    });
  }
};

module.exports = instagram;
