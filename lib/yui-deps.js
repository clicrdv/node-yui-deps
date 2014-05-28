
module.exports = function (options) {

   var fs = require('fs'),
       YUI = options.YUI,
       YUI_config = {},
       Y = YUI(),
       packages = {javascripts: [], stylesheets: []},
       langs = options.langs,
       defaultLang = langs[0],
       packageName,
       loader,
       pack,
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

   // the use options give us the possibility
   // to load a module that doesn't belong to the dependances tree
   // it's behave like YUI().use()
   if(!options.use){
      options.use = [];
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
      combine: false,
      ignoreRegistered: true,
      ignore: options.ignore,
      require: options.require.concat(options.use),
      lang: defaultLang,
   }));

   out = loader.resolve(true);

   // Init packages
   packages['javascripts'][options.packageName + '_js' ] = [];

   if (options.splitLangs) {
      options.langs.forEach(function (lang) {
         packages['javascripts'][options.packageName + '_js_' + lang] = [];
      });
   }

   packageName = options.packageName + '_js';
   pack = packages['javascripts'][packageName];

   //Now walk the list of resolved JS files
   out.js.sort().forEach(function(file) {
      if (/nodejs/.test(file)) {
         return;
      }

      if (/\/lang\//.test(file)) {
         options.langs.forEach(function (lang) {
            var langFile = (lang === defaultLang) ? file : file.replace('_' + defaultLang + '.js', '_' + lang + '.js');
            if (options.splitLangs) {
               packages['javascripts'][packageName + '_' + lang].push(langFile);
            }
            else {
               pack.push(langFile);
            }
         });
      }
      else {
         pack.push(file);
      }
   });

   //Now walk the list of resolved CSS files
   packageName = options.packageName + '_css';
   pack = packages['stylesheets'][packageName] = [];

   out.css.forEach(function(file) {
      pack.push(file);
   });

   return packages;
};