(function(define){
  'use strict';

  define(function(require){

    var text = require('text');

    function load(name, req, cb, config){
      // Dojo provides access to the config object through the req function.
      if (!config) {
        config = require.rawConfig;
      }

      var pathPrefix = config.sqlPathPrefix || 'sql';
      var extension = config.sqlExtension || '.sql';

      text.load(pathPrefix + '/' + name + extension, req, cb, config);
    }

    return {
      load: load
    };

  });

}(
  typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(require); }
  // Boilerplate for AMD and Node
));
