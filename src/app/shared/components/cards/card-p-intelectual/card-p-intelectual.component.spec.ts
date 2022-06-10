import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPIntelectualComponent } from './card-p-intelectual.component';

describe('CardPIntelectualComponent', () => {
  let component: CardPIntelectualComponent;
  let fixture: ComponentFixture<CardPIntelectualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardPIntelectualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPIntelectualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
