import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Aluno, AlunosService } from '../services/alunos.service';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-novo-aluno',
  templateUrl: './novo-aluno.component.html',
  styleUrls: ['./novo-aluno.component.sass']
})
export class NovoAlunoComponent implements OnInit {

  public novoAluno: Aluno;
  public input: any;

  @ViewChild("video", { static: true}) video: ElementRef<HTMLVideoElement>;

  @ViewChild("canvas", { static: true}) canvas: ElementRef<HTMLCanvasElement>;

  constructor(private alunosService: AlunosService) {
  }

  ngOnInit() {
    this.novoAluno = new Aluno();
  }

  public ngAfterViewInit() {
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.video.nativeElement.srcObject = stream;
        this.video.nativeElement.play();
      });
    }
  }

  public capture() {
    const context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 150, 200);
    this.novoAluno.foto = this.canvas.nativeElement.toDataURL("image/png");
  }

  dataURItoBlob(dataURI) {
    const date = new Date().getTime();
    const imageName = `${date}.png`;
    var arr = dataURI.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], imageName, {type:mime});
  }

  public salvar() {
    this.alunosService.uploadFotoAluno(this.dataURItoBlob(this.novoAluno.foto))
      .then(file => {
        this.novoAluno.foto = file
        this.alunosService.add(this.novoAluno)
          .then(() => {
            this.novoAluno = new Aluno();
          });
      });
  }
}
