import { Component,ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators,FormsModule,ReactiveFormsModule } from '@angular/forms';
// import { Stepper } from '../stepper/stepper';
import { Router } from '@angular/router';

// import { StepperComponent } from './stepper/stepper.component';
@Component({
  selector: 'app-generate-registration',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './generate-registration.component.html',
  styleUrl: './generate-registration.component.css'
})
export class GenerateRegistrationComponent {
  // @ViewChild('stepper') stepper!: Stepper;

  // steps = [
  //   { id:1, title: 'Card Details' },
  //   { id:2, title: 'Form Review' },
  //   { id:3, title: 'Authentication' },
  //   { id:4, title: 'Create Code' }
  // ];
  // currentStep = 0;

  // form1: FormGroup;
  // form2: FormGroup;

  vregid: any;
  

  ngOnInit() {
    
  }

  onClick(){
    this.router.navigate(['personal-detail'])

  }

  constructor( private spinner: NgxSpinnerService,private api: ApiService,public toastr: ToastrService,private fb: FormBuilder,private router: Router,){
    // this.form1 = this.fb.group({ name: ['', Validators.required] });
    // this.form2 = this.fb.group({ review: ['', Validators.required] });
  }

  


  generate() {
    try {
      this.api.RegisterVendor(sessionStorage.getItem('facilityid')).subscribe({
        next: (res: string) => {
          console.log('Response:', res);
          this.toastr.success(`Vendor registration generated successfully! Registration No: ${res}`, 'Success');
          console.log(JSON.stringify(res))
          sessionStorage.setItem('vregid',res)
          this.GetVendorDetailsID(sessionStorage.getItem('facilityid'));
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


  GetVendorDetailsID(supplierId: any) {
    this.api.getVendorDetailsID(supplierId).subscribe({
      next: (res: any) => {
        if (Array.isArray(res) && res.length > 0) {
          this.vregid=res[0].vregid;
          console.log('Vendor vregid:', this.vregid);
          sessionStorage.setItem('vregid',this.vregid)
        
        } else {
          console.warn('No vendor details found.');
        }
      },
      error: (err) => {
        console.error('Error fetching vendor details:', err);
      }
    });
  }
  
  


   // example submit: call API, on success advance the stepper
  //  submitStep1() {
  //   if (this.form1.invalid) return;
   
  //   setTimeout(() => {
      
  //     this.stepper.markCurrentCompleteAndNext();
  //   }, 400); 
  // }

  // submitStep2() {
  //   if (this.form2.invalid) return;
  //   setTimeout(() => {
  //     this.stepper.markCurrentCompleteAndNext();
  //   }, 400);
  // }
}
