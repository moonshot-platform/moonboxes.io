import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftMigrationComponent } from './nft-migration.component';

describe('NftMigrationComponent', () => {
  let component: NftMigrationComponent;
  let fixture: ComponentFixture<NftMigrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NftMigrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftMigrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
