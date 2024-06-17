import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FormFooterComponent } from '../form-footer/form-footer.component';
import { FormMainComponent } from '../form-main/form-main.component';
import { ContextHeader } from '../context-header/context-header.component';

@Component({
  selector: 'app-form-component',
  standalone: true,
  imports: [
    FormFooterComponent,
    FormMainComponent,
    ContextHeader,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})

export class FormComponent implements OnInit {
  constructor(private route: ActivatedRoute) { }

  id: string | null = null;
  headerTitle = '';
  showHeaderButton = false;
  submitButtonIsDisabled = true;

  async ngOnInit(): Promise<void> {
    const idParamExists = this.route.snapshot.paramMap.has('id');

    if (idParamExists) {
      this.id = this.route.snapshot.paramMap.get('id');
      this.headerTitle = 'Editar';
    } else {
      this.headerTitle = 'Cadastrar';
    }
  }

  setSubmitButtonState(value: boolean): void {
    this.submitButtonIsDisabled = value;
  }

  onSubmit() {
    console.log('aqui')
  }
}
