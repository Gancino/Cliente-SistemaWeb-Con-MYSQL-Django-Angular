import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterpublicComponent } from './footerpublic.component';

describe('FooterpublicComponent', () => {
  let component: FooterpublicComponent;
  let fixture: ComponentFixture<FooterpublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterpublicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterpublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
