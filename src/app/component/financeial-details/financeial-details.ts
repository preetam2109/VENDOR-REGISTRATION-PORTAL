import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
// import { CollapseModule } from 'src/app/collapse';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { SupplierBankAccDetail_model, vendorBankDetail_model } from 'src/app/Model/VendorRegisDetail';
import { ApiService } from 'src/app/service/api.service';
import { CollapseModule } from 'src/app/collapse';
// import { CollapseModule } from 'src/app/collapse/collapse.module';
@Component({
  selector: 'app-financeial-details',
  standalone: true,
  imports: [NgSelectModule,CommonModule,FormsModule,CollapseModule,NgbCollapseModule],
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
  ;
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
