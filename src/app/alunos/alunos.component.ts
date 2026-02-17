import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlunosService } from '../services/alunos.service';

@Component({
  selector: 'app-alunos',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>Alunos</h1>
      <ul>
        @for (aluno of alunosService.alunos(); track aluno.objectId) {
          <li>{{ aluno.nome }} {{ aluno.sobrenome }}</li>
        }
      </ul>
    </div>
  `,
  styles: [`
    .container { padding: 20px; }
    li { padding: 10px; border-bottom: 1px solid #ccc; }
  `]
})
export class AlunosComponent implements OnInit {
  alunosService = inject(AlunosService);

  ngOnInit() {
    this.alunosService.loadAll();
  }
}
