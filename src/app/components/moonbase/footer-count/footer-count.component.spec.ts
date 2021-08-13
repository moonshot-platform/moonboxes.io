import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterCountComponent } from './footer-count.component';

describe('FooterCountComponent', () => {
  let component: FooterCountComponent;
  let fixture: ComponentFixture<FooterCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
