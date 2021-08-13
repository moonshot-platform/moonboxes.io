import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnetwalletComponent } from './connetwallet.component';

describe('ConnetwalletComponent', () => {
  let component: ConnetwalletComponent;
  let fixture: ComponentFixture<ConnetwalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnetwalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnetwalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
