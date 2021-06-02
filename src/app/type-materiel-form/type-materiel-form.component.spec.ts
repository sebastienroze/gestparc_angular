import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeMaterielFormComponent } from './type-materiel-form.component';

describe('TypeMaterielFormComponent', () => {
  let component: TypeMaterielFormComponent;
  let fixture: ComponentFixture<TypeMaterielFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeMaterielFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeMaterielFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
