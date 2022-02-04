import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMieComponent } from './show-mie.component';

describe('ShowMieComponent', () => {
  let component: ShowMieComponent;
  let fixture: ComponentFixture<ShowMieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowMieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
