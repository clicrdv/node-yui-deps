
var deps = require('../lib/yui-deps.js'),
    YUI  = require('yui').YUI;

function setup (Y, config) {
   console.log('setup', config);
   if(!config.groups.inputex){
      config.groups.inputex = {};
   }
   config.groups.inputex.base = '/javascripts/lib/inputex-3.2.0/build/';
   config.base = '/javascripts/lib/yui-3.9.1/';
}

var packages = deps({
   YUI: YUI,
   langs: ['fr', 'de', 'es', 'en', 'nl'],
   loaders: [
      'customLoader.js'
   ],
   require: ['custom-init'],
   use:["history-hash-ie"],
   splitLangs: true,
   packageName: 'package_test',
   setup: setup
});

console.log(packages);
