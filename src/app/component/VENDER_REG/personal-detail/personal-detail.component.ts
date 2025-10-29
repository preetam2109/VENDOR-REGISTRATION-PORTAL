import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { FormBuilder,FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
@Component({
  selector: 'app-personal-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './personal-detail.component.html',
  styleUrl: './personal-detail.component.css'
})
export class PersonalDetailComponent {

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


  selectedPanFile: File | null = null;

 

  

  constructor(private spinner: NgxSpinnerService,private api: ApiService,public toastr: ToastrService,private fb: FormBuilder){
    // this.form1 = this.fb.group({ name: ['', Validators.required] });
    // this.form2 = this.fb.group({ review: ['', Validators.required] });
  }


  vendor: any = {}; // Holds vendor data

ngOnInit() {
  this.loadVendorDetails();
}

loadVendorDetails() {
  debugger
  this.api.getVendorDetails(sessionStorage.getItem('facilityid')).subscribe({
    next: (res: any) => {
      if (res && res.length > 0) {
        this.vendor = res[0]; // since API returns an array
      }
    },
    error: (err) => {
      console.error("Error loading vendor details:", err);
      alert("Failed to load vendor details");
    }
  });
}

saveVendor() {

  debugger
  try {
    const formData = new FormData();

    // Append file if selected
    if (this.selectedPanFile) {
      formData.append('PanCardDocument', this.selectedPanFile);
    }

    // Append any extra form fields if required in DTO
    // formData.append('SomeField', this.vendor.someValue);

    // Prepare query params based on backend API
    const params = {
      authMobileNo: this.vendor.authmobileno,
      authEmail: this.vendor.authemail,
      authName: this.vendor.authname,
      authSigName: this.vendor.authsigname,
      authSigMobileNo: this.vendor.authsigmobileno,
      authSigEmailId: this.vendor.authsigemailid,
      pancardno: this.vendor.pancardno,
      vregId: this.vendor.supplierid
    };

    // Use updated service method
    this.api.updateVendor(params, formData).subscribe({
      next: (res: any) => {
        console.log("Vendor saved:", res);
        this.toastr.success("Vendor details saved successfully!", "Success");
      },
      error: (err: any) => {
        console.error("Error saving vendor:", err);

        if (err.status === 0) {
          this.toastr.error("Unable to connect to the server. Please try again later.", "Network Error");
        } else if (err.status >= 400 && err.status < 500) {
          this.toastr.warning("Invalid vendor data or request issue.", "Validation Error");
        } else if (err.status >= 500) {
          this.toastr.error("Server error occurred. Please contact support.", "Server Error");
        } else {
          this.toastr.error("An unknown error occurred.", "Error");
        }
      }
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    this.toastr.error("Something went wrong! Please try again.", "Error");
  }
}

onFileSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.selectedPanFile = file;
    console.log('Selected PAN card file:', file.name);
  }
}
 
  // submitStep1() {
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
