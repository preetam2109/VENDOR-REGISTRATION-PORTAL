import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-generate-registration',
  standalone: true,
  imports: [],
  templateUrl: './generate-registration.component.html',
  styleUrl: './generate-registration.component.css'
})
export class GenerateRegistrationComponent {

  

  ngOnInit() {
    
  }


  constructor( private spinner: NgxSpinnerService,private api: ApiService,public toastr: ToastrService){

  }

  generate() {
    try {
      this.api.RegisterVendor(sessionStorage.getItem('facilityid')).subscribe({
        next: (res: any) => {
          // Handle success response
          this.toastr.success('Vendor registration generated successfully!', 'Success');
          console.log('Response:', res);
        },
        error: (err) => {
          // Handle API error
          console.error('API Error:', err);
          this.toastr.error('Failed to generate vendor registration. Please try again.', 'Error');
        }
      });
    } catch (error) {
      // Handle unexpected runtime errors
      console.error('Unexpected Error:', error);
      this.toastr.error('Something went wrong. Please contact support.', 'Error');
    }
  }

}
