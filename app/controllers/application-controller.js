var Controller = require('kona/lib/controller/request');

var ApplicationController = Controller.extend({

  constructor: function() {
    Controller.apply(this, arguments);
    this.beforeFilter('linksForLayout');
  },

  linksForLayout: function* () {
    this.set('links', {
      'code': '//github.com/jbielick',
      'networking': '//www.linkedin.com/in/joshbielick',
      'audio': '//soundcloud.com/leo-tallstoy',
      'motion': '//vimeo.com/jbielick',
      'still': '//www.flickr.com/photos/jbielick'
    });
    this.set('now', new Date());
  }

});

module.exports = ApplicationController;
