(function() {
  'use strict';

  angular
  .module('test')
  .controller('AlunosController', AlunosController);

  function AlunosController($document){
    var vm = this;
    vm.salvar = salvar;
    vm.snapshot = snapshot;
    vm.getAlunos = getAlunos;

    vm.aluno = {}; //free schema
    // FUNCAO QUE RETORNA A LISTA DE USUARIOS SALVA NO LOCALSTORAGE
    function getAlunos(){
      //obtem o valor da chave 'usuarios'caso seja nulo ou indefinido retorna a string '[]''
      var us = window.localStorage.getItem("alunos") || '[]';
      //JSON.parse converte a string para objeto
      us = JSON.parse(us);
      //percorre todos os objetos para remover o atributo $$hashkey
      //utilizado para indexacao no localstorage
      for(var i=0; i<us.length;i++){
        delete us[i]["$$hashKey"];
      }
      return us;
    }

    vm.alunos = vm.getAlunos();

    function salvar(){
      //push - adiciona um item no vetor
      vm.usuarios.push(vm.usuario);
      vm.usuario = {};
      //salva no storage local
      // o JSON.stringify converte um objeto javascript para uma string
      // a fim de ser capaz de armazena-la no localstorage
      window.localStorage.setItem("alunos", JSON.stringify(vm.usuarios));
    }

    // Put variables in global scope to make them available to the browser console.
    var video = document.querySelector('#cam');
    var canvas = window.canvas = document.querySelector('#foto');
    canvas.width = 150;
    canvas.height = 200;

    function snapshot() {
      canvas.width = 150;
      canvas.height = 200;
      canvas.getContext('2d').
      drawImage(video, 0, 0, canvas.width, canvas.height);
    };

    var constraints = {
      audio: false,
      video: true
    };

    function handleSuccess(stream) {
      window.stream = stream; // make stream available to browser console
      video.srcObject = stream;
    }

    function handleError(error) {
      console.log('navigator.getUserMedia error: ', error);
    }

    navigator.mediaDevices.getUserMedia(constraints).
    then(handleSuccess).catch(handleError);
  }
})();
