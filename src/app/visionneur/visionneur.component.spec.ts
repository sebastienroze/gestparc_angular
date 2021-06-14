import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisionneurComponent } from './visionneur.component';

describe('VisionneurComponent', () => {
  let component: VisionneurComponent;
  let fixture: ComponentFixture<VisionneurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisionneurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisionneurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
