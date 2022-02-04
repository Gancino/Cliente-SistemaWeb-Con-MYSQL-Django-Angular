import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditMieComponent } from './add-edit-mie.component';

describe('AddEditMieComponent', () => {
  let component: AddEditMieComponent;
  let fixture: ComponentFixture<AddEditMieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditMieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditMieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
