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
declare var bootstrap: any;
@Component({
  selector: 'app-market-standing-certificate',
  standalone:true,
  imports: [MatDialogModule,MatTableExporterModule, MatSortModule, DropdownModule, FormsModule, NgSelectModule, FormsModule, CommonModule, MatPaginatorModule, MatTableModule, CommonModule, FormsModule, NgSelectModule, ReactiveFormsModule, MatMenuModule, CollapseModule, NgbCollapseModule, MatIconModule],
  templateUrl: './market-standing-certificate.html',
  styleUrl: './market-standing-certificate.css'
})
export class MarketStandingCertificate {
  dataSource!: MatTableDataSource<any[]>;
  dataSource2!: MatTableDataSource<any[]>;

  today: string = new Date().toISOString().split("T")[0];
  validityerrorMsg:any;
  starterrorMsg:any;
  

  mSCDetailsList:any[]=[];
  MSCCOPItemList:any[]=[];
  
  isCollapsed = false;
  isCollapsed1 = true;
  isCollapsed2 = true;
  isCollapsed3 = true;
  isEventOpen = false;
  submitted = false;
  vregid = sessionStorage.getItem('vregid');
  marketStandingCForm!: FormGroup;
  MCCFillItemsForm!: FormGroup;
  MCCFillItemsLIst:any[]=[];
  selectedItems: any[] = [];


  mcid=1
  mItemTypeID:any;
  groupid:any
  licenceTypes: any[] = [];
  DDLcategory: any[] = [];
  DDLItemtype: any[] = [];
  DDLItemGroup: any[] = [];
 
  
  ManLicDdllist: any
  mTypeID: any;
  licid: any;

  selectedPanFile: File | null = null;

 

  
  itemsPerPage: number = 100;
  currentPage: number = 1;
  totalPagesArray: number[] = [];
  filteredItems: any[] = [];
  paginatedItems: any[] = [];
  searchText: string = '';

  sanitizedPdfUrl!: SafeResourceUrl;


  onshowMSC:boolean=false;

  @ViewChild('itemDetailsModal') itemDetailsModal: any;
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
    this.GetLicenceTypes()
    this.GetMasitemmaincategoryDDL()
    this.GetMasitemTypeDDL();
    this.GetmMANLICDDL();
    this.GetMasitemGroupDDL();
    
    this.GetmSCDetailsList();

    this.marketStandingCForm = this.fb.group({
      mlicid: ['', Validators.required],         // Category
      mVregid: [this.vregid, Validators.required],
      ISSUEDATE: ['', Validators.required],      // Item Group
      mstartdate: ['', Validators.required],   // Licence Type
      mEXPDate: ['', Validators.required],
      MSCissuingauthority:['',Validators.required],        // Licence

             // Licence
      Files: [null, Validators.required],

    });
    this.MCCFillItemsForm = this.fb.group({
      mVregid: [this.vregid, Validators.required],
      MCID: ['', Validators.required],         // Category
      mItemTypeID: ['', Validators.required],      // Item Group
      mGroupID: ['', Validators.required]   // Licence Type
      


    });

    this.MCCFillItemsForm.patchValue({
      mGroupID: 0
    })

  }

  onshowButtonClick(){
        this.onshowMSC = true;
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



  //    ngAfterViewChecked() {
  //   console.log('Form valid:', this.marketStandingCForm.valid);
  //   console.log('Form values:', this.marketStandingCForm.value);
  // }



 
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
 
 
  onCategorySelectChange(selected: any): void {
    
    const mcid = selected?.mcid ?? selected;

    if (mcid) {
      this.mcid = mcid || null;
     


    } else {
      console.error('Selected mcmid not found in the list.');
    }
  }
  onmItemTypeIDSelectChange(selected: any): void {
    
    const mItemTypeID = selected?.itemtypeid ?? selected;

    if (mItemTypeID) {
      this.mItemTypeID = mItemTypeID || null;
     


    } else {
      console.error('Selected mItemTypeID not found in the list.');
    }
  }
  onGroupSelectChange(selected: any): void {
    
    const groupid = selected?.groupid ?? selected;

    if (groupid) {
      this.groupid = groupid || null;
     


    } else {
      console.error('Selected mcmid not found in the list.');
    }
  }


  

  

  openMarketStandingModal() {
    // Sync checkbox state before showing modal
    this.MCCFillItemsLIst.forEach(item => {
      item.selected = this.selectedItems.some(sel => sel.itemid === item.itemid);
    });
  
    const modal = new bootstrap.Modal(document.getElementById('marketStandingModal'), {
      backdrop: false,
      keyboard: false
    });
  
    modal.show();
  }
  
  
  


  onSubmit() {
    
    this.submitted = true;
  
    if (this.marketStandingCForm.invalid) {
      this.toastr.warning('Please fill all required fields correctly!');
      return;
    }
  
    const formData = new FormData();
  
    // Append file if selected
    if (this.selectedPanFile) {
      formData.append('PanCardDocument', this.selectedPanFile);
    }
  
    // Add registration ID (if needed)
    this.marketStandingCForm.patchValue({
      mVregid: this.vregid
    });
  
    // Format date fields to dd-MM-yyyy
    const params = {
      ...this.marketStandingCForm.value,
      ISSUEDATE: this.formatDate(this.marketStandingCForm.value.ISSUEDATE),
      mstartdate: this.formatDate(this.marketStandingCForm.value.mstartdate),
      mEXPDate: this.formatDate(this.marketStandingCForm.value.mEXPDate),
    };
  
    // Step 1: Validate selected items (including MSCPAGENO) BEFORE insert
    if (this.selectedItems.length === 0) {
      this.toastr.warning('No items selected!');
      this.resetSubmitState();
      return;
    }
  
    const invalidItems = this.selectedItems.filter(item => !item.MSCPAGENO || item.MSCPAGENO <= 0);
    if (invalidItems.length > 0) {
      this.toastr.error('MSC Page No. is required and must be ≥ 1 for all selected items. Please fill and try again.');
      // Highlight errors in UI
      invalidItems.forEach(item => item._showErrors = true);
      this.resetSubmitState(); // Reset flags but keep form/items for retry
      return;
    }
  
    // All validations passed - proceed with insert
    try {
      this.api.InsertMakrketStanding(params, formData).subscribe({
        next: (res) => {
          // Assuming res is the MSC ID (string/number); adjust if it's res.id or similar
          const mscId = res.toString(); // Coerce to string for sessionStorage
          sessionStorage.setItem('mscid', mscId);
  
          this.toastr.success('Market Standing Certificate saved successfully!');
          console.log('API Response:', res);
  
          // Step 2: Chain to updates using the fresh MSC ID
          this.performUpdates(mscId);
        },
        error: (err) => {
          console.error('Error:', err);
          this.toastr.error('Failed to save data!');
          this.resetSubmitState(); // Reset on error too
        }
      });
    } catch (error) {
      console.error('Exception:', error);
      this.toastr.error('Unexpected error occurred!');
      this.resetSubmitState();
    }
  }
  
  private performUpdates(mscId: string) {
    let completedUpdates = 0;
    const totalUpdates = this.selectedItems.length;
    let updateErrors = 0; // Track errors for final messaging
  
    this.selectedItems.forEach(item => {
      // Per-item safety check (defensive, since pre-validated)
      if (!item.ppcid || !item.MSCPAGENO || item.MSCPAGENO <= 0) {
        console.warn('⚠️ Skipping invalid item:', item);
        completedUpdates++;
        if (completedUpdates === totalUpdates) {
          this.finalizeSubmit();
        }
        return;
      }
  
      this.api.UpdaetMSCMCCFillItems(item.ppcid, mscId, item.MSCPAGENO).subscribe({
        next: (res) => {
          console.log(`✅ Updated successfully for PPCID: ${item.ppcid}`);
          completedUpdates++;
        },
        error: (err) => {
          console.error(`❌ Error updating PPCID ${item.ppcid}:`, err);
          completedUpdates++;
          updateErrors++;
        },
        complete: () => {
          // Check if all updates are done
          if (completedUpdates === totalUpdates) {
            if (updateErrors > 0) {
              this.toastr.warning(`Partially updated: ${updateErrors} item(s) failed.`);
            } else {
              this.toastr.success('All items updated successfully!');
            }
            this.finalizeSubmit();
          }
        }
      });
    });
  }
  
  private finalizeSubmit() {
    // Refresh main data
    this.GetmSCDetailsList();
  
    // Full reset: Forms, file, selections, and item fields (but preserve list structure)
    this.marketStandingCForm.reset();
    this.MCCFillItemsForm?.reset(); // Safe access if optional
    this.marketStandingCForm.patchValue({ mVregid: this.vregid });
    this.MCCFillItemsForm?.patchValue({ mVregid: this.vregid });
  
    this.selectedPanFile = null;
  
    // Reset items table: Uncheck, clear fields, refresh views
    this.resetItemsTable();
  
    this.onshowMSC = false;
    this.submitted = false;
  
    // Hide modal
    const modalEl = document.getElementById('marketStandingModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();
  }
  
  resetItemsTable(): void {
    // Clear selections and reset fields without emptying the list
    if (this.MCCFillItemsLIst && this.MCCFillItemsLIst.length > 0) {
      this.MCCFillItemsLIst.forEach(item => {
        item.selected = false; // Uncheck checkboxes
        item._showErrors = false; // Hide validation errors
        item.MSCPAGENO = null; // Reset the page no. field (matches HTML input)
        // Add resets for other fields if present, e.g.:
        // item.otherField = null;
      });
    }
  
    // Clear selectedItems array (redundant but ensures no lingering refs)
    this.selectedItems = [];
  
    // Refresh filtered/paginated views if used (re-triggers *ngFor binding)
    if (this.filteredItems) {
      this.filteredItems = [...this.MCCFillItemsLIst]; // Sync with cleared fields
    }
    // If pagination: this.updatePagination(); // Uncomment if method exists
  
    // Force change detection if needed (for immediate UI update)
    this.cdr.detectChanges(); // Assuming ChangeDetectorRef injected
  }
  
  private resetSubmitState(): void {
    this.submitted = false;
    // this.onshowMSC = false;
     // Reset modal state on error
    // Do NOT reset forms/selections on error—allow retry
  }

  filterTable() {
    const text = this.searchText.toLowerCase();
    this.filteredItems = this.MCCFillItemsLIst.filter(
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
  toggleAll(event: any) {
    const checked = event.target.checked;
    this.MCCFillItemsLIst.forEach(item => {
      item.selected = checked;
    });
    if (checked) {
      this.selectedItems = [...this.MCCFillItemsLIst]; // Add all
    } else {
      this.selectedItems = []; // Clear all
    }
    this.filteredItems = [...this.MCCFillItemsLIst]; // Refresh filtered
    this.updatePagination();
  }

  onItemSelect(item: any) {
  
    if (item.selected) {
      // Add if not already selected
      const exists = this.selectedItems.some(x => x.itemid === item.itemid);
      if (!exists) {
        this.selectedItems.push(item);
      }
    } else {
      // Remove when unchecked
      this.selectedItems = this.selectedItems.filter(x => x.itemid !== item.itemid);
    }
  
    console.log('Selected Items:', this.selectedItems);
  }
  


  onSubmitMCCFillItemsForm() {
   
    this.api.GETMCCFillItems(this.vregid, this.mcid, 0, 0).subscribe({
      next: (res: any[]) => {
        if (res && res.length > 0) {
          const existingSelections = new Map(
            this.selectedItems.map(item => [item.itemid, item])
          );
  
          // ✅ Map API response while preserving selections and MSCPAGENO etc.
          this.MCCFillItemsLIst = res.map(item => {
            const prev = existingSelections.get(item.itemid);
            return {
              ppcid: item.ppcid || null,
              fileid: item.fileid || null,
              itemid: item.itemid,
              itemcode: item.itemcode,
              itemname: item.itemname,
              strength: item.strength,
              unit: item.unit,
              mcategory: item.mcategory,
              itemtypename: item.itemtypename,
              stndbatchqty: item.stndbatchqty || '',
              pageno: item.pageno || '',
              hsncode: item.hsncode || '',
              shortname: item.shortname || '',
              gstper: item.gstper || '',
              MSCPAGENO: prev ? prev.MSCPAGENO : item.MSCPAGENO || '',
              selected: prev ? prev.selected : false,
              _showErrors: false
            };
          });
  
          this.filteredItems = [...this.MCCFillItemsLIst];
          this.updatePagination();
          console.log('✅ Fetched MCC Fill Items (preserving selections):', this.MCCFillItemsLIst);
        } else {
          this.MCCFillItemsLIst = [];
          this.toastr.warning('⚠️ No items found for given parameters');
          console.warn('⚠️ No items found for given parameters');
        }
      },
      error: (err) => {
        console.error('❌ Error fetching MCC Fill Items:', err);
      }
    });
  }
  

  
    // Helper function to format date as dd-MM-yyyy

    formatDate(dateString: string): string {
      const date = new Date(dateString);
      const day = ('0' + date.getDate()).slice(-2);
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();
        return `${day}-${month}-${year}`;
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

GetmSCDetailsList() {
  this.spinner.show();
  this.api.getmSCDetailsList(sessionStorage.getItem('vregid'),sessionStorage.getItem('facilityid')).subscribe((res: any) => {
      this.mSCDetailsList = res.map((item: any, index: number) => ({
        ...item,
        sno: index + 1
      }));
      console.log('IA With S.No:', this.mSCDetailsList);
      this.dataSource.data = this.mSCDetailsList;
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


exportToPDF() {
  const doc = new jsPDF('l', 'mm', 'a4'); // Landscape A4
  
  // 🕒 Add title and timestamp
  const now = new Date();
  const formattedDate = now.toLocaleDateString('en-GB'); // dd/mm/yyyy
  const formattedTime = now.toLocaleTimeString();
  
  doc.setFontSize(14);
  doc.text('Market Standing Certificate List', 140, 10, { align: 'center' });
  doc.setFontSize(10);
  doc.text(`Generated on: ${formattedDate} ${formattedTime}`, 140, 16, { align: 'center' });
  
  // ✅ Fetch data from dataSource or array
  const dataList = this.dataSource?.data || this.mSCDetailsList || [];
  
  if (!dataList.length) {
    this.toastr.warning('No data available to export!');
    return;
  }
  
  // ✅ Define table headers (same as table columns)
  const columns = [
    'S.No',
    'Licence No',
    'Unit Name',
    'Issue Date',
    'Start Date',
    'Validity Date',
    'Total Items',
    'File Name'
  ];
  
  // ✅ Map table rows
  const rows = dataList.map((row: any, index: number) => [
    index + 1,
    row.licno || '',
    row.unitname || '',
    row.issuedate || '',
    row.startdate || '',
    row.validitydate || '',
    row.cntitems || '',
    row.filename || ''
  ]);
  
  // 🧾 Generate the table
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
  
  // 💾 Save the generated PDF
  doc.save(`Market_Standing_Certificate_List_${formattedDate}.pdf`);
}
exportToPDF2() {
  ;
  const doc = new jsPDF('l', 'mm', 'a4'); // Landscape A4 sheet

  // 🕒 Title and Timestamp
  const now = new Date();
  const formattedDate = now.toLocaleDateString('en-GB'); // dd/mm/yyyy
  const formattedTime = now.toLocaleTimeString();

  doc.setFontSize(14);
  doc.text('Market Standing Certificate Item Details', 140, 10, { align: 'center' });
  doc.setFontSize(10);
  doc.text(`Generated on: ${formattedDate} ${formattedTime}`, 140, 16, { align: 'center' });

  // ✅ Fetch your data
  const dataList = this.dataSource2?.data || this.mSCDetailsList || [];

  if (!dataList.length) {
    this.toastr.warning('No data available to export!');
    return;
  }

  // ✅ Define column headers
  const columns = [
    'S.No',
    'PPC ID',
    'File ID',
    'Item ID',
    'Item Code',
    'Item Name',
    'Strength',
    'Unit',
    'Category',
    'Item Type',
    'Std. Batch Qty',
    'Page No',
    'HSN Code',
    'Short Name',
    'GST %'
  ];

  // ✅ Map table rows
  const rows = dataList.map((row: any, index: number) => [
    index + 1,
    row.ppcid || '',
    row.fileid || '',
    row.itemid || '',
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

  // 🧾 Generate the PDF table
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

  // 💾 Save the generated PDF
  doc.save(`MarketStandingItemDetails_${formattedDate}.pdf`);
}


OnClickMSCCOPItemDetails(mFileID:any){
  
  this.spinner.show();
  this.api.GetMSCCOPItemDetails(sessionStorage.getItem('vregid'),mFileID,'MSC').subscribe((res: any) => {
      this.MSCCOPItemList = res.map((item: any, index: number) => ({
        ...item,
        sno: index + 1
      }));
      console.log('With S.No:', this.MSCCOPItemList);
      this.dataSource2.data = this.MSCCOPItemList;
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


   validateDates() {
    // ;
    // ISSUEDATE: ['', Validators.required],      // Item Group
    // mstartdate: ['', Validators.required],   // Licence Type
    // mEXPDate: ['', Validators.required],  
      const start = new Date(this.marketStandingCForm.value.mstartdate);
      const issue = new Date(this.marketStandingCForm.value.ISSUEDATE);
      const validity = new Date(this.marketStandingCForm.value.mEXPDate);
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
