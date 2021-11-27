import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingNftsComponent } from './landing-nfts.component';

describe('LandingNftsComponent', () => {
  let component: LandingNftsComponent;
  let fixture: ComponentFixture<LandingNftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingNftsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingNftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
