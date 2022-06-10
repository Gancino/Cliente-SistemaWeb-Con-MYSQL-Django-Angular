import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTesComponent } from './show-tes.component';

describe('ShowTesComponent', () => {
  let component: ShowTesComponent;
  let fixture: ComponentFixture<ShowTesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowTesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
