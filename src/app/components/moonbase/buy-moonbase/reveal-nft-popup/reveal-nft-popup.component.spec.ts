import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevealNftPopupComponent } from './reveal-nft-popup.component';

describe('RevealNftPopupComponent', () => {
  let component: RevealNftPopupComponent;
  let fixture: ComponentFixture<RevealNftPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevealNftPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevealNftPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
