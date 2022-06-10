import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PIntelectualComponent } from './p-intelectual.component';

describe('PIntelectualComponent', () => {
  let component: PIntelectualComponent;
  let fixture: ComponentFixture<PIntelectualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PIntelectualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PIntelectualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
