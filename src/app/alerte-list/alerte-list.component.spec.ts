import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlerteListComponent } from './alerte-list.component';

describe('AlerteListComponent', () => {
  let component: AlerteListComponent;
  let fixture: ComponentFixture<AlerteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlerteListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlerteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
