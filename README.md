
## Usage

```javascript
var deps = require('yui-deps');

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
```

Output :
```javascript
{
  javascripts: {
    package_test_js: [
      '/javascripts/lib/yui-3.9.1/yui-base/yui-base.js',
      '/javascripts/clicrdv/user3/build/custom-forms/custom-forms.js',
      '/javascripts/clicrdv/user3/build/custom-init/custom-init.js',
      '/javascripts/clicrdv/user3/build/timeslots/timeslots.js',
      '/javascripts/lib/yui-3.9.1/dom-base/dom-base.js',
      '/javascripts/lib/yui-3.9.1/dom-core/dom-core.js',
      '/javascripts/lib/yui-3.9.1/dom-screen/dom-screen.js',
      '/javascripts/lib/yui-3.9.1/dom-style/dom-style.js',
      '/javascripts/lib/yui-3.9.1/event-base-ie/event-base-ie.js',
      '/javascripts/lib/yui-3.9.1/event-base/event-base.js',
      '/javascripts/lib/yui-3.9.1/event-custom-base/event-custom-base.js',
      '/javascripts/lib/yui-3.9.1/event-custom-complex/event-custom-complex.js',
      '/javascripts/lib/yui-3.9.1/event-delegate/event-delegate.js',
      '/javascripts/lib/yui-3.9.1/event-synthetic/event-synthetic.js',
      '/javascripts/lib/yui-3.9.1/features/features.js',
      '/javascripts/lib/yui-3.9.1/handlebars-base/handlebars-base.js',
      '/javascripts/lib/yui-3.9.1/handlebars-compiler/handlebars-compiler.js',
      '/javascripts/lib/yui-3.9.1/history-base/history-base.js',
      '/javascripts/lib/yui-3.9.1/history-hash-ie/history-hash-ie.js',
      '/javascripts/lib/yui-3.9.1/history-hash/history-hash.js',
      '/javascripts/lib/yui-3.9.1/intl-base/intl-base.js',
      '/javascripts/lib/yui-3.9.1/intl/intl.js',
      '/javascripts/lib/yui-3.9.1/json-parse/json-parse.js',
      '/javascripts/lib/yui-3.9.1/node-base/node-base.js',
      '/javascripts/lib/yui-3.9.1/node-core/node-core.js',
      '/javascripts/lib/yui-3.9.1/node-event-delegate/node-event-delegate.js',
      '/javascripts/lib/yui-3.9.1/node-pluginhost/node-pluginhost.js',
      '/javascripts/lib/yui-3.9.1/node-screen/node-screen.js',
      '/javascripts/lib/yui-3.9.1/node-style/node-style.js',
      '/javascripts/lib/yui-3.9.1/oop/oop.js',
      '/javascripts/lib/yui-3.9.1/pluginhost-base/pluginhost-base.js',
      '/javascripts/lib/yui-3.9.1/pluginhost-config/pluginhost-config.js',
      '/javascripts/lib/yui-3.9.1/selector-native/selector-native.js',
      '/javascripts/lib/yui-3.9.1/selector/selector.js',
      '/javascripts/lib/yui-3.9.1/yui-later/yui-later.js'
    ],
    package_test_js_fr: [
      '/javascripts/clicrdv/user3/build/custom-forms/lang/custom-forms_fr.js',
      '/javascripts/clicrdv/user3/build/timeslots/lang/timeslots_fr.js'
    ],
    package_test_js_de: [
      '/javascripts/clicrdv/user3/build/custom-forms/lang/custom-forms_de.js',
      '/javascripts/clicrdv/user3/build/timeslots/lang/timeslots_de.js'
    ],
    package_test_js_es: [
      '/javascripts/clicrdv/user3/build/custom-forms/lang/custom-forms_es.js',
      '/javascripts/clicrdv/user3/build/timeslots/lang/timeslots_es.js'
    ],
    package_test_js_en: [
      '/javascripts/clicrdv/user3/build/custom-forms/lang/custom-forms_en.js',
      '/javascripts/clicrdv/user3/build/timeslots/lang/timeslots_en.js'
    ],
    package_test_js_nl: [
      '/javascripts/clicrdv/user3/build/custom-forms/lang/custom-forms_nl.js',
      '/javascripts/clicrdv/user3/build/timeslots/lang/timeslots_nl.js'
    ]
  },
  stylesheets: {
    package_test_css: [
      '/javascripts/clicrdv/user3/build/timeslots/assets/skins/sam/timeslots.css'
    ]
  }
}
```
