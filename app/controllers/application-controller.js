var Controller = require('kona/lib/controller/request');

console.log(Object.keys(require.cache).filter(function(pat) {
  /application/.test(pat);
}));
var ApplicationController = Controller.extend({

  constructor: function() {
    Controller.apply(this, arguments);
    this.beforeFilter('linksForLayout');
  },

  linksForLayout: function* () {
    this.set('links', {
      'GitHub': '//github.com/jbielick',
      'LinkedIn': '//www.linkedin.com/in/joshbielick',
      'Twitter': '//twitter.com/jbielick',
      'CodePen': '//codepen.io/jbielick',
      'Video': '//vimeo.com/jbielick',
      'Photo': '//www.flickr.com/photos/jbielick'
    });
    this.set('now', new Date());
  }

});

module.exports = ApplicationController;