import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalForTransactionComponent } from './modal-for-transaction.component';

describe('ModalForTransactionComponent', () => {
  let component: ModalForTransactionComponent;
  let fixture: ComponentFixture<ModalForTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalForTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalForTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
