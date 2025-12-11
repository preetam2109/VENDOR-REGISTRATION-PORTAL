import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component ,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { SupplierBankAccDetail_model, vendorBankDetail_model,UpdateBankDetails_model, UpdateAnnualTurnover_model, GetAnnualTurnoverDetail, BankMandateDetail, MassuppliergstDetails, GstReturnDetails } from 'src/app/Model/VendorRegisDetail';
import { ApiService } from 'src/app/service/api.service';
import { CollapseModule } from 'src/app/collapse';
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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-financeial-details',
  standalone: true,
  imports: [NgSelectModule,CommonModule,FormsModule,CollapseModule,NgbCollapseModule,ReactiveFormsModule,MatTabsModule,
    MaterialModule,MatSortModule, MatPaginatorModule,MatTableModule,MatDialogModule,MatSelectModule, MatOptionModule,MatProgressSpinnerModule,
      MatTableExporterModule
  ],
  templateUrl: './financeial-details.html',
  styleUrl: './financeial-details.css'
})
export class FinanceialDetails {
  vregid:any
  existingIFSC = "";
  isCheckingIFSC = false;
  onshowPP = false;
supplierid: number = 0;
bankaccountid: number = 0;
accountname: string | undefined;
accountno: string | undefined;
bankname: string| undefined;
branch: string| undefined;
ifsccode: string | undefined;
  @ViewChild('bankForm') bankForm!: NgForm;
  isCollapsed = false;
  isCollapsed1 = true;
  isCollapsed2 = true;
  isCollapsed3 = true;
  isEventOpen = false;
  VendorBankDetail: any[] = [];
  SupplierBankAccDetail:any = {};
  UpdateBankDetailsdata: UpdateBankDetails_model = new UpdateBankDetails_model();
  UpdateAnnualTurnoverdata: UpdateAnnualTurnover_model = new UpdateAnnualTurnover_model();
  selectedFile: File | null = null;
  selectedAnuvFile: File | null = null;
  GSTCertificate: File | null = null;
  GSTreturnCertificate: File | null = null;
  quartername:any;
  statename: any=null;
  gstid:any;
  stateid: any;
  gstqtrid:any;
gstno: string = '';
gstFileModel: any; 
  Years:any;
  States:any;
  selectedAccYear:any;
  selectedQuarter:any;
  // acno = null;
  acnoo=null;
  acno: any = null;
  
  accyrsetid: any = null;
  accyear: any = null;
  isNewBank: boolean = false;
  AnnualTurnoverForm!: FormGroup;
  submitted = false;
  onshowFINANCIAL = false;
  onshowAT = false;
  onshowGST = false;
  onshowGSTR = false;
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
    'sno','accyear','turnoveramt','udinno','filename'
    //  ,'action','delete'
  ];
  displayedColumns2: string[] = [
    'sno','statename','gstno','filename'
    // ,'action','delete'
  ];
  displayedColumns3: string[] = [
    'sno','gstno','accyear','filename'
    // ,'action','delete'
  ];
  dispatchData1: BankMandateDetail[] = [];
  displayedColumns1: string[] = [
    'sno','accountname','accountno','bankname','branch','ifsccode','filename'
    // ,'action','delete'
    // 'defaultacc',
  ];
  AccYearSettings: any;
  MASGSTQUARTER: any;
  loadingSectionA = false;
  loadingSectionB = false;
  loadingSectionC = false;
  loadingSectionD = false;
  dropdownOpen = false;
  ifsccodeDetails:any;
  statusText:any;
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
  this.existingIFSC = this.SupplierBankAccDetail.ifsccode;
  this.GetVendorDetailsID(sessionStorage.getItem('facilityid'));
  this.loadVendorBankDetail();
  this.GETAnnualYear();
  this.GETStates();
  this.GetAnnualTurnover();
  this.GETBankMandateDetail();
  this.GETMassuppliergstDetails();
  this.GstReturnDetails();
  this.GETMASGSTQUARTER();
  this.GETAccYearSettings();

 
//   const css = `
//   .ng-dropdown-panel { background:#fff !important; color:#000 !important; z-index:2147483647 !important; box-shadow:0 7px 18px rgba(0,0,0,0.12) !important; }
//   .ng-dropdown-panel .ng-option { background:#fff !important; color:#000 !important; }
//   .ng-dropdown-panel .ng-option:hover { background:#e6f7ff !important; }
// `;
// const styleEl = document.createElement('style');
// styleEl.id = 'ngselect-global-fix';
// styleEl.innerHTML = css;
// document.head.appendChild(styleEl);

}


onIFSCChange() {
  // 
  const ifsc = this.SupplierBankAccDetail.ifsccode;

 
  // if (ifsc === this.existingIFSC) {
  //   this.validateIFSC(ifsc);
  //   // return;
  // }


  if (ifsc && ifsc.length === 11) {
    // this.GETIFSCCODE(ifsc);
    this.validateIFSC(ifsc);
  }
  // else{
  //   this.validateIFSC(ifsc);
  // }
  }

  validateIFSC(ifsc: string) {
    // this.isCheckingIFSC = true;
  
    this.api.GETIFSCCODE(ifsc).subscribe({
      next: (res: any) => {
        this.isCheckingIFSC = true;
        this.onshowPP = true;
        this.ifsccodeDetails=res;
        this.statusText = "";
        // console.log("ifsccode:", this.ifsccodeDetails);
        // if (res) {
        //   this.toastr.success('Valid IFSC Code!', 'Success');
        // } else {
        //   this.toastr.error('Invalid IFSC Code!', 'Error');
        // }
      },
      error: (err:any) => {
        // this.statusText= err.statusText;
        this.statusText = "Invalid IFSC Code";
        this.isCheckingIFSC = false;
        this.onshowPP = false;
        // this.toastr.error('Unable to verify IFSC Code!', 'Error');
      }
    });
  }
  

GetVendorDetailsID(supplierId: any) {
  this.api.getVendorDetailsID(supplierId).subscribe({
    next: (res: any) => {
      if (Array.isArray(res) && res.length > 0) {
        this.vregid=res[0].vregid;
        console.log('Vendor vregid:', this.vregid);
        sessionStorage.setItem('vregid',this.vregid)
      
      } else {
        console.warn('No vendor details found.');
        alert('⚠️ Please generate vendor registration number.');
        this.router.navigate(['generate-registration']);

      }
    },
    error: (err) => {
      console.error('Error fetching vendor details:', err);
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
    if (this.selectedTabIndex === 0) {
      // this.GETBankMandateDetail();
      this.dataSource1.paginator = this.paginator1;
      this.dataSource1.sort = this.sort1;
    } 
    if (this.selectedTabIndex === 1) {
        // this.GetAnnualTurnover();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } 
    if (this.selectedTabIndex === 2) {
      this.dataSource2.paginator = this.paginator2;
      this.dataSource2.sort = this.sort2;
      //   this.GETMassuppliergstDetails();
    } 
    if (this.selectedTabIndex === 3) {
      this.dataSource3.paginator = this.paginator3;
      this.dataSource3.sort = this.sort3;
      // this.GstReturnDetails();
    } 
    //  else {
    // }
  }

  

onFileSelectedanudocument(event: any) {
  const file = event.target.files[0];
  this.fileError = '';

  if (file) {
    const fileName = file.name.toLowerCase();
    const fileSize = file.size; // in bytes

 
    if (!fileName.endsWith('.pdf')) {
      this.fileError = 'Only PDF files are allowed!';
      this.AnnualTurnoverForm.get('TurnOverDocument')?.setErrors({ invalidType: true });
      this.AnnualTurnoverForm.patchValue({ TurnOverDocument: null });
      return;
    }

   
    if (fileSize > 104857600) {
      this.fileError = 'File size must be less than 100 MB!';
      this.AnnualTurnoverForm.get('TurnOverDocument')?.setErrors({ fileTooLarge: true });
      this.AnnualTurnoverForm.patchValue({ TurnOverDocument: null });
      return;
    }

 
    this.selectedAnuvFile = file;
    this.AnnualTurnoverForm.patchValue({
      TurnOverDocument: file
    });
    this.AnnualTurnoverForm.get('TurnOverDocument')?.updateValueAndValidity();

    console.log('Selected file:', file.name, 'Size:', (fileSize / (1024 * 1024)).toFixed(2), 'MB');
  }
}


  
 




 
  //#region BankMandateDetail
  //https://dpdmis.in/VREGAPI/api/Registration/UpdateBankDetails
  // https://dpdmis.in/VREGAPI/api/Registration/SupplierBankAccDetail?supID=1836&bankAccId=1139
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
        // alert("Failed to load vendor details");
      }
    });
  }

GETSupplierBankAccDetail(sid:any,acno:any) {
  this.api.SupplierBankAccDetail(sessionStorage.getItem('facilityid'),acno).subscribe({
    next: (res: any) => {
      if (res && res.length > 0) {
        this.SupplierBankAccDetail = res[0];
      }
    },
    error: (err: any) => {
      console.error("Error loading vendor details:", err);
    }
  });
}
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
     
    }
  }
  
  onselectacno(event: any): void {
 
   const bankaccountid= event.bankaccountid
    this.acno=bankaccountid;
    if (bankaccountid === 0) {
    //  this.GETSupplierBankAccDetail(0,bankaccountid);
    // this.GETSupplierBankAccDetail(1836,1139); 
    this.isNewBank = true;
    this.SupplierBankAccDetail = {}; 
    // this.bankForm.resetForm();
     
    } else {
      this.GETSupplierBankAccDetail(0,bankaccountid);
      // this.GETSupplierBankAccDetail(1836,1139);
      this.isNewBank = true;
      // const selectedUser = this.VendorBankDetail.find(
      //   (user: { bankaccountid: any }) => user.bankaccountid === this.acno
      // );
      // console.log('selectedUser:', selectedUser);
    }
  }

  onSubmit(bankForm: NgForm) {

        this.loadingSectionA = true;
        const bankaccountID = this.dispatchData1
       .find((f: any) => f.bankaccountid == this.acno)?.bankaccountid;

        if (bankaccountID) {
         this.toastr.error('Bank AC No already exist.', 'Error');
         this.loadingSectionA = false;
         return;
          }

   
    // const ifsc = this.SupplierBankAccDetail.ifsccode;
    if (this.statusText=="Invalid IFSC Code") {
      this.toastr.error('Please fill valid IFSC Code.', 'Error');
      this.loadingSectionA = false;
      return;
    }
    if (bankForm.invalid) {
      this.toastr.error('Please fill all required fields.', 'Error');
      this.loadingSectionA = false;
      return;
    }
    const formData = new FormData();
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
    console.log()
  // return;
    this.api.post('/Registration/UpdateBankDetails',formData).subscribe({
      next: (res: any) => {
        this.toastr.success(res.message, 'Success');
        bankForm.resetForm();
        this.selectedFile = null;
        this.SupplierBankAccDetail = {};  // clear data
        // bankForm.resetForm();
        this.GETBankMandateDetail();
        this.loadingSectionA = false;
       this.onshowFINANCIAL=false;
      },
      error: (err: any) => {
        console.error('Error updating bank details:', err);
        this.loadingSectionA = false;
        // alert('Failed to update bank details');
      }
    });
  }
 GETBankMandateDetail(){
    try{
      this.spinner.show();
    this.api.Massupplieraccnos(sessionStorage.getItem('facilityid'),sessionStorage.getItem('vregid'))
      .subscribe(
        (res:any) => {
          this.dispatchData1 = res.map(
            (item: BankMandateDetail, index: number) => ({
              ...item,
              sno: index + 1,
            })
          );
          // console.log('BankMandateDetail=:', this.dispatchData1);
          this.dataSource1.data = this.dispatchData1;
          this.dataSource1.paginator = this.paginator1;
          this.dataSource1.sort = this.sort1;
          this.cdr.detectChanges();
          this.spinner.hide();
        },
        (error: { message: any; }) => {
          this.spinner.hide();
          console.log('Error fetching data:',JSON.stringify(error.message))
          // alert(`Error fetching data: ${JSON.stringify(error.message)}`);
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
  onshowButtonClick(val:any){
    //  this.isCollapsed = true;
      // isCollapsed1 = true;
      if(val==0){
        this.onshowFINANCIAL = true;
        this.isCollapsed = false;
  
      }
  
    }
//#endregion
  
//#region GetAnnualTurnover
Onselectyear(event: Event): void {
  // ;
  const selectedId = (event.target as HTMLSelectElement).value;
  const selectedYear = this.Years.find((y: { accyrsetid: string; }) => y.accyrsetid == selectedId);

  // console.log('Selected Year Object:', selectedYear);

  if (selectedYear) {
    this.accyrsetid = selectedYear.accyrsetid;
    this.accyear = selectedYear.accyear;

    // Update form value explicitly if needed
    // this.AnnualTurnoverForm.patchValue({
    //   AccYrSetId: selectedYear.accyrsetid
    // });
  }
}
get f() {
  return this.AnnualTurnoverForm.controls;
}
 GetAnnualTurnover(){
  try{

    this.spinner.show();
  this.api.GetAnnualTurnover(sessionStorage.getItem('vregid'))
 
    .subscribe(
      (res:any) => {
        this.dispatchData = res.map(
          (item: GetAnnualTurnoverDetail, index: number) => ({
            ...item,
            sno: index + 1,
          })
        );
        // console.log('GetAnnualTurnoverDetail=:', this.dispatchData);
        this.dataSource.data = this.dispatchData;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.cdr.detectChanges();
        this.spinner.hide();
      },
      (error: { message: any; }) => {
        this.spinner.hide();
        console.log('Error fetching data:',JSON.stringify(error.message))
        // alert(`Error fetching data: ${JSON.stringify(error.message)}`);
      }
    );
    }
    catch(err:any){
      this.spinner.hide();

      console.log(err);
      // throw err;
    }
}

 OnSubmmit(): void {
  this.loadingSectionB = true;
  this.submitted = true;

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
      this.GetAnnualTurnover();
     this.loadingSectionB = false;
      this.onshowAT=false;
    },
    (err) => {
      this.toastr.error('Submission failed', 'Error');
      this.loadingSectionB = false;
      console.error(err);
    }
  );
}
applyTextFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
exportToPDF(){

}

onButtonClickAT(){
  this.onshowAT = true;

 }

//#endregion

//#region GST
GETMassuppliergstDetails(){
  try{
      // this.spinner.show();
    this.api.MassuppliergstDetails(sessionStorage.getItem('facilityid'),sessionStorage.getItem('vregid'))
  
      .subscribe(
        (res:any) => {
          this.dispatchData2 = res.map(
            (item: MassuppliergstDetails, index: number) => ({
              ...item,
              sno: index + 1,
            })
          );
          // console.log('MassuppliergstDetails=:', this.dispatchData2);
          this.dataSource2.data = this.dispatchData2;
          this.dataSource2.paginator = this.paginator2;
          this.dataSource2.sort = this.sort2;
          this.cdr.detectChanges();
          this.spinner.hide();
        },
        (error: { message: any; }) => {
        console.log('Error fetching data:',JSON.stringify(error.message))
          // alert(`Error fetching data: ${JSON.stringify(error.message)}`);
        }
      );
      }
      catch(err:any){
        this.spinner.hide();

        console.log(err);
        // throw err;
      }
}
onButtonClickGST(){
 this.onshowGST= true;
}
InsertGSTCertificate(GSTForm: NgForm) {
  this.loadingSectionC = true;
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
              this.GETMassuppliergstDetails();
              this.loadingSectionC = false;

              this.onshowGST=false;
            },
            error: (err: any) => {
              console.error('Error:', err);
              this.loadingSectionC = false;

              this.toastr.error('Failed to upload GST certificate', 'Error');
            },
          }); 
    } catch (error) {
      console.error('Exception:', error);
      this.toastr.error('Unexpected error occurred!');
    }
  }
  onFileSelectedanuGSTCertificate(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.GSTCertificate = file;
      // console.log('Selected file :', file.name);
    }
  }
  OnselectStates(event: any) {
    // console.log('Selected state:', event);
    this.stateid = event?.stateid;
  }

  
  DownloadFileWithName(mFilePath: string, mFileName: string) {
    
    const encodedPath = encodeURIComponent(mFilePath);
    const encodedName = encodeURIComponent(mFileName);
    const apiUrl = `/Registration/DownloadFileWithName?mFilePath=${encodedPath}&mFileName=${encodedName}`;
    this.api.DownloadFileWithName(apiUrl).subscribe({
      next: (res: Blob) => {
        const pdfURL = URL.createObjectURL(res);
        window.open(pdfURL, "_blank");
        // const blob = new Blob([res], { type: 'application/pdf' });
        // const url = window.URL.createObjectURL(blob);
        // this.openmarqModal(url);
        // Create a temporary link element for download
        // const a = document.createElement('a');
        // a.href = url;
        // a.download = mFileName;
        // a.click();
  
        // // Clean up URL object after use
        // window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        if (err.status === 0 && err.statusText === 'Unknown Error') {
       
          this.toastr.error('File missing or network error. Please try again later.', 'Download Failed');
        } else if (err.status === 404) {
          this.toastr.warning('Requested file not found on the server.', 'File Not Found');
        } else {
          this.toastr.error('Something went wrong while downloading the file.', 'Error');
        }
        console.error('Download error:', err);
      }
    });
  }
//#endregion 
//#region Insert MAS GST RETURNFILES
//  "accyrsetid": 547,
//     "accyear": "2026-2027"
OnselectAccYearSettings(selectedaccyrsetid: any): void {
  const selectedaccyrset = selectedaccyrsetid.accyrsetid || 0;
  if (selectedaccyrset) {
    this.accyrsetid= selectedaccyrset;
    // this.gstno = selectedgstqtr.quartername;
  }

}
OnselectMASGSTQUARTER(selectedgstqtrid: any): void {
  const selectedgstqtr = selectedgstqtrid.gstqtrid || 0;
  if (selectedgstqtr) {
    this.gstqtrid = selectedgstqtr;
    // this.gstno = selectedgst.gstno;
  }

 
}
Onselectgstno(selectedgstid: any): void {
  const selectedgst = selectedgstid.gstid || 0;
  if (selectedgst) {
    this.gstid = selectedgst;
    // this.gstno = selectedgst.gstno;
  }
}
GETAccYearSettings(){
  this.api.GETAccYearSettings().subscribe({
    next: (res: any) => {
     this.AccYearSettings=res;
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
    //  console.log("AccYearSettings:", this.MASGSTQUARTER);
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
    // console.log('Selected file :', file.name);
  }
}
InsertMASGSTRETURNFILES(GSTRETURNForm: NgForm) {
  this.loadingSectionD = true;

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
      };
    try {
      this.api.InsertMASGSTRETURNFILES(data, formData).subscribe
      ({
            next: (res: any) => {
              this.toastr.success(res.message || 'GST Return Certificate uploaded successfully!', 'Success');
              this.GstReturnDetails();
              GSTRETURNForm.resetForm();
              this.GSTreturnCertificate = null;
             this.loadingSectionD = false;

              this.onshowGSTR=false;
            },
            error: (err: any) => {
              console.error('Error:', err);
  this.loadingSectionD = false;
              
              this.toastr.error('Failed to upload GST Return certificate', 'Error');
            },
          }); 
    } catch (error) {
      console.error('Exception:', error);
      this.toastr.error('Unexpected error occurred!');
    }
}
 // https://localhost:7053/api/Registration/InsertMASGSTRETURNFILES?mGSTID=468&mVergID=50&mACCYRSETID=546&mGSTQTRID=1&mSupplierID=1936
GstReturnDetails(){
  try{
      // this.spinner.show();
    this.api.GstReturnDetails(sessionStorage.getItem('facilityid'),sessionStorage.getItem('vregid'))
      .subscribe(
        (res:any) => {
          this.dispatchData3 = res.map(
            (item: GstReturnDetails, index: number) => ({
              ...item,
              sno: index + 1,
            })
          );
          // console.log('GstReturnDetails=:', this.dispatchData3);
          this.dataSource3.data = this.dispatchData3;
          this.dataSource3.paginator = this.paginator3;
          this.dataSource3.sort = this.sort3;
          this.cdr.detectChanges();
          this.spinner.hide();
        },
        (error: { message: any; }) => {
          console.log('Error fetching data:',JSON.stringify(error.message))
          // alert(`Error fetching data: ${JSON.stringify(error.message)}`);
        }
      );
      }
      catch(err:any){
        this.spinner.hide();

        console.log(err);
        // throw err;
      }
}
onButtonClickGSTR(){
  this.onshowGSTR = true;
}
//#endregion

onButtonClick(attachment_Id:any){
  // console.log(attachment_Id);
  // this.router.navigate(['/AttachmentList']);
  // this.router.navigate(['/AttachmentList'], { 
  //   queryParams: {Id: attachment_Id, name: 'Drug-Technical' } 
  // });

}

}