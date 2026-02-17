import { Injectable, signal } from '@angular/core';
import Backendless from 'backendless';

export class Aluno {
  public objectId?: string = '';
  public nome: string = '';
  public sobrenome: string = '';
  public email: string = '';
  public matricula: Number = 0;
  public endereco: string = '';
  public numero: string = '';
  public CEP: Number = 0;
  public cidade: string = '';
  public estado: string = '';
  public apresentacao: string = '';
  public foto: string = '';
  public location: string = '';
}

const AlunosStore = Backendless.Data.of(Aluno);

@Injectable({
  providedIn: 'root'
})
export class AlunosService {
  public alunos = signal<Aluno[]>([]);

  loadAll(): void {
    AlunosStore.find<Aluno>().then((alunos: Aluno[]) => {
      this.alunos.set(alunos);
      this.addRealTimeListeners();
    });
  }

  add(newAluno: Aluno): Promise<Aluno> {
    return AlunosStore.save<Aluno>(newAluno);
  }

  uploadFotoAluno(foto: File) {
    return Backendless.Files.upload(foto, 'alunos')
      .then(file => file)
      .catch(error => error)
  }

  addRealTimeListeners(): void {
    const rtHandlers: Backendless.EventHandler = AlunosStore.rt();

    rtHandlers.addCreateListener<Aluno>(this.onAlunoAdd.bind(this));
    rtHandlers.addUpdateListener<Aluno>(this.onAlunoChange.bind(this));
    rtHandlers.addDeleteListener<Aluno>(this.onAlunoRemove.bind(this));
  }

  onAlunoAdd(novoAluno: Aluno): void {
    this.alunos.update(alunos => [...alunos, novoAluno]);
  }

  onAlunoChange(updatedAluno: Aluno): void {
    this.alunos.update(alunos => 
      alunos.map(aluno => 
        updatedAluno.objectId === aluno.objectId ? updatedAluno : aluno
      )
    );
  }

  onAlunoRemove(antigoAluno: Aluno): void {
    this.alunos.update(alunos => 
      alunos.filter(aluno => antigoAluno.objectId !== aluno.objectId)
    );
  }
}
