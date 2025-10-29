import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-personal-detail',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './personal-detail.component.html',
  styleUrl: './personal-detail.component.css'
})
export class PersonalDetailComponent {

  constructor(private spinner: NgxSpinnerService,private api: ApiService,public toastr: ToastrService){

  }


  vendor: any = {}; // Holds vendor data

ngOnInit() {
  this.loadVendorDetails();
}

loadVendorDetails() {
  this.api.getVendorDetails().subscribe({
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
  try {
    this.api.saveVendorDetails(this.vendor).subscribe({
      next: (res) => {
        alert("Vendor details saved successfully!");
      },
      error: (err) => {
        console.error("Error saving vendor:", err);
        alert("Failed to save vendor details");
      }
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    alert("Something went wrong!");
  }
}

}
