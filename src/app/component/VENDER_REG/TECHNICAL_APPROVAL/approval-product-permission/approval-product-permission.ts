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
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

declare var bootstrap: any;

@Component({
  selector: 'app-approval-product-permission',
  standalone: true,
  imports: [MatProgressSpinnerModule,MatDialogModule,MatTableExporterModule, MatSortModule, DropdownModule, FormsModule, NgSelectModule, FormsModule, CommonModule, MatPaginatorModule, MatTableModule, CommonModule, FormsModule, NgSelectModule, ReactiveFormsModule, MatMenuModule, CollapseModule, NgbCollapseModule, MatIconModule],
  templateUrl: './approval-product-permission.html',
  styleUrl: './approval-product-permission.css'
})
export class ApprovalProductPermission {
  dataSource!: MatTableDataSource<any[]>;
  dataSource2!: MatTableDataSource<any[]>;
  sanitizedPdfUrl!: SafeResourceUrl;
  loadingSectionA:boolean=false;
  manufacturingLicList: any[] = [];
  isCollapsed = false;
  isCollapsed1 = true;
  isCollapsed2 = true;
  isCollapsed3 = true;
  isEventOpen = false;
  submitted = false;
  vregid = sessionStorage.getItem('vregid');
  productPerForm!: FormGroup;
  mcid=1
  licenceTypes: any[] = [];
  DDLcategory: any[] = [];
  DDLItemtype: any[] = [];
  DDLItemGroup: any[] = [];
  DDLMASPHARMACOPOEIA: any[] = [];
  ManLicDdllist: any
  mTypeID: any;
  licid: any;
  userid:any
  selectedPanFile: File | null = null;

  masItemsList: any[] = [];
  selectedItems: any[] = [];

  isSaving = false;

  SupID:any
  itemsPerPage: number = 100;
  currentPage: number = 1;
  totalPagesArray: number[] = [];
  filteredItems: any[] = [];
  paginatedItems: any[] = [];
  searchText: string = '';

  PPCertificateList:any;
  PPCertificateItemDetails:any;

  onshowPP:boolean=false;

  @ViewChild('itemDetailsModal') itemDetailsModal: any;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('sort') sort!: MatSort;
  @ViewChild('paginator1') paginator1!: MatPaginator;
  @ViewChild('sort1') sort1!: MatSort;


  // displayedColumns: string[] = [
  //   'sno','licno','unitname','issuingauthority','entrydate','startdate','issuedate','validitydate','noofitemppc','filename','ismfaccepted','ismfaccepteddt','mfaccrejremarks', 'action',
  //   'Remark',
  //   'Save'
  // ];
  displayedColumns2: string[] = [
    'sno','itemcode','itemname','strength','unit','mcategory','itemtypename','stndbatchqty','pageno','hsncode','shortname','gstper'
  ];

  constructor(private route: ActivatedRoute,private sanitizer: DomSanitizer,private dialog: MatDialog,private cdr: ChangeDetectorRef, private spinner: NgxSpinnerService, private api: ApiService, public toastr: ToastrService, private fb: FormBuilder) {
    this.dataSource = new MatTableDataSource<any>([]);
    this.dataSource2 = new MatTableDataSource<any>([]);

  }

  ngOnInit() {
    this.userid=sessionStorage.getItem('userid');
    this.route.queryParams.subscribe(params => {
      this.vregid= params['vregid'];
      this.SupID=  params['supid'];
  
      console.log("VRegID:",  this.vregid);
      console.log("SupID:",  this.SupID);
      // console.log("VRegID:", params['vregid']);
      // console.log("SupID:", params['supid']);
    });

    // this.vregid = sessionStorage.getItem('vregid');
    this.GetLicenceTypes()
    this.GetMasitemmaincategoryDDL()
    this.GetMasitemTypeDDL();
    this.GetmMANLICDDL();
    this.GetMASPHARMACOPOEIA();
    this.GETtPPCertificate();


    this.productPerForm = this.fb.group({
      mcid: ['', Validators.required],         // Category
      itemtypeid: ['', Validators.required],   // Item Type
      groupid: ['', Validators.required],      // Item Group
      mlictypeid: ['', Validators.required],   // Licence Type
      licid: ['', Validators.required],        // Licence
      mVregid: [this.vregid, Validators.required],
      Files: [null, Validators.required],
      mIssueDate: ['',Validators.required],
      mStartDate: ['',Validators.required],
      mVALIDITYDATE: ['',Validators.required],
      mISSUINGAUTHORITY: ['',Validators.required]


    });

  }


  setApproval(element: any, value: 'Y' | 'N') {
    
    element.approval = value; // store selected value in row
  }
  
  saveRow(element: any) {
    ;
  
    const mFileID = element.fileid;     // file id from row
    const Iaccept = element.approval;   // 'Y' or 'N'
    const Remarks = element.remark || '';
  
    // Validation
    if (!Iaccept) {
      this.toastr.error("Please select YES or NO before saving.");
      return;
    }
    if (!Remarks) {
      this.toastr.error("Please write remark before saving.");
      return;
    }
  
    // If NO → show confirmation popup
    if (Iaccept === 'N') {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to reject this PPC Certificate?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Reject",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#d33"
      }).then((result) => {
        if (result.isConfirmed) {
          this.callPPCAPI(mFileID, Iaccept, Remarks);
        }
      });
  
      return;
    }
  
    // If YES → directly approve
    if (Iaccept === 'Y') {
      this.callPPCAPI(mFileID, Iaccept, Remarks);
    }
  }

  callPPCAPI(mFileID: any, Iaccept: string, Remarks: string) {
    this.api.PPCVerification(mFileID, Iaccept, Remarks, this.userid).subscribe({
      next: (res: any) => {
        if (Iaccept === 'N') {
          this.toastr.success("Successfully Rejected Certificate");
        } else {
          this.toastr.success(res);
        }
        this.GETtPPCertificate();
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("Error while saving.");
      }
    });
  }
  
  




    ngAfterViewChecked() {
    console.log('Form valid:', this.productPerForm.valid);
    console.log('Form values:', this.productPerForm.value);
  }

  onshowButtonClick(){
    this.onshowPP = true;
  }

  //    ngAfterViewChecked() {
  //   console.log('Form valid:', this.productPerForm.valid);
  //   console.log('Form values:', this.productPerForm.value);
  // }

  // Helper function to format date as dd-MM-yyyy
formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = ('0' + date.getDate()).slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}


  filterTable() {
    const text = this.searchText.toLowerCase();
    this.filteredItems = this.masItemsList.filter(
      (item) =>
        item.itemname?.toLowerCase().includes(text) ||
        item.itemcode?.toLowerCase().includes(text)
    );
    this.currentPage = 1; // reset to first page
    this.updatePagination();
  }

  /** 🔹 MAIN FIX: Update pagination cleanly */
  updatePagination() {
    const totalPages = Math.ceil(this.filteredItems.length / this.itemsPerPage);
    this.totalPagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    this.paginatedItems = this.filteredItems.slice(startIndex, endIndex);
  }

  /** 🔹 Navigation handlers */
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPagesArray.length) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPagesArray.length) {
      this.currentPage++;
      this.updatePagination();
    }
  }
  GetmMANLICDDL() {

    this.api.getmMANLICDDL(this.SupID, this.vregid, 0).subscribe((res: any[]) => {
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
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedPanFile = file;
      console.log('Selected file :', file.name);
    }
  }
  GetLicenceTypes() {

    this.api.getLicenceTypes().subscribe((res: any[]) => {
      if (res && res.length > 0) {
        this.licenceTypes = res.map(item => ({
          lictypeid: item.lictypeid,
          lictypename: item.lictypename,
        }));

        console.log('linecne items', res)
      } else {
        console.error('No nameText found or incorrect structure:', res);
      }
    });
  }
  GetMasitemmaincategoryDDL() {
    this.api.getMasitemmaincategoryDDL().subscribe((res: any[]) => {
      if (res && res.length > 0) {
        this.DDLcategory = res.map(item => ({
          mcid: item.mcid,
          mcategory: item.mcategory,
        }));

        console.log('mcategory items', res)

      } else {
        console.error('No nameText found or incorrect structure:', res);
      }
    });
  }
  onCategorySelectChange(selected: any): void {
    
    const mcid = selected?.mcid ?? selected;

    if (mcid) {
      this.mcid = mcid || null;
      this.GetMasitemTypeDDL();
      this.GetMasitemGroupDDL();


    } else {
      console.error('Selected mcmid not found in the list.');
    }
  }
  GetMasitemGroupDDL() {
    this.api.getMasitemGroupDDL(this.mcid).subscribe((res: any[]) => {
      if (res && res.length > 0) {
        this.DDLItemGroup = res.map(item => ({
          groupid: item.groupid,
          groupname: item.groupname,
        }));

        // console.log('groupname', res)
      } else {
        console.error('No nameText found or incorrect structure:', res);
      }
    });
  }
  GetMASPHARMACOPOEIA() {
    this.api.getMASPHARMACOPOEIA().subscribe((res: any[]) => {
      if (res && res.length > 0) {
        this.DDLMASPHARMACOPOEIA = res.map(item => ({
          pharmaid: item.pharmaid,
          shortname: item.shortname,
        }));
        console.log('DDLMASPHARMACOPOEIA', res)
      } else {
        console.error('No shortname found or incorrect structure:', res);
      }
    });
  }
  GetMasitemTypeDDL() {
    this.api.getMasitemtypesDDL(this.mcid).subscribe((res: any[]) => {
      if (res && res.length > 0) {
        this.DDLItemtype = res.map(item => ({
          itemtypeid: item.itemtypeid,
          itemtypename: item.itemtypename,
        }));

        console.log('itemtypename', res)
      } else {
        console.error('No nameText found or incorrect structure:', res);
      }
    });
  }
  onItemTypeChange(selected: any): void {
    
    const itemtypeid = selected?.itemtypeid ?? selected;

    if (itemtypeid) {
      this.mTypeID = itemtypeid || null;



    } else {
      console.error('Selected itemtypeid not found in the list.');
    }
    // 
    // this.mTypeID = 
    // const=selectedId?.itemtypeid;
    // const mcid = selectedId?.itemtypeid ?? selected; 
    // console.log('Selected Item Type ID:', selectedId);
  }
  onLicenceTypeChange(selected: any): void {

    const licid = selected?.licid ?? selected;
  
    if (licid) {
      this.licid = licid;
  
      // Call API to fetch dates for this licence
      this.getLicenceDatesById(licid);
  
    } else {
      console.error('Selected licid not found.');
    }
  }
  
  formatToInputDate(dateStr: string) {
    if (!dateStr) return '';
    const [dd, mm, yyyy] = dateStr.split('-');
    return `${yyyy}-${mm}-${dd}`;  // input format
  }
  

  getLicenceDatesById(licid: any) {

    const supplierId = this.SupID;
    const vregid = this.vregid;
    // this.SupID, this.vregid,
  
    this.api.getmANUFACLICDetails(supplierId, vregid).subscribe((res: any[]) => {
  
      const selectedLic = res.find(item => item.licid == licid);
  
      if (selectedLic) {
        // Convert dd-mm-yyyy → yyyy-mm-dd
        const issue = this.formatToInputDate(selectedLic.issuedate);
        const start = this.formatToInputDate(selectedLic.startdate);
        const valid = this.formatToInputDate(selectedLic.validitydate);
  
        // Patch values into form
        this.productPerForm.patchValue({
          mIssueDate: issue,
          mStartDate: start,
          mVALIDITYDATE: valid,
          groupid:0
        });
      }
  
    });
  }
  


  onItemSelect(item: any) {
    if (item.selected) {
      this.selectedItems.push(item);
    } else {
      this.selectedItems = this.selectedItems.filter(x => x.itemid !== item.itemid);
    }
    console.log('Selected Items:', this.selectedItems);
  }

  toggleAll(event: any) {
    const checked = event.target.checked;
    this.masItemsList.forEach(item => item.selected = checked);
    this.selectedItems = checked ? [...this.masItemsList] : [];
    console.log('All selected:', this.selectedItems);
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


  saveAndUpdate(): void {
    // Step 1: Validate form and file before anything
    if (this.productPerForm.invalid) {
      this.toastr.warning('Please fill all required fields in the form correctly!');
      return;
    }
  
    if (!this.selectedPanFile) {
      this.toastr.warning('Please select a file to upload!');
      return;
    }
  
    if (this.isSaving) {
      this.toastr.warning('Save in progress. Please wait.');
      return;
    }
  
    // Step 2: Validate selected items (before upload)
    const selected = (this.paginatedItems || []).filter((it: any) => it.selected);
    if (selected.length === 0) {
      this.toastr.warning('Please select at least one item to save!');
      return;
    }
  
    if (!this.validateSelectedItems(selected)) {
      return; // Validation errors already shown via toastr
    }
  
    this.isSaving = true;
    this.submitted = true;
  
    // Step 3: Upload certificate only if all above pass
    const formData = new FormData();
    formData.append('PanCardDocument', this.selectedPanFile);
  
    const data = {
      mVergID: this.vregid,
      licID: this.licid,
      mIssueDate: this.formatDate(this.productPerForm.value.mIssueDate),
      mStartDate: this.formatDate(this.productPerForm.value.mStartDate),
      mVALIDITYDATE: this.formatDate(this.productPerForm.value.mVALIDITYDATE),
      mISSUINGAUTHORITY: this.productPerForm.value.mISSUINGAUTHORITY
    };
  
    this.api.postPPCertificate(data, formData).subscribe({
      next: (res) => {
        this.toastr.success('Product Permission Certificate saved successfully!');
        console.log('API Response:', res);
        sessionStorage.setItem('fileid', res);
  
        // Step 4: Save items only if upload succeeds
        this.saveMasVregPPCItems(selected);
      },
      error: (err) => {
        console.error('Upload Error:', err);
        this.toastr.error('Failed to upload certificate. Items not saved.');
        this.resetSaveState();
      }
    });
  }
  
  private validateSelectedItems(selected: any[]): boolean {
    let invalidFound = false;
    let firstErrorMsg = '';
  
    for (const item of selected) {
      item._showErrors = true; // Show errors in UI
  
      // Validate pharmaid
      if (!item.pharmaid && item.pharmaid !== 0) {
        invalidFound = true;
        firstErrorMsg = firstErrorMsg || 'Pharmacopoeia is required for selected items.';
        continue;
      }
  
      // Validate batch (number > 0)
      const batch = Number(item.stndbatchqty);
      if (!batch || batch <= 0) {
        invalidFound = true;
        firstErrorMsg = firstErrorMsg || 'Enter a valid Batch size (>= 1) for selected items.';
        continue;
      }
  
      // Validate page number
      const page = Number(item.pageno);
      if (!page || page <= 0) {
        invalidFound = true;
        firstErrorMsg = firstErrorMsg || 'Enter valid Page number for selected items.';
        continue;
      }
  
      // Validate HSN (exact 8 numeric)
      if (!item.hsncode || !/^[0-9]{8}$/.test(String(item.hsncode))) {
        invalidFound = true;
        firstErrorMsg = firstErrorMsg || 'HSN Code must be exactly 8 numeric digits for selected items.';
        continue;
      }
  
      // Validate GST
      if (item.gstper === null || item.gstper === undefined || item.gstper === '') {
        invalidFound = true;
        firstErrorMsg = firstErrorMsg || 'GST rate is required for selected items.';
        continue;
      }
    }
  
    if (invalidFound) {
      this.toastr.error(firstErrorMsg, 'Validation Error');
      return false;
    }
    return true;
  }
  
  private saveMasVregPPCItems(selected: any[]): void {
    // Construct payload
    const itemsToInsert = selected.map((item: any) => ({
      ppcid: 0,
      vregid: Number(sessionStorage.getItem('vregid') || this.vregid),
      itemid: item.itemid,
      fileid: sessionStorage.getItem('fileid') || 0,
      stndbatchqty: Number(item.stndbatchqty),
      pageno: Number(item.pageno),
      hsncode: String(item.hsncode),
      gstper: Number(item.gstper),
      licid: this.licid,
      impid: 0,
      entrydate: new Date().toLocaleDateString('en-GB'),
      pharmaid: item.pharmaid
    }));
  
    console.log('Items to send:', itemsToInsert);
  
    this.api.insertMasVregPPCItems(sessionStorage.getItem('vregid'), itemsToInsert).subscribe({
      next: (res) => {
        this.toastr.success('MASVREGPPCITEMS inserted successfully!');
        console.log('API Response:', res);
        
        // Reset selection and state
        this.resetSelection(selected);
        
        // Refresh productPerForm: Reset form and re-patch persistent fields
        this.productPerForm.reset();
        this.productPerForm.patchValue({
          mVregid: this.vregid // Re-fill hidden/required fields
          // Add other defaults if needed, e.g., mcid: '', licid: null, etc.
        });
        
        this.GETtPPCertificate();
        this.onshowPP = false;
      },
      error: (err) => {
        console.error('Insert Error:', err);
        this.toastr.error('Certificate uploaded, but failed to save items!');
        this.resetSelection(selected); // Reset even on error to avoid stuck state
      },
      complete: () => {
        this.resetSaveState();
      }
    });
  }
  
  private resetSelection(selected: any[]): void {
    // Reset only the previously selected items (unselect and clear fields)
    selected.forEach(it => {
      it.selected = false;
      it._showErrors = false;
      
      // Clear table fields for selected items
      it.pharmaid = null;
      it.stndbatchqty = null;
      it.pageno = null;
      it.hsncode = '';
      it.gstper = null;
    });
    
    // Also clear ALL items in masItemsList for a full reset (covers filtered/paginated views)
    this.masItemsList.forEach(item => {
      item.pharmaid = null;
      item.stndbatchqty = null;
      item.pageno = null;
      item.hsncode = '';
      item.gstper = null;
      item.selected = false;
      item._showErrors = false;
    });
    
    // Update filtered/paginated views to reflect changes
    this.filteredItems = [...this.masItemsList];
    this.updatePagination();
  }
  
  private resetSaveState(): void {
    this.submitted = false;
    this.isSaving = false;
  }
  
  // Keep onSubmit() unchanged - it's only for loading items table
  onSubmit() {
    if (!this.mcid || !this.mTypeID) {
      this.toastr.warning('Please select Category and Item Type first!');
      return;
    }
  
    this.api.GetMasitems(this.mcid, this.mTypeID).subscribe({
      next: (res: any[]) => {
        if (res && res.length > 0) {
          // Store the items in a local array for table binding
          this.masItemsList = res.map(item => ({
            itemid: item.itemid,
            itemname: item.itemname,
            itemtypename: item.itemtypename,
            itemcode: item.itemcode,
            strength: item.strength,
            unit: item.unit,
            selected: false,  // for checkbox binding
            _showErrors: false // For validation UI
          }));
          console.log('Fetched Mas Items:', this.masItemsList);
          this.filteredItems = [...this.masItemsList];
          this.updatePagination();
        } else {
          this.masItemsList = [];
          this.toastr.warning('⚠️ No items found for given parameters');
          console.warn('No items found for given mcid and mTypeID');
        }
      },
      error: (err) => {
        console.error('Error fetching Mas Items:', err);
        this.toastr.error('Failed to load items. Please try again.');
      }
    });
  }


  GETtPPCertificate() {
    this.spinner.show();
    this.api.GetPPCertificate(this.vregid).subscribe((res: any) => {
        this.PPCertificateList = res.map((item: any, index: number) => ({
          ...item,
          sno: index + 1
        }));
        console.log('DDWith S.No:', this.PPCertificateList);
        this.dataSource.data = this.PPCertificateList;
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
  PPCErtificateItemDetails(fileid:any) {
    this.spinner.show();
    this.api.PPCertificateItemDetails(this.vregid,fileid).subscribe((res: any) => {
        this.PPCertificateItemDetails = res.map((item: any, index: number) => ({
          ...item,
          sno: index + 1
        }));
        console.log('With S.No:', this.PPCertificateItemDetails);
        this.dataSource2.data = this.PPCertificateItemDetails;
        this.dataSource2.paginator = this.paginator;
        this.dataSource2.sort = this.sort;
        this.spinner.hide();
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('API error:', error);
        this.spinner.hide();
      }
    );
    this.openDialog();
    
  }
  openDialog() {
    const dialogRef = this.dialog.open(this.itemDetailsModal, {
      width: '100%',
      height: '100%',
      maxWidth: '100%',
      panelClass: 'full-screen-dialog', // Optional for additional styling
      data: {
        /* pass any data here */
      },
      // width: '100%',
      // maxWidth: '100%', // Override default maxWidth
      // maxHeight: '100%', // Override default maxHeight
      // panelClass: 'full-screen-dialog' ,// Optional: Custom class for additional styling
      // height: 'auto',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed');
     });
     }

  exportToPDF() {
    ;
    const doc = new jsPDF('l', 'mm', 'a4'); // Landscape orientation
  
    // 🕒 Add title and date-time
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB'); // dd/mm/yyyy
    const formattedTime = now.toLocaleTimeString();
  
    doc.setFontSize(14);
    doc.text('Product Permission Certificate List', 140, 10, { align: 'center' });
    doc.setFontSize(10);
    doc.text(`Generated on: ${formattedDate} ${formattedTime}`, 140, 16, { align: 'center' });
  
    // ✅ Fetch data from your table
    const dataList = this.dataSource?.data || [];
  
    if (!dataList.length) {
      this.toastr.warning('No data available to export!');
      return;
    }
  
    // ✅ Define columns and rows (updated)
    const columns = [
      'S.No',
      'Licence No',
      'Unit Name',
      'Entry Date',
      'No. of Items (PPC)',
      'File Name'
    ];
  
    const rows = dataList.map((row: any, index: number) => [
      index + 1,
      row.licno || '',
      row.unitname || '',
      row.entrydate || '',
      row.noofitemppc || '',
      row.filename || ''
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
    doc.save(`PPC_List_${formattedDate}.pdf`);
  }
  

  exportToPDFPPItemDetails() {
    ;
    const doc = new jsPDF('l', 'mm', 'a4'); // Landscape orientation
  
    // 🕒 Add title and date-time
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB'); // dd/mm/yyyy
    const formattedTime = now.toLocaleTimeString();
  
    doc.setFontSize(14);
    doc.text('Product Permission Item Detail List', 140, 10, { align: 'center' });
    doc.setFontSize(10);
    doc.text(`Generated on: ${formattedDate} ${formattedTime}`, 140, 16, { align: 'center' });
  
    // ✅ Fetch data from your table
    const dataList = this.dataSource2?.data || [];
  
    if (!dataList.length) {
      this.toastr.warning('No data available to export!');
      return;
    }
  
    // ✅ Define new columns
    const columns = [
      'S.No',
      'Item Code',
      'Item Name',
      'Strength',
      'Unit',
      'Main Category',
      'Item Type',
      'Std. Batch Qty',
      'Page No',
      'HSN Code',
      'Short Name',
      'GST %'
    ];
  
    // ✅ Map rows to match columns
    const rows = dataList.map((row: any, index: number) => [
      index + 1,
      row.itemcode || '',
      row.itemname || '',
      row.strength || '',
      row.unit || '',
      row.mcategory || '',
      row.itemtypename || '',
      row.stndbatchqty || '',
      row.pageno || '',
      row.hsncode || '',
      row.shortname || '',
      row.gstper || ''
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
    doc.save(`Product_Permission_ItemDetail_List_${formattedDate}.pdf`);
  }
  
  applyTextFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  applyTextFilterItemDetail(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();

    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }
  

}
