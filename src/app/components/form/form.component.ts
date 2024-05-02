import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FormFooterComponent } from '../form-footer/form-footer.component';
import { FormMainComponent } from '../form-main/form-main.component';
import { ContextHeader } from '../context-header/context-header.component';

@Component({
  selector: 'app-form-component',
  standalone: true,
  imports: [FormFooterComponent, FormMainComponent, ContextHeader],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  id: string | null = null;
  headerTitle = '';
  showHeaderButton = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const idParamExists = this.route.snapshot.paramMap.has('id');

    if (idParamExists) {
      this.id = this.route.snapshot.paramMap.get('id');
      this.headerTitle = 'Editar';

      console.log(this.id);
    } else {
      this.headerTitle = 'Cadastrar';
    }
  }
  // ngOnInit(): void {
  //   this.router.events.pipe(
  //     filter(event => event instanceof NavigationEnd)
  //   ).subscribe(() => {
  //     this.handleRouteChange();
  //   });
  // }

  // handleRouteChange(): void {
  //   const url = this.router.url;
  //   const segments = url.split('/');
  //   // Remove the empty segment if the URL starts with '/'
  //   if (segments.length > 1 && segments[1] === '') {
  //     segments.splice(1, 1);
  //   }
  //   const route = segments.slice(1).join('/');

  //   if (route) {
  //     console.log(`Route: ${route}`);
  //   } else {
  //     console.log('No route found');
  //   }
  // }

}
