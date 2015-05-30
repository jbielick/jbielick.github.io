var ApplicationController = require('./application-controller');
var instagram = require('../services/instagram');

var MainController = ApplicationController.extend({
  constructor: function() {
    ApplicationController.apply(this, arguments);
    this.respondsTo('html', 'json');
  },
  home: function*() {

  },
  show: function*() {
    yield this.respondTo({
      html: function*() {
        this.render(this.params.path);
      }
    });
  },
  grams: function* () {
    var grams;

    grams = this.cache.get('grams');

    if (!grams) {
      grams = yield instagram.getUserMedia(process.env.IG_USER_ID, 70);
      this.cache.set('grams', grams, 21600);
    }

    yield this.respondWith(grams);
  }
});

module.exports = MainController;