import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistMoonboxRouteComponent } from './artist-moonbox-route.component';

describe('ArtistMoonboxRouteComponent', () => {
  let component: ArtistMoonboxRouteComponent;
  let fixture: ComponentFixture<ArtistMoonboxRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistMoonboxRouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistMoonboxRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
