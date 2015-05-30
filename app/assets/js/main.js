(function($, Backbone, _) {

  var ANIMATION = Modernizr.prefixed('animation');
  var ANIMATION_DURATION = Modernizr.prefixed('animationDuration');

  var GramView = Backbone.View.extend({

    initialize: function(options) {
      _.extend(this, options);
    },

    className: 'gram',

    template: _.template($('#gramTemplate').html(), null, {variable: 'gram'}),

    render: function() {
      var _this = this;
      var html = '';

      this.models.forEach(function(model) {
        html += this.template(model.toJSON());
      }, this);

      this.el.innerHTML = html;

      // fade image in on load
      this.$('img').on('load', function() {
        var animString = 'fade ' + ((_this.index + 1) * 0.2) + 's ease-in-out';
        $(this).css(ANIMATION, animString).css({opacity: '1'});
      });

      this.$('a').first().get(0).style[ANIMATION_DURATION] = (Math.floor(Math.random() * (50 - 20)) + 20) + 's';
      return this;
    }
  });

  var Grams = Backbone.Collection.extend({url: '/grams'});

  $(document).ready(function(){

    var grams = new Grams();
    var $gramEl = $('#grams');

    grams
      .on('reset', function(coll) {
        var models = [];

        $gramEl.append(coll.inject(function(memo, gram, i) {
          var view;

          models.push(gram);

          if (models.length === 2) {
            view = new GramView({models: models, index: i}).render();
            models = [];
            memo = memo.concat([view.el]);
          }

          return memo;

        }, []));
      })
      .fetch({reset: true});
  });

})(window.jQuery, window.Backbone, window._);