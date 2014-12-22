
var deps = require('../index.js');

var setup =
   'if(!YUI_config.groups.inputex){' +
   '   YUI_config.groups.inputex = {};' +
   '}' +
   'YUI_config.groups.inputex.base = "/javascripts/lib/inputex-3.2.0/build/";' +
   'YUI_config.base = "/javascripts/lib/yui-3.9.1/";';

deps({
   langs: ['fr', 'de', 'es', 'en', 'nl'],
   loaders: [
    '../node_modules/yui/yui/yui.js',
    'customLoader.js'
   ],
   require: ['custom-init'],
   use:['history-hash-ie'],
   splitLangs: true,
   packageName: 'package_test',
   setup: setup
}, function (packages) {

  console.log(packages);

});

