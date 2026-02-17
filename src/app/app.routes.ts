import { Routes } from '@angular/router';
import { AlunosComponent } from './alunos/alunos.component';
import { NovoAlunoComponent } from './novo-aluno/novo-aluno.component';

export const routes: Routes = [
  { path: '', redirectTo: '/alunos', pathMatch: 'full' },
  { path: 'alunos', component: AlunosComponent },
  { path: 'novo-aluno', component: NovoAlunoComponent },
];
