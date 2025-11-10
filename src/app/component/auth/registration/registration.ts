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
    submitted = false;
    registerForm!: FormGroup;
    otpSent = false;
  // https://localhost:7053/api/Registration/InsertSupplier?mpanno=BKDPR05Ld543
  // &mSUPPLIERNAME=Kaushal&mSUPPLIERTYPE=1&mADDRESS1=krishna%20nagar&mADDRESS2=Raipur
  // &mADDRESS3=Snatoshi%20Nagar&mCITY=Raipur&mCOUNTRYID=1&mZIP=495001&mPHONE1=9770406881&mEMAIL=kaushal.stranger005%40gmail.com
  // &mPwd=Kaushal%40123
  // https://dpdmis.in//AamApi/api/Login/VerifyOTPLogin?otp=73111&userid=9610
  // Signup
  constructor(private spinner: NgxSpinnerService,private api: ApiService,public toastr: ToastrService, private fb: FormBuilder,
      private cdr: ChangeDetectorRef, private router: Router,
    ){
      this.registerForm = this.fb.group({
        mSUPPLIERNAME: ['', Validators.required],
        mEMAIL: ['', [Validators.required, Validators.email]],
        mSUPPLIERTYPE: ['', Validators.required],
        mpanno: ['', [Validators.required, Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$')]],
        mADDRESS1: ['', Validators.required],
        mADDRESS2: [''],
        mADDRESS3: [''],
        mCITY: ['', Validators.required],
        mCOUNTRYID: ['', Validators.required],
        mZIP: ['', Validators.required],
        mPHONE1: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        mPwd: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        otp: ['']
      }, {
        validators: this.passwordMatchValidator
      });
    }
    passwordMatchValidator(form: FormGroup) {
      const pass = form.get('mPwd')?.value;
      const confirm = form.get('confirmPassword')?.value;
      return pass === confirm ? null : { passwordMismatch: true };
    }
    ngOnInit() {

    }

    get f() {
      return this.registerForm.controls;
    }
  
    sendOtp() {
      // if (!this.f.mEMAIL.value) {
      //   this.toastr.error('Please enter email before sending OTP.');
      //   return;
      // }
      // this.otpSent = true;
      // this.toastr.success('OTP sent to your email!');
    }
    onSubmit() {
      if (this.registerForm.invalid) {
        this.toastr.error('Please fill all required fields correctly!', 'Validation Error');
        return;
      }
  
      const form = this.registerForm.value;
      const params = new URLSearchParams({
        mpanno: form.mpanno,
        mSUPPLIERNAME: form.mSUPPLIERNAME,
        mSUPPLIERTYPE: form.mSUPPLIERTYPE,
        mADDRESS1: form.mADDRESS1,
        mADDRESS2: form.mADDRESS2,
        mADDRESS3: form.mADDRESS3,
        mCITY: form.mCITY,
        mCOUNTRYID: form.mCOUNTRYID,
        mZIP: form.mZIP,
        mPHONE1: form.mPHONE1,
        mEMAIL: form.mEMAIL,
        mPwd: form.mPwd
      });
  
      const apiUrl = `/Registration/InsertSupplier?${params.toString()}`;
      console.log('API URL:', apiUrl);
  
      this.api.post1(apiUrl, {}).subscribe({
        next: (res: any) => {
          this.toastr.success('Vendor Registered Successfully!', 'Success');
          this.registerForm.reset();
        },
        error: (err: any) => {
          console.error('Error:', err);
          this.toastr.error('Failed to register vendor', 'Error');
        }
      });
    }
    OnSubmmit(): void {
      // // debugger;
      // // this.submitted = true;
      // // console.log('Form Value:', this.AnnualTurnoverForm.value);
      // // console.log('Form Valid:', this.AnnualTurnoverForm.valid);
      // // console.log('Form Errors:', this.AnnualTurnoverForm.errors);
    
      // if (this.AnnualTurnoverForm.invalid) {
      //   this.toastr.error('Please fill all required fields!', 'Error');
      //   return;
      // }
    
      // const formData = new FormData();
      // // formData.append('AccYrSetId', this.AnnualTurnoverForm.value.AccYrSetId);
      // formData.append('AccYrSetId', this.AnnualTurnoverForm.value.AccYrSetId);
      // formData.append('TurnOverAmt', this.AnnualTurnoverForm.value.TurnOverAmt);
      // formData.append('UDINNO', this.AnnualTurnoverForm.value.UDINNO);
      // formData.append('Atid', '0');
      // formData.append('VregId', sessionStorage.getItem('vregid') || '');
      // formData.append('SupplierId', sessionStorage.getItem('facilityid') || '');
    
      // if (this.selectedAnuvFile) {
      //   formData.append('TurnOverDocument', this.selectedAnuvFile, this.selectedAnuvFile.name);
      // }
    
      // this.api.post('/Registration/UpdateAnnualTurnover', formData).subscribe(
      //   (res: any) => {
      //     this.toastr.success(res.message, 'Success');
      //     this.AnnualTurnoverForm.reset();
      //     this.submitted = false;
      //     this.selectedAnuvFile = null;
      //   },
      //   (err) => {
      //     this.toastr.error('Submission failed', 'Error');
      //     console.error(err);
      //   }
      // );
    }
}
