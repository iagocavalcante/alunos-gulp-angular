(function() {
  'use strict';

  angular
    .module('test')
    .controller('AlunosController', AlunosController);

    function AlunosController(){
      var vm = this;
      vm.salvar = salvar;
      vm.snapshot = snapshot;

      function salvar(){
        alert("Deu bom!");
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
