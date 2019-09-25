import { Component, OnInit } from '@angular/core';
import { Aluno, AlunosService } from './../services/alunos.service';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.sass']
})
export class AlunosComponent implements OnInit {

  constructor(private alunosService: AlunosService) {
  }

  ngOnInit() {
    this.alunosService.loadAll();
  }

  get alunos(): Aluno[] {
    return this.alunosService.alunos;
  }

}
