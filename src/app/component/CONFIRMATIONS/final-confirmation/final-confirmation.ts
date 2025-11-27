
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

  constructor(private api: ApiService, private toastr: ToastrService) {}

  ngOnInit(): void {
    // If vregid is coming from API or session
    this.vregid = sessionStorage.getItem("vregid") || '';
  }

  // ---------------- SEND OTP ----------------


  sendOTP(): void {
    debugger
    if (!this.vregid) {
          this.toastr.error("VReg ID is missing.");
          return;
        }
    
        this.sendingOTP = true;
    // Show a loading indicator
    Swal.fire({
      title: 'Sending OTP...',
      text: 'Please wait while we send the OTP to your registered mobile number \n'+this.siMobile,
      icon: 'info',
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  
    // Call API to send OTP
    this.api.getOTPSaved(this.userid,this.ipAddress).subscribe(
      (res: any) => {
        // Close the loading indicator
        Swal.close();
  
        // Show success alert
        Swal.fire({
          title: 'OTP Sent!',
          text: 'An OTP has been sent to your registered mobile number \n'+this.siMobile,
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          // Navigate to the OTP page after confirmation
          // this.router.navigate(['/otp']); // Replace with your route
        });
      },
      (error: any) => {
        // Handle error and show failure alert
        this.sendingOTP = false;

        Swal.fire({
          title: 'Error!',
          text: 'Failed to send OTP. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
  }




  // sendOTP() {
  //   if (!this.vregid) {
  //     this.toastr.error("VReg ID is missing.");
  //     return;
  //   }

  //   this.sendingOTP = true;

  //   this.api.VerifyOTPLogin(this.vregid).subscribe({
  //     next: (res: any) => {
  //       this.toastr.success("OTP sent to registered mobile number.");
  //       this.sendingOTP = false;
  //     },
  //     error: () => {
  //       this.toastr.error("Failed to send OTP.");
  //       this.sendingOTP = false;
  //     }
  //   });
  // }

  // ---------------- SUBMIT DECLARATION ----------------
  submitDeclaration() {
debugger
    // Validate OTP
    if (!this.otpValue || this.otpValue.length !== 5) {
      this.toastr.error("Please enter a valid 5-digit OTP.");
      return;
    }
  
    this.submitting = true;
  
    // Format current date like 10-Nov-2025 02:45:23 PM
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const month = monthNames[now.getMonth()];
    const year = now.getFullYear();
  
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    hours = hours % 12 || 12;
  
    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds} ${ampm}`;
  
    // API Call
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
        this.toastr.error("Failed to submit declaration.");
        this.submitting = false;
      }
    });
  
  }
  
}