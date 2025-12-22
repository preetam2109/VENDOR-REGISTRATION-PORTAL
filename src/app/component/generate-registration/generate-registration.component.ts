import { Component,ViewChild} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators,FormsModule,ReactiveFormsModule } from '@angular/forms';
// import { Stepper } from '../stepper/stepper';
import { Router, RouterLink } from '@angular/router';

// import { StepperComponent } from './stepper/stepper.component';
@Component({
  selector: 'app-generate-registration',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,RouterLink],
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
  vendorDetails: any[] = [];
  showButtons:boolean=true;
 
 

  constructor( private spinner: NgxSpinnerService,private api: ApiService,public toastr: ToastrService,private fb: FormBuilder,private router: Router,){
    // this.form1 = this.fb.group({ name: ['', Validators.required] });
    // this.form2 = this.fb.group({ review: ['', Validators.required] });
  }

  ngOnInit() {
    this.GetVendorDetailsID(sessionStorage.getItem('facilityid'));
    
  }

 
  onClick(status:any){

    if(status=='Complete'){
      // return
      this.router.navigate(['/confirmation']);
    }else{

      this.router.navigate(['personal-detail']);
    }

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
          this.vendorDetails =res;
          
          if(res[0].vregno){
            this.showButtons=false
          }
          // if(res[0].status!='Complete'){
          //   this.showButtons=false
          // }
          
          // if(res[0].status==='Complete'){
          //   this.showButtons=false
          // }
          console.log('Vendor Details:', this.vendorDetails);
          this.vregid = res[0].vregid;
          sessionStorage.setItem('vregid', this.vregid);
        } else {
          console.warn('No vendor details found.');
        }
      },
      error: (err) => {
        console.error('Error fetching vendor details:', err);
      }
    });
  }
  
  
  // onClickV(vendor: any) {
  //   console.log('Clicked Vendor:', vendor);
  // }
  deleteVendor(vendor: any) {
    console.log('Delete Vendor:', vendor);
  }
  

  


  
}
