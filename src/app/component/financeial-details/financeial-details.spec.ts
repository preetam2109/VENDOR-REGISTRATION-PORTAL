import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceialDetails } from './financeial-details';

describe('FinanceialDetails', () => {
  let component: FinanceialDetails;
  let fixture: ComponentFixture<FinanceialDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanceialDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanceialDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
