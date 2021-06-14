import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetourFormComponent } from './retour-form.component';

describe('RetourFormComponent', () => {
  let component: RetourFormComponent;
  let fixture: ComponentFixture<RetourFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetourFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetourFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
