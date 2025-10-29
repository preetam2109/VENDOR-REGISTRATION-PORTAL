import { CommonModule } from '@angular/common';
import { Component,  } from '@angular/core';
import { FormBuilder,FormsModule,} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';


@Component({
  selector: 'app-personal-detail',
  standalone: true,
  imports:[CommonModule,FormsModule,],
  templateUrl: './personal-detail.component.html',
  styleUrl: './personal-detail.component.css'
})
export class PersonalDetailComponent {



 

  

  constructor(private spinner: NgxSpinnerService,private api: ApiService,public toastr: ToastrService,private fb: FormBuilder){
   
  }


  vendor: any = {}; // Holds vendor data

ngOnInit() {
  this.loadVendorDetails();
}

loadVendorDetails() {
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
    this.api.updateVendor(this.vendor).subscribe({
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


}