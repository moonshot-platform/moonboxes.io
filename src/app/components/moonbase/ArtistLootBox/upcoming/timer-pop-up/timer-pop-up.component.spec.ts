import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerPopUPComponent } from './timer-pop-up.component';

describe('TimerPopUPComponent', () => {
  let component: TimerPopUPComponent;
  let fixture: ComponentFixture<TimerPopUPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimerPopUPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerPopUPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
