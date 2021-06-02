import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadreListComponent } from './cadre-list.component';

describe('CadreListComponent', () => {
  let component: CadreListComponent;
  let fixture: ComponentFixture<CadreListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadreListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
