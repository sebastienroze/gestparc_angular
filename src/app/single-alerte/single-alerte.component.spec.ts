import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleAlerteComponent } from './single-alerte.component';

describe('SingleAlerteComponent', () => {
  let component: SingleAlerteComponent;
  let fixture: ComponentFixture<SingleAlerteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleAlerteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleAlerteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
