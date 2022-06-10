import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCongresoComponent } from './card-congreso.component';

describe('CardCongresoComponent', () => {
  let component: CardCongresoComponent;
  let fixture: ComponentFixture<CardCongresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardCongresoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCongresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
