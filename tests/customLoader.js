YUI().use(function(Y) {
   var CONFIG = {
      groups: {
         'user3': {
            base: '/javascripts/clicrdv/user3/build/',
            root: 'clicrdv/user3/build/',
            modules: {
               "address-bar-remover": {
                  "condition": {
                     "name": "address-bar-remover",
                     "test": function( /*Y*/ ) {
                        return Y.UA.mobile;
                     },
                     "trigger": "user-mobile"
                  },
                  "requires": []
               },
               "timeslots": {
                  "lang": [
                     "fr",
                     "en",
                     "de",
                     "es",
                     "nl"
                  ],
                  "requires": [
                     "intl",
                     "node",
                     "handlebars"
                  ],
                  "skinnable": true
               },
               "config-control-pro": {
                  "requires": [
                     "base"
                  ]
               },
               "custom-forms": {
                  "requires": [
                     "json-parse",
                     "intl"
                  ],
                  "lang": [
                     "fr",
                     "en",
                     "de",
                     "es",
                     "nl"
                  ]
               },
               "custom-init": {
                  "requires": [
                     "custom-forms",
                     "timeslots"
                  ]
               }
            }
         }
      }
   };

   if (typeof YUI_config.groups === 'undefined') {
      YUI_config.groups = {};
   }

   Y.mix(YUI_config.groups, CONFIG.groups);

});