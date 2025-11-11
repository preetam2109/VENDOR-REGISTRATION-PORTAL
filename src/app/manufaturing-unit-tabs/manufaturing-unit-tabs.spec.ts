import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufaturingUnitTabs } from './manufaturing-unit-tabs';

describe('ManufaturingUnitTabs', () => {
  let component: ManufaturingUnitTabs;
  let fixture: ComponentFixture<ManufaturingUnitTabs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManufaturingUnitTabs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManufaturingUnitTabs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
