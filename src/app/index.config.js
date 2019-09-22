(function() {
  'use strict';

  angular
    .module('serve')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;

    var APP_ID = '3AD2E853-A2D3-F0D1-FFD4-E42A3523D800';
    var JS_SECRET_KEY = '6D690236-5BA2-2407-FF24-6D0CFF88C000';
    var APP_VERSION = 'v1';

    Backendless.initApp(APP_ID, JS_SECRET_KEY, APP_VERSION);
  }

})();
