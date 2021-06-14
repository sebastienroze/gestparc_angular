import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleRetourComponent } from './single-retour.component';

describe('SingleRetourComponent', () => {
  let component: SingleRetourComponent;
  let fixture: ComponentFixture<SingleRetourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleRetourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleRetourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
