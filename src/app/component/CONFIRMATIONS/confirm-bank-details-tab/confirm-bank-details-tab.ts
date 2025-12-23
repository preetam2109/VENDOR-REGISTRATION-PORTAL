import { CommonModule, DatePipe } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CollapseModule } from 'src/app/collapse';
import { ChangeDetectorRef, Component ,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { ComplienceCertificateDetails,GetGCPDetails,UpdateBankDetails_model, UpdateAnnualTurnover_model,
  TechnicalDetails_model, GetAnnualTurnoverDetail, BankMandateDetail, MassuppliergstDetails, GstReturnDetails
 } from 'src/app/Model/VendorRegisDetail';
import { ApiService } from 'src/app/service/api.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MaterialModule } from 'src/app/material-module';
import { Router } from '@angular/router';
declare var bootstrap: any;
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';  
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-confirm-bank-details-tab',
  standalone: true,
  imports: [NgSelectModule,CommonModule,FormsModule,CollapseModule,NgbCollapseModule,ReactiveFormsModule,MatTabsModule,
     MaterialModule,MatSortModule, MatPaginatorModule,MatTableModule,MatDialogModule,MatSelectModule, MatOptionModule,MatProgressSpinnerModule,
       MatTableExporterModule
   ],
  
  templateUrl: './confirm-bank-details-tab.html',
  styleUrl: './confirm-bank-details-tab.css'
})
export class ConfirmBankDetailsTab {
  loadingSectionA:boolean=false;
  Remark:any;
  sanitizedPdfUrl!: SafeResourceUrl;
  activeSection: string = 'A';
  isCollapsed = false;
  selectedTabIndex: number = 0;
  isCollapsed_TECHNICAL_DETAILS = true;
  isCollapsed_COMPLIANCE_DETAILS = true;
  isCollapsed_GLOBAL_COMPANY_PREFIX = true;
  dispatchData1: BankMandateDetail[] = [];
  dispatchData: GetAnnualTurnoverDetail[] = [];
  dispatchData2: MassuppliergstDetails[] = [];
  dispatchData3: GstReturnDetails[] = [];
  dispatchData4: TechnicalDetails_model[] = [];
  dispatchData5: ComplienceCertificateDetails[] = [];
  dispatchData6: GetGCPDetails[] = [];

  dataSource!: MatTableDataSource<GetAnnualTurnoverDetail>;
  dataSource1!: MatTableDataSource<BankMandateDetail>;
  dataSource2!: MatTableDataSource<MassuppliergstDetails>;
  dataSource3!: MatTableDataSource<GstReturnDetails>;
  dataSource4!: MatTableDataSource<TechnicalDetails_model>;
  dataSource5!: MatTableDataSource<ComplienceCertificateDetails>;
  dataSource6!: MatTableDataSource<GetGCPDetails>;

   @ViewChild('paginator') paginator!: MatPaginator;
    @ViewChild('sort') sort!: MatSort;
    @ViewChild('paginator1') paginator1!: MatPaginator;
    @ViewChild('sort1') sort1!: MatSort;
    @ViewChild('paginator2') paginator2!: MatPaginator;
    @ViewChild('sort2') sort2!: MatSort;
    @ViewChild('paginator3') paginator3!: MatPaginator;
    @ViewChild('sort3') sort3!: MatSort;
    @ViewChild('paginator4') paginator4!: MatPaginator;
    @ViewChild('sort4') sort4!: MatSort;
    @ViewChild('paginator5') paginator5!: MatPaginator;
    @ViewChild('sort5') sort5!: MatSort;
    @ViewChild('paginator6') paginator6!: MatPaginator;
    @ViewChild('sort6') sort6!: MatSort;
          
    displayedColumns1: string[] = [

      'sno','accountname','accountno','bankname','branch','ifsccode','filename','isapprove','approvedt','approvereason'

      // 'defaultacc',
    ];
    displayedColumns: string[] = [
      'sno','accyear','turnoveramt','udinno','filename','isapprove','approvedt','approvereason'
      // ,'action'
    ];
    displayedColumns2: string[] = [
      'sno','statename','gstno','filename','isapprove','approvedt','approvereason'
      // ,'action'
    ];
    displayedColumns3: string[] = [
      'sno','gstno','accyear','filename','isapprove','approvedt','approvereason'
      // ,'action'
    ];
    displayedColumns4: string[] = [
      'sno','code','filename','ismfaccepted','mfaccrejremarks','ismfaccepteddt'
      // ,'action',
      // 'fileid','vregid','mscid', 'ext','filepath',
    ];
    displayedColumns5: string[] = [
       'sno','licno','unitname','whono',
       'comname',
       'issuedate',
       'startdate',
       'validitydate',
       'remarks',
       'whotype',
       'filename','iswhoaccepted','iswhoaccepteddt','whoaccrejremarks'
       // 'comid',
       // 'vregid',
       // 'supplierid',
      //  'whoid',
      //  'action',
       // 'ext',
       // 'licid',
     ];
     displayedColumns6: string[] = [
      'sno','gcpno','issuedate','startdate',
      'expdate','filename','isgcpaccepted','isgcpaccepteddt','gcpaccrejremarks'
   
      // 'action'
      // 'gcpid','vregid','entrydate'
      // sno:any;
      // : number
      // : number
      // gcpno: string
      // issuedate: string
      // startdate: any
      // expdate: string
      // filename: string
      // filepath: string
      // entrydate: string
     
    ];
   vregid:any;
   SupID:any;
  constructor(private spinner: NgxSpinnerService,private api: ApiService,public toastr: ToastrService, private fb: FormBuilder,
    private cdr: ChangeDetectorRef, private router: Router,  private sanitizer: DomSanitizer,private route: ActivatedRoute,private datePipe: DatePipe
  ){
     this.dataSource = new MatTableDataSource<GetAnnualTurnoverDetail>([]);
     this.dataSource1 = new MatTableDataSource<BankMandateDetail>([]);
     this.dataSource2 = new MatTableDataSource<MassuppliergstDetails>([]);
     this.dataSource3 = new MatTableDataSource<GstReturnDetails>([]);
     this.dataSource4 = new MatTableDataSource<TechnicalDetails_model>([]);
     this.dataSource5 = new MatTableDataSource<ComplienceCertificateDetails>([]);
     this.dataSource6 = new MatTableDataSource<GetGCPDetails>([]);
    
    }
  
    // formatDate(val: any) {
    //   return this.datePipe.transform(val, 'dd/MM/yyyy');
    // }
    formatDate(value: string): string {
      if (!value) return '-';

      // Format 2: 25-11-2025 15:16:42
      if (/^\d{2}-\d{2}-\d{4}/.test(value)) {
        const [datePart] = value.split(' ');
        const [day, month, year] = datePart.split('-');
  
        const d = new Date(`${year}-${month}-${day}`);
        return isNaN(d.getTime()) ? '-' : d.toLocaleDateString('en-GB');
      }
  
      // Format 1: 26-NOV-25 05.39.44.... AM
      try {
        const parts = value.split(' ');
        const [day, mon, year] = parts[0].split('-');
        const fullYear = '20' + year;
  
        const time = parts[1].replace(/\./g, ':');
        const ampm = parts[2];
  
        const d = new Date(`${day} ${mon} ${fullYear} ${time} ${ampm}`);
        return isNaN(d.getTime()) ? '-' : d.toLocaleDateString('en-GB');
      } catch {
        return '-';
      }
      // if (!dateString) return '-';
    
      // // 26-NOV-25 → 26-NOV-2025
      // const parts = dateString.split(' ');
      // let datePart = parts[0]; // 26-NOV-25
      // const timePart = parts[1]; // 05.39.44.839369000
      // const ampm = parts[2];     // AM
    
      // // Fix date year
      // const [day, mon, year] = datePart.split('-');
      // const fullYear = '20' + year;
      // const dateFormatted = `${day}-${mon}-${fullYear} ${timePart.replace(/\./g, ':')} ${ampm}`;
    
      // const d = new Date(dateFormatted);
      // return isNaN(d.getTime()) ? '-' : d.toLocaleDateString('en-GB'); // dd/MM/yyyy
  }
    
ngOnInit() {
  
    this.vregid= sessionStorage.getItem('vregid');
    this.SupID=  sessionStorage.getItem('facilityid');

    // console.log("VRegID:",  this.vregid);
    // console.log("SupID:",  this.SupID);

  this.GetAnnualTurnover();
  this.GETBankMandateDetail();
  this.GETMassuppliergstDetails();
  this.GstReturnDetails();
  this.GetTechnicalDetails();
  this.GetComplienceCertificateDetails();
  this.GetGCPDetails();

}


    //#region BankMandateDetail
    GETBankMandateDetail(){
      try{
        // 
        this.spinner.show();
      // this.api.Massupplieraccnos(sessionStorage.getItem('facilityid'),sessionStorage.getItem('vregid'))
      // this.vregid= params['vregid'];
      // this.SupID=  params['supid'];
      // this.api.Massupplieraccnos(1651,84)
      this.api.Massupplieraccnos(this.SupID,this.vregid)
   
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
//  PUT_UpdateBankMandate(data: any, formData: FormData): Observable<any> {
        // https://dpdmis.in/VREGAPI/api/Registration/UpdateApprovalStatus?ISAPPROVE=N&BANKACCOUNTID=659&USERID=111&APPROVEREASON=testing
        // PUT_UpdateBankMandate(element: any) {
        //   // 
         
        //   if (!element.ISAPPROVE || !element.APPROVEREASON?.trim()) {
        //     this.toastr.error('Please fill all required fields before Update.', 'Error');
        //     return;
        //   }
          
        //         const data = {
        //           USERID: sessionStorage.getItem('userid') || '',
        //           BANKACCOUNTID: element.bankaccountid.toString(),
        //           ISAPPROVE: element.ISAPPROVE,    // Y or N
        //           APPROVEREASON: element.APPROVEREASON      // row-wise remark
        //         };
              
        //         const formData = new FormData();
          
        //       // return;
        //         this.api.PUT_UpdateBankMandate(data, formData).subscribe({
        //           next: (res: any) => {
        //             this.toastr.success(res.message || 'Data Update successfully!','Success'
        //             );
        //             // this.toastr.success(res.message || 'Success', 'Success');
        //            this.GETBankMandateDetail();
        //           },
        //           error: (err: any) => {
        //             console.log('Error fetching data:',JSON.stringify(err.message))
        //             this.toastr.error('Failed!', 'Error');
        //           }
        //         });
        //       }
        PUT_UpdateBankMandate(element: any) {

          if (!element.ISAPPROVE || !element.APPROVEREASON?.trim()) {
            this.toastr.error('Please fill all required fields before Update.', 'Error');
            return;
          }
        
          const data = {
            USERID: sessionStorage.getItem('userid') || '',
            BANKACCOUNTID: element.bankaccountid.toString(),
            ISAPPROVE: element.ISAPPROVE,  
            APPROVEREASON: element.APPROVEREASON 
          };
        
          const formData = new FormData();
        
          // 👉 If ISAPPROVE = 'N', then show confirmation popup
          if (element.ISAPPROVE === 'N') {
            Swal.fire({
              title: "Are you sure?",
              text: "You are rejecting this bank mandate!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Yes, Reject",
              cancelButtonText: "No, Cancel"
            }).then((result) => {
        
              if (result.isConfirmed) {
                // YES clicked → Proceed update
                this.callUpdateAPI(data, formData);
              } 
              // else NO clicked → Do nothing
            });
        
            return;  // stop here
          }
        
          // If ISAPPROVE = 'Y', update directly
          this.callUpdateAPI(data, formData);
        }
        callUpdateAPI(data: any, formData: FormData) {
          this.api.PUT_UpdateBankMandate(data, formData).subscribe({
            next: (res: any) => {
              this.toastr.success(res.message || 'Data Updated Successfully!', 'Success');
              this.GETBankMandateDetail();
            },
            error: (err: any) => {
              console.log('Error:', err.message);
              this.toastr.error('Failed!', 'Error');
            }
          });
        }
        

    openmarqModal(pdfUrl: string): void {
     
      this.sanitizedPdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);
      document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
    
      const modalEl = document.getElementById('pdfModal')!;
      document.body.appendChild(modalEl);
      (modalEl as HTMLElement).style.zIndex = '99999';
    
      const modal = new bootstrap.Modal(modalEl, {
        backdrop: false, 
        keyboard: true,
        focus: true
      });
      modal.show();
      this.loadingSectionA=false;
    }
    DownloadFileWithName(mFilePath: string, mFileName: string) {
      // this.loadingSectionA=true;
  
      // Encode file path and file name to handle special characters (like spaces, \ etc.)
      const encodedPath = encodeURIComponent(mFilePath);
      const encodedName = encodeURIComponent(mFileName);
    
      // Build dynamic API URL
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
          // this.loadingSectionA=false;
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

     
//#region GetAnnualTurnover
 GetAnnualTurnover(){
  try{
    this.spinner.show();
  // this.api.GetAnnualTurnover(sessionStorage.getItem('vregid'))
  // this.api.GetAnnualTurnover(84)
  this.api.GetAnnualTurnover(this.vregid)
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

applyTextFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
// UpdateAnnualTurnoverApproval(element: any) {
//   // 
 
//           // https://dpdmis.in/VREGAPI/api/Registration/UpdateAnnualTurnoverApproval?ISAPPROVE=Y&ATID=44&USERID=111&APPROVEREASON=test
//   // if(element.Iaccept == undefined && element.Remark  == undefined){
//   //   this.toastr.error('Please Fill this Data before uploading.', 'Error');
//   //   return;
//   // }
//   if (!element.ATISAPPROVE || !element.ATAPPROVEREASON?.trim()) {
//     this.toastr.error('Please fill all required fields before Update.', 'Error');
//     return;
//   }
  
//         const data = {
//           USERID: sessionStorage.getItem('userid') || '',
//           ATID: element.atid.toString(),
//           ISAPPROVE: element.ATISAPPROVE,    // Y or N
//           APPROVEREASON: element.ATAPPROVEREASON      // row-wise remark
//         };
      
//         const formData = new FormData();
  
//       // return;
//         this.api.UpdateAnnualTurnoverApproval(data, formData).subscribe({
//           next: (res: any) => {
//             this.toastr.success(res.message || 'Data Update successfully!','Success'
//             );
//             // this.toastr.success(res.message || 'Success', 'Success');
//            this.GetAnnualTurnover();
//           },
//           error: (err: any) => {
//                 console.log('Error fetching data:',JSON.stringify(err.message))
//             this.toastr.error('Failed!', 'Error');
//           }
//         });
//       }
UpdateAnnualTurnoverApproval(element: any) {

  if (!element.ATISAPPROVE || !element.ATAPPROVEREASON?.trim()) {
    this.toastr.error('Please fill all required fields before Update.', 'Error');
    return;
  }

  const data = {
    USERID: sessionStorage.getItem('userid') || '',
    ATID: element.atid.toString(),
    ISAPPROVE: element.ATISAPPROVE,
    APPROVEREASON: element.ATAPPROVEREASON
  };

  const formData = new FormData();

  // 👉 Show SweetAlert only when reject (N)
  if (element.ATISAPPROVE === 'N') {
    
    Swal.fire({
      title: "Are you sure?",
      text: "You are rejecting this Annual Turnover approval!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Reject",
      cancelButtonText: "No, Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        // YES clicked → Update
        this.callAnnualTurnoverAPI(data, formData);
      }
      // NO clicked → Do nothing
    });

    return; // Stop further execution
  }

  // If approved (Y), update directly
  this.callAnnualTurnoverAPI(data, formData);
}
callAnnualTurnoverAPI(data: any, formData: FormData) {
  this.api.UpdateAnnualTurnoverApproval(data, formData).subscribe({
    next: (res: any) => {
      this.toastr.success(res.message || 'Data Updated Successfully!', 'Success');
      this.GetAnnualTurnover();
    },
    error: (err: any) => {
      console.log('Update Error:', err.message);
      this.toastr.error('Failed!', 'Error');
    }
  });
}

//#endregion


//#region GST
GETMassuppliergstDetails(){
  try{
      // this.spinner.show();
    // this.api.MassuppliergstDetails(sessionStorage.getItem('facilityid'),sessionStorage.getItem('vregid'))
    // this.api.MassuppliergstDetails(1651,84)
    this.api.MassuppliergstDetails(this.SupID,this.vregid)
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
applyTextFilter2(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource2.filter = filterValue.trim().toLowerCase();
}
UpdateSupplierGSTApproval(element: any) {

  if (!element.gstISAPPROVE || !element.gstAPPROVEREASON?.trim()) {
    this.toastr.error('Please fill all required fields before Update.', 'Error');
    return;
  }

  const data = {
    USERID: sessionStorage.getItem('userid') || '',
    GSTID: element.gstid.toString(),
    ISAPPROVE: element.gstISAPPROVE,
    APPROVEREASON: element.gstAPPROVEREASON
  };

  const formData = new FormData();

  // 👉 Show confirmation only when reject (N)
  if (element.gstISAPPROVE === 'N') {
    Swal.fire({
      title: "Are you sure?",
      text: "You are rejecting this GST approval!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Reject",
      cancelButtonText: "No, Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        this.callUpdateGSTAPI(data, formData);
      }
      // No clicked → do nothing
    });

    return;
  }

  // If approved (Y), update directly
  this.callUpdateGSTAPI(data, formData);
}
callUpdateGSTAPI(data: any, formData: FormData) {
  this.api.UpdateSupplierGSTApproval(data, formData).subscribe({
    next: (res: any) => {
      this.toastr.success(res.message || 'Data Update successfully!', 'Success');
      this.GETMassuppliergstDetails();
    },
    error: (err: any) => {
      console.log('Error updating GST:', JSON.stringify(err.message));
      this.toastr.error('Failed!', 'Error');
    }
  });
}

// UpdateSupplierGSTApproval(element: any) {
//           // https://dpdmis.in/VREGAPI/api/Registration/UpdateSupplierGSTApproval?ISAPPROVE=Y&GSTID=656&USERID=333&APPROVEREASON=test
//   // 
//   // if(element.Iaccept == undefined && element.Remark  == undefined){
//   //   this.toastr.error('Please Fill this Data before uploading.', 'Error');
//   //   return;
//   // }
//   if (!element.gstISAPPROVE || !element.gstAPPROVEREASON?.trim()) {
//     this.toastr.error('Please fill all required fields before Update.', 'Error');
//     return;
//   }
  
//         const data = {
//           USERID: sessionStorage.getItem('userid') || '',
//           GSTID: element.gstid.toString(),
//           ISAPPROVE: element.gstISAPPROVE,    // Y or N
//           APPROVEREASON: element.gstAPPROVEREASON      // row-wise remark
//         };
      
//         const formData = new FormData();
  
//       // return;
//         this.api.UpdateSupplierGSTApproval(data, formData).subscribe({
//           next: (res: any) => {
//             this.toastr.success(res.message || 'Data Update successfully!','Success'
//             );
//             // this.toastr.success(res.message || 'Success', 'Success');
//            this.GETMassuppliergstDetails();
//           },
//           error: (err: any) => {
//                 console.log('Error fetching data:',JSON.stringify(err.message))
//             this.toastr.error('Failed!', 'Error');
//           }
//         });
//       }
//#endregion 
//#region  gst return
GstReturnDetails(){
  try{
      // this.spinner.show();
    // this.api.GstReturnDetails(sessionStorage.getItem('facilityid'),sessionStorage.getItem('vregid'))
    // this.api.GstReturnDetails(1651,84)
    this.api.GstReturnDetails(this.SupID,this.vregid)
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
applyTextFilter3(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource3.filter = filterValue.trim().toLowerCase();
}
UpdateGSTReturnApproval(element: any) {

  if (!element.gstrISAPPROVE || !element.gstrAPPROVEREASON?.trim()) {
    this.toastr.error('Please fill all required fields before Update.', 'Error');
    return;
  }

  const data = {
    USERID: sessionStorage.getItem('userid') || '',
    RETID: element.retid.toString(),
    ISAPPROVE: element.gstrISAPPROVE,
    APPROVEREASON: element.gstrAPPROVEREASON
  };

  const formData = new FormData();

  // 👉 If Rejected → show confirmation popup
  if (element.gstrISAPPROVE === 'N') {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are rejecting this GST Return!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Reject',
      cancelButtonText: 'No, Cancel'
    }).then(result => {
      if (result.isConfirmed) {
        this.callGSTReturnUpdateAPI(data, formData);
      }
      // If cancel → do nothing
    });
    return;
  }

  // If Approved → directly update
  this.callGSTReturnUpdateAPI(data, formData);
}
callGSTReturnUpdateAPI(data: any, formData: FormData) {
  this.api.UpdateGSTReturnApproval(data, formData).subscribe({
    next: (res: any) => {
      this.toastr.success(res.message || 'Data Updated Successfully!', 'Success');
      this.GstReturnDetails();
    },
    error: (err: any) => {
      console.log('Error updating GST Return:', JSON.stringify(err.message));
      this.toastr.error('Failed!', 'Error');
    }
  });
}

// UpdateGSTReturnApproval(element: any) {
//           // https://dpdmis.in/VREGAPI/api/Registration/UpdateGSTReturnApproval?ISAPPROVE=Y&RETID=13&USERID=111&APPROVEREASON=test	
//   // 
//   // if(element.Iaccept == undefined && element.Remark  == undefined){
//   //   this.toastr.error('Please Fill this Data before uploading.', 'Error');
//   //   return;
//   // }
//   if (!element.gstrISAPPROVE || !element.gstrAPPROVEREASON?.trim()) {
//     this.toastr.error('Please fill all required fields before Update.', 'Error');
//     return;
//   }
  
//         const data = {
//           USERID: sessionStorage.getItem('userid') || '',
//           RETID: element.retid.toString(),
//           ISAPPROVE: element.gstrISAPPROVE,    // Y or N
//           APPROVEREASON: element.gstrAPPROVEREASON      // row-wise remark
//         };
      
//         const formData = new FormData();
  
//       // return;
//         this.api.UpdateGSTReturnApproval(data, formData).subscribe({
//           next: (res: any) => {
//             this.toastr.success(res.message || 'Data Update successfully!','Success'
//             );
//             // this.toastr.success(res.message || 'Success', 'Success');
//            this.GstReturnDetails();
//           },
//           error: (err: any) => {
//             console.log('Error fetching data:',JSON.stringify(err.message))
//             this.toastr.error('Failed!', 'Error');
//           }
//         });
//       }
//#endregion 
//#region Technical Details
    GetTechnicalDetails(){
  try {
     
      this.spinner.show();
      // this.api.GetTechnicalDetails(sessionStorage.getItem('vregid') )
      // this.api.GetTechnicalDetails(84)
      this.api.GetTechnicalDetails(this.vregid)
      .subscribe(
          (res: any) => {
            // this.dispatchData4 = res.map(
            //   (item: TechnicalDetails_model, index: number) => ({
            //     ...item,
            //     sno: index + 1,
            //   })
            // );
            this.dispatchData4 = res
            .filter((item: TechnicalDetails_model) => item.mscid !== "6" && item.mscid !== "22")
            .map((item: TechnicalDetails_model, index: number) => ({
              ...item,
              sno: index + 1,
            }));
            // this.TechnicalDetailsData=res;
            // this.TechnicalDetails=this.dispatchData;
            // console.log('TechnicalDetails=:', this.dispatchData4);
            this.dataSource4.data = this.dispatchData4;
            this.dataSource4.paginator = this.paginator4;
            this.dataSource4.sort = this.sort4;
            this.cdr.detectChanges();
            this.spinner.hide();
          },
          (error: { message: any }) => {
            this.spinner.hide();
            console.log('Error fetching data:',JSON.stringify(error.message))
            // alert(`Error fetching data: ${JSON.stringify(error.message)}`);
          }
        );
    } catch (err: any) {
      this.spinner.hide();

      console.log(err);
      // throw err;
    }
    }
    applyTextFilter4(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource4.filter = filterValue.trim().toLowerCase();
    }


PUT_TechnicalDetails(element: any) {

  if (!element.Iaccept || !element.Remark?.trim()) {
    this.toastr.error('Please fill all required fields before Update.', 'Error');
    return;
  }

  const data = {
    userID: sessionStorage.getItem('userid') || '',
    mFileID: element.fileid.toString(),
    Iaccept: element.Iaccept,     // Y or N
    Remarks: element.Remark
  };

  const formData = new FormData();

  // 👉 If Reject (N) → Ask confirmation
  if (element.Iaccept === 'N') {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are rejecting this Technical Document!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Reject',
      cancelButtonText: 'No, Cancel'
    }).then(result => {
      if (result.isConfirmed) {
        this.callTechnicalDetailsUpdateAPI(data, formData);
      }
    });
    return;
  }

  // 👉 If Approve (Y) → Direct update
  this.callTechnicalDetailsUpdateAPI(data, formData);
}
callTechnicalDetailsUpdateAPI(data: any, formData: FormData) {
  this.api.PUT_TechnicalDetails(data, formData).subscribe({
    next: (res: any) => {
      this.toastr.success(res.message || 'Data Updated successfully!', 'Success');
      this.GetTechnicalDetails();
    },
    error: (err: any) => {
      this.toastr.error('Failed!', 'Error');
    }
  });
}

//     PUT_TechnicalDetails(element: any) {
// // 
// // if(element.Iaccept == undefined && element.Remark  == undefined){
// //   this.toastr.error('Please Fill this Data before uploading.', 'Error');
// //   return;
// // }
// if (!element.Iaccept || !element.Remark?.trim()) {
//   this.toastr.error('Please fill all required fields before Update.', 'Error');
//   return;
// }

//       const data = {
//         userID: sessionStorage.getItem('userid') || '',
//         mFileID: element.fileid.toString(),
//         Iaccept: element.Iaccept,    // Y or N
//         Remarks: element.Remark      // row-wise remark
//       };
    
//       const formData = new FormData();

//     // return;
//       this.api.PUT_TechnicalDetails(data, formData).subscribe({
//         next: (res: any) => {
//           this.toastr.success(res.message || 'Data Update successfully!','Success'
//           );
//           // this.toastr.success(res.message || 'Success', 'Success');
//          this.GetTechnicalDetails();
//         },
//         error: (err: any) => {
//           this.toastr.error('Failed!', 'Error');
//         }
//       });
//     }
    
   
//#endregion 
//#region Complience Certificate Details
GetComplienceCertificateDetails() {
  try {
    this.spinner.show();
    this.api
      // .GetComplienceCertificateDetails(84,1651)
      .GetComplienceCertificateDetails(this.vregid,this.SupID)
      // .GetComplienceCertificateDetails(  
      //   sessionStorage.getItem('vregid'),
      //   sessionStorage.getItem('facilityid')
      // )
      .subscribe(
        (res: any) => {
          this.dispatchData5 = res.map(
            (item: ComplienceCertificateDetails, index: number) => ({
              ...item,
              sno: index + 1,
            })
          );
          // console.log('GetComplienceCertificateDetails=:', this.dispatchData5);
          this.dataSource5.data = this.dispatchData5;
          this.dataSource5.paginator = this.paginator5;
          this.dataSource5.sort = this.sort5;
          this.cdr.detectChanges();
          this.spinner.hide();
        },
        (error: { message: any }) => {
          this.spinner.hide();
          console.log('Error fetching data:',JSON.stringify(error.message))
          // alert(`Error fetching data: ${JSON.stringify(error.message)}`);
        }
      );
  } catch (err: any) {
    this.spinner.hide();

    console.log(err);
    // throw err;
  }
}
applyTextFilter5(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource5.filter = filterValue.trim().toLowerCase();
}


PUT_COMPlinceVerification(element: any) {

  if (!element.iaccept || !element.remark?.trim()) {
    this.toastr.error('Please fill all required fields before Update.', 'Error');
    return;
  }

  const data = {
    userID: sessionStorage.getItem('userid') || '',
    mWHOID: element.whoid.toString(),
    Iaccept: element.iaccept,  // Y or N
    Remarks: element.remark
  };

  const formData = new FormData();
  console.log("data:", data);

  // 👉 If Reject (N) → Ask confirmation
  if (element.iaccept === 'N') {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are rejecting this Compliance Verification!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Reject',
      cancelButtonText: 'No, Cancel'
    }).then(result => {
      if (result.isConfirmed) {
        this.callComplianceVerificationAPI(data, formData);
      }
    });
    return;
  }

  // 👉 If Approve (Y) → Direct update
  this.callComplianceVerificationAPI(data, formData);
}


// 🔥 Common API Call Function (same as your example pattern)
callComplianceVerificationAPI(data: any, formData: FormData) {
  this.api.PUT_COMPlinceVerification(data, formData).subscribe({
    next: (res: any) => {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: res.message || 'Data Updated Successfully!'
      });
      this.GetComplienceCertificateDetails();
    },
    error: (err: any) => {
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: 'Something went wrong!'
      });
    }
  });
}


// https://dpdmis.in/VREGAPI/api/Registration/COMPlinceVerification?mWHOID=31&Iaccept=N&Remarks=dsf&userID=2654
// PUT_COMPlinceVerification(element: any) {
//   // 
//   // if(element.Iaccept == undefined && element.Remar k  == undefined){
//   //   this.toastr.error('Please Fill this Data before uploading.', 'Error');
//   //   return;
//   // }
//   if (!element.iaccept || !element.remark?.trim()) {
//     this.toastr.error('Please fill all required fields before Update.', 'Error');
//     return;
//   }
  
//         const data = {
//           userID: sessionStorage.getItem('userid') || '',
//           mWHOID: element.whoid.toString(),
//           Iaccept: element.iaccept,    // Y or N
//           Remarks: element.remark      // row-wise remark
//         };
      
//         const formData = new FormData();
//   console.log('data:',data)
//       // return;
//         this.api.PUT_COMPlinceVerification(data, formData).subscribe({
//           next: (res: any) => {
//             this.toastr.success(res.message || 'Data Update successfully!','Success'
//             );
//             // this.toastr.success(res.message || 'Success', 'Success');
//            this.GetComplienceCertificateDetails()
//           },
//           error: (err: any) => {
//             this.toastr.error('Failed!', 'Error');
//           }
//         });
//       }
//#endregion 
 //#region GetGCPDetails
 GetGCPDetails(){
  try{
    this.spinner.show();
  // this.api.GetGCPDetails(sessionStorage.getItem('vregid'))
  // this.api.GetGCPDetails(84)
  this.api.GetGCPDetails(this.vregid)
    .subscribe(
      (res:any) => {
        this.dispatchData6 = res.map(
          (item: GetGCPDetails, index: number) => ({
            ...item,
            sno: index + 1,
          })
        );
        // console.log('GetGCPDetails=:', this.dispatchData6);
        this.dataSource6.data = this.dispatchData6;
        this.dataSource6.paginator = this.paginator6;
        this.dataSource6.sort = this.sort6;
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
applyTextFilter6(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource6.filter = filterValue.trim().toLowerCase();
}


PUT_GCPVerification(element: any) {

  if (!element.gcpiaccept || !element.gcpremark?.trim()) {
    this.toastr.error('Please fill all required fields before Update.', 'Error');
    return;
  }

  const data = {
    userID: sessionStorage.getItem('userid') || '',
    mGCPID: element.gcpid.toString(),
    Iaccept: element.gcpiaccept,   // Y or N
    Remarks: element.gcpremark
  };

  const formData = new FormData();

  // 👉 If Reject (N) → Show Confirmation Popup
  if (element.gcpiaccept === 'N') {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are rejecting this GCP Verification!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Reject',
      cancelButtonText: 'No, Cancel'
    }).then(result => {
      if (result.isConfirmed) {
        this.callGCPVerificationAPI(data, formData);
      }
    });
    return;
  }

  // 👉 If Approve (Y) → Direct API call
  this.callGCPVerificationAPI(data, formData);
}


// 🔥 Common API Function
callGCPVerificationAPI(data: any, formData: FormData) {
  this.api.PUT_GCPVerification(data, formData).subscribe({
    next: (res: any) => {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: res.message || 'Data Updated Successfully!'
      });
      this.GetGCPDetails();
    },
    error: (err: any) => {
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: 'Something went wrong!'
      });
    }
  });
}

// selectedTabValue(event: any): void {
      
//   this.selectedTabIndex = event.index;
// }

selectedTabValue(event: any): void {
  // ;
  // console.log('this.url6=:',this.url);
  this.selectedTabIndex = event.index;
  if (this.selectedTabIndex === 0) {
    // this.GETBankMandateDetail();
    // window.URL.revokeObjectURL(this.url);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource1.paginator = this.paginator1;
    this.dataSource2.sort = this.sort2;
    this.dataSource2.paginator = this.paginator2;
    this.dataSource2.sort = this.sort2;
    this.dataSource3.paginator = this.paginator3;
    this.dataSource3.sort = this.sort3;
  } 
  if (this.selectedTabIndex === 1) {
      // this.GetAnnualTurnover();
      // window.URL.revokeObjectURL(this.url);
    this.dataSource4.paginator = this.paginator4;
    this.dataSource4.sort = this.sort4;
  } 
  if (this.selectedTabIndex === 2) {
    // window.URL.revokeObjectURL(this.url);
    this.dataSource5.paginator = this.paginator5;
    this.dataSource5.sort = this.sort5;
    //   this.GETMassuppliergstDetails();
  } 
  if (this.selectedTabIndex === 3) {
    // window.URL.revokeObjectURL(this.url);
    this.dataSource6.paginator = this.paginator6;
    this.dataSource6.sort = this.sort6;
    // this.GstReturnDetails();
  } 
  //  else {
  // }
}
// PUT_GCPVerification(element:any){
//   // 
// // if(element.Iaccept == undefined && element.Remark  == undefined){
// //   this.toastr.error('Please Fill this Data before uploading.', 'Error');
// //   return;
// // }
// if (!element.gcpiaccept || !element.gcpremark?.trim()) {
//   this.toastr.error('Please fill all required fields before Update.', 'Error');
//   return;
// }

// // https://localhost:7053/api/Registration/GCPVerification?mGCPID=11&Iaccept=N&Remarks=sdgfsg&userID=12365
//       const data = {
//         userID: sessionStorage.getItem('userid') || '',
//         mGCPID: element.gcpid.toString(),
//         Iaccept: element.gcpiaccept,    // Y or N
//         Remarks: element.gcpremark      // row-wise remark
//       };
    
//       const formData = new FormData();

//     // return;
//       this.api.PUT_GCPVerification(data, formData).subscribe({
//         next: (res: any) => {
//           this.toastr.success(res.message || 'Data Update successfully!','Success'
//           );
//           // this.toastr.success(res.message || 'Success', 'Success');
//          this. GetGCPDetails();
//         },
//         error: (err: any) => {
//           this.toastr.error('Failed!', 'Error');
//         }
//       });
//     }

 //#endregion 
}

