import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTypeMaterielComponent } from './single-type-materiel.component';

describe('SingleTypeMaterielComponent', () => {
  let component: SingleTypeMaterielComponent;
  let fixture: ComponentFixture<SingleTypeMaterielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleTypeMaterielComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleTypeMaterielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
