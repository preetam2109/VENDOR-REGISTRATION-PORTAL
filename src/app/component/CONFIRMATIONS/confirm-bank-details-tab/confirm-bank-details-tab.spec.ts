import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmBankDetailsTab } from './confirm-bank-details-tab';

describe('ConfirmBankDetailsTab', () => {
  let component: ConfirmBankDetailsTab;
  let fixture: ComponentFixture<ConfirmBankDetailsTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmBankDetailsTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmBankDetailsTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
