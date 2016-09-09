(function() {
  'use strict';

  angular
  .module('test')
  .controller('AlunosController', AlunosController);

  function AlunosController($location){
    var APP_ID = '3AD2E853-A2D3-F0D1-FFD4-E42A3523D800';
    var JS_SECRET_KEY = 'A7F13BCB-CAEE-8D9F-FF61-6EF4B232BF00';
    var APP_VERSION = 'v1';

    Backendless.initApp(APP_ID, JS_SECRET_KEY, APP_VERSION);

    var vm = this;
    vm.salvar = salvar;
    vm.snapshot = snapshot;
    vm.getAlunos = getAlunos;

    vm.aluno = {};
    vm.foto = {};

    function Alunos(args) {
      args = args || {};
      this.nome = args.nome || "";
      this.sobrenome = args.sobrenome || "";
      this.email = args.email || "";
      this.matricula = args.matricula || "";
      this.endereco = args.endereco || "";
      this.numero = args.numero || "";
      this.CEP = args.CEP || "";
      this.cidade = args.cidade || "";
      this.estado = args.estado || "";
      this.apresentacao = args.apresentacao || "";
    }

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
      var al = new Alunos(vm.aluno);

      var alunosSalvos = Backendless.Persistence.of( Alunos ).save( al );
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
