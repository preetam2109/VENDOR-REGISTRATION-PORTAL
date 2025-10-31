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



@Component({
  selector: 'app-manufacturing-unit',
  standalone: true,
  imports: [MatTableExporterModule,MatSortModule,DropdownModule, FormsModule, NgSelectModule, FormsModule, CommonModule, MatPaginatorModule, MatTableModule, CommonModule, FormsModule, NgSelectModule, ReactiveFormsModule, MatMenuModule],
  templateUrl: './manufacturing-unit.html',
  styleUrl: './manufacturing-unit.css'
})
export class ManufacturingUnit {

  manufacturingList: any[] = [];
  dataSource!: MatTableDataSource<any[]>;
  dataSource2!: MatTableDataSource<any[]>;
  manufacturingLicList: any[] = [];
  unitForm!: FormGroup;
  licenceTypes: any[] = [];
  states: any[] = [];
  lictypeid:any;
  stateid:any;
  vregid: any;

  selectedPanFile: File | null = null;



  licForm!: FormGroup;

  unitList: any[] = [];
  formList: any[] = [];
  // licenceTypes: any[] = [];
  licTypes:any[]=[];







  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('sort') sort!: MatSort;
  @ViewChild('paginator1') paginator1!: MatPaginator;
  @ViewChild('sort1') sort1!: MatSort;

  constructor(private cdr:ChangeDetectorRef,private spinner: NgxSpinnerService,private api: ApiService,public toastr: ToastrService,private fb: FormBuilder){
    this.dataSource = new MatTableDataSource<any>([]);
  }

  ngOnInit() {


    this.GetLicenceTypes()
    this.GetMassStates()
debugger
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
    this.GetVendorDetailsID(sessionStorage.getItem('facilityid'));
    this.getManufacturingDetails();



// licence
debugger
this.getMasformTypes()

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
});
this.GetmANUFACLICDetails()


  }

  getMasformTypes(){
    debugger
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
  
  

  getManufacturingDetails() {

      this.spinner.show();
      const supplierId = sessionStorage.getItem('facilityid');
      
    
      this.api.getManufacturingDetails(supplierId, this.vregid).subscribe((res: any) => {
          console.log('Raw API response:', res);
    
          this.manufacturingList = res.map((item: any, index: number) => ({
            ...item,
            sno: index + 1
          }));

          this.unitList = res.map((item: any) => ({
            unitid: item.unitid,
            unitname : item.unitname,
          }));
    
          console.log('With S.No:', this.manufacturingList);
    
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
    GetmANUFACLICDetails() {
debugger
      this.spinner.show();
      const supplierId = sessionStorage.getItem('facilityid');
    
      this.api.getmANUFACLICDetails(supplierId,this.vregid).subscribe((res: any) => {
          console.log('Raw API response:', res);
    
          this.manufacturingLicList = res.map((item: any, index: number) => ({
            ...item,
            sno: index + 1
          }));

        
    
          // console.log('With manuf lic:', this.manufacturingLicList);
    
          this.dataSource2.data = this.manufacturingLicList;
          this.dataSource2.paginator = this.paginator1;
          this.dataSource2.sort = this.sort1;
          debugger
          console.log('With manuf lic datasource :', this.dataSource2);

    
          this.spinner.hide();
          this.cdr.detectChanges();
        },
        (error) => {
          console.error('API error:', error);
          this.spinner.hide();
        }
      );
      
    }












   
  
  GetLicenceTypes(){
  debugger
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
  debugger
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

  // onISelectChange(event: Event): void {
  //   debugger
  //   const selectedUser = this.licenceTypes.find((user: { lictypeid: string }) => user.lictypeid === this.lictypeid);
  //   if (selectedUser) {
  //     this.lictypeid = selectedUser.lictypeid || null;
  //   } else {
  //     console.error('Selected lictypeid not found in the list.');
  //   }
  // }
  // onISelectStatesChange(event: Event): void {
  //   debugger
  //   const selectedUser = this.states.find((user: { stateid: string }) => user.stateid === this.stateid);
  //   if (selectedUser) {
  //     this.stateid = selectedUser.stateid || null;
  //   } else {
  //     console.error('Selected stateid not found in the list.');
  //   }
  // }

  onSubmit() {
    debugger
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
  //   console.log('Form valid:', this.licForm.valid);
  //   console.log('Form values:', this.licForm.value);
  // }
  
  onSubmitLicence() {
    debugger

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
    console.log('Selected PAN card file:', file.name);
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

exportToPDF() {
  const doc = new jsPDF('l', 'mm', 'a4'); // Landscape mode

  const columns = [
    { title: 'S.No', dataKey: 'sno' },
    { title: 'Unit Name', dataKey: 'unitname' },
    { title: 'Address', dataKey: 'unitaddress' },
    { title: 'City', dataKey: 'city' },
    { title: 'Incharge Name', dataKey: 'unitinchargename' },
    { title: 'Mobile', dataKey: 'unitinchargemob' },
    { title: 'Email', dataKey: 'unitinchargeemail' },
    { title: 'State', dataKey: 'statename' },
    { title: 'Licence Type', dataKey: 'lictypename' }
  ];

  // ✅ FIXED: access actual array using .data
  const rows = this.dataSource.data.map((row: any, index: number) => ({
    sno: index + 1,
    unitname: row.unitname,
    unitaddress: row.unitaddress,
    city: row.city,
    unitinchargename: row.unitinchargename,
    unitinchargemob: row.unitinchargemob,
    unitinchargeemail: row.unitinchargeemail,
    statename: row.statename,
    lictypename: row.lictypename
  }));

  autoTable(doc, {
    head: [columns.map(col => col.title)],
    body: rows,
    startY: 20,
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185], textColor: 255, fontSize: 10 },
    styles: { fontSize: 9, cellPadding: 2, textColor: [0, 0, 0] },
    columnStyles: {
      0: { cellWidth: 12 },
      1: { cellWidth: 35 },
      2: { cellWidth: 40 },
      3: { cellWidth: 25 },
      4: { cellWidth: 35 },
      5: { cellWidth: 28 },
      6: { cellWidth: 45 },
      7: { cellWidth: 30 },
      8: { cellWidth: 35 }
    },
    margin: { top: 20, left: 10, right: 10 }
  });

  doc.save('Manufacturing_Unit_List.pdf');
}

exportToPDFManufacturingLic(){

}

  


}
