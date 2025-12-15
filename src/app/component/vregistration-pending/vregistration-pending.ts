import { Component,ViewChild,ChangeDetectorRef} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators,FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatTableExporterModule } from 'mat-table-exporter';
import { CollapseModule } from 'src/app/collapse';
import { MaterialModule } from 'src/app/material-module';
import { registeredVendorsdata } from 'src/app/Model/VendorRegisDetail';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
declare var bootstrap: any;
@Component({
  selector: 'app-vregistration-pending',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule,
   NgSelectModule,CommonModule,FormsModule,CollapseModule,NgbCollapseModule,ReactiveFormsModule,MatTabsModule,
       MaterialModule,MatSortModule, MatPaginatorModule,MatTableModule,MatDialogModule,MatSelectModule, MatOptionModule,
         MatTableExporterModule,MatProgressSpinnerModule
   ],
  templateUrl: './vregistration-pending.html',
  styleUrl: './vregistration-pending.css'
})
export class VRegistrationPending {
 roleName: any = localStorage.getItem('roleName');
  vregid: any;
  vendorDetails: any[] = [];
  showButtons:boolean=true;
  status:any;
  // registeredVendorsdata
  sanitizedPdfUrl!: SafeResourceUrl;
 dataSource!: MatTableDataSource<registeredVendorsdata>;
    @ViewChild('paginator') paginator!: MatPaginator;
    @ViewChild('sort') sort!: MatSort;
      dispatchData: registeredVendorsdata[] = [];
      currentBlobUrl: string | null = null; // Track current URL for revocation

      displayedColumns: string[] = [
        'sno','vregno','regdate','supplierName','pancardno','phone1',
         'authName','authMobileNo','authEmail','authSigName','authSigMobileNo',
         'authSigEmailId','status','action'
       
        // vregid: number
        // vregno: string
        // regdate: string
        // bankaccountid: string
        // pancardno: string
        // status: string
        // supplierName: string
        // phone1: string
        // authName: any
        // authEmail: any
        // authMobileNo: any
        // authSigName: any
        // authSigMobileNo: any
        // authSigEmailId: any
        // supplierid: string
      ];

  constructor(private sanitizer: DomSanitizer, private spinner: NgxSpinnerService,private api: ApiService,public toastr: ToastrService, private fb: FormBuilder,
        private cdr: ChangeDetectorRef, private router: Router){
    // this.form1 = this.fb.group({ name: ['', Validators.required] });
    // this.form2 = this.fb.group({ review: ['', Validators.required] });
     this.dataSource = new MatTableDataSource<registeredVendorsdata>([]);
  }

  ngOnInit() {
    this.GetVendorDetailsID();
    
  }
  loadVendorDetails(supplierid:any) {
  
    this.api.getVendorDetails(supplierid).subscribe({
      next: (res: any) => {
        if (res && res.length > 0) {
           const mFilePath=res[0].filepath
           const mFileName=res[0].filename
           this.DownloadFileWithName(mFilePath,mFileName)
        }
      },
      error: (err) => {
        console.error("Error loading vendor details:", err);
        alert("Failed to load vendor details");
      }
    });
  }
  DownloadFileWithName(mFilePath: string, mFileName: string) {
    // Encode file path and file name to handle special characters (like spaces, \ etc.)
    const encodedPath = encodeURIComponent(mFilePath);
    const encodedName = encodeURIComponent(mFileName);

    // Build dynamic API URL
    const apiUrl = `/Registration/DownloadFileWithName?mFilePath=${encodedPath}&mFileName=${encodedName}`;

    this.api.DownloadFileWithName(apiUrl).subscribe({
      next: (res: Blob) => {
        // Revoke previous URL if exists (prevents stale blobs)
        if (this.currentBlobUrl) {
          window.URL.revokeObjectURL(this.currentBlobUrl);
        }
        const pdfURL = URL.createObjectURL(res);
          window.open(pdfURL, "_blank");

        // const blob = new Blob([res], { type: 'application/pdf' });
        // const url = window.URL.createObjectURL(blob);
        // this.currentBlobUrl = url; 
        // this.openmarqModal(url, mFileName); 


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

  openmarqModal(pdfUrl: string, fileName: string = 'PDF Preview'): void {
    this.sanitizedPdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);

    // Remove any leftover backdrops (from previous opens)
    document.querySelectorAll('.modal-backdrop').forEach((el) => el.remove());

    const modalEl = document.getElementById('pdfModal')!;
    // Ensure modal appended to body so it sits above other layout elements
    document.body.appendChild(modalEl);

    // Optional: force z-index higher than anything else on page
    (modalEl as HTMLElement).style.zIndex = '99999';

    const modal = new bootstrap.Modal(modalEl, {
      backdrop: false, // no backdrop
      keyboard: true,
      focus: true,
    });
    modal.show();

    // Add event listener for modal close to revoke URL and clean up
    modalEl.addEventListener('hidden.bs.modal', () => {
      if (this.currentBlobUrl) {
        window.URL.revokeObjectURL(this.currentBlobUrl);
        this.currentBlobUrl = null;
      }
      // Clear iframe src to prevent stale display
      const iframe = modalEl.querySelector('iframe');
      if (iframe) {
        (iframe as HTMLIFrameElement).src = '';
      }
      this.sanitizedPdfUrl = ''; // Reset sanitizer
    }, { once: true }); // Listener only for this open

    // Update title if passed
    const titleEl = modalEl.querySelector('.modal-title');
    if (titleEl) {
      titleEl.textContent = fileName || 'PDF Preview';
    }
  }

  onClick(status:any){
    if(status=='Complete'){
      return
    }
    this.router.navigate(['personal-detail'])

  }
  GetVendorDetailsID(){
        try{
          this.spinner.show();
        this.api.getVendorDetailsID(0).subscribe(
            // (res:any) => {
            //   this.dispatchData = res.map(
            //     (item: registeredVendorsdata, index: number) => ({
            //       ...item,
            //       sno: index + 1,
            //     })
            //   );
            // (res: any[]) => {

            //   // ✅ Sirf Complete status ka data
            //   const filteredData = res
            //     .filter(item => item.status === 'Complete')
            //     .map((item, index) => ({
            //       ...item,
            //       sno: index + 1
            //     }));
            (res: any) => {

              const data = res as any[];
          
              const filteredData = data
                .filter(item => item.status === 'Incomplete')
                .map((item, index) => ({
                  ...item,
                  sno: index + 1
                }));
              // console.log('registeredVendorsdata=:', this.dispatchData);
              
        this.dispatchData = filteredData;
        this.dataSource.data = filteredData;

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.cdr.detectChanges();
        this.spinner.hide();
              // this.dataSource.data = this.dispatchData;
              // this.dataSource.paginator = this.paginator;
              // this.dataSource.sort = this.sort;
              // this.cdr.detectChanges();
              // this.spinner.hide();
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



  generate() {
    return;
    try {
      this.api.RegisterVendor(sessionStorage.getItem('facilityid')).subscribe({
        next: (res: string) => {
          console.log('Response:', res);
          this.toastr.success(`Vendor registration generated successfully! Registration No: ${res}`, 'Success');
          console.log(JSON.stringify(res))
          sessionStorage.setItem('vregid',res)
          // this.GetVendorDetailsID(sessionStorage.getItem('facilityid'));
        },
        error: (err) => {
          console.error('API Error:', err);
          this.toastr.error('Failed to generate vendor registration. Please try again.', 'Error');
        }
      });
    } catch (error) {
      console.error('Unexpected Error:', error);
      this.toastr.error('Something went wrong. Please contact support.', 'Error');
    }
  }


  

  // GetVendorDetailsID1() {
  //   this.api.getVendorDetailsID(0).subscribe({
  //     next: (res: any) => {
  //       if (Array.isArray(res) && res.length > 0) {
  //         this.vendorDetails = res;
  //         if(res[0].status==='Complete')[
  //           this.showButtons=false
  //         ]
  //         console.log('Vendor Details:', this.vendorDetails);
  //         this.vregid = res[0].vregid;
  //         sessionStorage.setItem('vregid', this.vregid);
  //       } else {
  //         console.warn('No vendor details found.');
  //       }
  //     },
  //     error: (err) => {
  //       console.error('Error fetching vendor details:', err);
  //     }
  //   });
  // }
  
  
  // onClickV(vendor: any) {
  //   console.log('Clicked Vendor:', vendor);
  // }
  deleteVendor(vendor: any) {
    console.log('Delete Vendor:', vendor);
  }
  
  
//  onButtonClick(vregid:any,supid:any){
//   // VendorRegistrationApproved
//   this.router.navigate(['VendorRegistrationApproved'])
//   }
  onButtonClickT(vregid: any, supid: any) {
    this.router.navigate(
      ['ApprovalTechnicalCrt'],
      { 
        queryParams: {
          vregid: vregid,
          supid: supid
        }
      }
    );
  }
  onButtonClick(vregid: any, supid: any) {
    this.router.navigate(
      ['VendorRegistrationApproved'],
      { 
        queryParams: {
          vregid: vregid,
          supid: supid
        }
      }
    );
  }
  
}
