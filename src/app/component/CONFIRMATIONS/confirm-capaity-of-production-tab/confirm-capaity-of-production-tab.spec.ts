import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCapaityOfProductionTab } from './confirm-capaity-of-production-tab';

describe('ConfirmCapaityOfProductionTab', () => {
  let component: ConfirmCapaityOfProductionTab;
  let fixture: ComponentFixture<ConfirmCapaityOfProductionTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmCapaityOfProductionTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmCapaityOfProductionTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
