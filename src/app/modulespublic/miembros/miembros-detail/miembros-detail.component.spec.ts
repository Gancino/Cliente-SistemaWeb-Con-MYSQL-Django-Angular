import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiembrosDetailComponent } from './miembros-detail.component';

describe('MiembrosDetailComponent', () => {
  let component: MiembrosDetailComponent;
  let fixture: ComponentFixture<MiembrosDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiembrosDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiembrosDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
