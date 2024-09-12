import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlurComponent } from './blur.component';

describe('BlurComponent', () => {
  let component: BlurComponent;
  let fixture: ComponentFixture<BlurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
