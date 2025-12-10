
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-final-confirmation',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './final-confirmation.html',
  styleUrl: './final-confirmation.css'
})
export class FinalConfirmation implements OnInit {

  vregid: any = sessionStorage.getItem('vregid');
  userid=sessionStorage.getItem('userid');
  declaration1: boolean = false;
  declaration2: boolean = false;
  declaration3: boolean = false;
  otpValue: string = '';
  ipAddress=sessionStorage.getItem('ipAddress')
  siMobile=sessionStorage.getItem('siMobile')
  sendingOTP: boolean = false;
  submitting: boolean = false;
  serverOtp:any;
  constructor(private api: ApiService, private toastr: ToastrService) {}

  ngOnInit(): void {
    // If vregid is coming from API or session
    this.vregid = sessionStorage.getItem("vregid") || '';
  }

  // ---------------- SEND OTP ----------------

  sendOTP() {
    
  
    if (!this.siMobile) {
      this.toastr.error("Mobile number is missing.");
      return;
    }
  
    Swal.fire({
      title: 'Sending OTP...',
      text: 'Please wait while we send the OTP to your registered mobile number \n' + this.siMobile,
      icon: 'info',
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => Swal.showLoading()
    });
  
    this.api.GETotp(this.siMobile).subscribe(
      (res: any) => {
  
        Swal.close();
  
        Swal.fire({
          title: 'OTP Sent!',
          text: 'An OTP has been sent to your registered mobile number \n' + this.siMobile,
          icon: 'success',
          confirmButtonText: 'OK'
        });
  
        this.serverOtp = res?.message || '';  
        // console.log('Server OTP:', this.serverOtp);
      },
      (err: any) => {
        Swal.close();
  
        Swal.fire({
          title: 'Error!',
          text: 'Failed to send OTP. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
  
        console.error('OTP Error:', err);
      }
    );
  }
  
  
  // ---------------- SUBMIT DECLARATION ----------------
  submitDeclaration() {
    ;
  
    // STEP 1: OTP Validation
    if (!this.otpValue || this.otpValue.length !== 5) {
      this.toastr.error("Please enter a valid 5-digit OTP.");
      return;
    }
  
    if (this.serverOtp !== this.otpValue) {
      this.toastr.error("Invalid OTP, please try again.");
      return;
    }
  
    // STEP 2: Warning BEFORE final submission
    Swal.fire({
      title: "Are you sure?",
      text: "Once submitted, you cannot edit or make any changes further.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Submit",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (!result.isConfirmed) return;
  
      this.submitting = true;
  
    
  
      const formattedDate = this.getOracleDateTimeFormat();
  // console.log('dsdsadasdsd',formattedDate)

console.log(formattedDate);
      // STEP 4: API CALL
      this.api.RegistrationComplete(formattedDate, this.vregid).subscribe({
        next: (res: any) => {
  
          Swal.fire({
            title: "Success!",
            text: "Vendor Declaration submitted successfully.",
            icon: "success",
            confirmButtonColor: "#3085d6"
          });


  
          this.submitting = false;
        },
        error: () => {
          this.toastr.error("Failed to complete declaration.");
          this.submitting = false;
        }
      });
  
    });
  }
  getOracleFormattedDateOnly(): string {
    const now = new Date();
  
    const day = now.getDate().toString().padStart(2, '0');
    const monthNames = [
      "JAN","FEB","MAR","APR","MAY","JUN",
      "JUL","AUG","SEP","OCT","NOV","DEC"
    ];
    const month = monthNames[now.getMonth()];
    const year = now.getFullYear();
  
    return `${day}-${month}-${year}`;
  }

  getOracleDateTimeFormat(): string {
    const now = new Date();
  
    // Day
    const day = now.getDate().toString().padStart(2, "0");
  
    // Month (First letter capital, rest small)
    const monthNames = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ];
    const month = monthNames[now.getMonth()];
  
    // Year
    const year = now.getFullYear();
  
    // Time
    let hours: number | string = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
  
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // convert to 12-hour format
    hours = hours.toString().padStart(2, "0");
  
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds} ${ampm}`;
  }
  
  
  
  
}