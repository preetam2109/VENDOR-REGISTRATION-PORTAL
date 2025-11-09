import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalCompanyPrefix } from './global-company-prefix';

describe('GlobalCompanyPrefix', () => {
  let component: GlobalCompanyPrefix;
  let fixture: ComponentFixture<GlobalCompanyPrefix>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalCompanyPrefix]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalCompanyPrefix);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
