import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingMoonboxesComponent } from './landing-moonboxes.component';

describe('LandingMoonboxesComponent', () => {
  let component: LandingMoonboxesComponent;
  let fixture: ComponentFixture<LandingMoonboxesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingMoonboxesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingMoonboxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
