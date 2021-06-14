import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetourListComponent } from './retour-list.component';

describe('RetourListComponent', () => {
  let component: RetourListComponent;
  let fixture: ComponentFixture<RetourListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetourListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetourListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
