import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmMarketStandingCertificateTab } from './confirm-market-standing-certificate-tab';

describe('ConfirmMarketStandingCertificateTab', () => {
  let component: ConfirmMarketStandingCertificateTab;
  let fixture: ComponentFixture<ConfirmMarketStandingCertificateTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmMarketStandingCertificateTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmMarketStandingCertificateTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
