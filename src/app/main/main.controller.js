(function() {
  'use strict';

  angular
  .module('test')
  .controller('MainController', MainController);

  /** @ngInject */
  function MainController() {
    var vm = this;
    vm.alunosMain = getAlunosMain();
    vm.decode = decode;

    function decode(images, mat){
      var src = "data:image/png;base64,";
      src += images;
      var newImage = document.createElement('img');
      newImage.src = src;
      newImage.width = newImage.height = "50";
      document.querySelector('#pic'+mat).innerHTML = newImage.outerHTML;
    }

    function getAlunosMain(){
      //obtem o valor da chave 'usuarios'caso seja nulo ou indefinido retorna a string '[]''
      var us = window.localStorage.getItem("alunos") || '[]';
      //JSON.parse converte a string para objeto
      us = angular.fromJson(us);
      //percorre todos os objetos para remover o atributo $$hashkey
      //utilizado para indexacao no localstorage
      for(var i=0; i<us.length;i++){
        delete us[i]["$$hashKey"];
      }
      return us;
    }
  }
})();
