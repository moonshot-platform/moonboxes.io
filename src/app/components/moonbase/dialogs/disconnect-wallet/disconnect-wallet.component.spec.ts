import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisconnectWalletComponent } from './disconnect-wallet.component';

describe('DisconnectWalletComponent', () => {
  let component: DisconnectWalletComponent;
  let fixture: ComponentFixture<DisconnectWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisconnectWalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisconnectWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
