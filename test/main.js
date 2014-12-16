var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var before = lab.before;
var after = lab.after;
var expect = Code.expect;

var sqlload = require('../');

describe('#load()', function () {
  it('loads a file from the base of the project', function (done) {
    expect(sqlload('./test/fixtures/helloworld')).to.equal('select * from now();');
    done();
  });
});

describe('#config()', function () {
  it('sets the pathname with a new file extension', function (done) {
    var configObj = {
      ext: '.txt'
    };

    sqlload.config(configObj);
    expect(sqlload('./test/fixtures/iced')).to.equal('select * from ICED now();');
    done();
  });

  it('sets basePath to config.basePath when package.json is present', function (done) {
    var configObj = {
      basePath: __dirname + '/fixtures/sql',
      ext: '.txt'
    };
    sqlload.config(configObj);
    expect(sqlload('./iced')).to.equal('select * from ICED now();');
    done();
  });

  // Only worked when the full path was included in basePath. 
  // When folders are included in the sqlload call it breaks
  it.only('loads a file from config.basePath where file is in a sub-directory of new basePath'
    , function (done) {
    var configObj = {
      basePath: __dirname + '/fixtures/',
      ext: '.txt'
    };
    // console.log(configObj);
    sqlload.config(configObj);
    expect(sqlload('./sql/iced')).to.equal('select * from ICED now();');
    done();
  }
  );
});

describe('loadAsync', function () {
  it('loads a file from the base of project asynchronisly', function (done) {
    sqlload.async('./helloworld.sql', function(err, sql) {
      expect(sql).to.equal('select * from now();');
      done(err);
    });
  }); 
});