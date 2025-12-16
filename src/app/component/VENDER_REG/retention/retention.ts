import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableExporterModule } from 'mat-table-exporter';
import { DropdownModule } from 'primeng/dropdown';
import { MatMenuModule } from "@angular/material/menu";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { CollapseModule } from 'src/app/collapse';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
declare var bootstrap: any;
@Component({
  selector: 'app-retention',
  standalone:true,
  imports: [MatDialogModule,MatTableExporterModule, MatSortModule,
     DropdownModule, FormsModule, NgSelectModule, FormsModule, CommonModule,
      MatPaginatorModule, MatTableModule, CommonModule, FormsModule, NgSelectModule, MatProgressSpinnerModule,
      ReactiveFormsModule, MatMenuModule, CollapseModule, NgbCollapseModule, MatIconModule],
  templateUrl: './retention.html',
  styleUrl: './retention.css'
})
export class Retention {
  dataSource!: MatTableDataSource<any[]>;
  dataSource2!: MatTableDataSource<any[]>;

  today: string = new Date().toISOString().split("T")[0];
  validityerrorMsg:any;
  starterrorMsg:any;
  validityerrorMsg1:any;
  starterrorMsg1:any;
  

  sanitizedPdfUrl!: SafeResourceUrl;
  
  isCollapsed = false;
  isCollapsed1 = true;
  isCollapsed2 = true;
  isCollapsed3 = true;
  isEventOpen = false;
  submitted = false;
  onshowRetentionForm = false;
  onshowRetentionForm2 = false;
  loadingSectionA = false;
  loadingSectionB = false;
  vregid = sessionStorage.getItem('vregid');
  
  RetentionForm!: FormGroup;
  RetentionForm2!: FormGroup;

  
  ManLicDdllist: any
  MasimportertypeDDL: any
  DDlImprtLic: any
  

  selectedPanFile: File | null = null;
  selectedPanFile2  : File | null = null;

  

  


  

  importerLicenceList:any;
  ImportRetentionList:any;

  
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('sort') sort!: MatSort;
  @ViewChild('paginator1') paginator1!: MatPaginator;
  @ViewChild('sort1') sort1!: MatSort;

  constructor(private sanitizer: DomSanitizer,private dialog: MatDialog,private cdr: ChangeDetectorRef, private spinner: NgxSpinnerService, private api: ApiService, public toastr: ToastrService, private fb: FormBuilder) {
    this.dataSource = new MatTableDataSource<any>([]);
    this.dataSource2 = new MatTableDataSource<any>([]);

  }

  ngOnInit() {
    this.vregid = sessionStorage.getItem('vregid');
    this.GetmMANLICDDL();
    this.GETtMasimportertype()

    
    
    this.GETImporterLicenceDetails();


    this.RetentionForm = this.fb.group({
      mLICID: ['', Validators.required],
      mImptypeid: ['', Validators.required],
      mIMPLICNO: ['', Validators.required],
      mISSUEDATE: ['', Validators.required],
      mStartDate: ['', Validators.required],
      mVALIDITYDATE: ['', Validators.required],        
      mVregid: [this.vregid, Validators.required],
      mIMPIssuingAuthority: ['', Validators.required],       
      Files: [null, Validators.required],  
    });
    

    this.GETtDDlImprtLic();
    this.GETImportRetentionDetails();

    this.RetentionForm2 = this.fb.group({
      mIMPID: ['', Validators.required],
      mISSUEDATE: ['', Validators.required],
      mStartDate: ['', Validators.required],
      mVALIDITYDATE: ['', Validators.required],        
      mVregid: [this.vregid, Validators.required],        
      mIMPRETIssuingAuthority: ['', Validators.required],        
      Files: [null, Validators.required],    
    });

  }
  onshowButtonClick(){
    this.onshowRetentionForm=true;
  }
  onshowButtonClick1(){
    this.onshowRetentionForm2=true;
  }
  DownloadFileWithName(mFilePath: string, mFileName: string) {
    ;
  
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
    this.sanitizedPdfUrl =
      this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);

    // Remove any leftover backdrops (from previous opens)
    document.querySelectorAll('.modal-backdrop').forEach((el) => el.remove());

    const modalEl = document.getElementById('pdfModal')!;
    // ensure modal appended to body so it sits above other layout elements
    document.body.appendChild(modalEl);

    // Optional: force z-index higher than anything else on page
    (modalEl as HTMLElement).style.zIndex = '99999';

    const modal = new bootstrap.Modal(modalEl, {
      backdrop: false, // no backdrop
      keyboard: true,
      focus: true,
    });
    modal.show();
  }

   ngAfterViewChecked() {
    console.log('Form valid:', this.RetentionForm.valid);
    console.log('Form values:', this.RetentionForm.value);
  }


 



 

  

  
  GetmMANLICDDL() {

    this.api.getmMANLICDDL(sessionStorage.getItem('facilityid'), sessionStorage.getItem('vregid'), 0).subscribe((res: any[]) => {
      if (res && res.length > 0) {
        this.ManLicDdllist = res.map(item => ({
          licid: item.licid,
          manfacname: item.manfacname,
        }));

        console.log('manfacname items', res)
      } else {
        console.error('No manfacname found or incorrect structure:', res);
      }
    });
  }

  GETtMasimportertype(){
    this.api.GetMasimportertype().subscribe((res: any[]) => {
      if (res && res.length > 0) {
        this.MasimportertypeDDL=res.map(item => ({
          imptypeid: item.imptypeid,
          imptypename: item.imptypename,
        }));

        console.log('imptypename items', res)
      } else {
        console.error('No imptypename found or incorrect structure:', res);
      }
    });
  }
  GETtDDlImprtLic(){
    this.api.GetDDlImprtLic(this.vregid).subscribe((res: any[]) => {
      if (res && res.length > 0) {
        this.DDlImprtLic=res.map(item => ({
          impId: item.impId,
          impTypeName: item.impTypeName,
        }));

        console.log('impTypeName items', res)
      } else {
        console.error('No impTypeName found or incorrect structure:', res);
      }
    });
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedPanFile = file;
      console.log('Selected file :', file.name);
    }
  }
  onFileSelected2(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedPanFile2 = file;
      console.log('Selected file :', file.name);
    }
  }
  
  
 
 
 
// Helper function to format date as dd-MM-yyyy
formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = ('0' + date.getDate()).slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}
  

  onSubmit() {
    this.loadingSectionA=true;
   this.submitted = true;
    const formData = new FormData();

    // Append file if selected
    if (this.selectedPanFile) {
      formData.append('PanCardDocument', this.selectedPanFile);
    }

    if (this.RetentionForm.invalid) {
      this.toastr.warning('Please fill all required fields correctly!');
      return;
    }

    this.RetentionForm.patchValue({
      mVregid: this.vregid
    });


    
  
    // const params = this.RetentionForm.value;


      // Format dates to dd-MM-yyyy
      const params = {
        ...this.RetentionForm.value,
        mISSUEDATE: this.formatDate(this.RetentionForm.value.mISSUEDATE),
        mStartDate: this.formatDate(this.RetentionForm.value.mStartDate),
        mVALIDITYDATE: this.formatDate(this.RetentionForm.value.mVALIDITYDATE),
      };
  
    try {
      this.api.postMasimporterdocument(params,formData).subscribe({
        next: (res) => {
          this.toastr.success('Importer Licence saved successfully!');
          console.log('API Response:', res);
          this.RetentionForm.reset();
          this.submitted = false;
          this.RetentionForm.patchValue({
            mVregid: this.vregid
          });
          this.GETImporterLicenceDetails();
          this.onshowRetentionForm=false;
          this.loadingSectionA=false;
        },
        error: (err) => {
          console.error('Error:', err);
          this.toastr.error('Failed to save data!');
        }
      });
    } catch (error) {
      console.error('Exception:', error);
      this.toastr.error('Unexpected error occurred!');
    }
  }

  onSubmit2() {
    this.loadingSectionB=true;
    this.submitted = true;
    const formData = new FormData();

    // Append file if selected
    if (this.selectedPanFile2) {
      formData.append('PanCardDocument', this.selectedPanFile2);
    }

    if (this.RetentionForm2.invalid) {
      this.toastr.warning('Please fill all required fields correctly!');
      return;
    }

    this.RetentionForm2.patchValue({
      mVregid: this.vregid
    });


    
  
    // const params = this.RetentionForm.value;


      // Format dates to dd-MM-yyyy
      const params = {
        ...this.RetentionForm2.value,
        mISSUEDATE: this.formatDate(this.RetentionForm2.value.mISSUEDATE),
        mStartDate: this.formatDate(this.RetentionForm2.value.mStartDate),
        mVALIDITYDATE: this.formatDate(this.RetentionForm2.value.mVALIDITYDATE),
      };
  
    try {
      this.api.masimporterProvCertificate(params,formData).subscribe({
        next: (res) => {
          this.toastr.success('Import Certificate saved successfully!');
          console.log('API Response:', res);
          this.RetentionForm2.reset();
          this.submitted = false;
          this.RetentionForm2.patchValue({
            mVregid: this.vregid
          });
          this.GETImportRetentionDetails();
          this.onshowRetentionForm2=false;
          this.loadingSectionB=false;
        },
        error: (err) => {
          console.error('Error:', err);
          this.toastr.error('Failed to save data!');
        }
      });
    } catch (error) {
      console.error('Exception:', error);
      this.toastr.error('Unexpected error occurred!');
    }
  }


    
  
  
  
    

  GETImporterLicenceDetails() {
    this.spinner.show();
    this.api.GetImporterLicenceDetails(sessionStorage.getItem('vregid'),sessionStorage.getItem('facilityid')).subscribe((res: any) => {
        this.importerLicenceList = res.map((item: any, index: number) => ({
          ...item,
          sno: index + 1
        }));
        console.log('With S.No:', this.importerLicenceList);
        this.dataSource.data = this.importerLicenceList;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.spinner.hide();
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('API error:', error);
        this.spinner.hide();
      }
    );
    
  }

  GETImportRetentionDetails() {
    this.spinner.show();
    this.api.GetImportRetentionDetails(sessionStorage.getItem('vregid')).subscribe((res: any) => {
        this.ImportRetentionList = res.map((item: any, index: number) => ({
          ...item,
          sno: index + 1
        }));
        console.log('With S.No:', this.ImportRetentionList);
        this.dataSource2.data = this.ImportRetentionList;
        this.dataSource2.paginator = this.paginator1;
        this.dataSource2.sort = this.sort1;
        this.spinner.hide();
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('API error:', error);
        this.spinner.hide();
      }
    );
    
    
  }
 

  exportToPDF() {
    ;
    const doc = new jsPDF('l', 'mm', 'a4'); // Landscape orientation
  
    // 🕒 Add title and date-time
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB'); // dd/mm/yyyy
    const formattedTime = now.toLocaleTimeString();
  
    doc.setFontSize(14);
    doc.text('Import Licence Certificate List', 140, 10, { align: 'center' });
    doc.setFontSize(10);
    doc.text(`Generated on: ${formattedDate} ${formattedTime}`, 140, 16, { align: 'center' });
  
    // ✅ Fetch data from your table
    const dataList = this.dataSource?.data || [];
  
    if (!dataList.length) {
      this.toastr.warning('No data available to export!');
      return;
    }
  
    // ✅ Define new columns
    const columns = [
      'S.No',
      'Licence ID',
      'Licence No',
      'Form Name',
      'Unit Name',
      'Import Licence No',
      'Import Type',
      'Issue Date',
      'Start Date',
      'Expiry Date',
      'File Name',
      'Supplier ID'
    ];
  
    // ✅ Map rows based on dataset keys
    const rows = dataList.map((row: any, index: number) => [
      index + 1,
      row.licid || '',
      row.licno || '',
      row.formname || '',
      row.unitname || '',
      row.implicno || '',
      row.imptypename || '',
      row.issuedate || '',
      row.startdate || '',
      row.expdate || '',
      row.filename || '',
      row.supplierid || ''
    ]);
  
    // 🧾 Generate table
    autoTable(doc, {
      head: [columns],
      body: rows,
      startY: 25,
      theme: 'grid',
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontSize: 10,
      },
      styles: {
        fontSize: 9,
        cellPadding: 2,
        textColor: [0, 0, 0],
      },
      margin: { top: 20, left: 10, right: 10 },
    });
  
    // 💾 Save file
    doc.save(`Import_Licence_List_${formattedDate}.pdf`);
  }
  
  

  exportToPDF2() {
    ;
    const doc = new jsPDF('l', 'mm', 'a4'); // Landscape mode
  
    // 🕒 Header: Title + Timestamp
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB'); // dd/mm/yyyy
    const formattedTime = now.toLocaleTimeString();
  
    doc.setFontSize(14);
    doc.text('Import Licence List', 140, 10, { align: 'center' });
    doc.setFontSize(10);
    doc.text(`Generated on: ${formattedDate} ${formattedTime}`, 140, 16, { align: 'center' });
  
    // ✅ Fetch data from dataSource
    const dataList = this.dataSource2?.data || [];
  
    if (!dataList.length) {
      this.toastr.warning('No data available to export!');
      return;
    }
  
    // ✅ Define Columns
    const columns = [
      'S.No',
      'Import Return ID',
      'Import ID',
      'Import Licence No',
      'Import Type',
      'Licence ID',
      'Licence No',
      'Unit Name',
      'Supplier ID',
      'Start Date',
      'Issue Date',
      'Expiry Date',
      'File Name',
      'File Path',
      'Import Type ID'
    ];
  
    // ✅ Prepare Rows
    const rows = dataList.map((row: any, index: number) => [
      index + 1,
      row.impRetId || '',
      row.impId || '',
      row.impLicNo || '',
      row.impTypeName || '',
      row.licId || '',
      row.licNo || '',
      row.unitName || '',
      row.supplierId || '',
      row.startDate || '',
      row.issueDate || '',
      row.expDate || '',
      row.fileName || '',
      row.filePath || '',
      row.impTypeId || ''
    ]);
  
    // 🧾 Generate Table
    autoTable(doc, {
      head: [columns],
      body: rows,
      startY: 25,
      theme: 'grid',
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontSize: 9,
      },
      styles: {
        fontSize: 8,
        cellPadding: 2,
        textColor: [0, 0, 0],
        overflow: 'linebreak',
      },
      columnStyles: {
        13: { cellWidth: 60 }, // Make File Path wider
      },
      margin: { top: 20, left: 10, right: 10 },
    });
  
    // 💾 Save File
    doc.save(`Import_Licence_List_${formattedDate}.pdf`);
  }
  
  
  applyTextFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  applyTextFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();

    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }
  validateDates() {

   
      const start = new Date(this.RetentionForm2.value.mStartDate);
      const issue = new Date(this.RetentionForm2.value.mISSUEDATE);
      const validity = new Date(this.RetentionForm2.value.mVALIDITYDATE);
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
  validateDates1() {
    // mISSUEDATE: ['', Validators.required],
    // mStartDate: ['', Validators.required],
    // mVALIDITYDATE: ['', Validators.required],
   
      const start = new Date(this.RetentionForm.value.mStartDate);
      const issue = new Date(this.RetentionForm.value.mISSUEDATE);
      const validity = new Date(this.RetentionForm.value.mVALIDITYDATE);
      this.validityerrorMsg1 = "";
      this.starterrorMsg1 = "";
    
      // Rule 1: Start Date must be >= Issue Date
      if (start < issue) {
        this.starterrorMsg1 = "Start Date cannot be earlier than Issue Date.";
        return false;
      }
    
      // Rule 2: Expiry Date must be >= Start Date AND Issue Date
      if (validity < start) {
        this.validityerrorMsg1 = "Expiry Date must be on or after Start Date.";
        return false;
      }
    
      if (validity < issue) {
        this.validityerrorMsg1 = "Expiry Date cannot be earlier than Issue Date.";
        return false;
      }
    
      return true;
    }

}
