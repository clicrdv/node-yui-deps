var Browser = require('zombie');

var formatPackages = function(out, options) {

  var packages = {
      javascripts: {},
      stylesheets: {}
    },
    defaultLang = options.langs[0],
    packageName = options.packageName + '_js',
    pack;

  // Init packages
  packages['javascripts'][packageName] = [];

  if (options.splitLangs) {
    options.langs.forEach(function(lang) {
      packages['javascripts'][packageName + '_' + lang] = [];
    });
  }

  pack = packages['javascripts'][packageName];

  //Now walk the list of resolved JS files
  out.js.sort().forEach(function(file) {
    if (/\/lang\//.test(file)) {
      options.langs.forEach(function(lang) {
        var langFile = (lang === defaultLang) ? file :
          file.replace('_' + defaultLang + '.js', '_' + lang + '.js');

        if (options.splitLangs) {
          packages['javascripts'][packageName + '_' + lang].push(langFile);
        } else {
          pack.push(langFile);
        }
      });
    } else {
      pack[/yui-base/.test(file) ? 'unshift' : 'push'](file);
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

module.exports = function(options, cb) {

  var fs = require('fs'),
    langs = options.langs,
    filter = options.filter || 'raw',
    defaultLang = langs[0],
    packageName,
    loader,
    pack,
    out;

  // the use options give us the possibility
  // to load a module that doesn't belong to the dependances tree
  // it's behave like YUI().use()
  if (!options.use) {
    options.use = [];
  }

  var loaders = '';
  options.loaders.forEach(function (loader) {
     loaders += fs.readFileSync(loader, 'utf8');
  });

  var html =
    '<html>' +
      '<head></head>' +
      '<body>' +
        '<script>' +
          'YUI_config = {};' +
          loaders +
          options.setup +
          // Make sure the combo loader is disabled
          'Object.keys(YUI_config.groups).forEach(function (groupName) {' +
          ' YUI_config.groups[groupName].combine = false;' +
          ' YUI_config.groups[groupName].filter  = ' + JSON.stringify(filter) + ';' +
          '});' +
          'var Y = YUI();' +
          'var loader = new Y.Loader(Y.merge(YUI_config, ' + JSON.stringify({
            filter: filter,
            combine: false,
            ignoreRegistered: true,
            ignore: options.ignore,
            require: options.require.concat(options.use),
            lang: defaultLang,
          }) + '));' +
          'window.yuiDeps = loader.resolve(true);' +
        '</script>' +
      '</body>' +
    '</html>';

// fs.writeFileSync('/tmp/test.html', html);

  Browser.localhost('clicrdv.com', 80);

  var browser = Browser.create();

  browser.resources.mock('/loader', {
    statusCode: 200,
    headers:    { 'ContentType': 'text/html' },
    body:       html
  });

  browser.visit('/loader')
    .done(function() {
      cb(formatPackages(browser.window.yuiDeps, options));
      browser.close();
      browser.tabs.closeAll();
    });

};
