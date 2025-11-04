import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component ,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
// import { CollapseModule } from 'src/app/collapse';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { SupplierBankAccDetail_model, vendorBankDetail_model,UpdateBankDetails_model, UpdateAnnualTurnover_model, GetAnnualTurnoverDetail, BankMandateDetail, MassuppliergstDetails, GstReturnDetails } from 'src/app/Model/VendorRegisDetail';
import { ApiService } from 'src/app/service/api.service';
import { CollapseModule } from 'src/app/collapse';
// import { CollapseModule } from 'src/app/collapse/collapse.module';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MaterialModule } from 'src/app/material-module';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
declare var bootstrap: any;
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
@Component({
  selector: 'app-financeial-details',
  standalone: true,
  imports: [NgSelectModule,CommonModule,FormsModule,CollapseModule,NgbCollapseModule,ReactiveFormsModule,MatTabsModule,
    MaterialModule,MatSortModule, MatPaginatorModule,MatTableModule,MatDialogModule,MatSelectModule, MatOptionModule,
      MatTableExporterModule
  ],
  templateUrl: './financeial-details.html',
  styleUrl: './financeial-details.css'
})
export class FinanceialDetails {
  // SupplierBankAccDetail: SupplierBankAccDetail_model[] = [];
  // VendorBankDetail:vendorBankDetail_model[]=[];
  @ViewChild('bankForm') bankForm!: NgForm;
  isCollapsed = false;
  isCollapsed1 = true;
  isCollapsed2 = true;
  isCollapsed3 = true;
  isEventOpen = false;
  VendorBankDetail: any[] = [];
  SupplierBankAccDetail:any = {};
  // FeedbackData: FeedbackDTO = new FeedbackDTO();
  UpdateBankDetailsdata: UpdateBankDetails_model = new UpdateBankDetails_model();
  UpdateAnnualTurnoverdata: UpdateAnnualTurnover_model = new UpdateAnnualTurnover_model();
  // selectedPanFile: File | null = null;
  selectedFile: File | null = null;
  selectedAnuvFile: File | null = null;
  GSTCertificate: File | null = null;
  GSTreturnCertificate: File | null = null;
  quartername:any;
  statename: any;
  gstid:any;
  stateid: any;
  gstqtrid:any;
gstno: string = '';
gstFileModel: any; // just for ngModel binding compatibility
  Years:any;
  States:any;
  selectedAccYear:any;
  selectedQuarter:any;
  acno: any = null;
  accyrsetid: any = null;
  accyear: any = null;
  isNewBank: boolean = false;
  AnnualTurnoverForm!: FormGroup;
  submitted = false;
  onshowFINANCIAL = false;
  onshowAT = false;
  fileError: string = '';
  selectedTabIndex: number = 0;
  sanitizedPdfUrl!: SafeResourceUrl;
  dataSource!: MatTableDataSource<GetAnnualTurnoverDetail>;
  dataSource1!: MatTableDataSource<BankMandateDetail>;
  dataSource2!: MatTableDataSource<MassuppliergstDetails>;
  dataSource3!: MatTableDataSource<GstReturnDetails>;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('sort') sort!: MatSort;
  @ViewChild('paginator1') paginator1!: MatPaginator;
  @ViewChild('sort1') sort1!: MatSort;
  @ViewChild('paginator2') paginator2!: MatPaginator;
  @ViewChild('sort2') sort2!: MatSort;
  @ViewChild('paginator3') paginator3!: MatPaginator;
  @ViewChild('sort3') sort3!: MatSort;
  dispatchData: GetAnnualTurnoverDetail[] = [];
  dispatchData2: MassuppliergstDetails[] = [];
  dispatchData3: GstReturnDetails[] = [];
  displayedColumns: string[] = [
    'sno','accyear','turnoveramt','udinno','filename','action'
  ];
  displayedColumns2: string[] = [
    'sno','statename','gstno','vregid','filename','action'
    //   sno:any;
    // gstid: number| undefined;
    // gstno: string| undefined;
    // filename: string| undefined;
    // filepath: string| undefined;
    // statename: string| undefined;
    // stateid: number| undefined;
    // vregid: number| undefined;
  ];
  displayedColumns3: string[] = [
    'sno','quartername','gstno','accyear','startmonth','endmonth','filename','action'
    // sno:any;
    // retid: number| undefined;
    // gstid: number| undefined;
    // gstno: string| undefined;
    // accyear: string| undefined;
    // gstqtrid: number| undefined;
    // quartername: string| undefined;
    // startmonth: string| undefined;
    // endmonth: string| undefined;
    // filename: string| undefined;
    // filepath: string| undefined;
  ];
  dispatchData1: BankMandateDetail[] = [];
  displayedColumns1: string[] = [
    'sno','accountname','accountno','bankname','branch','ifsccode','defaultacc','action'
    // sno:any;
    // bankaccountid: number| undefined;
    // supplierid: number| undefined;
    // accountname: string| undefined;
    // accountno: string| undefined;
    // bankname: string| undefined;
    // branch: string| undefined;
    // ifsccode: string| undefined;
    // defaultacc: boolean| undefined;
  ];
  AccYearSettings: any;
  MASGSTQUARTER: any;
  constructor(private spinner: NgxSpinnerService,private api: ApiService,public toastr: ToastrService, private fb: FormBuilder,
    private cdr: ChangeDetectorRef, private router: Router,  private sanitizer: DomSanitizer,
  ){
    this.AnnualTurnoverForm = this.fb.group({
      AccYrSetId: ['', Validators.required],
      TurnOverAmt: ['', Validators.required],
      // UDINNO: ['', [Validators.required, Validators.minLength(18),Validators.pattern(/^[0-9]{18}$/)]],
      UDINNO: ['', [Validators.required,Validators.pattern(/^[A-Za-z0-9]{18}$/)]],
      TurnOverDocument: [null, Validators.required]
    });
     this.dataSource = new MatTableDataSource<GetAnnualTurnoverDetail>([]);
     this.dataSource1 = new MatTableDataSource<BankMandateDetail>([]);
     this.dataSource2 = new MatTableDataSource<MassuppliergstDetails>([]);
     this.dataSource3 = new MatTableDataSource<GstReturnDetails>([]);
  }


ngOnInit() {
  this.loadVendorBankDetail();
  this.GETAnnualYear();
  this.GETStates();
  this.GetAnnualTurnover();
  this.GETBankMandateDetail();
  this.GETMassuppliergstDetails();
  this.GstReturnDetails();
  this.GETMASGSTQUARTER();
  this.GETAccYearSettings();
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
  this.bankForm.resetForm(); 
  this.SupplierBankAccDetail = {}; 
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
  // debugger;
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
// GETStates
GETStates(){
  this.api.getStates().subscribe({
    next: (res: any) => {
     this.States=res;
     console.log("States:", this.States);
    },
    error: (err: any) => {
      console.error("Error loading Years:", err);
      // alert("Failed to load vendor details");
    }
  });
}



  //https://dpdmis.in/VREGAPI/api/Registration/UpdateBankDetails

  
  onSubmit(bankForm: NgForm) {
    // debugger;
    if (bankForm.invalid) {
      this.toastr.error('Please fill all required fields.', 'Error');
      return;
    }
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
    // formData.append('VendorRegistrationId', this.SupplierBankAccDetail.VendorRegistrationId || '');
    formData.append('VendorRegistrationId', sessionStorage.getItem('vregid') || '');
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
  // return;
    this.api.post('/Registration/UpdateBankDetails',formData).subscribe({
    // this.api.updateBankDetails('/Registration/UpdateBankDetails',formData).subscribe({
      next: (res: any) => {
        this.toastr.success(res.message, 'Success');
        // alert('Bank details updated successfully!');
        // this.toastr.success(res.message, 'Success', {  positionClass: 'toast-center'  });
        bankForm.resetForm();
        this.selectedFile = null;
        this.SupplierBankAccDetail = {};  // clear data
        // bankForm.resetForm();
      },
      error: (err: any) => {
        console.error('Error updating bank details:', err);
        // alert('Failed to update bank details');
      }
    });
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
     
      console.log('Selected  bank details file:', file.name);
    }
  }
  

  openmarqModal(pdfUrl: string): void {
    this.sanitizedPdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);
  
    // Remove any leftover backdrops (from previous opens)
    document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
  
    const modalEl = document.getElementById('pdfModal')!;
    // ensure modal appended to body so it sits above other layout elements
    document.body.appendChild(modalEl);
  
    // Optional: force z-index higher than anything else on page
    (modalEl as HTMLElement).style.zIndex = '99999';
  
    const modal = new bootstrap.Modal(modalEl, {
      backdrop: false, // no backdrop
      keyboard: true,
      focus: true
    });
    modal.show();
  }
  
  
  selectedTabValue(event: any): void {
    this.selectedTabIndex = event.index;
    // if (this.selectedTabIndex === 0) {
    //   // Restore original data for "Total Works"
    //   this.districtData = [...this.originalData];
    //   this.loadInitialData();
    //   this.showCards = true;
    // } else {
    //   this.showCards = false;
    // }
  }

  // File select
  // onFileSelectedanudocument(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.selectedAnuvFile = file;
  //     this.AnnualTurnoverForm.patchValue({
  //       TurnOverDocument: file
  //     });
  //     this.AnnualTurnoverForm.get('TurnOverDocument')?.updateValueAndValidity();
  //     console.log('Selected file:', file.name);
  //   }
  // }
  

onFileSelectedanudocument(event: any) {
  const file = event.target.files[0];
  this.fileError = '';

  if (file) {
    const fileName = file.name.toLowerCase();
    const fileSize = file.size; // in bytes

    // ✅ 1. Check file type
    if (!fileName.endsWith('.pdf')) {
      this.fileError = 'Only PDF files are allowed!';
      this.AnnualTurnoverForm.get('TurnOverDocument')?.setErrors({ invalidType: true });
      this.AnnualTurnoverForm.patchValue({ TurnOverDocument: null });
      return;
    }

    // ✅ 2. Check file size (100 MB = 104857600 bytes)
    if (fileSize > 104857600) {
      this.fileError = 'File size must be less than 100 MB!';
      this.AnnualTurnoverForm.get('TurnOverDocument')?.setErrors({ fileTooLarge: true });
      this.AnnualTurnoverForm.patchValue({ TurnOverDocument: null });
      return;
    }

    // ✅ 3. File valid hai → form control me set kar do
    this.selectedAnuvFile = file;
    this.AnnualTurnoverForm.patchValue({
      TurnOverDocument: file
    });
    this.AnnualTurnoverForm.get('TurnOverDocument')?.updateValueAndValidity();

    console.log('Selected file:', file.name, 'Size:', (fileSize / (1024 * 1024)).toFixed(2), 'MB');
  }
}

  // Onselectyear(selectedYear: any): void {
  //   // debugger;
  //   console.log('Selected Year Object:', selectedYear);
  
  //   if (selectedYear) {
  //     this.accyrsetid = selectedYear.accyrsetid;
  //     this.accyear = selectedYear.accyear;
  
  //     // this.AnnualTurnoverForm.patchValue({
  //     //   AccYrSetId: selectedYear.accyrsetid
  //     // });
  //   }
  // }
 
  Onselectyear(event: Event): void {
    // debugger;
    const selectedId = (event.target as HTMLSelectElement).value;
    const selectedYear = this.Years.find((y: { accyrsetid: string; }) => y.accyrsetid == selectedId);
  
    console.log('Selected Year Object:', selectedYear);
  
    if (selectedYear) {
      this.accyrsetid = selectedYear.accyrsetid;
      this.accyear = selectedYear.accyear;
  
      // Update form value explicitly if needed
      // this.AnnualTurnoverForm.patchValue({
      //   AccYrSetId: selectedYear.accyrsetid
      // });
    }
  }
  
  // Submit form
  OnSubmmit(): void {
    // debugger;
    this.submitted = true;
    console.log('Form Value:', this.AnnualTurnoverForm.value);
    console.log('Form Valid:', this.AnnualTurnoverForm.valid);
    console.log('Form Errors:', this.AnnualTurnoverForm.errors);

    if (this.AnnualTurnoverForm.invalid) {
      this.toastr.error('Please fill all required fields!', 'Error');
      return;
    }

    const formData = new FormData();
    // formData.append('AccYrSetId', this.AnnualTurnoverForm.value.AccYrSetId);
    formData.append('AccYrSetId', this.AnnualTurnoverForm.value.AccYrSetId);
    formData.append('TurnOverAmt', this.AnnualTurnoverForm.value.TurnOverAmt);
    formData.append('UDINNO', this.AnnualTurnoverForm.value.UDINNO);
    formData.append('Atid', '0');
    formData.append('VregId', sessionStorage.getItem('vregid') || '');
    formData.append('SupplierId', sessionStorage.getItem('facilityid') || '');

    if (this.selectedAnuvFile) {
      formData.append('TurnOverDocument', this.selectedAnuvFile, this.selectedAnuvFile.name);
    }

    this.api.post('/Registration/UpdateAnnualTurnover', formData).subscribe(
      (res: any) => {
        this.toastr.success(res.message, 'Success');
        this.AnnualTurnoverForm.reset();
        this.submitted = false;
        this.selectedAnuvFile = null;
      },
      (err) => {
        this.toastr.error('Submission failed', 'Error');
        console.error(err);
      }
    );
  }

  get f() {
    return this.AnnualTurnoverForm.controls;
  }


  // GetAnnualTurnover

  GetAnnualTurnover(){
    try{
    //  debugger;
      // this.spinner.show();
    this.api.GetAnnualTurnover(sessionStorage.getItem('vregid'))
    // this.Service.get('GetDrugTenderList?n=0')
      .subscribe(
        (res:any) => {
          this.dispatchData = res.map(
            (item: GetAnnualTurnoverDetail, index: number) => ({
              ...item,
              sno: index + 1,
            })
          );
          console.log('GetAnnualTurnoverDetail=:', this.dispatchData);
          this.dataSource.data = this.dispatchData;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.cdr.detectChanges();
          this.spinner.hide();
        },
        (error: { message: any; }) => {

          alert(`Error fetching data: ${JSON.stringify(error.message)}`);
        }
      );
      }
      catch(err:any){
        this.spinner.hide();

        console.log(err);
        // throw err;
      }
  }
  applyTextFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  exportToPDF(){

  }
 GETBankMandateDetail(){
    try{
    //  debugger;
      // this.spinner.show();
    this.api.Massupplieraccnos(sessionStorage.getItem('facilityid'),sessionStorage.getItem('vregid'))
    // this.Service.get('GetDrugTenderList?n=0')
      .subscribe(
        (res:any) => {
          this.dispatchData1 = res.map(
            (item: BankMandateDetail, index: number) => ({
              ...item,
              sno: index + 1,
            })
          );
          console.log('BankMandateDetail=:', this.dispatchData1);
          this.dataSource1.data = this.dispatchData1;
          this.dataSource1.paginator = this.paginator1;
          this.dataSource1.sort = this.sort1;
          this.cdr.detectChanges();
          this.spinner.hide();
        },
        (error: { message: any; }) => {

          alert(`Error fetching data: ${JSON.stringify(error.message)}`);
        }
      );
      }
      catch(err:any){
        this.spinner.hide();

        console.log(err);
        // throw err;
      }
  }
  applyTextFilter1(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();
  }
  exportToPDF1(){

  }

  onButtonClick(attachment_Id:any){
    // console.log(attachment_Id);
    // this.router.navigate(['/AttachmentList']);
    // this.router.navigate(['/AttachmentList'], { 
    //   queryParams: {Id: attachment_Id, name: 'Drug-Technical' } 
    // });

  }
  onshowButtonClick(val:any){
  //  this.isCollapsed = true;
    // isCollapsed1 = true;
    if(val==0){
      this.onshowFINANCIAL = true;
      this.isCollapsed = false;

    }

  }
  onButtonClickAT(){
   this.onshowAT = true;

  }

  //post := https://localhost:7053/api/Registration/InsertGSTCertificate?mVergID=50&msupplierid=1936&mstateID=44&gstno=gdtdhnj
//   InsertGSTCertificate(GSTForm:NgForm){
// // debugger;
// if (GSTForm.invalid) {
//   this.toastr.error('Please fill all required fields.', 'Error');
//   return;
// }
// const formData = new FormData();
// // formData.append('VendorRegistrationId', this.UpdateBankDetailsdata.VendorRegistrationId || '');
// // // formData.append('SelectedBankAccountId', this.acno.toString());
// // formData.append('SelectedBankAccountId', this.acno.toString());
// // formData.append('AccountNumber', this.UpdateBankDetailsdata.AccountNumber || '');
// // formData.append('AccountHolderName', this.UpdateBankDetailsdata.AccountHolderName || '');
// // formData.append('BankName', this.UpdateBankDetailsdata.BankName || '');
// // formData.append('BranchName', this.UpdateBankDetailsdata.BranchName || '');
// // formData.append('IFSCCode', this.UpdateBankDetailsdata.IFSCCode || '');
// // formData.append('supplierid', sessionStorage.getItem('facilityid') || '');
// // formData.append('VendorRegistrationId', this.SupplierBankAccDetail.VendorRegistrationId || '');
// formData.append('VendorRegistrationId', sessionStorage.getItem('vregid') || '');
// formData.append('SelectedBankAccountId', this.acno.toString());
// formData.append('AccountNumber', this.SupplierBankAccDetail.accountno || '');
// formData.append('AccountHolderName', this.SupplierBankAccDetail.accountname || '');
// formData.append('BankName', this.SupplierBankAccDetail.bankname || '');
// formData.append('BranchName', this.SupplierBankAccDetail.branch || '');
// formData.append('IFSCCode', this.SupplierBankAccDetail.ifsccode || '');
// formData.append('supplierid', sessionStorage.getItem('facilityid') || '');
// if (this.selectedFile) {
//   formData.append('BankDetailDocument', this.selectedFile);
// }
// // return;
// this.api.post('/Registration/InsertGSTCertificate',formData).subscribe({
// // this.api.updateBankDetails('/Registration/UpdateBankDetails',formData).subscribe({
//   next: (res: any) => {
//     this.toastr.success(res.message, 'Success');
//     // alert('Bank details updated successfully!');
//     // this.toastr.success(res.message, 'Success', {  positionClass: 'toast-center'  });
//     GSTForm.resetForm();
//     this.selectedFile = null;
//     this.SupplierBankAccDetail = {};  // clear data
//     // bankForm.resetForm();
//   },
//   error: (err: any) => {
//     console.error('Error updating bank details:', err);
//     // alert('Failed to update bank details');
//   }
// });
//   }



// onFileSelected(event: any) {
//   const file = event.target.files[0];
//   if (file) {
//     this.selectedPanFile = file;
//     console.log('Selected file :', file.name);
//   }
// }
InsertGSTCertificate(GSTForm: NgForm) {
  const formData = new FormData();
     if (GSTForm.invalid) {
    this.toastr.error('Please fill all required fields.', 'Error');
    return;
  }
      if (this.GSTCertificate) {
        formData.append('PanCardDocument', this.GSTCertificate);
      } else {
        console.error('❌ No GST certificate file selected!');
        return;
      }
      const data = {
        mVergID: sessionStorage.getItem('vregid') || '',
        msupplierid: sessionStorage.getItem('facilityid') || '',
        mstateID: this.stateid?.toString() || '',
        gstno: this.gstno,
      };
    try {
      this.api.InsertGSTCertificate(data, formData).subscribe
      ({
            next: (res: any) => {
              this.toastr.success(res.message || 'GST Certificate uploaded successfully!', 'Success');
              GSTForm.resetForm();
              this.GSTCertificate = null;
            },
            error: (err: any) => {
              console.error('Error:', err);
              this.toastr.error('Failed to upload GST certificate', 'Error');
            },
          }); 
    } catch (error) {
      console.error('Exception:', error);
      this.toastr.error('Unexpected error occurred!');
    }
  }
// InsertGSTCertificate(GSTForm: NgForm) {
//   console.log('GST No:', this.gstno);
//   console.log('Supplier ID:', sessionStorage.getItem('facilityid'));
//   console.log('State ID:', this.stateid);
//   console.log('File:', this.GSTCertificate);
//   debugger;
//   if (GSTForm.invalid || !this.GSTCertificate) {
//     this.toastr.error('Please fill all required fields and upload PDF.', 'Error');
//     return;
//   }
//   // api/Registration/InsertGSTCertificate?mVergID=50&msupplierid=1936&mstateID=44&gstno=gdtdhnj
// //   PanCardDocument
// // gstno
// // msupplierid
//   const formData = new FormData();
//   formData.append('mVergID', sessionStorage.getItem('vregid') || '');
//   formData.append('msupplierid', sessionStorage.getItem('facilityid') || '');
//   formData.append('mstateID', this.stateid?.toString() || '');
//   formData.append('gstno', this.gstno);
//   formData.append('PanCardDocument', this.GSTCertificate);
//   // formData.append('GSTCertificate', this.GSTCertificate);
//   // if (this.GSTCertificate) {
//   // }
// // return;T
// // console.log([...formData.entries()]);
// console.log('FormData Debug:');
// for (const pair of (formData as any).entries()) {
//   console.log(pair[0], pair[1]);
// }
//   this.api.post('/Registration/InsertGSTCertificate', formData).subscribe({
//     next: (res: any) => {
//       this.toastr.success(res.message || 'GST Certificate uploaded successfully!', 'Success');
//       GSTForm.resetForm();
//       this.GSTCertificate = null;
//     },
//     error: (err: any) => {
//       console.error('Error:', err);
//       this.toastr.error('Failed to upload GST certificate', 'Error');
//     },
//   });
// }
  GETMassuppliergstDetails(){
    try{
      //  debugger;
        // this.spinner.show();
      this.api.MassuppliergstDetails(sessionStorage.getItem('facilityid'),sessionStorage.getItem('vregid'))
      // this.Service.get('GetDrugTenderList?n=0')
        .subscribe(
          (res:any) => {
            this.dispatchData2 = res.map(
              (item: MassuppliergstDetails, index: number) => ({
                ...item,
                sno: index + 1,
              })
            );
            console.log('MassuppliergstDetails=:', this.dispatchData2);
            this.dataSource2.data = this.dispatchData2;
            this.dataSource2.paginator = this.paginator2;
            this.dataSource2.sort = this.sort2;
            this.cdr.detectChanges();
            this.spinner.hide();
          },
          (error: { message: any; }) => {
  
            alert(`Error fetching data: ${JSON.stringify(error.message)}`);
          }
        );
        }
        catch(err:any){
          this.spinner.hide();
  
          console.log(err);
          // throw err;
        }
  }
  
OnselectStates(event: any) {
  console.log('Selected state:', event);
  this.stateid = event?.stateid;
}
// OnselectStates(event: Event): void {
//   // debugger;
//   const selectedId = (event.target as HTMLSelectElement).value;
//   const selectedstate = this.States.find((y: { stateid: string; }) => y.stateid == selectedId);

//   console.log('Selected statename Object:', selectedstate);

//   if (selectedstate) {
//     this.stateid = selectedstate.stateid;
//     this.statename = selectedstate.statename;

//     // Update form value explicitly if needed
//     // this.AnnualTurnoverForm.patchValue({
//     //   AccYrSetId: selectedYear.accyrsetid
//     // });
//   }
// }

// onFileSelectedanuGSTCertificate(event: any) {
//   debugger;
//   const file = event.target.files[0];
//   if (file) {
//     if (file.type !== 'application/pdf') {
//       alert('Please upload PDF files only.');
//       event.target.value = ''; // reset file
//       this.GSTCertificate = null;
//       return;
//     }

//     if (file.size > 100 * 1024 * 1024) { // 100MB limit
//       alert('File size should not exceed 100MB.');
//       event.target.value = '';
//       this.GSTCertificate = null;
//       return;
//     }

//     this.GSTCertificate = file;
//     console.log('Selected GST file:', file.name);
//   }
// }
  // File select
  // onFileSelectedanuGSTCertificate(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.GSTCertificate = file;
  //     // this.AnnualTurnoverForm.patchValue({
  //     //   TurnOverDocument: file
  //     // });
  //     // this.AnnualTurnoverForm.get('TurnOverDocument')?.updateValueAndValidity();
  //     console.log('Selected file:', file.name);
  //   }
  // }
  onFileSelectedanuGSTCertificate(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.GSTCertificate = file;
      console.log('Selected file :', file.name);
    }
  }
  // https://localhost:7053/api/Registration/InsertMASGSTRETURNFILES?mGSTID=468&mVergID=50&mACCYRSETID=546&mGSTQTRID=1&mSupplierID=1936
GstReturnDetails(){
  try{
    //  debugger;
      // this.spinner.show();
    this.api.GstReturnDetails(sessionStorage.getItem('facilityid'),sessionStorage.getItem('vregid'))
    // this.Service.get('GetDrugTenderList?n=0')
      .subscribe(
        (res:any) => {
          this.dispatchData3 = res.map(
            (item: GstReturnDetails, index: number) => ({
              ...item,
              sno: index + 1,
            })
          );
          console.log('GstReturnDetails=:', this.dispatchData3);
          this.dataSource3.data = this.dispatchData3;
          this.dataSource3.paginator = this.paginator3;
          this.dataSource3.sort = this.sort3;
          this.cdr.detectChanges();
          this.spinner.hide();
        },
        (error: { message: any; }) => {

          alert(`Error fetching data: ${JSON.stringify(error.message)}`);
        }
      );
      }
      catch(err:any){
        this.spinner.hide();

        console.log(err);
        // throw err;
      }
}

//#region Insert MAS GST RETURNFILES
//  "accyrsetid": 547,
//     "accyear": "2026-2027"
OnselectAccYearSettings(selectedaccyrsetid: any): void {
  // debugger;
  const selectedaccyrset = selectedaccyrsetid.accyrsetid || 0;

  console.log('✅ Selected selectedaccyrset:', selectedaccyrset);

  if (selectedaccyrset) {
    this.accyrsetid= selectedaccyrset;
    // this.gstno = selectedgstqtr.quartername;
  }

  // debugger;
  // const selectedaccyrsetid = (event.target as HTMLSelectElement).value;
  // const selectedaccyrset = this.AccYearSettings.find((y: { accyrsetid: string; }) => y.accyrsetid == selectedaccyrsetid);

  // console.log('Selected selectedgst Object:', selectedaccyrset);
  // // gstno

}
OnselectMASGSTQUARTER(selectedgstqtrid: any): void {
  // debugger;
  const selectedgstqtr = selectedgstqtrid.gstqtrid || 0;

  console.log('✅ Selected OnselectMASGSTQUARTER:', selectedgstqtr);

  if (selectedgstqtr) {
    this.gstqtrid = selectedgstqtr;
    // this.gstno = selectedgst.gstno;
  }

 
}
// Onselectgstno(event: Event): void {
//   debugger;
//   const selectedgstid = (event.target as HTMLSelectElement).value;
//   const selectedgst = this.dispatchData2.find((y: { gstid: any; }) => y.gstid == selectedgstid);

//   console.log('Selected selectedgst Object:', selectedgst);
//   // gstno
//   if (selectedgst) {
//     this.gstid= selectedgst.gstid;
//     // this.gstno = selectedgst.gstno;

//     // Update form value explicitly if needed
//     // this.AnnualTurnoverForm.patchValue({
//     //   AccYrSetId: selectedYear.accyrsetid
//     // });
//   }
// }
Onselectgstno(selectedgstid: any): void {
  // debugger;
  const selectedgst = selectedgstid.gstid || 0;

  console.log('✅ Selected GST Object:', selectedgst);

  if (selectedgst) {
    this.gstid = selectedgst;
    // this.gstno = selectedgst.gstno;
  }
}
GETAccYearSettings(){
  this.api.GETAccYearSettings().subscribe({
    next: (res: any) => {
     this.AccYearSettings=res;
     console.log("AccYearSettings:", this.AccYearSettings);
    },
    error: (err: any) => {
      console.error("Error loading Years:", err);
      // alert("Failed to load vendor details");
    }
  });
}
GETMASGSTQUARTER(){
  this.api.MASGSTQUARTER().subscribe({
    next: (res: any) => {
     this.MASGSTQUARTER=res;
     console.log("AccYearSettings:", this.MASGSTQUARTER);
    },
    error: (err: any) => {
      console.error("Error loading Years:", err);
      // alert("Failed to load vendor details");
    }
  });
}
onFileSelectedGSTReturn(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.GSTreturnCertificate = file;
    console.log('Selected file :', file.name);
  }
}
InsertMASGSTRETURNFILES(GSTRETURNForm: NgForm) {
  const formData = new FormData();
     if (GSTRETURNForm.invalid) {
    this.toastr.error('Please fill all required fields.', 'Error');
    return;
  }
      if (this.GSTreturnCertificate) {
        formData.append('PanCardDocument', this.GSTreturnCertificate);
      } else {
        console.error('❌ No GST certificate file selected!');
        return;
      }
    
      const data = {
        mGSTID:  this.gstid ,
        mVergID: sessionStorage.getItem('vregid') || '',
        mACCYRSETID: this.accyrsetid,
        mGSTQTRID: this.gstqtrid,
        mSupplierID: sessionStorage.getItem('facilityid') || ''


        // mVergID: sessionStorage.getItem('vregid') || '',
        // msupplierid: sessionStorage.getItem('facilityid') || '',
        // mstateID: this.stateid?.toString() || '',
        // gstno: this.gstno,
      };
    try {
      this.api.InsertMASGSTRETURNFILES(data, formData).subscribe
      ({
            next: (res: any) => {
              this.toastr.success(res.message || 'GST Return Certificate uploaded successfully!', 'Success');
              GSTRETURNForm.resetForm();
              this.GSTreturnCertificate = null;
            },
            error: (err: any) => {
              console.error('Error:', err);
              this.toastr.error('Failed to upload GST Return certificate', 'Error');
            },
          }); 
    } catch (error) {
      console.error('Exception:', error);
      this.toastr.error('Unexpected error occurred!');
    }
}

//#endregion



}
  // openmarqModal(pdfUrl: string): void {
  //   // const modal = new bootstrap.Modal(document.getElementById('marqModal'));
  //   // modal.show();
  //   // Remove '~' from the start of the URL
  //   //  const cleanedUrl = 'https://cgmsc.gov.in/Upload/Tender%20Document%20-243(R)202507000001.pdf';
  //   //  // console.log('Opening:', cleanedUrl);
  //   //  window.open(cleanedUrl);
  //   // window.open(cleanedUrl, '_blank');

  //   this.sanitizedPdfUrl =
  //     this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);

  //   const modalElement = document.getElementById('pdfModal');
  //   const modal = new bootstrap.Modal(modalElement!);
  //   modal.show();
  // }
  // openmarqModal(pdfUrl: string): void {
  //   this.sanitizedPdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);
  //   const modalElement = document.getElementById('pdfModal');
  //   const modal = new bootstrap.Modal(modalElement!);
  //   modal.show();
  // }
// Onselectyear(event: any): void {
//   // console.log('Selected Value:', this.accyear); // 👉 this gives accyrsetid directly
// debugger;
//   const selectedYear = this.Years.find((y: { accyrsetid: any; }) => y.accyrsetid === this.accyear);
//   console.log('Selected Year Object:', selectedYear);

//   if (selectedYear) {
//     console.log('accyrsetid:', selectedYear.accyrsetid);
//     console.log('accyear:', selectedYear.accyear);

//     // example: assign accyrsetid to variable if needed
//     this.accyrsetid = selectedYear.accyrsetid;
//   } else {
//     alert('Selected year not found in the list.');
//   }
// }
// Onselectyear(event: any): void {
//   // console.log('Selected value from ng-select:', event); 

//   const selectedYear = this.Years.find((y: { accyrsetid: any }) => y.accyrsetid === event);
//   // console.log('Selected Year Object:', selectedYear);

//   if (selectedYear) {
//     console.log('accyrsetid:', selectedYear.accyrsetid);
//     console.log('accyear:', selectedYear.accyear);

//     // If you need to store these:
//     this.accyrsetid = selectedYear.accyrsetid;
//     this.accyear = selectedYear.accyear;

//     // Update form control (optional, since formControlName already bound)
//     this.AnnualTurnoverForm.patchValue({
//       AccYrSetId: selectedYear.accyrsetid
//     });
//   } else {
//     alert('Selected year not found in the list.');
//   }
// }
  // OnSubmit() {
  //   try {
     
  //     this.submitted = true;
  //     this.UpdateAnnualTurnoverdata = this.AnnualTurnoverForm.value;
  //     // this.UpdateAnnualTurnoverdata.mobileNumber = this.FeedbackData.mobileNumber.toString();
     
  //     if (this.AnnualTurnoverForm.valid) {
  //       const formdata = this.UpdateAnnualTurnoverdata; 
  
  //       this.api.post('/Registration/UpdateAnnualTurnover', formdata).subscribe(
  //         (res: any) => {
  //           this.toastr.success(res.message, 'Success', {
  //              positionClass: 'toast-center'
              
  //           });
  //           this.AnnualTurnoverForm.reset();
  //           this.AnnualTurnoverForm.markAsPristine();
  //           this.AnnualTurnoverForm.markAsUntouched();
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
  // onFileSelecteA(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.selectedAnuvFile = file;
     
  //     console.log('Selected  bank details file:', file.name);
  //   }
  // }
  // OnSubmmit() {
  //   try {
  //     debugger;
  //   this.submitted = true;
  //   console.log('Form Value:', this.AnnualTurnoverForm.value);
  //   console.log('Form Valid:', this.AnnualTurnoverForm.valid);
  //   console.log('Form Errors:', this.AnnualTurnoverForm.errors);
    
  //   if (this.AnnualTurnoverForm.invalid) {
  //     this.toastr.error('Please fill all required fields!', 'Error');
  //     return;
  //   }

  //   const formValues = this.AnnualTurnoverForm.value;
  //   const formData = new FormData();

  //   // Append all normal fields
  //   formData.append('Atid', '0');
  //   formData.append('VregId', sessionStorage.getItem('vregid') || '');
  //   formData.append('SupplierId', sessionStorage.getItem('facilityid') || '');
  //   formData.append('AccYrSetId', formValues.AccYrSetId);
  //   formData.append('TurnOverAmt', formValues.TurnOverAmt);
  //   formData.append('UDINNO', formValues.UDINNO);

  //   // Append file
  //   if (this.selectedAnuvFile) {
  //     formData.append('TurnOverDocument', this.selectedAnuvFile, this.selectedAnuvFile.name);
  //   }

 
  //   this.api.post('/Registration/UpdateAnnualTurnover', formData).subscribe({
  //     next: (res: any) => {
  //       alert('Annual Turnover Submitted successfully!');
  //       this.toastr.success(res.message || 'Submitted successfully!', 'Success');
  //       this.AnnualTurnoverForm.reset();
  //       this.selectedAnuvFile = null;
  //       this.submitted = false;
  //     },
  //     error: (err: HttpErrorResponse) => {
  //       console.error('Error:', err.error);
  //       this.toastr.error('Something went wrong, please try again!', 'Error');
  //     }
  //   });
  // } catch (err: any) {
  //   console.log('error:=', err.message);
  //   // throw err;
  // }
  // }
  
  // get formControl() {
  //   return this.AnnualTurnoverForm.controls;
  // }
  // https://dpdmis.in/VREGAPI/api/Registration/UpdateAnnualTurnover

  // onFileSelectedanudocument(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.selectedAnuvFile = file;
  //     console.log('Selected file:', file.name);
  //   }
  // }
  // onFileSelectedanudocument(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.selectedAnuvFile = file;
  
  //     // File name या object को reactive form control में set करना
  //     this.AnnualTurnoverForm.patchValue({
  //       TurnOverDocument: file
  //     });
  
  //     // Angular को बताना कि value change हुई है
  //     this.AnnualTurnoverForm.get('TurnOverDocument')?.updateValueAndValidity();
  
  //     console.log('Selected file:', file.name);
  //   }
  // }
  // onFileSelectedanudocument(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.selectedAnuvFile = file;
  //     this.AnnualTurnoverForm.patchValue({
  //       TurnOverDocument: file
  //     });
  
  //     this.AnnualTurnoverForm.get('TurnOverDocument')?.updateValueAndValidity();
  
  //     console.log('Selected file:', file.name);
  //   }
  // }
  
  // OnSubmmit() {
  //   this.submitted = true;
  //   debugger;
  //     console.log('Form Value:', this.AnnualTurnoverForm.value);
  //     console.log('Form Valid:', this.AnnualTurnoverForm.valid);
  //     console.log('Form Errors:', this.AnnualTurnoverForm.errors);
  //   if (this.AnnualTurnoverForm.invalid) {
  //     this.toastr.error('Please fill all required fields!', 'Error');
  //     return;
  //   }
  
  //   const formData = new FormData();
  //   formData.append('AccYrSetId', this.AnnualTurnoverForm.value.AccYrSetId);
  //   formData.append('TurnOverAmt', this.AnnualTurnoverForm.value.TurnOverAmt);
  //   formData.append('UDINNO', this.AnnualTurnoverForm.value.UDINNO);
  //   formData.append('Atid', '0');
  //   formData.append('VregId', sessionStorage.getItem('vregid') || '');
  //   formData.append('SupplierId', sessionStorage.getItem('facilityid') || '');
  
  //   if (this.selectedAnuvFile) {
  //     formData.append('TurnOverDocument', this.selectedAnuvFile, this.selectedAnuvFile.name);
  //   }
  // return;
  //   this.api.post('/Registration/UpdateAnnualTurnover', formData).subscribe(
  //     (res: any) => {
  //       this.toastr.success(res.message, 'Success');
  //       this.AnnualTurnoverForm.reset();
  //       this.submitted = false;
  //     },
  //     (err) => {
  //       this.toastr.error('Submission failed', 'Error');
  //       console.error(err);
  //     }
  //   );
  // }

// hsraaeuhyriqa



  // ng-select change event
  // Onselectyear(event: any): void {
  //   // console.log('Selected Year:', event);
    
  // const selectedYear = this.Years.find((y: { accyrsetid: any; }) => y.accyrsetid === this.accyear);
  // // console.log('Selected Year Object:', selectedYear);

  // if (selectedYear) {
  //   this.AnnualTurnoverForm.patchValue({
  //     // AccYrSetId: event
  //     AccYrSetId: selectedYear.accyrsetid
  //   });
  //   console.log('accyrsetid:', selectedYear.accyrsetid);
  //   console.log('accyear:', selectedYear.accyear);

  //   // example: assign accyrsetid to variable if needed
  //   // this.accyrsetid = selectedYear.accyrsetid;
  // } else {
  //   alert('Selected year not found in the list.');
  // }
   
  // }