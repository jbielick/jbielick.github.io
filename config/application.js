module.exports = function(config) {

  config.gaTrackingId = 'UA-11539854-4';
  config.autoloadPaths.push('app/services');

  config.cache = { store: 'memory', stdTTL: 600, checkperiod: 120 };
}