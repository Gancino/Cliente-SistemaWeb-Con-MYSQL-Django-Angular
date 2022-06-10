import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectosDetailComponent } from './proyectos-detail.component';

describe('ProyectosDetailComponent', () => {
  let component: ProyectosDetailComponent;
  let fixture: ComponentFixture<ProyectosDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProyectosDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectosDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
