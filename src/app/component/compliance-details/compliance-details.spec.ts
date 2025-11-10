import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceDetails } from './compliance-details';

describe('ComplianceDetails', () => {
  let component: ComplianceDetails;
  let fixture: ComponentFixture<ComplianceDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplianceDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplianceDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
