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
  TechnicalDetails_model, GetAnnualTurnoverDetail, BankMandateDetail, MassuppliergstDetails, GstReturnDetails,
  licenseModel
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
  imports: [
    NgSelectModule,
    CommonModule,
    FormsModule,
    CollapseModule,
    NgbCollapseModule,
    ReactiveFormsModule,
    MatTabsModule,
    MaterialModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatTableExporterModule,
  ],

  templateUrl: './confirm-bank-details-tab.html',
  styleUrl: './confirm-bank-details-tab.css',
})
export class ConfirmBankDetailsTab {
  loadingSectionA: boolean = false;
  Remark: any;
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
    'sno',
    'accountname',
    'accountno',
    'bankname',
    'branch',
    'ifsccode',
    'filename',
    'isapprove',
    'approvedt',
    'approvereason',
    'action',
    // 'defaultacc',
  ];
  displayedColumns: string[] = [
    'sno',
    'accyear',
    'turnoveramt',
    'udinno',
    'filename',
    'isapprove',
    'approvedt',
    'approvereason',
    'action',
  ];
  displayedColumns2: string[] = [
    'sno',
    'statename',
    'gstno',
    'filename',
    'isapprove',
    'approvedt',
    'approvereason',
    'action',
  ];
  displayedColumns3: string[] = [
    'sno',
    'gstno',
    'accyear',
    'filename',
    'isapprove',
    'approvedt',
    'approvereason',
    'action', // ,'remarks'
  ];
  displayedColumns4: string[] = [
    'sno',
    'code',
    'filename',
    'ismfaccepted',
    'mfaccrejremarks',
    'ismfaccepteddt',
    'action',
    // 'fileid','vregid','mscid', 'ext','filepath',
  ];
  displayedColumns5: string[] = [
    'sno',
    'licno',
    'unitname',
    'whono',
    'comname',
    'issuedate',
    'startdate',
    'validitydate',
    'remarks',
    'whotype',
    'filename',
    'iswhoaccepted',
    'iswhoaccepteddt',
    'whoaccrejremarks',
    'action',
    // 'comid',
    // 'vregid',
    // 'supplierid',
    //  'whoid',

    // 'ext',
    // 'licid',
  ];
  displayedColumns6: string[] = [
    'sno',
    'gcpno',
    'issuedate',
    'startdate',
    'expdate',
    'filename',
    'isgcpaccepted',
    'isgcpaccepteddt',
    'gcpaccrejremarks',
    'action',
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
  vregid: any;
  SupID: any;
  licid: any;
  unitname: any;
  selectedLicense: any = null;
  comid: any;
  comname: any;

  today: string = new Date().toISOString().split('T')[0];

  license: licenseModel[] = [];
  MAScomplianceType: any[] = [];
  masitemtypes: any[] = [];
  fileresp: any;
  itemtypeid: any;
  itemtypename: any;
  selecteditemtypeid: any[] = [];
  ISSUEDATE: string = '';
  mstartdate: string = '';
  mEXPDate: string = '';
  mRemarks: string = '';
  mWHONO: any;
  validityerrorMsg: any;
  starterrorMsg: any;
  onshow: boolean = false;
  submitted = false;
  NonConvcerCertificate: File | null = null;
  PowerofAttorney: File | null = null;
  AffidavitforStrict_Compliance: File | null = null;
  blacklisting: File | null = null;
  Other_Document1: File | null = null;
  Other_Document2: File | null = null;
  SSICertificate: File | null = null;
  fileid: any;
  fileSelected: File | null = null;
  mscid: any;
  filename: any;
  WHOID: any;
  supplierid: any;
  constructor(
    private spinner: NgxSpinnerService,
    private api: ApiService,
    public toastr: ToastrService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
  ) {
    this.dataSource = new MatTableDataSource<GetAnnualTurnoverDetail>([]);
    this.dataSource1 = new MatTableDataSource<BankMandateDetail>([]);
    this.dataSource2 = new MatTableDataSource<MassuppliergstDetails>([]);
    this.dataSource3 = new MatTableDataSource<GstReturnDetails>([]);
    this.dataSource4 = new MatTableDataSource<TechnicalDetails_model>([]);
    this.dataSource5 = new MatTableDataSource<ComplienceCertificateDetails>([]);
    this.dataSource6 = new MatTableDataSource<GetGCPDetails>([]);
    this.AnnualTurnoverForm = this.fb.group({
      AccYrSetId: ['', Validators.required],
      TurnOverAmt: ['', Validators.required],
      // UDINNO: ['', [Validators.required, Validators.minLength(18),Validators.pattern(/^[0-9]{18}$/)]],
      UDINNO: [
        '',
        [Validators.required, Validators.pattern(/^[A-Za-z0-9]{18}$/)],
      ],
      TurnOverDocument: [null, Validators.required],
    });
  }

  // formatDate(val: any) {
  //   return this.datePipe.transform(val, 'dd/MM/yyyy');
  // }
  //   formatDate(value: string): string {
  //     if (!value) return '-';

  //     // Format 2: 25-11-2025 15:16:42
  //     if (/^\d{2}-\d{2}-\d{4}/.test(value)) {
  //       const [datePart] = value.split(' ');
  //       const [day, month, year] = datePart.split('-');

  //       const d = new Date(`${year}-${month}-${day}`);
  //       return isNaN(d.getTime()) ? '-' : d.toLocaleDateString('en-GB');
  //     }

  //     // Format 1: 26-NOV-25 05.39.44.... AM
  //     try {
  //       const parts = value.split(' ');
  //       const [day, mon, year] = parts[0].split('-');
  //       const fullYear = '20' + year;

  //       const time = parts[1].replace(/\./g, ':');
  //       const ampm = parts[2];

  //       const d = new Date(`${day} ${mon} ${fullYear} ${time} ${ampm}`);
  //       return isNaN(d.getTime()) ? '-' : d.toLocaleDateString('en-GB');
  //     } catch {
  //       return '-';
  //     }
  // }

  ngOnInit() {
    this.vregid = sessionStorage.getItem('vregid');
    this.SupID = sessionStorage.getItem('facilityid');

    // console.log("VRegID:",  this.vregid);
    // console.log("SupID:",  this.SupID);

    this.GetAnnualTurnover();
    this.GETBankMandateDetail();
    this.GETMassuppliergstDetails();
    this.GstReturnDetails();
    this.GetTechnicalDetails();
    this.GetComplienceCertificateDetails();
    this.GetGCPDetails();

    this.GETMANLIC();
    this.GETMAScomplianceType();
    this.GETmasitemtypes();
    this.GETMASGSTQUARTER();
    this.GETAccYearSettings();
    this.GETStates();
    this.GETAnnualYear();
    this.loadVendorBankDetail();
  }
  // GETYear
  GETAnnualYear() {
    this.api.GETYear().subscribe({
      next: (res: any) => {
        this.Years = res;
        console.log('Years:', this.Years);
      },
      error: (err: any) => {
        console.error('Error loading Years:', err);
        // alert("Failed to load vendor details");
      },
    });
  }
  //#region BankMandateDetail
  GETBankMandateDetail() {
    try {
      //
      this.spinner.show();
      // this.api.Massupplieraccnos(sessionStorage.getItem('facilityid'),sessionStorage.getItem('vregid'))
      // this.vregid= params['vregid'];
      // this.SupID=  params['supid'];
      // this.api.Massupplieraccnos(1651,84)
      this.api
        .Massupplieraccnos(this.SupID, this.vregid)

        .subscribe(
          (res: any) => {
            this.dispatchData1 = res.map(
              (item: BankMandateDetail, index: number) => ({
                ...item,
                sno: index + 1,
              }),
            );
            // console.log('BankMandateDetail=:', this.dispatchData1);
            this.dataSource1.data = this.dispatchData1;
            this.dataSource1.paginator = this.paginator1;
            this.dataSource1.sort = this.sort1;
            this.cdr.detectChanges();
            this.spinner.hide();
          },
          (error: { message: any }) => {
            this.spinner.hide();
            console.log('Error fetching data:', JSON.stringify(error.message));
            // alert(`Error fetching data: ${JSON.stringify(error.message)}`);
          },
        );
    } catch (err: any) {
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
      this.toastr.error(
        'Please fill all required fields before Update.',
        'Error',
      );
      return;
    }

    const data = {
      USERID: sessionStorage.getItem('userid') || '',
      BANKACCOUNTID: element.bankaccountid.toString(),
      ISAPPROVE: element.ISAPPROVE,
      APPROVEREASON: element.APPROVEREASON,
    };

    const formData = new FormData();

    // 👉 If ISAPPROVE = 'N', then show confirmation popup
    if (element.ISAPPROVE === 'N') {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You are rejecting this bank mandate!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Reject',
        cancelButtonText: 'No, Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          // YES clicked → Proceed update
          this.callUpdateAPI(data, formData);
        }
        // else NO clicked → Do nothing
      });

      return; // stop here
    }

    // If ISAPPROVE = 'Y', update directly
    this.callUpdateAPI(data, formData);
  }
  callUpdateAPI(data: any, formData: FormData) {
    this.api.PUT_UpdateBankMandate(data, formData).subscribe({
      next: (res: any) => {
        this.toastr.success(
          res.message || 'Data Updated Successfully!',
          'Success',
        );
        this.GETBankMandateDetail();
      },
      error: (err: any) => {
        console.log('Error:', err.message);
        this.toastr.error('Failed!', 'Error');
      },
    });
  }

  openmarqModal(pdfUrl: string): void {
    this.sanitizedPdfUrl =
      this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);
    document.querySelectorAll('.modal-backdrop').forEach((el) => el.remove());

    const modalEl = document.getElementById('pdfModal')!;
    document.body.appendChild(modalEl);
    (modalEl as HTMLElement).style.zIndex = '99999';

    const modal = new bootstrap.Modal(modalEl, {
      backdrop: false,
      keyboard: true,
      focus: true,
    });
    modal.show();
    this.loadingSectionA = false;
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
        window.open(pdfURL, '_blank');
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
          this.toastr.error(
            'File missing or network error. Please try again later.',
            'Download Failed',
          );
        } else if (err.status === 404) {
          this.toastr.warning(
            'Requested file not found on the server.',
            'File Not Found',
          );
        } else {
          this.toastr.error(
            'Something went wrong while downloading the file.',
            'Error',
          );
        }
        console.error('Download error:', err);
      },
    });
  }
  //#endregion

  //#region GetAnnualTurnover
  GetAnnualTurnover() {
    try {
      this.spinner.show();
      // this.api.GetAnnualTurnover(sessionStorage.getItem('vregid'))
      // this.api.GetAnnualTurnover(84)
      this.api.GetAnnualTurnover(this.vregid).subscribe(
        (res: any) => {
          this.dispatchData = res.map(
            (item: GetAnnualTurnoverDetail, index: number) => ({
              ...item,
              sno: index + 1,
            }),
          );
          // console.log('GetAnnualTurnoverDetail=:', this.dispatchData);
          this.dataSource.data = this.dispatchData;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.cdr.detectChanges();
          this.spinner.hide();
        },
        (error: { message: any }) => {
          this.spinner.hide();
          console.log('Error fetching data:', JSON.stringify(error.message));
          // alert(`Error fetching data: ${JSON.stringify(error.message)}`);
        },
      );
    } catch (err: any) {
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
      this.toastr.error(
        'Please fill all required fields before Update.',
        'Error',
      );
      return;
    }

    const data = {
      USERID: sessionStorage.getItem('userid') || '',
      ATID: element.atid.toString(),
      ISAPPROVE: element.ATISAPPROVE,
      APPROVEREASON: element.ATAPPROVEREASON,
    };

    const formData = new FormData();

    // 👉 Show SweetAlert only when reject (N)
    if (element.ATISAPPROVE === 'N') {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You are rejecting this Annual Turnover approval!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Reject',
        cancelButtonText: 'No, Cancel',
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
        this.toastr.success(
          res.message || 'Data Updated Successfully!',
          'Success',
        );
        this.GetAnnualTurnover();
      },
      error: (err: any) => {
        console.log('Update Error:', err.message);
        this.toastr.error('Failed!', 'Error');
      },
    });
  }

  //#endregion

  //#region GST
  GETMassuppliergstDetails() {
    try {
      // this.spinner.show();
      // this.api.MassuppliergstDetails(sessionStorage.getItem('facilityid'),sessionStorage.getItem('vregid'))
      // this.api.MassuppliergstDetails(1651,84)
      this.api.MassuppliergstDetails(this.SupID, this.vregid).subscribe(
        (res: any) => {
          this.dispatchData2 = res.map(
            (item: MassuppliergstDetails, index: number) => ({
              ...item,
              sno: index + 1,
            }),
          );
          // console.log('MassuppliergstDetails=:', this.dispatchData2);
          this.dataSource2.data = this.dispatchData2;
          this.dataSource2.paginator = this.paginator2;
          this.dataSource2.sort = this.sort2;
          this.cdr.detectChanges();
          this.spinner.hide();
        },
        (error: { message: any }) => {
          console.log('Error fetching data:', JSON.stringify(error.message));
          // alert(`Error fetching data: ${JSON.stringify(error.message)}`);
        },
      );
    } catch (err: any) {
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
      this.toastr.error(
        'Please fill all required fields before Update.',
        'Error',
      );
      return;
    }

    const data = {
      USERID: sessionStorage.getItem('userid') || '',
      GSTID: element.gstid.toString(),
      ISAPPROVE: element.gstISAPPROVE,
      APPROVEREASON: element.gstAPPROVEREASON,
    };

    const formData = new FormData();

    // 👉 Show confirmation only when reject (N)
    if (element.gstISAPPROVE === 'N') {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You are rejecting this GST approval!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Reject',
        cancelButtonText: 'No, Cancel',
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
        this.toastr.success(
          res.message || 'Data Update successfully!',
          'Success',
        );
        this.GETMassuppliergstDetails();
      },
      error: (err: any) => {
        console.log('Error updating GST:', JSON.stringify(err.message));
        this.toastr.error('Failed!', 'Error');
      },
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
  GstReturnDetails() {
    try {
      // this.spinner.show();
      // this.api.GstReturnDetails(sessionStorage.getItem('facilityid'),sessionStorage.getItem('vregid'))
      // this.api.GstReturnDetails(1651,84)
      this.api.GstReturnDetails(this.SupID, this.vregid).subscribe(
        (res: any) => {
          this.dispatchData3 = res.map(
            (item: GstReturnDetails, index: number) => ({
              ...item,
              sno: index + 1,
            }),
          );
          // console.log('GstReturnDetails=:', this.dispatchData3);
          this.dataSource3.data = this.dispatchData3;
          this.dataSource3.paginator = this.paginator3;
          this.dataSource3.sort = this.sort3;
          this.cdr.detectChanges();
          this.spinner.hide();
        },
        (error: { message: any }) => {
          console.log('Error fetching data:', JSON.stringify(error.message));
          // alert(`Error fetching data: ${JSON.stringify(error.message)}`);
        },
      );
    } catch (err: any) {
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
      this.toastr.error(
        'Please fill all required fields before Update.',
        'Error',
      );
      return;
    }

    const data = {
      USERID: sessionStorage.getItem('userid') || '',
      RETID: element.retid.toString(),
      ISAPPROVE: element.gstrISAPPROVE,
      APPROVEREASON: element.gstrAPPROVEREASON,
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
        cancelButtonText: 'No, Cancel',
      }).then((result) => {
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
        this.toastr.success(
          res.message || 'Data Updated Successfully!',
          'Success',
        );
        this.GstReturnDetails();
      },
      error: (err: any) => {
        console.log('Error updating GST Return:', JSON.stringify(err.message));
        this.toastr.error('Failed!', 'Error');
      },
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
  GetTechnicalDetails() {
    try {
      this.spinner.show();
      // this.api.GetTechnicalDetails(sessionStorage.getItem('vregid') )
      // this.api.GetTechnicalDetails(84)
      this.api.GetTechnicalDetails(this.vregid).subscribe(
        (res: any) => {
          // this.dispatchData4 = res.map(
          //   (item: TechnicalDetails_model, index: number) => ({
          //     ...item,
          //     sno: index + 1,
          //   })
          // );
          this.dispatchData4 = res
            .filter(
              (item: TechnicalDetails_model) =>
                item.mscid !== '6' && item.mscid !== '22',
            )
            .map((item: TechnicalDetails_model, index: number) => ({
              ...item,
              sno: index + 1,
            }));
          // this.TechnicalDetailsData=res;
          // this.TechnicalDetails=this.dispatchData;
          console.log('TechnicalDetails=:', this.dispatchData4);
          this.dataSource4.data = this.dispatchData4;
          this.dataSource4.paginator = this.paginator4;
          this.dataSource4.sort = this.sort4;
          this.cdr.detectChanges();
          this.spinner.hide();
        },
        (error: { message: any }) => {
          this.spinner.hide();
          console.log('Error fetching data:', JSON.stringify(error.message));
          // alert(`Error fetching data: ${JSON.stringify(error.message)}`);
        },
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
      this.toastr.error(
        'Please fill all required fields before Update.',
        'Error',
      );
      return;
    }

    const data = {
      userID: sessionStorage.getItem('userid') || '',
      mFileID: element.fileid.toString(),
      Iaccept: element.Iaccept, // Y or N
      Remarks: element.Remark,
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
        cancelButtonText: 'No, Cancel',
      }).then((result) => {
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
        this.toastr.success(
          res.message || 'Data Updated successfully!',
          'Success',
        );
        this.GetTechnicalDetails();
      },
      error: (err: any) => {
        this.toastr.error('Failed!', 'Error');
      },
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
        .GetComplienceCertificateDetails(this.vregid, this.SupID)
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
              }),
            );
            console.log(
              'GetComplienceCertificateDetails=:',
              this.dispatchData5,
            );
            this.dataSource5.data = this.dispatchData5;
            this.dataSource5.paginator = this.paginator5;
            this.dataSource5.sort = this.sort5;
            this.cdr.detectChanges();
            this.spinner.hide();
          },
          (error: { message: any }) => {
            this.spinner.hide();
            console.log('Error fetching data:', JSON.stringify(error.message));
            // alert(`Error fetching data: ${JSON.stringify(error.message)}`);
          },
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
      this.toastr.error(
        'Please fill all required fields before Update.',
        'Error',
      );
      return;
    }

    const data = {
      userID: sessionStorage.getItem('userid') || '',
      mWHOID: element.whoid.toString(),
      Iaccept: element.iaccept, // Y or N
      Remarks: element.remark,
    };

    const formData = new FormData();
    console.log('data:', data);

    // 👉 If Reject (N) → Ask confirmation
    if (element.iaccept === 'N') {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You are rejecting this Compliance Verification!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Reject',
        cancelButtonText: 'No, Cancel',
      }).then((result) => {
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
          text: res.message || 'Data Updated Successfully!',
        });
        this.GetComplienceCertificateDetails();
      },
      error: (err: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: 'Something went wrong!',
        });
      },
    });
  }
  // #endregion

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
  GetGCPDetails() {
    try {
      this.spinner.show();
      // this.api.GetGCPDetails(sessionStorage.getItem('vregid'))
      // this.api.GetGCPDetails(84)
      this.api.GetGCPDetails(this.vregid).subscribe(
        (res: any) => {
          this.dispatchData6 = res.map(
            (item: GetGCPDetails, index: number) => ({
              ...item,
              sno: index + 1,
            }),
          );
          // console.log('GetGCPDetails=:', this.dispatchData6);
          this.dataSource6.data = this.dispatchData6;
          this.dataSource6.paginator = this.paginator6;
          this.dataSource6.sort = this.sort6;
          this.cdr.detectChanges();
          this.spinner.hide();
        },
        (error: { message: any }) => {
          this.spinner.hide();
          console.log('Error fetching data:', JSON.stringify(error.message));
          // alert(`Error fetching data: ${JSON.stringify(error.message)}`);
        },
      );
    } catch (err: any) {
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
      this.toastr.error(
        'Please fill all required fields before Update.',
        'Error',
      );
      return;
    }

    const data = {
      userID: sessionStorage.getItem('userid') || '',
      mGCPID: element.gcpid.toString(),
      Iaccept: element.gcpiaccept, // Y or N
      Remarks: element.gcpremark,
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
        cancelButtonText: 'No, Cancel',
      }).then((result) => {
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
          text: res.message || 'Data Updated Successfully!',
        });
        this.GetGCPDetails();
      },
      error: (err: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: 'Something went wrong!',
        });
      },
    });
  }

  // selectedTabValue(event: any): void {

  //   this.selectedTabIndex = event.index;
  // }

  selectedTabValue(event: any): void {
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
  // #endregion

  //#region update apis
  // https://dpdmis.in/VREGAPI/api/Registration/DeleteTechnicalFile?mVregid=108&mFileID=00◘

  onDeleteClick(mVregid: any, mFileID: any, mscid: any) {
    // debugger;
    this.fileid = mFileID;
    this.mscid = mscid;
    console.log(this.fileid);
    console.log('mscid:', mscid);
    // debugger;
    // Professional Confirmation Box
    // return  this.onshow=true;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      // Agar user Yes par click kare
      if (result.isConfirmed) {
        this.api.DeleteTechnicalFile(mVregid, mFileID).subscribe({
          next: (response: any) => {
            // Success Message
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            // Yahan data refresh karne ka logic likhein
            this.GetTechnicalDetails();
            this.onshow = true;
          },
          error: (err: any) => {
            // Error Message
            Swal.fire('Error!', 'Something went wrong.', 'error');
            console.error(err);
          },
        });
      }
    });
  }
  onFileSelect(event: any, fileNo: number): void {
    //  this.events= event.target.value;
    const file = event.target?.files?.[0] || null;

    switch (fileNo) {
      case 0:
        this.NonConvcerCertificate = file;
        break; //41
      case 1:
        this.PowerofAttorney = file;
        break; //9
      case 2:
        this.AffidavitforStrict_Compliance = file;
        break; //141
      case 3:
        this.blacklisting = file;
        break; //142
      case 4:
        this.Other_Document1 = file;
        break; //19
      case 5:
        this.Other_Document2 = file;
        break; //122
      case 6:
        this.SSICertificate = file;
        break; //7
    }
  }

  InsertTechnicalDetails(mFileTypeid: number) {
    //  const file = this.TechnicalDetailsData.find((f: any) => f.mscid == mFileTypeid);
    //  if(file){
    //   this.toastr.error('This document type already exists. Please select a different one!', 'Error');

    //   return;
    //  }

    const formData = new FormData();
    let selectedFile: File | null = null;
    switch (mFileTypeid) {
      case 19: // SSI Certificate Other Document  1
        selectedFile = this.Other_Document1;
        break;
      case 122: // Other Document  2
        selectedFile = this.Other_Document2;
        break;
      case 142: // blacklisting
        selectedFile = this.blacklisting;
        break;
      case 141: // AffidavitforStrict_Compliance
        selectedFile = this.AffidavitforStrict_Compliance;
        break;
      case 9: // PowerofAttorney
        selectedFile = this.PowerofAttorney;
        break;
      case 41: // Non Conviction Certificate
        selectedFile = this.NonConvcerCertificate;
        break;
      case 7: // SSI Certificate
        selectedFile = this.SSICertificate;
        break; //7

      default:
        this.toastr.error('Invalid File Type ID!', 'Error');
        return;
    }

    //  File check
    if (!selectedFile) {
      this.toastr.error('Please select a file before uploading.', 'Error');
      console.error(` No file selected for mFileTypeid: ${mFileTypeid}`);
      return;
    }

    //  Append file to formData
    formData.append('PanCardDocument', selectedFile);

    //  Prepare params data
    const data = {
      mVergID: sessionStorage.getItem('vregid') || '',
      mFileTypeID: mFileTypeid.toString(),
    };
    console.log('details:=', data);
    // return;
    //  API Call
    try {
      this.loadingSectionA = true;
      this.api.InsertTechnicalDetails(data, formData).subscribe({
        next: (res: any) => {
          this.toastr.success(
            res.message || 'File uploaded successfully!',
            'Success',
          );
          console.log('Upload Success:', res);

          switch (mFileTypeid) {
            case 41:
              this.NonConvcerCertificate = null;
              break;
            case 9:
              this.PowerofAttorney = null;
              break;
            case 141:
              this.AffidavitforStrict_Compliance = null;
              break;
            case 142:
              this.blacklisting = null;
              break;
            case 19:
              this.Other_Document1 = null;
              break;
            case 122:
              this.Other_Document2 = null;
              break;
            // case 81: this.TechCertificate5 = null;  break;
          }
          this.GetTechnicalDetails();
          this.loadingSectionA = false;
          // this.onshow=false;
        },

        error: (err: any) => {
          this.loadingSectionA = false;
          console.error('Upload Error:', err);
          this.toastr.error('Failed to upload file!', 'Error');
        },
      });
    } catch (error) {
      console.error('Exception:', error);
      this.toastr.error('Unexpected error occurred!', 'Error');
    }
  }
  // onCOMPLIANCEUpdate(whoid:any,licid:any,whono:any,comid:any,vregid:any,issuedate:any,startdate:any,validitydate:any,remarks:any,supplierid:any){
  //   debugger;
  //   this.onshow = true;
  //   this.selectedLicense=licid;
  //   this.comname=comid;
  //   this.mWHONO=whono;
  //   this.mRemarks=remarks;
  //   this.ISSUEDATE=issuedate;
  //   this.mstartdate=startdate;
  //   this.mEXPDate=validitydate;
  //   this.selecteditemtypeid=validitydate;

  // }
  formatDateForInput(dateStr: string): string {
    if (!dateStr) return '';

    const parts = dateStr.split('-'); // dd-mm-yyyy
    if (parts.length !== 3) return dateStr;

    const [dd, mm, yyyy] = parts;
    return `${yyyy}-${mm}-${dd}`; // yyyy-mm-dd
  }
  onCOMPLIANCEUpdate(
    whoid: any,
    licid: any,
    whono: any,
    comid: any,
    vregid: any,
    issuedate: any,
    startdate: any,
    validitydate: any,
    remarks: any,
    supplierid: any,
    filename: any,
  ) {
    // debugger;
    this.filename = filename;
    this.onshow = true;
    this.WHOID = whoid;
    this.selectedLicense = licid;
    this.comname = comid;
    // this.comid = comid;
    this.mWHONO = whono;
    this.mRemarks = remarks;
    // this.selecteditemtypeid = [1];
    this.supplierid = supplierid;
    this.vregid = vregid;
    this.ISSUEDATE = this.formatDateForInput(issuedate);
    this.mstartdate = this.formatDateForInput(startdate);
    this.mEXPDate = this.formatDateForInput(validitydate);

    // this.selecteditemtypeid = [1,2];
  }
  // https://dpdmis.in/VREGAPI/api/Registration/UpdateComplianceCertificate?WHOID=0& mlicid=0&mWHONO=0& mComid=0& mVergID=0&ISSUEDATE=0&mstartdate=0&mEXPDate=0& mRemarks=0&mSupplierid=0
  InsertComplianceCertificate1(COMCForm: NgForm) {
    debugger;
    this.loadingSectionA = true;
    this.submitted = true;
    const formData = new FormData();
    if (COMCForm.invalid) {
      this.toastr.error('Please fill all required fields.', 'Error');
      this.loadingSectionA = false;
      return;
    }
    if (this.fileSelected) {
      formData.append('PanCardDocument', this.fileSelected);
    } else {
      this.toastr.error(
        'Please select a Compliance Certificate file.',
        'Error',
      );
      return;
    }
    const formValues = COMCForm.value;
    const data = {
      mVergID: this.vregid,
      mSupplierid: this.supplierid,
      // mlicid:  this.selectedLicense ,
      // // mlicid: this.licid,
      // mComid:  this.comname,
      // // mComid: this.comid,
      mlicid: this.selectedLicense ?? this.licid,
      mComid: this.comname ?? this.comid,
      mWHONO: this.mWHONO,
      WHOID: this.WHOID,
      // ISSUEDATE: formValues.ISSUEDATE,
      // mstartdate: formValues.mstartdate,
      // mEXPDate: formValues.mEXPDate,
      mRemarks: this.mRemarks,
      // mVergID: sessionStorage.getItem('vregid') || '',
      // mSupplierid: sessionStorage.getItem('facilityid') || '',
      // mstateID: this.stateid?.toString() || '',
      // ISSUEDATE: this.ISSUEDATE,
      // mstartdate: this.mstartdate,
      // mEXPDate: this.mEXPDate,
      // ISSUEDATE: this.formatDate(this.ISSUEDATE),
      // mstartdate: this.formatDate(this.mstartdate),
      // mEXPDate: this.formatDate(this.mEXPDate),
      ISSUEDATE: this.formatDate(formValues.ISSUEDATE),
      mstartdate: this.formatDate(formValues.mstartdate),
      mEXPDate: this.formatDate(formValues.mEXPDate),
      // mWHONO: formValues.mWHONO,
      // ISSUEDATE: formValues.ISSUEDATE,
      // mstartdate: formValues.mstartdate,
      // mEXPDate: formValues.mEXPDate,
      // mRemarks: formValues.mRemarks
    };
    // console.log('data=:', data);
    // return;
    try {
      this.api.UpdateComplianceCertificate(data, formData).subscribe({
        next: (res: any) => {
          // console.log('res=', res);
          this.toastr.success(
            res.message || 'Certificate uploaded successfully!',
            'Success',
          );
          COMCForm.resetForm();
          // this.fileSelected = null;
          // this.MASVREGWHOITEMTYPE(res, COMCForm);
        },
        error: (err: any) => {
          console.error('Error:', err);
          this.loadingSectionA = false;
          this.toastr.error(
            'Failed to upload Compliance Certificate please try again',
            'Error',
          );
        },
      });
    } catch (error) {
      this.loadingSectionA = false;
      console.error('Exception:', error);
      this.toastr.error('Unexpected error occurred!');
    }
  }
  onFileSelectedCertificate(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.fileSelected = file;
      console.log('Selected file :', file.name);
    }
  }
  formatDate(value: string): string {
    if (!value) return '-';

    let d: Date | null = null;

    // ✅ Format: yyyy-MM-dd (2025-12-10)
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      d = new Date(value);
    }

    // ✅ Format: dd-MM-yyyy or dd-MM-yyyy HH:mm:ss
    else if (/^\d{2}-\d{2}-\d{4}/.test(value)) {
      const [datePart] = value.split(' ');
      const [day, month, year] = datePart.split('-');
      d = new Date(`${year}-${month}-${day}`);
    }

    // ✅ Format: 26-NOV-25 05.39.44 AM
    else {
      try {
        const parts = value.split(' ');
        const [day, mon, year] = parts[0].split('-');
        const fullYear = '20' + year;

        const time = parts[1].replace(/\./g, ':');
        const ampm = parts[2];

        d = new Date(`${day} ${mon} ${fullYear} ${time} ${ampm}`);
      } catch {
        return '-';
      }
    }

    // ✅ Final format: dd-MM-yyyy
    if (!d || isNaN(d.getTime())) return '-';

    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();

    return `${day}-${month}-${year}`;
  }
  GETMANLIC() {
    this.api
      .GETMANLIC(
        sessionStorage.getItem('facilityid'),
        sessionStorage.getItem('vregid'),
      )
      .subscribe({
        next: (res: any) => {
          this.license = res;
          // console.log('license:', this.license);
        },
        error: (err: any) => {
          console.error('Error loading license:', err);
          // alert("Failed to load vendor details");
        },
      });
  }
  GETmasitemtypes() {
    this.api.GETmasitemtypes().subscribe({
      next: (res: any) => {
        this.masitemtypes = res;
        // console.log('masitemtypes:', this.masitemtypes);
      },
      error: (err: any) => {
        console.error('Error loading Years:', err);
        // alert("Failed to load vendor details");
      },
    });
  }
  GETMAScomplianceType() {
    this.api.GETMAScomplianceType().subscribe({
      next: (res: any) => {
        this.MAScomplianceType = res;
        // console.log('MAScomplianceType:', this.MAScomplianceType);
      },
      error: (err: any) => {
        console.error('Error loading Years:', err);
        // alert("Failed to load vendor details");
      },
    });
  }
  Onselectlicense(event: any) {
    if (event) {
      this.licid = event?.licid;
      this.unitname = `${event.licid} - ${event.unitname}`;
      console.log(this.unitname);
    }
  }
  OnselectlicensecomplianceType(event: any) {
    this.comid = event?.comid;
  }
  validateDates() {
    const start = new Date(this.mstartdate);
    const issue = new Date(this.ISSUEDATE);
    const validity = new Date(this.mEXPDate);
    this.validityerrorMsg = '';
    this.starterrorMsg = '';

    // Rule 1: Start Date must be >= Issue Date
    if (start < issue) {
      this.starterrorMsg = 'Start Date cannot be earlier than Issue Date.';
      return false;
    }

    // Rule 2: Expiry Date must be >= Start Date AND Issue Date
    if (validity < start) {
      this.validityerrorMsg = 'Expiry Date must be on or after Start Date.';
      return false;
    }

    if (validity < issue) {
      this.validityerrorMsg = 'Expiry Date cannot be earlier than Issue Date.';
      return false;
    }

    return true;
  }
  onCheckboxChange(item: any) {
    if (!this.selecteditemtypeid) {
      this.selecteditemtypeid = [];
    }

    const id = item.itemtypeid;

    if (this.selecteditemtypeid.includes(id)) {
      // remove
      this.selecteditemtypeid = this.selecteditemtypeid.filter((x) => x !== id);
    } else {
      // add
      this.selecteditemtypeid = [...this.selecteditemtypeid, id];
    }
  }
  //#endregion
  //#region GCP
  mGCpNo: any;
  // ISSUEDATE:any;
  // mstartdate:any;
  // mEXPDate:any;
  GCPID: any;
  onGCPUpdate(
    gcpid: any,
    vregid: any,
    gcpno: any,
    issuedate: any,
    startdate: any,
    expdate: any,
  ) {
    this.onshow = true;
    this.mGCpNo = gcpno;
    this.GCPID = gcpid;
    // this.ISSUEDATE=issuedate;
    // this.mstartdate=startdate;
    // this.mEXPDate=expdate;
    // this.supplierid=supplierid;
    this.vregid = vregid;
    this.ISSUEDATE = this.formatDateForInput(issuedate);
    this.mstartdate = this.formatDateForInput(startdate);
    this.mEXPDate = this.formatDateForInput(expdate);
  }
  InsertGCP(GCPForm: NgForm) {
    // debugger;
    this.loadingSectionA = true;
    const formData = new FormData();
    if (GCPForm.invalid) {
      this.toastr.error('Please fill all required fields.', 'Error');
      return;
    }
    if (this.fileSelected) {
      formData.append('PanCardDocument', this.fileSelected);
    } else {
      this.toastr.error(
        'Please select a GLOBAL COMPANY PREFIX Certificate file.',
        'Error',
      );
      return;
    }
    const formValues = GCPForm.value;
    const data = {
      // mSupplierid: sessionStorage.getItem('facilityid') || '',
      // post:= // https://localhost:7053/api/Registration/

      // mstateID: this.stateid?.toString() || '',
      // mGCpNo: this.mGCpNo,
      // mComid: this.comid,
      // mWHONO: this.mWHONO,
      // ISSUEDATE: this.ISSUEDATE,
      // mstartdate: this.mstartdate,
      // mEXPDate: this.mEXPDate,
      // ISSUEDATE: this.formatDate(this.ISSUEDATE),
      // mstartdate: this.formatDate(this.mstartdate),
      // mEXPDate: this.formatDate(this.mEXPDate),
      // mRemarks: this.mRemarks
      // InsertGCP?mVergID=50&mGCpNo=65987&ISSUEDATE=01-10-2025&mstartdate=01-10-2025&mEXPDate=01-10-2027
      //  mVergID: sessionStorage.getItem('vregid') || '',
      mVergID: this.vregid,
      GCPID: this.GCPID,
      mGCpNo: formValues.mGCpNo || this.mGCpNo,
      ISSUEDATE: this.formatDate(formValues.ISSUEDATE),
      mstartdate: this.formatDate(formValues.mstartdate),
      mEXPDate: this.formatDate(formValues.mEXPDate),

      // https://dpdmis.in/VREGAPI/api/Registration/UpdateGCP?GCPID=0&mVergID=0&mGCpNo=0&ISSUEDATE=0&mstartdate=0&mEXPDate=0
      // ISSUEDATE: formValues.ISSUEDATE,
      // mstartdate: formValues.mstartdate,
      // mEXPDate: formValues.mEXPDate
    };
    console.log('data=:', data);
    // return;
    try {
      this.api.UpdateGCP(data, formData).subscribe({
        next: (res: any) => {
          console.log('res=', res);
          this.toastr.success(
            res.message || 'Certificate uploaded successfully!',
            'Success',
          );
          GCPForm.resetForm();
          this.fileSelected = null;
          this.GetGCPDetails();
          this.onshow = false;
          this.loadingSectionA = false;
        },
        error: (err: any) => {
          console.error('Error:', err);
          this.loadingSectionA = false;
          this.toastr.error(
            'Failed to upload GLOBAL COMPANY PREFIX Certificate',
            'Error',
          );
        },
      });
    } catch (error) {
      console.error('Exception:', error);
      this.toastr.error('Unexpected error occurred!');
    }
  }
  onFileSelected1(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.fileSelected = file;
      // console.log('Selected file :', file.name);
    }
  }

  //#endregion
  //#region GST R
  gstno: any;
  quartername: any;
  accyear: any;
  gstid: any;
  retid: any;
  MASGSTQUARTER: any;
  AccYearSettings: any;
  onshowGSTR: any;
  GSTreturnCertificate: File | null = null;
  accyrsetid: any;
  gstqtrid: any;
  UpdateGSTRETURN(retid: any, gstid: any, gstqtrid: any, accyrsetid: any) {
    this.onshowGSTR = true;
    this.retid = retid;
    this.gstno = gstid;
    this.quartername = gstqtrid;
    this.accyear = accyrsetid;
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
    // UpdateMASGSTRETURNFILES?RETID=0&mGSTID=0&mVergID=0&mACCYRSETID=0&mGSTQTRID=0&mSupplierID=0
    const data = {
      // this.selectedLicense ?? this.licid,
      RETID: this.retid,
      mGSTID: this.gstid ?? this.gstno,
      mVergID: sessionStorage.getItem('vregid') || '',
      mACCYRSETID: this.accyrsetid ?? this.accyear,
      mGSTQTRID: this.gstqtrid ?? this.quartername,
      mSupplierID: sessionStorage.getItem('facilityid') || '',
    };
    try {
      this.api.UpdateGSTRETURN(data, formData).subscribe({
        next: (res: any) => {
          this.toastr.success(
            res.message || 'GST Return Certificate uploaded successfully!',
            'Success',
          );
          this.GstReturnDetails();
          GSTRETURNForm.resetForm();
          this.GSTreturnCertificate = null;

          this.onshowGSTR = false;
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
  GETAccYearSettings() {
    this.api.GETAccYearSettings().subscribe({
      next: (res: any) => {
        this.AccYearSettings = res;
      },
      error: (err: any) => {
        console.error('Error loading Years:', err);
        // alert("Failed to load vendor details");
      },
    });
  }
  GETMASGSTQUARTER() {
    this.api.MASGSTQUARTER().subscribe({
      next: (res: any) => {
        this.MASGSTQUARTER = res;
        //  console.log("AccYearSettings:", this.MASGSTQUARTER);
      },
      error: (err: any) => {
        console.error('Error loading Years:', err);
        // alert("Failed to load vendor details");
      },
    });
  }

  onFileSelectedGSTReturn(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.GSTreturnCertificate = file;
      // console.log('Selected file :', file.name);
    }
  }
  OnselectAccYearSettings(selectedaccyrsetid: any): void {
    const selectedaccyrset = selectedaccyrsetid.accyrsetid || 0;
    if (selectedaccyrset) {
      this.accyrsetid = selectedaccyrset;
      // this.gstno = selectedgstqtr.quartername;
    }
  }
  //#endregion
  //#region GST
  States: any;
  GSTCertificate: File | null = null;
  stateid: any;
  onshowGST = false;
  statename: any;
  selectedStateId: any;
  GSTCmodal: any;
  //   UpdateGST(gstid:any,vregid:any,stateid:any,){
  // debugger;
  //   // this.statename=stateid;
  //     this.selectedStateId =     Number(stateid);

  //   this.gstno=gstid;
  //   // this.gstid=gstid
  //    setTimeout(() => {
  //   this.openGSTModal();
  // });

  //   }

  UpdateGST(gstid: any, gstno: any, vregid: any, stateid: any) {
    this.vregid = vregid;
    this.gstno = gstno;
    this.selectedStateId = stateid?.toString();

    setTimeout(() => {
      this.openGSTModal();
    });
  }


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
      this.api.InsertGSTCertificate(data, formData).subscribe({
        next: (res: any) => {
          this.toastr.success(
            res.message || 'GST Certificate uploaded successfully!',
            'Success',
          );
          GSTForm.resetForm();
          this.GSTCertificate = null;
          this.GETMassuppliergstDetails();

          this.onshowGST = false;
          this.GSTCmodal.close();
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
  // GETStates
  GETStates() {
    this.api.getStates().subscribe({
      next: (res: any) => {
        this.States = res;
        console.log('States:', this.States);
      },
      error: (err: any) => {
        console.error('Error loading Years:', err);
        // alert("Failed to load vendor details");
      },
    });
  }

  openGSTModal(): void {
    document.querySelectorAll('.modal-backdrop').forEach((el) => el.remove());

    const modalEl = document.getElementById('GSTModal')!;
    document.body.appendChild(modalEl);
    (modalEl as HTMLElement).style.zIndex = '99999';

    this.GSTCmodal = new bootstrap.Modal(modalEl, {
      backdrop: false,
      keyboard: true,
      focus: true,
    });
    this.GSTCmodal.show();
  }

  //#endregion
  //#region
  AnnualTurnoverForm!: FormGroup;
  Years: any;
  fileError: string = '';
  selectedAnuvFile: File | null = null;
  ATCCModal: any;

  openATCModal(): void {
    document.querySelectorAll('.modal-backdrop').forEach((el) => el.remove());

    const modalEl = document.getElementById('ATCModal')!;
    document.body.appendChild(modalEl);
    (modalEl as HTMLElement).style.zIndex = '99999';

    this.ATCCModal = new bootstrap.Modal(modalEl, {
      backdrop: false,
      keyboard: true,
      focus: true,
    });
    this.ATCCModal.show();
  }
  get f() {
    return this.AnnualTurnoverForm.controls;
  }
  onFileSelectedanudocument(event: any) {
    const file = event.target.files[0];
    this.fileError = '';

    if (file) {
      const fileName = file.name.toLowerCase();
      const fileSize = file.size; // in bytes

      if (!fileName.endsWith('.pdf')) {
        this.fileError = 'Only PDF files are allowed!';
        this.AnnualTurnoverForm.get('TurnOverDocument')?.setErrors({
          invalidType: true,
        });
        this.AnnualTurnoverForm.patchValue({ TurnOverDocument: null });
        return;
      }

      if (fileSize > 104857600) {
        this.fileError = 'File size must be less than 100 MB!';
        this.AnnualTurnoverForm.get('TurnOverDocument')?.setErrors({
          fileTooLarge: true,
        });
        this.AnnualTurnoverForm.patchValue({ TurnOverDocument: null });
        return;
      }

      this.selectedAnuvFile = file;
      this.AnnualTurnoverForm.patchValue({
        TurnOverDocument: file,
      });
      this.AnnualTurnoverForm.get('TurnOverDocument')?.updateValueAndValidity();

      console.log(
        'Selected file:',
        file.name,
        'Size:',
        (fileSize / (1024 * 1024)).toFixed(2),
        'MB',
      );
    }
  }
  //  UpdateANNUALTURNOVER(atid:any,accyrsetid:any,slno:any,turnoveramt:any,udinno:any){
  // // this.vregid=vregid;
  // //   this.gstno = gstno;
  // //   this.selectedStateId = stateid?.toString();

  //   setTimeout(() => {
  //     this.openATCModal();
  //   });
  //   }
  // ATCModal
  UpdateANNUALTURNOVER(
    atid: any,
    accyrsetid: any,
    slno: any,
    turnoveramt: any,
    udinno: any,
  ) {
    debugger;

    // ✅ form auto fill
    this.AnnualTurnoverForm.patchValue({
      AccYrSetId: accyrsetid,
      TurnOverAmt: turnoveramt,
      UDINNO: udinno,
      TurnOverDocument: null, // file usually reset hoti hai
    });

    // ✅ modal open after patch
    setTimeout(() => {
      this.openATCModal();
    });
  }
  OnSubmmit(): void {
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
      formData.append(
        'TurnOverDocument',
        this.selectedAnuvFile,
        this.selectedAnuvFile.name,
      );
    }

    this.api.post('/Registration/UpdateAnnualTurnover', formData).subscribe(
      (res: any) => {
        this.toastr.success(res.message, 'Success');
        this.AnnualTurnoverForm.reset();
        this.submitted = false;
        this.selectedAnuvFile = null;
        this.GetAnnualTurnover();
        this.ATCCModal.close();
      },
      (err) => {
        this.toastr.error('Submission failed', 'Error');
        console.error(err);
      },
    );
  }
  Onselectyear(event: Event): void {
    const selectedId = (event.target as HTMLSelectElement).value;
    const selectedYear = this.Years.find(
      (y: { accyrsetid: string }) => y.accyrsetid == selectedId,
    );

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

  //#endregion
  //#region bank mandate
  // acnoo: any;
  SupplierBankAccDetail: any = {};
  isNewBank: boolean = false;
  statusText: any;
  onshowPP = false;
  selectedFileBank:File | null = null;
   isCheckingIFSC = false;
     ifsccodeDetails:any;
     acno:any;
    //  VendorBankDetail: any[] = [];
    onshowFINANCIAL=false;
     BankModal:any;
  acnoo: any = null;
  accountname:any;
VendorBankDetail: any[] = [];

selectedBank: any;
supplieridbbb:any;

       UpdateBankMandate(
    bankaccountid: any,
    supplierid: any,
    branch: any,
    bankname: any,
    accountno: any,
    accountname: any,
    acno:any,
    ifsccode:any
  ) {
    // this.acnoo=bankaccountid;
// this.acnoo = Number(bankaccountid);
// this.onshowFINANCIAL=true

this.accountname=accountname
this.supplieridbbb=supplierid

this.acnoo = null;
    setTimeout(() => {
      this.openBankModal();
        this.acnoo = bankaccountid.toString();
          this.SupplierBankAccDetail.accountname = accountname;
  this.SupplierBankAccDetail.accountno = accountno;
  this.SupplierBankAccDetail.bankname = bankname;
  this.SupplierBankAccDetail.branch = branch;
  this.SupplierBankAccDetail.ifsccode = ifsccode;
   this.isNewBank = true;
    });

// setTimeout(() => {
//   // this.acnoo = Number(bankaccountid);
//   this.acnoo = bankaccountid.toString();
//    this.isNewBank = true;
// }, 0);

  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFileBank = file;
    }
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
  onIFSCChange() {
  
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
  onselectacno(event: any): void {
    const bankaccountid = event.bankaccountid;
    this.acno = bankaccountid;
    if (bankaccountid === 0) {
      //  this.GETSupplierBankAccDetail(0,bankaccountid);
      // this.GETSupplierBankAccDetail(1836,1139);
      this.isNewBank = true;
      this.SupplierBankAccDetail = {};
      // this.bankForm.resetForm();
    } else {
      this.GETSupplierBankAccDetail(0, bankaccountid);
      // this.GETSupplierBankAccDetail(1836,1139);
      this.isNewBank = true;
      // const selectedUser = this.VendorBankDetail.find(
      //   (user: { bankaccountid: any }) => user.bankaccountid === this.acno
      // );
      // console.log('selectedUser:', selectedUser);
    }
  }
  loadVendorBankDetail() {
    this.api.vendorBankDetail(sessionStorage.getItem('facilityid')).subscribe({
      next: (res: any) => {
        if (res && res.length > 0) {
          this.VendorBankDetail = [
            ...res,
            { bankaccountid: 0, acno: 'Add new Bank Account' },
          ];
        } else {
          this.VendorBankDetail = [
            { bankaccountid: 0, acno: 'Add new Bank Account' },
          ];
        }
        console.log('bank ditails',res)
      },
      error: (err: any) => {
        console.error('Error loading vendor details:', err);
        // alert("Failed to load vendor details");
      },
    });
  }
  onSubmit(bankForm: NgForm) {
    // debugger;
    // this.loadingSectionA = true;
    // const bankaccountID = this.dispatchData1.find(
    //   (f: any) => f.bankaccountid == this.acno,
    // )?.bankaccountid;

    // if (bankaccountID) {
    //   this.toastr.error('Bank AC No already exist.', 'Error');
    //   this.loadingSectionA = false;
    //   return;
    // }

    // // const ifsc = this.SupplierBankAccDetail.ifsccode;
    // if (this.statusText == 'Invalid IFSC Code') {
    //   this.toastr.error('Please fill valid IFSC Code.', 'Error');
    //   this.loadingSectionA = false;
    //   return;
    // }
    // if (bankForm.invalid) {
    //   this.toastr.error('Please fill all required fields.', 'Error');
    //   this.loadingSectionA = false;
    //   return;
    // }
    // const formData = new FormData();
    // formData.append(
    //   'VendorRegistrationId',
    //   sessionStorage.getItem('vregid') || '',
    // );
    // formData.append('SelectedBankAccountId', this.acno.toString());
    // formData.append(
    //   'AccountNumber',
    //   this.SupplierBankAccDetail.accountno || '',
    // );
    // formData.append(
    //   'AccountHolderName',
    //   this.SupplierBankAccDetail.accountname || '',
    // );
    // formData.append('BankName', this.SupplierBankAccDetail.bankname || '');
    // formData.append('BranchName', this.SupplierBankAccDetail.branch || '');
    // formData.append('IFSCCode', this.SupplierBankAccDetail.ifsccode || '');
    // formData.append('supplierid', sessionStorage.getItem('facilityid') || '');
    // if (this.selectedFileBank) {
    //   formData.append('BankDetailDocument', this.selectedFileBank);
    // }
    const formData = new FormData();
    formData.append('SelectedBankAccountId', bankForm.value.acno.toString());
    formData.append('BankName',bankForm.value.bankname);
    formData.append('BranchName',bankForm.value.branch);
    formData.append('IFSCCode',bankForm.value.ifsccode);
    formData.append('supplierid',this.supplieridbbb);
    formData.append('AccountHolderName',bankForm.value.accountname);
    formData.append('AccountNumber',bankForm.value.accountno);
    formData.append(
      'VendorRegistrationId',
      sessionStorage.getItem('vregid') || '',
    );
  if (this.selectedFileBank) {
      formData.append('BankDetailDocument', this.selectedFileBank);
    }
    // return;
    this.api.post('/Registration/UpdateBankDetails', formData).subscribe({
      next: (res: any) => {
        this.toastr.success(res.message, 'Success');
        bankForm.resetForm();
        this.selectedFileBank = null;
        this.SupplierBankAccDetail = {}; // clear data
        // bankForm.resetForm();
        this.GETBankMandateDetail();
               this.BankModal.close();
      },
      error: (err: any) => {
        console.error('Error updating bank details:', err);
        this.loadingSectionA = false;
        // alert('Failed to update bank details');
      },
    });
  }
  // 
    openBankModal(): void {
    document.querySelectorAll('.modal-backdrop').forEach((el) => el.remove());

    const modalEl = document.getElementById('BankModal')!;
    document.body.appendChild(modalEl);
    (modalEl as HTMLElement).style.zIndex = '99999';

    this.BankModal = new bootstrap.Modal(modalEl, {
      backdrop: false,
      keyboard: true,
      focus: true,
    });
    this.BankModal.show();
  }
  //#endregion
}

