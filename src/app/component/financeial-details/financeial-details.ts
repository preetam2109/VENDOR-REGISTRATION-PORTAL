import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
// import { CollapseModule } from 'src/app/collapse';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { SupplierBankAccDetail_model, vendorBankDetail_model,UpdateBankDetails_model } from 'src/app/Model/VendorRegisDetail';
import { ApiService } from 'src/app/service/api.service';
import { CollapseModule } from 'src/app/collapse';
// import { CollapseModule } from 'src/app/collapse/collapse.module';
@Component({
  selector: 'app-financeial-details',
  standalone: true,
  imports: [NgSelectModule,CommonModule,FormsModule,CollapseModule,NgbCollapseModule,ReactiveFormsModule],
  templateUrl: './financeial-details.html',
  styleUrl: './financeial-details.css'
})
export class FinanceialDetails {
  // SupplierBankAccDetail: SupplierBankAccDetail_model[] = [];
  // VendorBankDetail:vendorBankDetail_model[]=[];
  isCollapsed = false;
  isCollapsed1 = true;
  isCollapsed2 = true;
  isCollapsed3 = true;
  isEventOpen = false;
  VendorBankDetail: any[] = [];
  SupplierBankAccDetail:any = {};
  // FeedbackData: FeedbackDTO = new FeedbackDTO();
  UpdateBankDetailsdata: UpdateBankDetails_model = new UpdateBankDetails_model();
  // selectedPanFile: File | null = null;
  selectedFile: File | null = null;
  Years:any;
  acno: any = null;
  accyear: any = null;
  isNewBank: boolean = false;
  constructor(private spinner: NgxSpinnerService,private api: ApiService,public toastr: ToastrService,private fb: FormBuilder){
   
  }


ngOnInit() {
  this.loadVendorBankDetail();
  this.GETAnnualYear();
}

loadVendorBankDetail() {
  this.api.vendorBankDetail(sessionStorage.getItem('facilityid')).subscribe({
    next: (res: any) => {
      if (res && res.length > 0) {
        this.VendorBankDetail = [
          ...res,
          { bankaccountid: 0, acno: 'Add new Bank Account' }
        ];
      } else {
        this.VendorBankDetail = [{ bankaccountid: 0, acno: 'Add new Bank Account' }];
      }
    },
    error: (err: any) => {
      console.error("Error loading vendor details:", err);
      alert("Failed to load vendor details");
    }
  });
}



onselectacno(event: any): void {
  console.log('Selected Value:', this.acno);
  const selected = this.VendorBankDetail.find(
    (x: any) => x.bankaccountid === event
  );

  // Check if "Add new Bank Account" is selected
  if (this.acno === 0) {
  //  this.GETSupplierBankAccDetail(this.acno);
  // this.GETSupplierBankAccDetail(1836,1139);
    this.isNewBank = true;
    // alert('You selected: Add new Bank Account');
    // Here you can open modal or trigger add bank logic
    // Example: this.openAddBankModal();
   
  } else {
    // this.GETSupplierBankAccDetail(this.acno);
    this.GETSupplierBankAccDetail(1836,1139);
    this.isNewBank = true;
    const selectedUser = this.VendorBankDetail.find(
      (user: { bankaccountid: any }) => user.bankaccountid === this.acno
    );
    console.log('selectedUser:', selectedUser);
  }
}
// https://dpdmis.in/VREGAPI/api/Registration/SupplierBankAccDetail?supID=1836&bankAccId=1139
GETSupplierBankAccDetail(sid:any,acno:any) {
  debugger;
  // this.api.SupplierBankAccDetail(sessionStorage.getItem('facilityid'),acno).subscribe({
  this.api.SupplierBankAccDetail(sid,acno).subscribe({
    next: (res: any) => {
      if (res && res.length > 0) {
        this.SupplierBankAccDetail = res[0];
        console.log('SupplierBankAccDetail:', this.SupplierBankAccDetail);
        // this.SupplierBankAccDetail = { ...res[0] };
        // if(this.acno===0){
        //   this.SupplierBankAccDetail = {
        //     bankaccountid: 0,
        //     bankname: '',
        //     accountname: '',
        //     accountno: '',
        //     ifsccode: '',
        //     branch: '' };
        // }else{
        //   this.SupplierBankAccDetail = res[0];
        //   console.log('SupplierBankAccDetail:', this.SupplierBankAccDetail);
        // }
       
      }
       
        // { bankaccountid: 0, acno: 'Add new Bank Account' }
      // } else {
      //   this.VendorBankDetail = [{ bankaccountid: 0, acno: 'Add new Bank Account' }];
      // }
    },
    error: (err: any) => {
      console.error("Error loading vendor details:", err);
      alert("Failed to load vendor details");
    }
  });
}

// GETYear
GETAnnualYear(){
  this.api.GETYear().subscribe({
    next: (res: any) => {
     this.Years=res;
     console.log("Years:", this.Years);
    },
    error: (err: any) => {
      console.error("Error loading Years:", err);
      // alert("Failed to load vendor details");
    }
  });
}



Onselectyear(event: Event): void {

  const selectedUser1 =  this.Years.find((user: { accyear: any }) => user.accyear === this.accyear); 
  console.log('selectedUser:',selectedUser1);
  if (selectedUser1) {
  // var name  = selectedUser?.coreDept ;
  // if (name == 'All') {
  //   this.GetEmployeeList(0);

  // }else{this.GetEmployeeList(name); }
  // this.GetEmployeeList(name);
  } else {
    alert('Selected districT_ID not found in the list.');
  }

      }
  //https://dpdmis.in/VREGAPI/api/Registration/UpdateBankDetails

  onSubmit(form: any) {
    if (form.invalid) {
      alert("Please fill all required fields.");
      return;
    }
    // VendorRegistrationId: this.UpdateBankDetailsdata.VendorRegistrationId,
    //       SelectedBankAccountId: this.UpdateBankDetailsdata.SelectedBankAccountId,
    //       AccountNumber: this.UpdateBankDetailsdata.AccountNumber,
    //       AccountHolderName: this.UpdateBankDetailsdata.AccountHolderName,
    //       BankName: this.UpdateBankDetailsdata.BankName,
    //       BranchName: this.UpdateBankDetailsdata.BranchName,
    //       IFSCCode: this.UpdateBankDetailsdata.IFSCCode,
    //       supplierid: this.UpdateBankDetailsdata.supplierid
    const formData = new FormData();
    // formData.append('VendorRegistrationId', this.UpdateBankDetailsdata.VendorRegistrationId || '');
    // // formData.append('SelectedBankAccountId', this.acno.toString());
    // formData.append('SelectedBankAccountId', this.acno.toString());
    // formData.append('AccountNumber', this.UpdateBankDetailsdata.AccountNumber || '');
    // formData.append('AccountHolderName', this.UpdateBankDetailsdata.AccountHolderName || '');
    // formData.append('BankName', this.UpdateBankDetailsdata.BankName || '');
    // formData.append('BranchName', this.UpdateBankDetailsdata.BranchName || '');
    // formData.append('IFSCCode', this.UpdateBankDetailsdata.IFSCCode || '');
    // formData.append('supplierid', sessionStorage.getItem('facilityid') || '');
    formData.append('VendorRegistrationId', this.SupplierBankAccDetail.VendorRegistrationId || '');
    formData.append('SelectedBankAccountId', this.acno.toString());
    formData.append('AccountNumber', this.SupplierBankAccDetail.accountno || '');
    formData.append('AccountHolderName', this.SupplierBankAccDetail.accountname || '');
    formData.append('BankName', this.SupplierBankAccDetail.bankname || '');
    formData.append('BranchName', this.SupplierBankAccDetail.branch || '');
    formData.append('IFSCCode', this.SupplierBankAccDetail.ifsccode || '');
    formData.append('supplierid', sessionStorage.getItem('facilityid') || '');
    if (this.selectedFile) {
      formData.append('BankDetailDocument', this.selectedFile);
    }
  return;
    this.api.post('/Registration/UpdateBankDetails',formData).subscribe({
    // this.api.updateBankDetails('/Registration/UpdateBankDetails',formData).subscribe({
      next: (res: any) => {
        alert('Bank details updated successfully!');
        form.resetForm(); // reset the form
        this.selectedFile = null;
      },
      error: (err: any) => {
        console.error('Error updating bank details:', err);
        alert('Failed to update bank details');
      }
    });
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log('Selected PAN card file:', file.name);
    }
  }



  // onFileSelected(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.selectedFile = file;
  //   }
  // }
  

  // saveVendor() {
  //   try {
  //    const  supplierid=sessionStorage.getItem('facilityid');
  //     const formData = new FormData();
  
  //     // Append file if selected
  //     if (this.selectedPanFile) {
  //       formData.append('BankDocument', this.selectedPanFile);
  //     }
  
  //     // Append any extra form fields if required in DTO
  //     // formData.append('SomeField', this.vendor.someValue);
  
  //     // Prepare query params based on backend API
  //     // VendorRegistrationId: string | undefined;
  //     // SelectedBankAccountId: number| undefined;
  //     // AccountNumber: string| undefined;
  //     // AccountHolderName: string| undefined;
  //     // BankName: string| undefined;
  //     // BranchName: string| undefined;
  //     // IFSCCode: string| undefined;
  //     // supplierid: string| undefined;
  //     // BankDetailDocument:string| undefined;
  //     const params = {
  //       VendorRegistrationId: this.UpdateBankDetailsdata.VendorRegistrationId,
  //       SelectedBankAccountId: this.UpdateBankDetailsdata.SelectedBankAccountId,
  //       AccountNumber: this.UpdateBankDetailsdata.AccountNumber,
  //       AccountHolderName: this.UpdateBankDetailsdata.AccountHolderName,
  //       BankName: this.UpdateBankDetailsdata.BankName,
  //       BranchName: this.UpdateBankDetailsdata.BranchName,
  //       IFSCCode: this.UpdateBankDetailsdata.IFSCCode,
  //       supplierid: this.UpdateBankDetailsdata.supplierid
  //       // BankDetailDocument: this.UpdateBankDetailsdata.BankDetailDocument
  //     };
  
  //     // Use updated service method
  //     this.api.post('/Registration/UpdateBankDetails',params, formData).subscribe({
  //       next: (res: any) => {
  //         console.log("Vendor saved:", res);
  //         this.toastr.success("Vendor details saved successfully!", "Success");
  //       },
  //       error: (err: any) => {
  //         console.error("Error saving vendor:", err);
  
  //         if (err.status === 0) {
  //           this.toastr.error("Unable to connect to the server. Please try again later.", "Network Error");
  //         } else if (err.status >= 400 && err.status < 500) {
  //           this.toastr.warning("Invalid vendor data or request issue.", "Validation Error");
  //         } else if (err.status >= 500) {
  //           this.toastr.error("Server error occurred. Please contact support.", "Server Error");
  //         } else {
  //           this.toastr.error("An unknown error occurred.", "Error");
  //         }
  //       }
  //     });
  //   } catch (error) {
  //     console.error("Unexpected error:", error);
  //     this.toastr.error("Something went wrong! Please try again.", "Error");
  //   }
  // }

 

      // OnSubmit() {
      //   try {
         
      //     this.submitted = true;
      //     this.FeedbackData = this.FeedbackForm.value;
      //     this.FeedbackData.mobileNumber = this.FeedbackData.mobileNumber.toString();
      //     // if (this.FeedbackForm.value.captchaInput !== this.captcha) {
      //     //   this.toastr.error('Invalid Captcha', 'Error');
      //     //   // this.generateCaptcha(); // refresh captcha
      //     //   return;
      //     // }
      //     if (
      //       this.FeedbackForm.value.captchaInput.toLowerCase() !==
      //       this.captcha.toLowerCase()
      //     ) {
          
      //       this.toastr.error('Invalid Captcha', 'Error!', {
             
      //         positionClass: 'toast-center' 
      //       });
      //       this.generateCaptcha(); 
      //       return;
      //     }
      //     if (this.FeedbackForm.valid) {
      //       const Feedbackdata = this.FeedbackData; 
      
      //       this.Service.post1('Feedback/SubmitFeedbackSimple', Feedbackdata).subscribe(
      //         (res: any) => {
      //           this.toastr.success(res.message, 'Success', {
      //              positionClass: 'toast-center'
                  
      //           });
      //           this.FeedbackForm.reset();
      //           this.FeedbackForm.markAsPristine();
      //           this.FeedbackForm.markAsUntouched();
      //           this.submitted = false;
      //           // console.log('res:=', res);
      //         },
      //         (err: HttpErrorResponse) => {
      //           // console.error('HTTP Error:', err);
      //           console.error('Backend Error Message:', err.error);
           
      //           // this.toastr.error(err.error?.message || 'Submission failed', 'Error', {
      //           //   positionClass: 'toast-center'
      //           // });
      //         }
      //       );
      //     } else {
           
      //       this.toastr.error('Something went wrong, please try again!', 'Error!', {
      //         positionClass: 'toast-center'
      //       });
      //     }
      //   } catch (err: any) {
      //     console.log('error:=', err.message);
      //     // throw err;
      //   }
      // }






// toggleEvent() {
//   this.isEventOpen = !this.isEventOpen;
// }






// loadVendorBankDetail() {
//   this.api.vendorBankDetail(sessionStorage.getItem('facilityid')).subscribe({
//     next: (res: any) => {
//       if (res && res.length > 0) {
//         this.VendorBankDetail = res; // since API returns an array
//       }
//     },
//     error: (err:any) => {
//       console.error("Error loading vendor details:", err);
//       alert("Failed to load vendor details");
//     }
//   });
// }
// onselectacno(event: Event): void {

//   const selectedUser =  this.VendorBankDetail.find((user: { acno: any }) => user.acno === this.acno); 
//   console.log('selectedUser:',selectedUser);
//   if (selectedUser) {
//   // var name  = selectedUser?.coreDept ;
//   // if (name == 'All') {
//   //   this.GetEmployeeList(0);

//   // }else{this.GetEmployeeList(name); }
//   // this.GetEmployeeList(name);
//   } else {
//     alert('Selected districT_ID not found in the list.');
//   }

//       }


// loadVendorBankDetail() {
//   this.api.vendorBankDetail(sessionStorage.getItem('facilityid')).subscribe({
//     next: (res: any) => {
//       if (res && res.length > 0) {
//         this.VendorBankDetail = res;
//       }
//     },
//     error: (err: any) => {
//       console.error("Error loading vendor details:", err);
//       alert("Failed to load vendor details");
//     }
//   });
// }

// addNewBank(bankName: string) {
//   const newBank = { accountname: bankName };

//   // Push to dropdown list
//   // this.VendorBankDetail = [...this.VendorBankDetail, newBank];

//   // Set it as selected (important)
//   this.accountname = newBank;

//   console.log("Added & Selected:", this.accountname);
//   return newBank;
// }


      // addNewBank(bankName: string) {
      //   // Create a new object structure similar to VendorBankDetail list
      //   this.accountname = bankName;
      //   const newBank = { accountname: bankName };
      //   console.log(newBank);
     
      //   // Push into existing list (optional if you want it to appear next time)
      //   // this.VendorBankDetail = [...this.VendorBankDetail, newBank];
      
      //   // Return the newly created option
      //   // return newBank;
      // }
      
}
