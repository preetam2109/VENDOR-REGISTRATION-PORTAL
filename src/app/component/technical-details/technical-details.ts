import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component ,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
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
import { TechnicalDetails_model } from 'src/app/Model/VendorRegisDetail';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-technical-details',
  standalone: true,
   imports: [NgSelectModule,CommonModule,FormsModule,CollapseModule,NgbCollapseModule,ReactiveFormsModule,MatTabsModule,
     MaterialModule,MatSortModule, MatPaginatorModule, MatOptionModule,MatProgressSpinnerModule,MatTableExporterModule
       
   ], 
  templateUrl: './technical-details.html',
  styleUrl: './technical-details.css'
})
export class TechnicalDetails {
  NonConvcerCertificate: File | null = null;
  TechCertificate1: File | null = null;
  TechCertificate2: File | null = null;
  TechCertificate3: File | null = null;
  TechCertificate4: File | null = null;
  TechCertificate5: File | null = null;
  TechCertificate6: File | null = null;
  TechnicalDetails:any;
  sanitizedPdfUrl!: SafeResourceUrl;
  fileError: string = '';
  loadingSectionA = false;
    dataSource!: MatTableDataSource<TechnicalDetails_model>;
    @ViewChild('paginator') paginator!: MatPaginator;
    @ViewChild('sort') sort!: MatSort;
     dispatchData: TechnicalDetails_model[] = [];
      // dispatchData3: GstReturnDetails[] = [];'filepath',
      displayedColumns: string[] = [
        'sno',
        'code',
        // 'fileid',
        'filename',
        // 'vregid',
        // 'mscid',
        // 'ext',
        // 'filepath',
        // 'action',
      ];
      onshow=false;
      events:any;
  constructor(private spinner: NgxSpinnerService,private api: ApiService,public toastr: ToastrService, private fb: FormBuilder,
    private cdr: ChangeDetectorRef, private router: Router,  private sanitizer: DomSanitizer,
  ){this.dataSource = new MatTableDataSource<TechnicalDetails_model>([]);}
  ngOnInit() {
    this.GetTechnicalDetails();
  
  }
  //#region InsertTechnicalDetails
  onFileSelect(event: any, fileNo: number): void {
  //  this.events= event.target.value;
    const file = event.target?.files?.[0] || null;
  
    switch (fileNo) {
      case 0: this.NonConvcerCertificate = file; break;
      case 1: this.TechCertificate1 = file; break;
      case 2: this.TechCertificate2 = file; break;
      case 3: this.TechCertificate3 = file; break;
      case 4: this.TechCertificate4 = file; break;
      case 5: this.TechCertificate5 = file; break;
      case 6: this.TechCertificate6 = file; break;
    }
  }
  // onFileSelect(event: any,no:any): void {
  //   const file = event.target?.files?.[0] || null;
  //   this.fileError = ''; // reset error
  
  //   if (!file) {
  //     this.fileError = 'Please upload the Non Conviction Certificate.';
  //     this.NonConvcerCertificate = null;
  //     return;
  //   }
  
  //   // ✅ Check file type
  //   if (file.type !== 'application/pdf') {
  //     this.fileError = 'Only PDF files are allowed.';
  //     event.target.value = '';
  //     return;
  //   }
  
  //   // ✅ Check file size (max 10MB)
  //   const maxSizeMB = 10;
  //   if (file.size > maxSizeMB * 1024 * 1024) {
  //     this.fileError = `File size should not exceed ${maxSizeMB} MB.`;
  //     event.target.value = '';
  //     return;
  //   }
  
  //   // ✅ File valid
  //   this.NonConvcerCertificate = file;
  // }
  
  // SSICertificateID = "7";
  // NonConvcerID = "41";
  //  tecCertificateID = "42";
  //  PerformanceID = "43";
  //  SelfAfidevitID = "45";
  //   string CapacityOfProd = "81";

  InsertTechnicalDetails(mFileTypeid: number) {

    const formData = new FormData();
    let selectedFile: File | null = null;
  
   
    switch (mFileTypeid) {
      case 7:  // SSI Certificate
        selectedFile = this.TechCertificate5;
        break;
  
      case 41: // Non Conviction Certificate
        selectedFile = this.NonConvcerCertificate;
        break;
  
      case 42: // Technical Certificate
        selectedFile = this.TechCertificate3;
        break;
  
      case 43: // Performance Certificate
        selectedFile = this.TechCertificate1;
        break;
  
      case 45: // Self Affidavit
        selectedFile = this.TechCertificate2;
        break;
  
      case 81: // Capacity of Production
        selectedFile = this.TechCertificate4;
        break;
  
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
      mFileTypeID: mFileTypeid.toString()
    };
  
    //  API Call
    try {
      this.loadingSectionA = true;  
      this.api.InsertTechnicalDetails(data, formData).subscribe({
        next: (res: any) => {
          this.toastr.success(
            res.message || 'File uploaded successfully!',
            'Success'
          );
          console.log('Upload Success:', res);
  
          // Reset only uploaded file variable
          switch (mFileTypeid) {
            case 7: this.TechCertificate1 = null; break;
            case 41: this.NonConvcerCertificate = null;  break;
            case 42: this.TechCertificate2 = null;   break;
            case 43: this.TechCertificate3 = null; break;
            case 45: this.TechCertificate4 = null; break;
            case 81: this.TechCertificate5 = null;  break;
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
  
 // onFileSelectedNonConvcerCertificate(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.NonConvcerCertificate = file;
  //     console.log('Selected file :', file.name);
  //   }
  // //  this.InsertTechnicalDetails();
  // }
 
  // onFileSelectedCertificate1(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.TechCertificate1 = file;
  //     console.log('Selected file :', file.name);
  //   }
  // //  this.InsertTechnicalDetails();
  // }
  // onFileSelectedCertificate2(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.TechCertificate2 = file;
  //     console.log('Selected file :', file.name);
  //   }
  // //  this.InsertTechnicalDetails();
  // }
  // onFileSelectedCertificate3(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.TechCertificate3 = file;
  //     console.log('Selected file :', file.name);
  //   }
  // //  this.InsertTechnicalDetails();
  // }
  // onFileSelectedCertificate4(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.TechCertificate4 = file;
  //     console.log('Selected file :', file.name);
  //   }
  // //  this.InsertTechnicalDetails();
  // }
  // onFileSelectedCertificate5(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.TechCertificate5 = file;
  //     console.log('Selected file :', file.name);
  //   }
  // //  this.InsertTechnicalDetails();
  // }
  // onFileSelectedCertificate6(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.TechCertificate6 = file;
  //     console.log('Selected file :', file.name);
  //   }
  // //  this.InsertTechnicalDetails();
  // }

  // InsertTechnicalDetails(mFileTypeid:any) {
  //   ;
  //   const formData = new FormData();
  //   // const mFileTypeid=41;
  //   //    if (GSTForm.invalid) {
  //   //   this.toastr.error('Please fill all required fields.', 'Error');
  //   //   return;
  //   // }
  //       if (this.NonConvcerCertificate) {
  //         formData.append('PanCardDocument', this.NonConvcerCertificate);
  //       } else {
  //         console.error('❌ No Non Convcer Certificate certificate file selected!');
  //         return;
  //       }
  //       const data = {
  //         mVergID: sessionStorage.getItem('vregid') || '',
  //         mFileTypeID:mFileTypeid
  //       };
  //     try {
  //       this.api.InsertTechnicalDetails(data, formData).subscribe
  //       ({
  //             next: (res: any) => {
  //               this.toastr.success(res.message || 'Non Conviction Certificate Certificate uploaded successfully!', 'Success');
  //               // GSTForm.resetForm();
  //               this.NonConvcerCertificate = null;
  //             },
  //             error: (err: any) => {
  //               console.error('Error:', err);
  //               this.toastr.error('Failed to upload Non Conviction Certificate', 'Error');
  //             },
  //           }); 
  //     } catch (error) {
  //       console.error('Exception:', error);
  //       this.toastr.error('Unexpected error occurred!');
  //     }
  //   }


    // {
    //   "vregid": "50",
    //   "mscid": "22",
    //   "filename": "Pancard_184.pdf.pdf",
    //   "ext": ".pdf",
    //   "fileid": "184",
    //   "code": "Pan Card",
    //   "filepath": "D:\\VendorDocuments\\50\\Pancard_184.pdf"
    // },
    GetTechnicalDetails(){
  try {
     
      this.spinner.show();
      this.api.GetTechnicalDetails(sessionStorage.getItem('vregid') ).subscribe(
          (res: any) => {
            this.dispatchData = res.map(
              (item: TechnicalDetails_model, index: number) => ({
                ...item,
                sno: index + 1,
              })
            );
            this.TechnicalDetails=this.dispatchData;
            // console.log('TechnicalDetails=:', this.dispatchData);
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

// return

      // this.api.GetTechnicalDetails(sessionStorage.getItem('vregid')).subscribe({
      //   next: (res: any) => {
      //    this.TechnicalDetails=res;
      //   //  console.log("GetTechnicalDetails:", this.TechnicalDetails);
      //   },
      //   error: (err: any) => {
      //     console.error("Error loading Years:", err);
      //     // alert("Failed to load vendor details");
      //   }
      // });
    }
    clickdetailspdf(mscid: number) {
      // Ensure data is loaded
     
    }
    
    DownloadFileWithName1(mFilePath: string, mFileName: string) {
    
  
      // Encode file path and file name to handle special characters (like spaces, \ etc.)
      const encodedPath = encodeURIComponent(mFilePath);
      const encodedName = encodeURIComponent(mFileName);
    
      // Build dynamic API URL
      const apiUrl = `/Registration/DownloadFileWithName?mFilePath=${encodedPath}&mFileName=${encodedName}`;
    
      this.api.DownloadFileWithName(apiUrl).subscribe({
        next: (res: Blob) => {
          const blob = new Blob([res], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          this.openmarqModal(url);
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
    DownloadFileWithName(mscid:any) {
      // ;mFilePath: string, mFileName: string ,
      let mFileName: any;
      let mFilePath: any;
      // ;
      if (!this.TechnicalDetails || this.TechnicalDetails.length === 0) {
        console.error("Technical details not loaded yet!");
        return;
      }
    
      // Find the matching file
      const file = this.TechnicalDetails.find((f: any) => f.mscid == mscid);
    
      if (file) {
        mFileName= file.filename;
        mFilePath= file.filepath;
        // console.log("Matched File:", file);
        // console.log("File Name:", file.filename);
        // console.log("File Path:", file.filepath);
    
       
        // If your API provides downloadable links, you can open them directly:
        // window.open(file.filepath, '_blank'); // ⚠ Only works if it's a valid URL, not local path
    
      } else {
        console.warn(`No file found for fileid: ${mscid}`);
      }
    
      // Encode file path and file name to handle special characters (like spaces, \ etc.)
      const encodedPath = encodeURIComponent(mFilePath);
      const encodedName = encodeURIComponent(mFileName);
    
      // Build dynamic API URL
      const apiUrl = `/Registration/DownloadFileWithName?mFilePath=${encodedPath}&mFileName=${encodedName}`;
    
      this.api.DownloadFileWithName(apiUrl).subscribe({
        next: (res: Blob) => {
          const blob = new Blob([res], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          this.openmarqModal(url);
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
    applyTextFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    onButtonClick1(){
      this.onshow= true;
     }
  //#endregion
}
