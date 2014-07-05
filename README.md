sql-load
========

AMD plugin for loading SQL

__Warning__ - This module is still a work in progress, use at your own risk

## Usage

```js
var selectAll = require('sql-load')('./selectAll');
// selectAll is a string to use in a query
```

```js
define([
  'sql-load!selectAll'
], function(selectAll){
  // selectAll is a string to use in a query
});
```

You can configure the loader through AMD config or the `config` method.

```js
var sqlLoad = require('sql-load');

sqlLoad.config({
  basePath: __dirname + '/sql', // will load sql files from the sql/ directory inside current directory
  extension: '.txt' // will load files will extension .txt if one isn't specified
});

var selectAll = sqlLoad('./selectAll'); // loaded __dirname + '/sql/selectAll.txt';
