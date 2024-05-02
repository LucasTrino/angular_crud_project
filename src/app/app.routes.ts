import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { FormComponent } from './components/form/form.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Listagem',
    component: MainComponent,
  },
  {
    path: 'form',
    title: 'Cadastro',
    component: FormComponent,
  },
  {
    path: 'form/:id',
    title: 'Edição',
    component: FormComponent,
  }
];
