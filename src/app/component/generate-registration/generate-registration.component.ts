import { Component,ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators,FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Stepper } from '../stepper/stepper';
// import { StepperComponent } from './stepper/stepper.component';
@Component({
  selector: 'app-generate-registration',
  standalone: true,
  imports: [Stepper,CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './generate-registration.component.html',
  styleUrl: './generate-registration.component.css'
})
export class GenerateRegistrationComponent {
  @ViewChild('stepper') stepper!: Stepper;

  steps = [
    { id:1, title: 'Card Details' },
    { id:2, title: 'Form Review' },
    { id:3, title: 'Authentication' },
    { id:4, title: 'Create Code' }
  ];
  currentStep = 0;

  form1: FormGroup;
  form2: FormGroup;

  

  ngOnInit() {
    
  }


  constructor( private spinner: NgxSpinnerService,private api: ApiService,public toastr: ToastrService,private fb: FormBuilder){
    this.form1 = this.fb.group({ name: ['', Validators.required] });
    this.form2 = this.fb.group({ review: ['', Validators.required] });
  }

  


  generate() {
    try {
      this.api.RegisterVendor(sessionStorage.getItem('facilityid')).subscribe({
        next: (res: string) => {
          console.log('Response:', res);
          this.toastr.success(`Vendor registration generated successfully! Registration No: ${res}`, 'Success');
        },
        error: (err) => {
          console.error('API Error:', err);
          this.toastr.error('Failed to generate vendor registration. Please try again.', 'Error');
        }
      });
    } catch (error) {
      console.error('Unexpected Error:', error);
      this.toastr.error('Something went wrong. Please contact support.', 'Error');
    }
  }
  
  


   // example submit: call API, on success advance the stepper
   submitStep1() {
    if (this.form1.invalid) return;
    // call api -> on success:
    // this.api.post(...).subscribe(() => { this.stepper.markCurrentCompleteAndNext(); });
    // For demo we'll simulate:
    setTimeout(() => {
      // mark complete & go to next step
      this.stepper.markCurrentCompleteAndNext();
    }, 400); 
  }

  submitStep2() {
    if (this.form2.invalid) return;
    setTimeout(() => {
      this.stepper.markCurrentCompleteAndNext();
    }, 400);
  }
}
