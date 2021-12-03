import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemOverviewComponent } from './item-overview.component';

describe('ItemOverviewComponent', () => {
  let component: ItemOverviewComponent;
  let fixture: ComponentFixture<ItemOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
