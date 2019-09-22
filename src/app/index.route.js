(function() {
  'use strict';

  angular
    .module('serve')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/alunos', {
        templateUrl: 'app/alunos/alunos.html',
        controller: 'AlunosController',
        controllerAs: 'alunos'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
