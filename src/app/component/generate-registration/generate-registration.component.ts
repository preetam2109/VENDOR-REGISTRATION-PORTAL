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
  
  

}
