import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPIntComponent } from './add-edit-p-int.component';

describe('AddEditPIntComponent', () => {
  let component: AddEditPIntComponent;
  let fixture: ComponentFixture<AddEditPIntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditPIntComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditPIntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
