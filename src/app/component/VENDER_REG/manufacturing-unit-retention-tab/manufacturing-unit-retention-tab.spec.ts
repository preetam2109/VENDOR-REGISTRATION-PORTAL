import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturingUnitRetentionTab } from './manufacturing-unit-retention-tab';

describe('ManufacturingUnitRetentionTab', () => {
  let component: ManufacturingUnitRetentionTab;
  let fixture: ComponentFixture<ManufacturingUnitRetentionTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManufacturingUnitRetentionTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManufacturingUnitRetentionTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
