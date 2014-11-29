(function(define){
  'use strict';

  define(function(require){

    var fs = require('fs');
    var path = require('path');
    var extend = require('util')._extend;
    var findBase = require('relquire').findBase;

    var config = {
      basePath: null,
      ext: '.sql'
    };

    function plugin(filename, req, cb, rConfig){
      // Dojo provides access to the config object through the req function.
      if (!rConfig) {
        rConfig = require.rawConfig;
      }

      loadAsync(filename, rConfig.basePath, rConfig.ext, function(err, text){
        if(err){
          return cb.error(err);
        }

        cb(text);
      });
    }

    function generatePath(filename, basePath, ext){
      basePath = findBase(basePath || config.basePath || module.parent.filename);
      ext = ext || path.extname(filename) || config.ext;
      filename = path.join(path.dirname(filename), path.basename(filename, ext) + ext);

      return path.resolve(basePath, filename);
    }

    function loadSync(filename, basePath, ext){
      var filepath = generatePath(filename, basePath, ext);
      return fs.readFileSync(filepath, 'utf-8');
    }

    function loadAsync(filename, basePath, ext, cb){
      if(typeof basePath === 'function'){
        cb = basePath;
        basePath = null;
      }

      if(typeof ext === 'function'){
        cb = ext;
        ext = null;
      }

      var filepath = generatePath(filename, basePath, ext);

      fs.readFile(filepath, 'utf-8', cb);
    }

    function setConfig(newConfig){
      extend(config, newConfig);
    }

    loadSync.async = loadAsync;
    loadSync.load = plugin;
    loadSync.config = setConfig;

    return loadSync;

  });

}(
  typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(require); }
  // Boilerplate for AMD and Node
));
