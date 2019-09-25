import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlunosComponent } from './alunos/alunos.component';
import { NovoAlunoComponent } from './novo-aluno/novo-aluno.component';

const routes: Routes = [
  { path: '', component: AlunosComponent},
  { path: 'novo', component: NovoAlunoComponent, data: { label: 'Cadastrar Novo' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
