import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderLoaderComponent } from './slider-loader.component';

describe('SliderLoaderComponent', () => {
  let component: SliderLoaderComponent;
  let fixture: ComponentFixture<SliderLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
