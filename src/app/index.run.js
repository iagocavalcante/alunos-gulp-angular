(function() {
  'use strict';

  angular
    .module('serve')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
