import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VRegistrationPending } from './vregistration-pending';

describe('VRegistrationPending', () => {
  let component: VRegistrationPending;
  let fixture: ComponentFixture<VRegistrationPending>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VRegistrationPending]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VRegistrationPending);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
