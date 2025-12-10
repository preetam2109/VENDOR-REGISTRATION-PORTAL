import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmRetTab } from './confirm-ret-tab';

describe('ConfirmRetTab', () => {
  let component: ConfirmRetTab;
  let fixture: ComponentFixture<ConfirmRetTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmRetTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmRetTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
