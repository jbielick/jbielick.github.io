!(function(document) {

var ANIMATION = Modernizr.prefixed('animation');
var ANIMATION_DURATION = Modernizr.prefixed('animationDuration');
var ANIMATION_DELAY = Modernizr.prefixed('animationDelay');

function createGramSquare(gram) {
  var link = document.createElement('a');
  var img = document.createElement('img');

  link.href = gram.link;
  link.target = '_blank';

  link.appendChild(img);

  return link;
}

function displayGrams(grams) {

  var fragment = document.createDocumentFragment();

  grams.forEach(function(gram, i) {

    var container = document.createElement('div');
    container.className = 'gram';

    var link = createGramSquare(gram);
    var img = link.querySelector('img');

    container.appendChild(link);
    img.style[ANIMATION] = 'fade ' + ((i + 1) * 0.2) + 's ease-in-out';
    link.style[ANIMATION_DURATION] = (Math.floor(Math.random() * (30 - 14)) + 14) + 's';
    link.style[ANIMATION_DELAY] = (Math.floor(Math.random() * (6 - 2)) + 2) + 's';

    img.src = gram.images.standard_resolution.url;

    fragment.appendChild(container);

  });

  document.getElementById('grams').appendChild(fragment);
}

var request = new XMLHttpRequest();
request.open('GET', '/grams', true);
request.addEventListener('readystatechange', function() {
  if (this.readyState !== 4 || this.status !== 200 || !this.responseText) return;
  displayGrams(JSON.parse(this.responseText));
});
request.setRequestHeader('Accept', 'application/json');
request.send();

})(document);
