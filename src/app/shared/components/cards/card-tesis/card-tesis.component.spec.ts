import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTesisComponent } from './card-tesis.component';

describe('CardTesisComponent', () => {
  let component: CardTesisComponent;
  let fixture: ComponentFixture<CardTesisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardTesisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardTesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
