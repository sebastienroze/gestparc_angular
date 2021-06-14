import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleReparationComponent } from './single-reparation.component';

describe('SingleReparationComponent', () => {
  let component: SingleReparationComponent;
  let fixture: ComponentFixture<SingleReparationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleReparationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleReparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
