import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCadreComponent } from './single-cadre.component';

describe('SingleCadreComponent', () => {
  let component: SingleCadreComponent;
  let fixture: ComponentFixture<SingleCadreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleCadreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleCadreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
