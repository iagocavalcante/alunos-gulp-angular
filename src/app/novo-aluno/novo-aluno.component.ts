import { Component, OnInit, ViewChild, ElementRef, inject, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Aluno, AlunosService } from '../services/alunos.service';

@Component({
  selector: 'app-novo-aluno',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h1>Novo Aluno</h1>
      
      <div class="form-group">
        <label>Nome:</label>
        <input [(ngModel)]="novoAluno.nome" placeholder="Nome">
      </div>
      
      <div class="form-group">
        <label>Sobrenome:</label>
        <input [(ngModel)]="novoAluno.sobrenome" placeholder="Sobrenome">
      </div>
      
      <div class="form-group">
        <label>Email:</label>
        <input [(ngModel)]="novoAluno.email" placeholder="Email">
      </div>
      
      <div class="form-group">
        <label>Matrícula:</label>
        <input [(ngModel)]="novoAluno.matricula" placeholder="Matrícula">
      </div>

      <button (click)="salvar()">Salvar</button>
    </div>
  `,
  styles: [`
    .container { padding: 20px; }
    .form-group { margin-bottom: 15px; }
    label { display: block; margin-bottom: 5px; }
    input { padding: 8px; width: 100%; max-width: 300px; }
    button { padding: 10px 20px; background: #1976d2; color: white; border: none; cursor: pointer; }
  `]
})
export class NovoAlunoComponent implements OnInit, AfterViewInit {
  @ViewChild("video") video!: ElementRef<HTMLVideoElement>;
  @ViewChild("canvas") canvas!: ElementRef<HTMLCanvasElement>;
  
  alunosService = inject(AlunosService);
  novoAluno: Aluno = new Aluno();

  ngOnInit() {}

  ngAfterViewInit() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.video.nativeElement.srcObject = stream;
        this.video.nativeElement.play();
      });
    }
  }

  capture() {
    const context = this.canvas.nativeElement.getContext("2d");
    context?.drawImage(this.video.nativeElement, 0, 0, 150, 200);
    this.novoAluno.foto = this.canvas.nativeElement.toDataURL("image/png");
  }

  dataURItoBlob(dataURI: string): File {
    const date = new Date().getTime();
    const imageName = `${date}.png`;
    const arr = dataURI.split(','), mime = arr[0].match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]), n = bstr.length;
    const u8arr = new Uint8Array(n);
    for (let i = 0; i < n; i++) {
      u8arr[i] = bstr.charCodeAt(i);
    }
    return new File([u8arr], imageName, { type: mime });
  }

  salvar() {
    this.alunosService.uploadFotoAluno(this.dataURItoBlob(this.novoAluno.foto || ''))
      .then((file: any) => {
        this.novoAluno.foto = file.fileURL;
        this.alunosService.add(this.novoAluno)
          .then(() => {
            this.novoAluno = new Aluno();
          });
      });
  }
}
