import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditContComponent } from './add-edit-cont.component';

describe('AddEditContComponent', () => {
  let component: AddEditContComponent;
  let fixture: ComponentFixture<AddEditContComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditContComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
