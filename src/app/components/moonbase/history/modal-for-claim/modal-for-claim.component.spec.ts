import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalForClaimComponent } from './modal-for-claim.component';

describe('ModalForClaimComponent', () => {
  let component: ModalForClaimComponent;
  let fixture: ComponentFixture<ModalForClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalForClaimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalForClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
