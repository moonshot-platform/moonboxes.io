import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoMoonboxesComponent } from './info-moonboxes.component';

describe('InfoMoonboxesComponent', () => {
  let component: InfoMoonboxesComponent;
  let fixture: ComponentFixture<InfoMoonboxesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoMoonboxesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoMoonboxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
