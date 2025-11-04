import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalDetails } from './technical-details';

describe('TechnicalDetails', () => {
  let component: TechnicalDetails;
  let fixture: ComponentFixture<TechnicalDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnicalDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicalDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
