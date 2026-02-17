import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

interface CustomLink {
  path: string;
  label: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav>
      <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
      <a routerLink="/alunos" routerLinkActive="active">Alunos</a>
      <a routerLink="/novo-aluno" routerLinkActive="active">Novo Aluno</a>
    </nav>
  `,
  styles: [`
    nav { 
      background: #1976d2; 
      padding: 15px; 
    }
    nav a {
      color: white;
      text-decoration: none;
      margin-right: 20px;
      padding: 8px 16px;
      border-radius: 4px;
    }
    nav a:hover, nav a.active {
      background: rgba(255,255,255,0.2);
    }
  `]
})
export class HeaderComponent {}
