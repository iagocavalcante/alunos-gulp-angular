import { Injectable } from '@angular/core';
import Backendless from 'backendless';

export class Aluno {
  public objectId?: string;
  public nome: string;
  public sobrenome: string;
  public email: string;
  public matricula: Number;
  public endereco: string;
  public numero: string;
  public CEP: Number;
  public cidade: string;
  public estado: string;
  public apresentacao: string;
  public foto: string;
  public location: string;
}

const AlunosStore = Backendless.Data.of(Aluno);

@Injectable({
  providedIn: 'root'
})

export class AlunosService {

  public alunos: Aluno[] = [];

  loadAll(): void {
    AlunosStore.find<Aluno>().then((alunos: Aluno[]) => {
      this.alunos = alunos;

      this.addRealTimeListeners();
    });
  }

  add(newAluno: Aluno): Promise<Aluno> {
    return AlunosStore.save<Aluno>(newAluno);
  }

  uploadFotoAluno(foto) {
    return Backendless.Files.upload(foto, 'alunos')
      .then(file => file.fileURL)
      .catch(error => error)
  }

  addRealTimeListeners(): void {
    const rtHandlers: Backendless.EventHandler = AlunosStore.rt();

    rtHandlers.addCreateListener<Aluno>(this.onAlunoAdd.bind(this));
    rtHandlers.addUpdateListener<Aluno>(this.onAlunoChange.bind(this));
    rtHandlers.addDeleteListener<Aluno>(this.onAlunoRemove.bind(this));
  }

  onAlunoAdd(novoAluno: Aluno): void {
    this.alunos.push(novoAluno);
  }

  onAlunoChange(updatedAluno: Aluno): void {
    this.alunos = this.alunos.map(Aluno => {
      return updatedAluno.objectId === Aluno.objectId
        ? updatedAluno
        : Aluno;
    });
  }

  onAlunoRemove(antigoAluno: Aluno): void {
    this.alunos = this.alunos.filter(Aluno => {
      return antigoAluno.objectId !== Aluno.objectId;
    });
  }
}