import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateRegistrationComponent } from './generate-registration.component';

describe('GenerateRegistrationComponent', () => {
  let component: GenerateRegistrationComponent;
  let fixture: ComponentFixture<GenerateRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
