/* global requirejs, require */
requirejs.config({

  baseUrl: "/scripts/",

  paths: {
    "d3": "../lib/d3/d3",
    "lodash": "../lib/lodash/lodash.compat"
  },

  shim: {
    d3: {
      exports: 'd3'
    }
  }
});

require(['radar', 'RadarData'], function(radar, radarData){
  radar.init(radarData);
});
