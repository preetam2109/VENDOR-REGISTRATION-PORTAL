import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatTableExporterModule } from 'mat-table-exporter';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CollapseModule } from 'src/app/collapse';
import { MaterialModule } from 'src/app/material-module';
import { ComplienceCertificateDetails, GetCOMTyepDetails, licenseModel } from 'src/app/Model/VendorRegisDetail';
import { ApiService } from 'src/app/service/api.service';
import { NgForm } from '@angular/forms';
declare var bootstrap: any;
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { threadCpuUsage } from 'process';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-compliance-details',
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
    MatTableExporterModule,MatProgressSpinnerModule
  ],
  templateUrl: './compliance-details.html',
  styleUrl: './compliance-details.css',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', opacity: 0, padding: '0' })),
      state('expanded', style({ height: '*', opacity: 1 })),
      transition('expanded <=> collapsed', animate('250ms ease-in-out')),
    ])
  ],
    
})
export class ComplianceDetails {
  today: string = new Date().toISOString().split("T")[0];
  fileSelected: File | null = null;
  license: licenseModel[] = [];
  MAScomplianceType: any[] = [];
  masitemtypes: any[] = [];
  licid: any;
  fileresp:any;
  unitname: any;
  comid: any;
  comname: any;
  itemtypeid: any;
  itemtypename: any;
  selectedLicense: any = null;
  selecteditemtypeid: any[] = [];
  sanitizedPdfUrl!: SafeResourceUrl;
  ISSUEDATE: string = '';
  mstartdate: string = '';
  mEXPDate: string = '';
  mRemarks: string = '';
  mWHONO: any;
  validityerrorMsg:any;
  starterrorMsg:any;
  onshow:boolean=false;
  submitted = false;
  loadingSectionA = false;
  dataSource!: MatTableDataSource<ComplienceCertificateDetails>;
  dataSource1!: MatTableDataSource<GetCOMTyepDetails>;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('sort') sort!: MatSort;
  @ViewChild('paginator1') paginator1!: MatPaginator;
  @ViewChild('sort1') sort1!: MatSort;
  dispatchData: ComplienceCertificateDetails[] = [];
  displayedColumns: string[] = [
    'sno',
    'licno',
    'unitname',
    'whono',
    // 'comid',
    'comname',
    'issuedate',
    'startdate',
    'validitydate',
    'remarks',
    'whotype',
    // 'vregid',
    // 'supplierid',
    'filename',
    // 'action',
    // 'delete',
    'whoid',
    // 'ext',
    // 'licid',
  ];
  dispatchData1: GetCOMTyepDetails[] = [];
  displayedColumns1: string[] = [
    'sno',
    // 'whotypeid',
    // 'whoid',
    'whono',
    // 'itemtypeid',
    'itemtypename',
    // 'vregid',
    // 'action',
   
    // 'filename',
  ];
  expandedElement: any | null = null;
  COMTyepDetailsdata: any[] = [];
  
isExpansionDetailRow = (i: number, row: any) => row.detailRow === true;

toggleDetails(row: any, whoid: any) {
  if (this.expandedElement === row) {
    this.expandedElement = null;

    this.dataSource.data = this.dataSource.data.filter(r => !r.detailRow);
    return;
  }

  this.expandedElement = row;

  const updatedRows: any[] = [];

  this.dataSource.data.forEach(r => {
    updatedRows.push(r);

    if (r === row) {
      updatedRows.push({
        detailRow: true,
        data: row
      });
    }
  });

  this.dataSource.data = updatedRows;

  this.GettypedetailsDetails(whoid);
}

  constructor(
    private spinner: NgxSpinnerService,
    private api: ApiService,
    public toastr: ToastrService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    this.dataSource = new MatTableDataSource<ComplienceCertificateDetails>([]);
    this.dataSource1 = new MatTableDataSource<GetCOMTyepDetails>([]);
  }

  ngOnInit() {
    this.GETMANLIC();
    this.GETMAScomplianceType();
    this.GETmasitemtypes();
    this.GetComplienceCertificateDetails();
  }

  //#region compliance Details
  onButtonClick1(){
    this.onshow= true;
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
  
  
//   DownloadFileWithName(mFilePath:any,mFileName:any) {
//     // https://dpdmis.in/VREGAPI/api/Registration/DownloadFileWithName?mFilePath=
//     // D%3A%5CVendorDocuments%5C50%5CNonConCertificate_235.pdf&mFileName=NonConCertificate_235.pdf
// 
// this.api.DownloadFileWithName(`/Registration/DownloadFileWithName?mFilePath=Documents\\50\\SUPWHO_31.pdf&mFileName=SUPWHO_31.pdf`)
//   .subscribe({
//     next: (res: Blob) => {
//       const blob = new Blob([res], { type: 'application/pdf' });
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = 'SUPWHO_31.pdf';
//       a.click();
//       window.URL.revokeObjectURL(url);
//     },
//     error: (err) => console.error('Download error:', err)
//   });

//       // this.api.DownloadFileWithName(mFilePath,mFileName).subscribe({
//       //   next: (res: any) => {
//       //     this.fileresp = res;
//       //     console.log('fileresp:', this.fileresp);
//       //   },
//       //   error: (err: any) => {
//       //     console.error('Error loading :', err);
//       //     // alert("Failed to load vendor details");
//       //   },
//       // });
//   }
onCheckboxChange(item: any) {
  if (!this.selecteditemtypeid) {
    this.selecteditemtypeid = [];
  }

  const id = item.itemtypeid;

  if (this.selecteditemtypeid.includes(id)) {
    // remove
    this.selecteditemtypeid = this.selecteditemtypeid.filter(x => x !== id);
  } else {
    // add
    this.selecteditemtypeid = [...this.selecteditemtypeid, id];
  }
}

  onButtonClick(id: any) {}
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
  }
  GETMANLIC() {
    this.api
      .GETMANLIC(
        sessionStorage.getItem('facilityid'),
        sessionStorage.getItem('vregid')
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
  OnselectItemtype(event: any) {
    // console.log('Selected itemtypeid:', event);
    // this.itemtypeid = event?.itemtypeid;
    // console.log('selecteditemtypeid:', this.selecteditemtypeid);
  }

  toggleSelection(id: number, event: any) {
    const checked = event.target.checked;
    if (checked) {
      if (!this.selecteditemtypeid.includes(id)) {
        this.selecteditemtypeid.push(id);
      }
    } else {
      this.selecteditemtypeid = this.selecteditemtypeid.filter((x) => x !== id);
    }
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

  // InsertComplianceCertificate1(data: any, formData: FormData): Observable<any> {
  // //post := https://dpdmis.in/VREGAPI/api/Registration/InsertComplianceCertificate?
  // // mlicid=53&mWHONO=65&mComid=2&mVergID=50&ISSUEDATE=01-02-2025&mstartdate=01-02-2025&mEXPDate=01-02-2027&mRemarks=dxzcv&mSupplierid=1936

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  }

  validateDates() {
    const start = new Date(this.mstartdate);
    const issue = new Date(this.ISSUEDATE);
    const validity = new Date(this.mEXPDate);
    this.validityerrorMsg = "";
    this.starterrorMsg = "";
  
    // Rule 1: Start Date must be >= Issue Date
    if (start < issue) {
      this.starterrorMsg = "Start Date cannot be earlier than Issue Date.";
      return false;
    }
  
    // Rule 2: Expiry Date must be >= Start Date AND Issue Date
    if (validity < start) {
      this.validityerrorMsg = "Expiry Date must be on or after Start Date.";
      return false;
    }
  
    if (validity < issue) {
      this.validityerrorMsg = "Expiry Date cannot be earlier than Issue Date.";
      return false;
    }
  
    return true;
  }
  
  InsertComplianceCertificate1(COMCForm: NgForm) {
    // ;
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
        'Error'
      );
      return;
    }
    // const formValues = COMCForm.value;
    const data = {
      mVergID: sessionStorage.getItem('vregid') || '',
      mSupplierid: sessionStorage.getItem('facilityid') || '',
      // mstateID: this.stateid?.toString() || '',
      mlicid: this.licid,
      mComid: this.comid,
      mWHONO: this.mWHONO,
      // ISSUEDATE: this.ISSUEDATE,
      // mstartdate: this.mstartdate,
      // mEXPDate: this.mEXPDate,
      ISSUEDATE: this.formatDate(this.ISSUEDATE),
      mstartdate: this.formatDate(this.mstartdate),
      mEXPDate: this.formatDate(this.mEXPDate),
      mRemarks: this.mRemarks,

      // ISSUEDATE: this.formatDate(formValues.ISSUEDATE),
      // mstartdate: this.formatDate(formValues.mstartdate),
      // mEXPDate: this.formatDate(formValues.mEXPDate),
      // mWHONO: formValues.mWHONO,
      // ISSUEDATE: formValues.ISSUEDATE,
      // mstartdate: formValues.mstartdate,
      // mEXPDate: formValues.mEXPDate,
      // mRemarks: formValues.mRemarks
    };
    // console.log('data=:', data);
    // return;
    try {
      this.api.InsertComplianceCertificate1(data, formData).subscribe({
        next: (res: any) => {
          // console.log('res=', res);
          this.toastr.success(
            res.message || 'Certificate uploaded successfully!',
            'Success'
          );
          // COMCForm.resetForm();
          // this.fileSelected = null;
          this.MASVREGWHOITEMTYPE(res, COMCForm);

        },
        error: (err: any) => {
          console.error('Error:', err);
          this.loadingSectionA = false;
          this.toastr.error('Failed to upload Compliance Certificate please try again', 'Error');
        },
      });
    } catch (error) {
      this.loadingSectionA = false;
      console.error('Exception:', error);
      this.toastr.error('Unexpected error occurred!');
    }
  }
  
  
  onFileSelectedCertificate(event: any) {
    // ;
    const file = event.target.files[0];
    if (file) {
      this.fileSelected = file;
      console.log('Selected file :', file.name);
    }
  }
  MASVREGWHOITEMTYPE(WHoid: any, COMCForm: NgForm) {
  
    console.log('whoid=', WHoid);
    console.log('selecteditemtypeid=', this.selecteditemtypeid);

    // if (COMCForm.invalid) {
    //   this.toastr.error('Please fill all required fields.', 'Error');
    //   return;
    // }
    // this.loadingSectionA = true;  
    const today = new Date();
    const entrydate = `${String(today.getDate()).padStart(2, '0')}-${String(
      today.getMonth() + 1
    ).padStart(2, '0')}-${today.getFullYear()}`;

    // const data = {
    //   whotypeid: 0,
    //   whoid: WHoid,
    //   itemtypeid: this.selecteditemtypeid, // make sure it's a single id or convert to int
    //   entrydate: entrydate
    // };
    const rows = this.selecteditemtypeid.map((id: any) => ({
      whotypeid: 0,
      whoid: WHoid,
      itemtypeid: id,
      entrydate: entrydate,
    }));
    // console.log('data to send:', rows);`
    const vregid = sessionStorage.getItem('vregid') || '';
    // return;
    this.api
      .post1(`/Registration/MASVREGWHOITEMTYPE?vregid=${vregid}`, rows)
      .subscribe({
        next: (res: any) => {
          this.toastr.success(
            res.message || 'Data submitted successfully!',
            'Success'
          );
          COMCForm.resetForm();
          this.fileSelected = null;
          this.GetComplienceCertificateDetails();
           this.loadingSectionA = false;  
          this.onshow=false;
        },
        error: (err: any) => {
          console.error('Error submitting data:', err);
          this.loadingSectionA = false;
          this.toastr.error('Failed to submit data', 'Error');
        },
      });
  }


  GetComplienceCertificateDetails() {
    try {
      this.spinner.show();
      this.api
        .GetComplienceCertificateDetails(
          sessionStorage.getItem('vregid'),
          sessionStorage.getItem('facilityid')
        )
        // this.Service.get('GetDrugTenderList?n=0')
        .subscribe(
          (res: any) => {
            this.dispatchData = res.map(
              (item: ComplienceCertificateDetails, index: number) => ({
                ...item,
                sno: index + 1,
              })
            );
            // console.log('GetComplienceCertificateDetails=:', this.dispatchData);
            this.dataSource.data = this.dispatchData;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
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
  applyTextFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  exportToPDF() {}

GettypedetailsDetails(mWHOID: any) {
  this.spinner.show();

  this.api.GettypedetailsDetails(sessionStorage.getItem('vregid'), mWHOID)
    .subscribe({
      next: (res: any) => {
        this.COMTyepDetailsdata = res.map((d: any, i: number) => ({
          ...d,
          sno: i + 1,
        }));
        this.spinner.hide();
      },
      error: () => {
        this.COMTyepDetailsdata = [];
        this.spinner.hide();
      }
    });
}
  // GettypedetailsDetails(mWHOID: any) {
  //   // https://dpdmis.in/VREGAPI/api/Registration/GetCOMTyepDetails?VregID=50&mWHOID=21
  //   try {
  //     this.spinner.show();
  //     this.api
  //       .GettypedetailsDetails(sessionStorage.getItem('vregid'), mWHOID)
  //       .subscribe(
  //         (res: any) => {
  //           this.COMTyepDetailsdata= res.map(
  //             (item: any, index: number) => ({
  //               ...item,
  //               sno: index + 1,
  //             })
  //           );
  //           // this.dispatchData1 = res.map(
  //           //   (item: any, index: number) => ({
  //           //     ...item,
  //           //     sno: index + 1,
  //           //   })
  //           // );
  //           console.log('GetCOMTyepDetails=:', this.COMTyepDetailsdata);

  //           // this.GetCOMTyepDetails = this.dispatchData1;
  //           // this.dataSource1.data =this.GetCOMTyepDetails;
  //           // this.dataSource1.data = this.dispatchData1;
  //           // this.dataSource1.paginator = this.paginator1;
  //           // this.dataSource1.sort = this.sort1;
  //           // this.cdr.detectChanges();
  //           this.spinner.hide();
  //         },
  //         (error: { message: any }) => {
  //           this.spinner.hide();
  //           console.log('Error fetching data:',JSON.stringify(error.message))
  //           // alert(`Error fetching data: ${JSON.stringify(error.message)}`);
  //         }
  //       );
  //   } catch (err: any) {
  //     this.spinner.hide();

  //     console.log(err);
  //     // throw err;
  //   }
  //   this.openModal();
  // }
  applyTextFilter1(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();
  }
  exportToPDF1() {}
  openModal(): void {
    document.querySelectorAll('.modal-backdrop').forEach((el) => el.remove());
    const modalEl = document.getElementById('whoidModal')!;
    document.body.appendChild(modalEl);
    (modalEl as HTMLElement).style.zIndex = '99999';

    const modal = new bootstrap.Modal(modalEl, {
      backdrop: 'static',
      keyboard: true,
      focus: true,
    });
    modal.show();
  }
  //#endregion
}
