import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistMoonboxComponent } from './artist-moonbox.component';

describe('ArtistMoonboxComponent', () => {
  let component: ArtistMoonboxComponent;
  let fixture: ComponentFixture<ArtistMoonboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistMoonboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistMoonboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
