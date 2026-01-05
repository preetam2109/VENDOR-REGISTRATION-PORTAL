import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-registration',
  // imports: [],standalone: true
  templateUrl: './registration.html',
  styleUrl: './registration.css'
})
export class Registration {
 
    registerForm!: FormGroup;
    isSubmitting = false;
    submitted = false;
    isOtpSent = false;
    serverOtp: string = ''; 
    enteredOtp: string = '';
    lictypename:any;
    lictypeid:any;
    countries: any[] = [];
    states: any[] = [];
    countryid:any;
    stateid:any;
    VendorDetails:any;
    isPasswordVisible: boolean = false;
    isPasswordVisible1: boolean = false;
  // https://localhost:7053/api/Registration/InsertSupplier?mpanno=BKDPR05Ld543
  // &mSUPPLIERNAME=Kaushal&mSUPPLIERTYPE=1&mADDRESS1=krishna%20nagar&mADDRESS2=Raipur
  // &mADDRESS3=Snatoshi%20Nagar&mCITY=Raipur&mCOUNTRYID=1&mZIP=495001&mPHONE1=9770406881&mEMAIL=kaushal.stranger005%40gmail.com
  // &mPwd=Kaushal%40123
  // https://dpdmis.in//AamApi/api/Login/VerifyOTPLogin?otp=73111&userid=9610
  // Signup
  constructor(private spinner: NgxSpinnerService,private api: ApiService,public toastr: ToastrService, private fb: FormBuilder,
      private cdr: ChangeDetectorRef, private router: Router,
    ){ }
    passwordMatchValidator(form: FormGroup) {
      const password = form.get('mPwd')?.value;
      const confirmPassword = form.get('confirmPassword')?.value;
      if (password && confirmPassword && password !== confirmPassword) {
        form.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      } else {
        form.get('confirmPassword')?.setErrors(null);
      }
      return null;
    }
    
    ngOnInit(): void {
      this.registerForm = this.fb.group({
        mpanno: ['', Validators.required],
        mSUPPLIERNAME: ['', Validators.required],
        mSUPPLIERTYPE: ['', Validators.required],
        mADDRESS1: ['', Validators.required],
        mADDRESS2: ['', Validators.required],
        mADDRESS3: ['', Validators.required],
        mCITY: ['', Validators.required],
        mCOUNTRYID: ['', Validators.required],
        mZIP: ['', Validators.required],
        mPHONE1: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
        mEMAIL: ['', [Validators.required, Validators.email]],
        mPwd: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        otp: ['', Validators.required]
      },
      {
        validator: this.passwordMatchValidator 
      }
    );
      this.GETMASLICENCETYPE();
      this.getStates();
      this.GetCountries();
    this.getVendorDetails();
    }


    // https://dpdmis.in/VREGAPI/api/Registration/registeredVendors?vregid=0
    // getVendorDetails(mPHONE1:any, mSUPPLIERNAME:any){
    getVendorDetails(){
      this.api.getVendorDetailsID(0).subscribe({
        next: (res: any) => {
         this.VendorDetails=res;
        // console.log('No duplicate found, you can proceed');
  
        //  console.log("VendorDetails:", this.VendorDetails);
        },
        error: (err: any) => {
          console.error("Failed to load vendor details:", err);
          // alert("Failed to load vendor details");
        }
      });
    }

    get f() {
      return this.registerForm.controls;
    }

   
 sendOtp() {
  
  const mobile = this.registerForm.value.mPHONE1;

  if (!mobile || mobile.toString().length !== 10) {
    this.toastr.warning('Please enter a valid 10-digit mobile number', 'Warning');
    return;
  }
  // return;
  
    this.api.GETotp(mobile).subscribe({  
      next: (res: any) => {
        this.isOtpSent = true;
        this.serverOtp = res?.message || ''; // assume backend returns { otp: '123456' }
        console.log('serverOtp:=',this.serverOtp);
        console.log('otp:=',res);
        // alert('OTP sent successfully to your mobile');
        this.toastr.success('OTP sent successfully to your mobile', 'Success');
      },
      error: (err:any) => {
        console.error('OTP Error:', err);
        this.toastr.error('Failed to send OTP', 'Error');
      }
    });
  }


 onSubmit() {
  // debugger;
  // const res={message: '78188', apiResponse: ''};
  // this.serverOtp = res?.message || '';
  this.isSubmitting = true;

  if (this.registerForm.invalid) {
    this.toastr.error('Please fill all required fields correctly!', 'Validation Error');
    return;
  }
  const mSUPPLIERNAME =this.registerForm.value.mSUPPLIERNAME;
  const mPHONE1 =this.registerForm.value.mPHONE1
//  this.getVendorDetails(mPHONE1, mSUPPLIERNAME );
  if (mPHONE1 && mSUPPLIERNAME !== null) {

    const isExists = this.VendorDetails.some((item: any) =>
      item.supplierName?.trim().toLowerCase() === mSUPPLIERNAME.trim().toLowerCase() &&
      item.phone1?.trim() === mPHONE1.trim()
    );

    if (isExists) {
    
      // alert('This supplier name and phone number already exist. Please try another.');

      this.toastr.warning(
        'Supplier name and phone number already exist. Please try another.',
        'Duplicate Entry'
      );

      return;
    }


    // this.toastr.warning('Please request OTP before submitting', 'Warning');
    // return;
  }

  if (!this.isOtpSent) {
    this.toastr.warning('Please request OTP before submitting', 'Warning');
    return;
  }

  const otp = this.registerForm.value.otp?.toString().trim(); // entered by user
  const serverOtp = this.serverOtp?.toString().trim();        // from backend
  
  if (serverOtp && otp !== serverOtp) {
    this.toastr.error('Invalid OTP, please try again', 'Error');
    return;
  }
  // password check
  const form = this.registerForm.value;
  if (form.mPwd !== form.confirmPassword) {
    this.toastr.error('Password and Confirm Password do not match!', 'Error');
    return;
  }

  const formData = new FormData();
  // return;
  this.api.Signup(form, formData).subscribe({
    next: (res: any) => {
      // console.log('res final submit in rest:=',res);
    
      this.GETSendOtp(this.registerForm.value.mPHONE1,this.registerForm.value.mSUPPLIERNAME,'SIGNUP');
      // alert('Vendor Registered Successfully!');
      this.toastr.success('Vendor Registered Successfully!', 'Success');
      this.enteredOtp = '';
      this.isOtpSent = false;
      this.isSubmitting = false;
      this.registerForm.reset();

    },
    error: (err: any) => {
      console.error('Registration Error:', err);
      this.toastr.error('Failed to register vendor', 'Error');
      this.isSubmitting = false;
    }
  });
}
GETSendOtp(mobile:any,Detail:any,mType:any){
  // https://localhost:7053/api/Sms/SendOtp?mobile=9770406881&Detail=Kaushal&mType=SIGNUP
  this.api.GETSendOtp(mobile,Detail,mType)
  .subscribe({
    next: (res: any) => {
      this.toastr.success('OTP has been sent successfully!', 'Success');
      // console.log('GETSendOtp:', res);
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    },
    error: (err: any) => {
      console.error('Error loading :', err);
      // alert("Failed to load vendor details");
    },
  });
}

// Onselectyear(event: Event): void {
//   // ;
//   const selectedId = (event.target as HTMLSelectElement).value;
//   const selectedYear = this.lictypename.find((y: { lictypeid: string; }) => y.lictypeid == selectedId);

//   // console.log('Selected Year Object:', selectedYear);

//   if (selectedYear) {
//     this.lictypeid = selectedYear.lictypeid;
//     this.lictypename = selectedYear.lictypename;
//   } 
// }
Onselectyear(event: Event): void {
  const selectedId = (event.target as HTMLSelectElement).value;

  const selectedVendor = this.lictypename.find(
    (v: { lictypeid: string }) => v.lictypeid == selectedId
  );

  if (selectedVendor) {
    this.lictypeid = selectedVendor.lictypeid;
    this.registerForm.get('mSUPPLIERTYPE')?.setValue(this.lictypeid); // ✅ update form control manually
    this.registerForm.get('mSUPPLIERTYPE')?.markAsTouched(); // optional, ensures UI reacts
    this.registerForm.get('mSUPPLIERTYPE')?.updateValueAndValidity(); // ✅ triggers validation refresh
  }
}

GETMASLICENCETYPE(){
  this.api.GETMASLICENCETYPE().subscribe({
    next: (res: any) => {
     this.lictypename=res;
     console.log("lictypename:", this.lictypename);
    },
    error: (err: any) => {
      console.error("Error loading Years:", err);
      // alert("Failed to load vendor details");
    }
  });
}
disablePaste(event: ClipboardEvent) {
  event.preventDefault();
  this.toastr.warning('Pasting OTP is not allowed. Please type it manually.', 'Warning');
}

//  https://localhost:7053/api/Registration/masstates
//  https://localhost:7053/api/Registration/GetCountries
getStates(){
  this.api.getStates().subscribe({
    next: (res: any) => {
     this.states=res;
     console.log("States:", this.lictypename);
    },
    error: (err: any) => {
      console.error("Error loading States:", err);
      // alert("Failed to load vendor details");
    }
  });
}
GetCountries(){
  this.api.GetCountries().subscribe({
    next: (res: any) => {
     this.countries=res;
     console.log("Countries:", this.lictypename);
    },
    error: (err: any) => {
      console.error("Error loading Countries:", err);
      // alert("Failed to load vendor details");
    }
  });
}
onCountryChange(event: Event): void {
  const selectedId = (event.target as HTMLSelectElement).value;
  // countryname
  const selectedVendor = this.countries.find(
    (v: { countryid: string }) => v.countryid == selectedId
  );

  if (selectedVendor) {
    this.countryid = selectedVendor.countryid;
    this.registerForm.get('mCOUNTRYID')?.setValue(this.countryid); 
    this.registerForm.get('mCOUNTRYID')?.markAsTouched(); 
    this.registerForm.get('mCOUNTRYID')?.updateValueAndValidity(); 
  }
}
onStatesChange(event: Event): void {
  const selectedId = (event.target as HTMLSelectElement).value;

  const selectedVendor = this.states.find(
    (v: { stateid: string }) => v.stateid == selectedId
  );

  if (selectedVendor) {
    this.stateid = selectedVendor.stateid;
    this.registerForm.get('mADDRESS3')?.setValue(this.stateid); // ✅ update form control manually
    this.registerForm.get('mADDRESS3')?.markAsTouched(); // optional, ensures UI reacts
    this.registerForm.get('mADDRESS3')?.updateValueAndValidity(); // ✅ triggers validation refresh
  }
}


togglePassword(): void {
  this.isPasswordVisible = !this.isPasswordVisible;
  // this.isPasswordVisible = !this.isPasswordVisible; // Toggle visibility
  // const passwordField = document.getElementById('pwd') as HTMLInputElement;
  // if (passwordField) {
  //   passwordField.type = this.isPasswordVisible ? 'text' : 'password'; // Toggle input type
  // }
}
togglePassword1(): void {
  // 
  this.isPasswordVisible1 = !this.isPasswordVisible1;
  // this.isPasswordVisible = !this.isPasswordVisible; // Toggle visibility
  // const passwordField = document.getElementById('pwd') as HTMLInputElement;
  // if (passwordField) {
  //   passwordField.type = this.isPasswordVisible ? 'text' : 'password'; // Toggle input type
  // }
}
}