module.exports = function(router) {

  router.get('/').to('main.home');
  router.match('/pages/*path', 'GET').to('main.show');
  router.get('/grams').to('main.grams');

}