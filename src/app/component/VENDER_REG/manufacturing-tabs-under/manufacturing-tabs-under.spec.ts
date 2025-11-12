import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturingTabsUnder } from './manufacturing-tabs-under';

describe('ManufacturingTabsUnder', () => {
  let component: ManufacturingTabsUnder;
  let fixture: ComponentFixture<ManufacturingTabsUnder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManufacturingTabsUnder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManufacturingTabsUnder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
