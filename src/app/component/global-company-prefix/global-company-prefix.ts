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
import { ComplienceCertificateDetails, GetCOMTyepDetails, GetGCPDetails, licenseModel } from 'src/app/Model/VendorRegisDetail';
import { ApiService } from 'src/app/service/api.service';
import { NgForm } from '@angular/forms';
declare var bootstrap: any;
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { threadCpuUsage } from 'process';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-global-company-prefix',
  standalone:true,
  imports: [NgSelectModule,CommonModule,FormsModule,CollapseModule,NgbCollapseModule,ReactiveFormsModule,MatTabsModule,
    MaterialModule,MatSortModule, MatPaginatorModule,MatTableModule,MatDialogModule,MatSelectModule, MatOptionModule,
      MatTableExporterModule,MatProgressSpinnerModule],
  templateUrl: './global-company-prefix.html',
  styleUrl: './global-company-prefix.css'
})
export class GlobalCompanyPrefix {
  today: string = new Date().toISOString().split("T")[0];
  errorMsg:any;
onshow:boolean=false;
loadingSectionA:boolean=false;
    fileSelected: File | null = null;
    sanitizedPdfUrl!: SafeResourceUrl;
    ISSUEDATE: string = '';
  mstartdate: string = '';
  mEXPDate: string = '';
  mGCpNo: any ;
  validityerrorMsg:any;
  starterrorMsg:any;
   dataSource!: MatTableDataSource<GetGCPDetails>;
    @ViewChild('paginator') paginator!: MatPaginator;
    @ViewChild('sort') sort!: MatSort;
      dispatchData: GetGCPDetails[] = [];
      displayedColumns: string[] = [
        'sno','gcpno','issuedate','startdate',
        'expdate','filename',
        // 'action','delete'
       
      ];
   constructor(private spinner: NgxSpinnerService,private api: ApiService,public toastr: ToastrService, private fb: FormBuilder,
      private cdr: ChangeDetectorRef, private router: Router,  private sanitizer: DomSanitizer,
    ){
       this.dataSource = new MatTableDataSource<GetGCPDetails>([]);
       
    }
  
  
  ngOnInit() {
    this.GetGCPDetails();
  }
  
  //#region 
  onButtonClick(id:any){
  
  }
  onButtonClick1(){
    this.onshow= true;
   }
  DownloadFileWithName(mFilePath: string, mFileName: string) {
    // ;
  
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
        if (err.status === 0 && err.statusText === 'Unknown Error') {
          // ✅ Show toaster or alert message
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
  }

  
 
  formatDate(dateString: string): string {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  }
  
  InsertGCP(GCPForm: NgForm) {

this.loadingSectionA=true;
    const formData = new FormData();
       if (GCPForm.invalid) {
      this.toastr.error('Please fill all required fields.', 'Error');
      return;
    }
        if (this.fileSelected) {
          formData.append('PanCardDocument', this.fileSelected);
        } else {
          this.toastr.error('Please select a Compliance Certificate file.', 'Error');
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
           mVergID: sessionStorage.getItem('vregid') || '',
           mGCpNo: formValues.mGCpNo,
          ISSUEDATE: this.formatDate(formValues.ISSUEDATE),
          mstartdate: this.formatDate(formValues.mstartdate),
          mEXPDate: this.formatDate(formValues.mEXPDate),
          // ISSUEDATE: formValues.ISSUEDATE,
          // mstartdate: formValues.mstartdate,
          // mEXPDate: formValues.mEXPDate
        };
        console.log('data=:',data);
        // return;
      try {
        this.api.InsertGCP(data, formData).subscribe
        ({
              next: (res: any) => {
                console.log('res=',res);
                 this.toastr.success(res.message || 'Certificate uploaded successfully!', 'Success');
                 GCPForm.resetForm();
                this.fileSelected = null;
                this.GetGCPDetails();
                this.onshow=false;
                this.loadingSectionA=false;
              },
              error: (err: any) => {
                console.error('Error:', err);
                this.loadingSectionA=false;
                this.toastr.error('Failed to upload Compliance Certificate', 'Error');
              },
            }); 
      } catch (error) {
        console.error('Exception:', error);
        this.toastr.error('Unexpected error occurred!');
      }
    }
    onFileSelected(event: any) {
      const file = event.target.files[0];
      if (file) {
        this.fileSelected = file;
        // console.log('Selected file :', file.name);
      }
    }
  
  
    GetGCPDetails(){
        try{
          this.spinner.show();
        this.api.GetGCPDetails(sessionStorage.getItem('vregid'))
          .subscribe(
            (res:any) => {
              this.dispatchData = res.map(
                (item: GetGCPDetails, index: number) => ({
                  ...item,
                  sno: index + 1,
                })
              );
              // console.log('GetGCPDetails=:', this.dispatchData);
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
      exportToPDF(){
    
      }
      validateDates() {
        // ;
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
      // validateDates() {
      //   const start = new Date(this.mstartdate);
      //   const issue = new Date(this.ISSUEDATE);
      //   const validity = new Date(this.mEXPDate);
      //   this.errorMsg = "";
      
      //   // Rule 1: Start Date must be >= Issue Date
      //   if (start < issue) {
      //     this.errorMsg = "Start Date cannot be earlier than Issue Date.";
      //     return false;
      //   }
      
      //   // Rule 2: Expiry Date must be >= Start Date AND Issue Date
      //   if (validity < start) {
      //     this.errorMsg = "Expiry Date must be on or after Start Date.";
      //     return false;
      //   }
      
      //   if (validity < issue) {
      //     this.errorMsg = "Expiry Date cannot be earlier than Issue Date.";
      //     return false;
      //   }
      
      //   return true;
      // }
      
  
  //#endregion
}
