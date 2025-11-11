import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketStandingCertificate } from './market-standing-certificate';

describe('MarketStandingCertificate', () => {
  let component: MarketStandingCertificate;
  let fixture: ComponentFixture<MarketStandingCertificate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketStandingCertificate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketStandingCertificate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
