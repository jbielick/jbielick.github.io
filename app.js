var Kona = require('kona');
var app = new Kona({root: __dirname});

require('dotenv').load();

app.initialize().on('ready', function() {
  this.listen();
});
