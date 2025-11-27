import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalMarketStandingCertificate } from './approval-market-standing-certificate';

describe('ApprovalMarketStandingCertificate', () => {
  let component: ApprovalMarketStandingCertificate;
  let fixture: ComponentFixture<ApprovalMarketStandingCertificate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprovalMarketStandingCertificate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovalMarketStandingCertificate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
