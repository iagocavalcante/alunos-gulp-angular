import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlunosComponent } from './alunos/alunos.component';
import Backendless from 'backendless';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { HeaderComponent } from './navigation/header/header.component';
import { CustomMaterialModule } from './shared/custom.material.module';
import { NovoAlunoComponent } from './novo-aluno/novo-aluno.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

Backendless.initApp(environment.backendless.APP_ID, environment.backendless.API_KEY);

@NgModule({
  declarations: [
    AppComponent,
    AlunosComponent,
    HeaderComponent,
    NovoAlunoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
