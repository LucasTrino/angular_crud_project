import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressFormSectionComponent } from './address-form-section.component';

describe('AddressFormSectionComponent', () => {
  let component: AddressFormSectionComponent;
  let fixture: ComponentFixture<AddressFormSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressFormSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddressFormSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
