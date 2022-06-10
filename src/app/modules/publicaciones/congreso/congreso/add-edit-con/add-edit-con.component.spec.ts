import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditConComponent } from './add-edit-con.component';

describe('AddEditConComponent', () => {
  let component: AddEditConComponent;
  let fixture: ComponentFixture<AddEditConComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditConComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditConComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
