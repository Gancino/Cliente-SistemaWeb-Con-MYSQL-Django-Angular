import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMiembroComponent } from './card-miembro.component';

describe('CardMiembroComponent', () => {
  let component: CardMiembroComponent;
  let fixture: ComponentFixture<CardMiembroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardMiembroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardMiembroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
