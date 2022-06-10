import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTesComponent } from './add-edit-tes.component';

describe('AddEditTesComponent', () => {
  let component: AddEditTesComponent;
  let fixture: ComponentFixture<AddEditTesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditTesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditTesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
