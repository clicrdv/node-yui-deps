
module.exports = function (options) {

   var fs = require('fs'),
       YUI = options.YUI,
       YUI_config = {},
       Y = YUI(),
       packages = {},
       langs = options.langs,
       defaultLang = langs[0],
       packageName,
       loader,
       out;

   var navigator = {
          userAgent: 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)'
       },
       document = {
         location: {
            href: 'http://www.clicrdv.com'
         }
       },
       window = {};

   if (options.loaders) {
      options.loaders.forEach(function (loader) {
         eval(fs.readFileSync(loader, 'utf8'));
      });
   }

   // Make sure the combo loader is disabled
   Object.keys(YUI_config.groups).forEach(function (groupName) {
      YUI_config.groups[groupName].combine = false;
      YUI_config.groups[groupName].filter  = 'raw';
   });

   // Call user custom config method
   if (Y.Lang.isFunction(options.setup)) {
      options.setup(Y, YUI_config);
   }

   loader = new Y.Loader(Y.merge(YUI_config, {
      filter: 'raw',
      ignoreRegistered: true,
      require: options.require,
      lang: defaultLang,
   }));

   out = loader.resolve(true);

   // Init packages
   packages[options.packageName + '_js' ] = [];
   packages[options.packageName + '_css'] = [];

   if (options.splitLangs) {
      options.langs.forEach(function (lang) {
         packages[options.packageName + '_js_' + lang] = [];
      });
   }

   packageName = options.packageName + '_js';

   //Now walk the list of resolved files
   out.js.sort().forEach(function(file) {
      if (/nodejs/.test(file)) {
         return;
      }

      if (/\/lang\//.test(file)) {
         options.langs.forEach(function (lang) {
            var langFile = (lang === defaultLang) ? file : file.replace('_' + defaultLang + '.js', '_' + lang + '.js');
            if (options.splitLangs) {
               packages[packageName + '_' + lang].push(langFile);
            }
            else {
               packages[packageName].push(langFile);
            }
         });
      }
      else {
         packages[packageName].push(file);
      }
   });

   packageName = options.packageName + '_css';

   out.css.forEach(function(file) {
      packages[packageName].push(file);
   });

   return packages;
};