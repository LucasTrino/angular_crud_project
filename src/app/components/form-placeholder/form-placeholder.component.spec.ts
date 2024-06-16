import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPlaceholderComponent } from './form-placeholder.component';

describe('FormPlaceholderComponent', () => {
  let component: FormPlaceholderComponent;
  let fixture: ComponentFixture<FormPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormPlaceholderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
