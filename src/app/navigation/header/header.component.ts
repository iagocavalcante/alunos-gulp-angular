import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomLink } from './custom-link';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  background = 'primary';
  links: CustomLink[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    for (const route of this.router.config) {
      if (route.data && route.data.label) {
        const link: CustomLink = {
          path: `/${route.path}`,
          label: route.data.label
        };
        this.links.push(link);
      }
    }
    console.log(JSON.stringify(this.links));
  }

}
