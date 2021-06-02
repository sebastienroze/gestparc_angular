import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadreFormComponent } from './cadre-form.component';

describe('CadreFormComponent', () => {
  let component: CadreFormComponent;
  let fixture: ComponentFixture<CadreFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadreFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadreFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
