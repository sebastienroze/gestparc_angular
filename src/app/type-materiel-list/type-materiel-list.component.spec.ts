import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeMaterielListComponent } from './type-materiel-list.component';

describe('TypeMaterielListComponent', () => {
  let component: TypeMaterielListComponent;
  let fixture: ComponentFixture<TypeMaterielListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeMaterielListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeMaterielListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
