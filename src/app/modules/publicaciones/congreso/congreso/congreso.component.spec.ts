import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongresoComponent } from './congreso.component';

describe('CongresoComponent', () => {
  let component: CongresoComponent;
  let fixture: ComponentFixture<CongresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CongresoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CongresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
