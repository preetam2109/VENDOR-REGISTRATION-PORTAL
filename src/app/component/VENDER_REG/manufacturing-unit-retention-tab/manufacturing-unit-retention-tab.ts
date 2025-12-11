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
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
declare var bootstrap: any;
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-manufacturing-unit-retention-tab',
  standalone:true,
  imports: [MatProgressSpinnerModule,MatTableExporterModule,MatSortModule,DropdownModule, FormsModule, NgSelectModule, FormsModule, CommonModule, MatPaginatorModule, MatTableModule, CommonModule, FormsModule, NgSelectModule, ReactiveFormsModule, MatMenuModule,CollapseModule,NgbCollapseModule],
  templateUrl: './manufacturing-unit-retention-tab.html',
  styleUrl: './manufacturing-unit-retention-tab.css'
})
export class ManufacturingUnitRetentionTab {

  isCollapsed = false;
  isCollapsed1 = true;
  isCollapsed2 = true;
  isCollapsed3 = true;
  isEventOpen = false;

  today: string = new Date().toISOString().split("T")[0];
  validityerrorMsg:any;
  starterrorMsg:any;

  manufacturingList: any[] = [];
  dataSource!: MatTableDataSource<any[]>;
  dataSource2!: MatTableDataSource<any[]>;
  dataSource3!: MatTableDataSource<any[]>;
  manufacturingLicList: any[] = [];
  unitForm!: FormGroup;
  licenceTypes: any[] = [];
  states: any[] = [];
  lictypeid:any;
  stateid:any;
  vregid: any;

  selectedPanFile: File | null = null;
  selectedRetFile: File | null = null;



  licForm!: FormGroup;

  unitList: any[] = [];
  formList: any[] = [];
  filteredFormList: any[] = [];
  // licenceTypes: any[] = [];
  licTypes:any[]=[];



  retForm!:FormGroup
  ManLicDdllist:any
  masRetentionDDL:any
  retentionList: any[] = [];



  sanitizedPdfUrl!: SafeResourceUrl;

  onshowUNIT:boolean=false;
  onshowLICENCE:boolean=false;
  onshowRETE:boolean=false;
  submitted:boolean=false;

  loadingSectionA:boolean=false;

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('sort') sort!: MatSort;
  @ViewChild('paginator1') paginator1!: MatPaginator;
  @ViewChild('sort1') sort1!: MatSort;
  @ViewChild('paginator2') paginator2!: MatPaginator;
  @ViewChild('sort2') sort2!: MatSort;
  

  constructor(private sanitizer: DomSanitizer,private cdr:ChangeDetectorRef,private spinner: NgxSpinnerService,private api: ApiService,public toastr: ToastrService,private fb: FormBuilder){
    this.dataSource = new MatTableDataSource<any>([]);
    this.dataSource2 = new MatTableDataSource<any>([]);
    this.dataSource3 = new MatTableDataSource<any>([]);
  }

  ngOnInit() {


    this.GetLicenceTypes()
    this.GetMassStates()

    this.unitForm = this.fb.group({
      mSupplierID: [sessionStorage.getItem('facilityid') || '', Validators.required],
      mVregid: [this.vregid, Validators.required],
      mStateId: ['', Validators.required],
      mUNITNAME: ['', Validators.required],
      mUNITAddress: ['', Validators.required],
      mCity: ['', Validators.required],
      mUNITINCHARGENAME: ['', Validators.required],
      mUNITINCHARGEMOB: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      mUNITINCHARGEEMAIL: ['', [Validators.required, Validators.email]],
      mlictypeid: ['', Validators.required]
    });


    this.retForm = this.fb.group({
      mLICID: ['', Validators.required],
      mISSUEDATE: ['', Validators.required],
      mStartDate: ['', Validators.required],
      mVALIDITYDATE: ['', Validators.required],
      mVregid: [this.vregid, Validators.required],
      mretid: ['', Validators.required],
      mFormID: ['', Validators.required],
      mProIssuingAuthority: ['', Validators.required],
      Files: [null, Validators.required],
    });


    this.GetVendorDetailsID(sessionStorage.getItem('facilityid'));
    this.getManufacturingDetails();



// licence

this.getMasformTypes();

this.licForm = this.fb.group({
  mSUPPLIERID: [sessionStorage.getItem('facilityid') || '', Validators.required],
  mVregid: [this.vregid, Validators.required],
  mUNITID: ['', Validators.required],
  mFORMID: ['', Validators.required],
  mLICTYPEID: ['', Validators.required],
  mLICNO: ['', Validators.required],
  mISSUEDATE: ['', Validators.required],
  mStartDate: ['', Validators.required],
  mVALIDITYDATE: ['', Validators.required],
  LicIssuingAuthority: ['', Validators.required],
});
this.GetmANUFACLICDetails()



this.GetmMANLICDDL();
this.GetMasRetentionTypeDDL();
this.GetPovLicenceDetails();






  }

  getMasformTypes(){
    
    this.api.getMasformTypes().subscribe((res:any[])=>{
      if (res && res.length > 0) {
        this.formList = res.map(item => ({
          formid: item.formid,
          formname : item.formname,
        }));
        
        console.log('formname items', res)
      } else {
        console.error('No formname found or incorrect structure:', res);
      }
    }); 
  }
  onRetentionChange(selected: any) {
    const retid = selected?.retid ?? selected; // handles both cases
  
    console.log('Final RetID:', retid);
  
    if (retid == 1) {
      this.filteredFormList = this.formList.filter(f => f.formid == '7');
      this.retForm.patchValue({ mFormID: '7' });
    } 
    else if (retid == 2) {
      this.filteredFormList = this.formList.filter(f => f.formid == '3');
      this.retForm.patchValue({ mFormID: '3' });
    } 
    else {
      this.filteredFormList = [];
      this.retForm.patchValue({ mFormID: null });
    }
  }
  
  GetmMANLICDDL(){
    
    this.api.getmMANLICDDL(sessionStorage.getItem('facilityid'),sessionStorage.getItem('vregid'),0).subscribe((res:any[])=>{
      if (res && res.length > 0) {
        this.ManLicDdllist = res.map(item => ({
          licid: item.licid,
          manfacname : item.manfacname,
        }));
        
        console.log('manfacname items', res)
      } else {
        console.error('No manfacname found or incorrect structure:', res);
      }
    }); 
  }
  GetMasRetentionTypeDDL(){
    
    this.api.getRetentionTypeDDL().subscribe((res:any[])=>{
      if (res && res.length > 0) {
        this.masRetentionDDL = res.map(item => ({
          retid: item.retid,
          retname : item.retname,
        }));
        
        console.log('retname items', res)
      } else {
        console.error('No retname found or incorrect structure:', res);
      }
    }); 
  }



  GetVendorDetailsID(supplierId: any) {
    this.api.getVendorDetailsID(supplierId).subscribe({
      next: (res: any) => {
        if (Array.isArray(res) && res.length > 0) {
          const vregid = res[0].vregid;
          this.vregid=res[0].vregid;
          console.log('Vendor vregid:', vregid);
          this.unitForm.patchValue({
            mVregid: vregid
          });
          this.retForm.patchValue({
            mVregid: vregid
          });
          this.licForm.patchValue({
            mVregid: vregid
          });
        } else {
          console.warn('No vendor details found.');
        }
      },
      error: (err) => {
        console.error('Error fetching vendor details:', err);
      }
    });
  }
  
  onshowButtonClick(){
    this.GetLicenceTypes();
    this.GetmMANLICDDL();
    this.GetMasRetentionTypeDDL();
    
    //  this.isCollapsed = true;
      // isCollapsed1 = true;
        // console.log("Checking the vregid ",this.vregid);
        this.onshowRETE = true;
     
  
    }
    onshowButtonClickLICENCE() {
      // ;
      // if (val === 0) {
        this.onshowRETE = true;
      //   this.isCollapsed1 = false;
      // } else {
      //   this.onshowLICENCE = false;
      // }
  
      // console.log('onshowLICENCE:', this.onshowLICENCE);
    }

  getManufacturingDetails() {

      this.spinner.show();
      const supplierId = sessionStorage.getItem('facilityid');
      
    
      this.api.getManufacturingDetails(supplierId, sessionStorage.getItem('vregid')).subscribe((res: any) => {
          console.log('Raw API response getManufacturingDetails:', res);
    
          this.manufacturingList = res.map((item: any, index: number) => ({
            ...item,
            sno: index + 1
          }));

          this.unitList = res.map((item: any) => ({
            unitid: item.unitid,
            unitname : item.unitname,
          }));
    
          // console.log('With S.No:', this.manufacturingList);
    
          this.dataSource.data = this.manufacturingList;
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
  GetPovLicenceDetails() {
    
      this.spinner.show();
      const supplierId = sessionStorage.getItem('facilityid');
      this.api.getPovLicenceDetails(supplierId, sessionStorage.getItem('vregid'),0).subscribe((res: any) => {
          console.log('Raw API response retation:', res);
          this.retentionList = res.map((item: any, index: number) => ({
            ...item,
            sno: index + 1
          }));
          // console.log('With retention value :', this.retentionList);
          this.dataSource3.data = this.retentionList;
          this.dataSource3.paginator = this.paginator;
          this.dataSource3.sort = this.sort;
          this.spinner.hide();
          this.cdr.detectChanges();
        },
        (error) => {
          console.error('API error:', error);
          this.spinner.hide();
        }
      );
      
    }
    GetmANUFACLICDetails() {

      this.spinner.show();
      const supplierId = sessionStorage.getItem('facilityid');
    
      this.api.getmANUFACLICDetails(supplierId,sessionStorage.getItem('vregid')).subscribe((res: any) => {
          console.log('Raw API response:', res);
    
          this.manufacturingLicList = res.map((item: any, index: number) => ({
            ...item,
            sno: index + 1
          }));

        
    
          // console.log('With manuf lic:', this.manufacturingLicList);
    
          this.dataSource2.data = this.manufacturingLicList;
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


    downloadFile(row: any) {
        
      const filePath = row.filepath;
      const fileName = row.filename;
    
      this.api.downloadFile(filePath, fileName).subscribe({
        next: (fileBlob) => {
          const url = window.URL.createObjectURL(fileBlob);
          const a = document.createElement('a');
          a.href = url;
          a.download = fileName;
          a.click();
          window.URL.revokeObjectURL(url);
        },
        error: (err) => {
          console.error('Download failed:', err);
          this.toastr.error('Failed to download file');
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








   
  
  GetLicenceTypes(){
  
    this.api.getLicenceTypes().subscribe((res:any[])=>{
      if (res && res.length > 0) {
        this.licenceTypes = res.map(item => ({
          lictypeid: item.lictypeid,
          lictypename : item.lictypename,
        }));
        
        console.log('linecne items', res)
      } else {
        console.error('No nameText found or incorrect structure:', res);
      }
    });  
  }
  GetMassStates(){
  
    this.api.getStates().subscribe((res:any[])=>{
      if (res && res.length > 0) {
        this.states = res.map(item => ({
          stateid: item.stateid,
          statename : item.statename,
        }));
        
        console.log('states items', res)
      } else {
        console.error('No nameText found or incorrect structure:', res);
      }
    });  
  }



  onSubmit() {
    
    try {
      if (this.unitForm.valid) {
        // Set or override values before sending
        this.unitForm.patchValue({
          mSupplierID: sessionStorage.getItem('facilityid'),
          mVregid: this.vregid
        });
  
        const params = this.unitForm.value;
  
        this.api.postSupplierUnit(params).subscribe({
          next: (res) => {
            this.toastr.success('Data submitted successfully!', 'Success', {
              timeOut: 3000,
              positionClass: 'toast-top-right'
            });
            console.log('Response:', res);
            this.unitForm.reset();
            this.getManufacturingDetails();
          },
          error: (err) => {
            console.error('Error:', err);
            this.toastr.error('Something went wrong while submitting data!', 'Error', {
              timeOut: 3000,
              positionClass: 'toast-top-right'
            });
          }
        });
      } else {
        this.toastr.warning('Please fill all required fields correctly!', 'Validation Error', {
          timeOut: 3000,
          positionClass: 'toast-top-right'
        });
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      this.toastr.error('Unexpected error occurred. Please try again.', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-top-right'
      });
    }
  }


  // ngAfterViewChecked() {
  //   console.log('Form valid:', this.retForm.valid);
  //   console.log('Form values:', this.retForm.value);
  // }
  
  onSubmitLicence() {
    

    const formData = new FormData();

    // Append file if selected
    if (this.selectedPanFile) {
      formData.append('PanCardDocument', this.selectedPanFile);
    }

    if (this.licForm.invalid) {
      this.toastr.warning('Please fill all required fields correctly!');
      return;
    }

    this.licForm.patchValue({
      mVregid: this.vregid,
      mSUPPLIERID: sessionStorage.getItem('facilityid')
    });


    
  
    // const params = this.licForm.value;


      // Format dates to dd-MM-yyyy
      const params = {
        ...this.licForm.value,
        mISSUEDATE: this.formatDate(this.licForm.value.mISSUEDATE),
        mStartDate: this.formatDate(this.licForm.value.mStartDate),
        mVALIDITYDATE: this.formatDate(this.licForm.value.mVALIDITYDATE),
      };
  
    try {
      this.api.postManufacturingLic(params,formData).subscribe({
        next: (res) => {
          this.toastr.success('Manufacturing Licence saved successfully!');
          console.log('API Response:', res);
          this.licForm.reset();
          this.GetmANUFACLICDetails();


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

  onSubmitRetention() {
    
    this.loadingSectionA = true;
    
    this.submitted=true;
    const formData = new FormData();
  
    // Append file if selected
    if (this.selectedRetFile) {
      formData.append('PanCardDocument', this.selectedRetFile);
    }
  
    if (this.retForm.invalid) {
      this.toastr.warning('Please fill all required fields correctly!');
      return;
    }
  
    // Patch vregid if needed
    this.retForm.patchValue({
      mVregid: this.vregid
    });
  
    // Format dates to dd-MM-yyyy
    const params = {
      ...this.retForm.value,
      mISSUEDATE: this.formatDate(this.retForm.value.mISSUEDATE),
      mStartDate: this.formatDate(this.retForm.value.mStartDate),
      mVALIDITYDATE: this.formatDate(this.retForm.value.mVALIDITYDATE),
    };
  
    try {
      this.api.postRetentionCertificate(params, formData).subscribe({
        next: (res) => {
          this.toastr.success('Retention Certificate saved successfully!');
          console.log('API Response:', res);
    this.loadingSectionA = false;

          this.retForm.reset();
          this.submitted=false;

          // Re-patch mVregid after reset to pre-fill for next entry
          this.retForm.patchValue({
          mVregid: this.vregid
          });

          this.GetPovLicenceDetails();
          this.onshowRETE=false;
        },
        error: (err) => {
          this.loadingSectionA = false

          console.error('Error:', err);
          this.toastr.error('Failed to save data!');
        }
      });
    } catch (error) {
      this.loadingSectionA = false

      console.error('Exception:', error);
      this.toastr.error('Unexpected error occurred!');
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

onFileSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.selectedPanFile = file;
    console.log('Selected file :', file.name);
  }
}
onFileSelectedRetention(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.selectedRetFile = file;
    console.log('Selected file :', file.name);
  }
}
  
  applyTextFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyTextFilterManLic(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();

    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }
  applyTextFilterRet(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();

    if (this.dataSource3.paginator) {
      this.dataSource3.paginator.firstPage();
    }
  }

  
  
  exportToPDF() {
    ;
    const doc = new jsPDF('l', 'mm', 'a4'); // Landscape orientation
  
    // 🕒 Add title and date-time
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB'); // dd/mm/yyyy
    const formattedTime = now.toLocaleTimeString();
  
    doc.setFontSize(14);
    doc.text('Manufacturing Unit List', 140, 10, { align: 'center' });
    doc.setFontSize(10);
    doc.text(`Generated on: ${formattedDate} ${formattedTime}`, 140, 16, { align: 'center' });
  
    // ✅ Fetch data from your table
    const dataList = this.dataSource?.data || [];
  
    if (!dataList.length) {
      this.toastr.warning('No data available to export!');
      return;
    }
  
    // ✅ Define columns and rows
    const columns = [
      'S.No',
      'Unit Name',
      'Address',
      'City',
      'Incharge Name',
      'Mobile',
      'Email',
      'State',
      'Licence Type'
    ];
  
    const rows = dataList.map((row: any, index: number) => [
      index + 1,
      row.unitname,
      row.unitaddress,
      row.city,
      row.unitinchargename,
      row.unitinchargemob,
      row.unitinchargeemail,
      row.statename,
      row.lictypename
    ]);
  
    // 🧾 Create table
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
    doc.save(`Manufacturing_Unit_List_${formattedDate}.pdf`);
  }
  

  exportToPDFManufacturingLic() {
    ;
    const doc = new jsPDF('l', 'mm', 'a4'); // landscape mode
  
    // 🕒 Current date & time
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB'); // dd/mm/yyyy
    const formattedTime = now.toLocaleTimeString();
  
    // 🏷️ PDF Title
    doc.setFontSize(14);
    doc.text('Manufacturing Licence Details', 140, 10, { align: 'center' });
    doc.setFontSize(10);
    doc.text(`Generated on: ${formattedDate} ${formattedTime}`, 140, 16, { align: 'center' });
  
    // ✅ Fetch your data
    const dataList = this.manufacturingLicList || [];
  
    if (!dataList.length) {
      this.toastr.warning('No data available to export!');
      return;
    }
  
    // ✅ Define column headers
    const columns = [
      'S.No',
      'Licence No',
      'Unit Name',
      'Address',
      'City',
      'Incharge Name',
      'Mobile',
      'Email',
      'Issue Date',
      'Validity Date',
      'Licence Type',
      'State',
      'Entry Date',
      'File Name'
    ];
  
    // ✅ Map your data into table rows
    const rows = dataList.map((row: any, index: number) => [
      index + 1,
      row.licno || '',
      row.unitname || '',
      row.unitaddress || '',
      row.city || '',
      row.unitinchargename || '',
      row.unitinchargemob || '',
      row.unitinchargeemail || '',
      row.issuedate || '',
      row.validitydate || '',
      row.lictypename || '',
      row.statename || '',
      row.entrydate || '',
      row.filename || ''
    ]);
  
    // 🧾 Create table in PDF
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
      },
      margin: { top: 20, left: 10, right: 10 },
    });
  
    // 💾 Save the file
    doc.save(`Manufacturing_Licence_List_${formattedDate}.pdf`);
  }



  
  
  exportToPDFRetention() {
    const doc = new jsPDF('l', 'mm', 'a4'); // Landscape orientation
  
    // 🕒 Current Date & Time
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB'); // DD/MM/YYYY
    const formattedTime = now.toLocaleTimeString();
  
    // 🏷️ PDF Header
    doc.setFontSize(14);
    doc.text('Retention Details', 140, 10, { align: 'center' });
    doc.setFontSize(10);
    doc.text(`Generated on: ${formattedDate} ${formattedTime}`, 140, 16, { align: 'center' });
  
    // ✅ Validate Data
    const dataList = this.retentionList || [];
    if (!dataList.length) {
      this.toastr.warning('No data available to export!');
      return;
    }
  
    // 🧩 Define Columns
    const columns = [
      { title: 'S.No', dataKey: 'sno' },
      { title: 'Licence No', dataKey: 'licno' },
      { title: 'Unit Name', dataKey: 'unitname' },
      { title: 'Issue Date', dataKey: 'issuedate' },
      { title: 'Start Date', dataKey: 'startdate' },
      { title: 'Expiry Date', dataKey: 'expdate' },
      { title: 'Retention', dataKey: 'retname' },
      { title: 'Form Name', dataKey: 'formname' },
      { title: 'Licence Type', dataKey: 'lictypename' },
      { title: 'File Name', dataKey: 'filename' }
    ];
  
    // 🗂️ Prepare Data Rows
    const rows = dataList.map((row: any, index: number) => [
      index + 1,
      row.licno || '-',
      row.unitname || '-',
      row.issuedate || '-',
      row.startdate || '-',
      row.expdate || '-',
      row.retname || '-',
      row.formname || '-',
      row.lictypename || '-',
      row.filename || '-'
    ]);
  
    // 🧾 Generate AutoTable
    autoTable(doc, {
      head: [columns.map(col => col.title)],
      body: rows, // ✅ Now in correct format
      startY: 22,
      theme: 'grid',
      headStyles: { fillColor: [63, 81, 181], textColor: 255, fontSize: 10 },
      styles: { fontSize: 9, cellPadding: 2 },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      columnStyles: {
        0: { cellWidth: 10 },  // S.No
        1: { cellWidth: 25 },  // Licence No
        2: { cellWidth: 40 },  // Unit Name
        3: { cellWidth: 25 },  // Issue Date
        4: { cellWidth: 25 },  // Start Date
        5: { cellWidth: 25 },  // Expiry Date
        6: { cellWidth: 30 },  // Retention
        7: { cellWidth: 35 },  // Form Name
        8: { cellWidth: 30 },  // Licence Type
        9: { cellWidth: 35 }   // File Name
      },
      margin: { top: 20, left: 10, right: 10 }
    });
  
    // 💾 Save PDF
    doc.save('Retention_List.pdf');
  }
  
  validateDates() {
    // ;
    // mISSUEDATE: this.formatDate(this.retForm.value.mISSUEDATE),
    // mStartDate: this.formatDate(this.retForm.value.mStartDate),
    // mVALIDITYDATE: this.formatDate(this.retForm.value.mVALIDITYDATE),
      const start = new Date(this.retForm.value.mStartDate);
      const issue = new Date(this.retForm.value.mISSUEDATE);
      const validity = new Date(this.retForm.value.mVALIDITYDATE);
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

    onButtonClick(id:any,vid:any){

    }


}
