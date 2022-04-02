import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCredencialesComponent } from './edit-credenciales.component';

describe('EditCredencialesComponent', () => {
  let component: EditCredencialesComponent;
  let fixture: ComponentFixture<EditCredencialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCredencialesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCredencialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
