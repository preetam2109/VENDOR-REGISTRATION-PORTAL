import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturingUnitRetentionTabApproval } from './manufacturing-unit-retention-tab-approval';

describe('ManufacturingUnitRetentionTabApproval', () => {
  let component: ManufacturingUnitRetentionTabApproval;
  let fixture: ComponentFixture<ManufacturingUnitRetentionTabApproval>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManufacturingUnitRetentionTabApproval]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManufacturingUnitRetentionTabApproval);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
