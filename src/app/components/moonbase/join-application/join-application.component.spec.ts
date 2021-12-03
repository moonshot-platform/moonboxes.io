import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinApplicationComponent } from './join-application.component';

describe('JoinApplicationComponent', () => {
  let component: JoinApplicationComponent;
  let fixture: ComponentFixture<JoinApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
