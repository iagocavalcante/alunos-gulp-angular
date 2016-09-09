(function() {
  'use strict';

  angular
  .module('test')
  .controller('AlunosController', AlunosController);

  function AlunosController($location){
    var vm = this;
    vm.salvar = salvar;
    vm.snapshot = snapshot;
    vm.getAlunos = getAlunos;

    vm.aluno = {};
    vm.foto = {};

    function getAlunos(){

      var us = window.localStorage.getItem("alunos") || '[]';

      us = angular.fromJson(us);

      for(var i=0; i<us.length;i++){
        delete us[i]["$$hashKey"];
      }
      return us;
    }

    vm.alunosAll = getAlunos();

    function salvar(){

      vm.alunosAll.push(vm.aluno);
      vm.aluno = {};

      window.localStorage.setItem("alunos", angular.toJson(vm.alunosAll, true));
      $location.path('/');
    }

    var video = document.querySelector('#cam');
    var canvas = window.canvas = document.querySelector('#foto');
    canvas.width = 100;
    canvas.height = 100;

    function snapshot() {
      canvas.width = 80;
      canvas.height = 80;
      canvas.getContext('2d').
      drawImage(video, 0, 0, canvas.width, canvas.height);
      vm.foto = document.getElementById("foto").toDataURL("image/png");
      vm.aluno.picture = vm.foto.replace('data:image/png;base64,', '');
    }

    var constraints = {
      audio: false,
      video: true
    }

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
