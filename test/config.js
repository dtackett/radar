/* global requirejs, require */
requirejs.config({  
  paths: {
    d3: '../lib/d3/d3',
    lodash: '../lib/lodash/lodash.compat',
    utils: '../scripts/utils',
    radar: '../scripts/radar'
  },

  shim: {
    d3: {
      exports: 'd3'
    }
  }  
});

(function() {
  // test mode -- 'tdd', 'bdd-should', or 'bdd-expect'
  var mode = 'bdd-expect';

  if ( mode === 'tdd' ) {
    window.assert = chai.assert;
  }

  if ( mode === 'bdd-should' ) {
    window.should = chai.should();
  }

  if ( mode === 'bdd-expect' ) {
    window.expect = chai.expect;
  }

  mocha.setup('bdd');

  require( [ 'list_of_tests' ], function( lot ) {
    require( lot, function() {
      mocha.run();
    });
  });

}());