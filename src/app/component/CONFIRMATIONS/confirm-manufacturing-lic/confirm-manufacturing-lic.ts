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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ConfirmLicTab } from "../confirm-lic-tab/confirm-lic-tab";
import { ConfirmRetTab } from "../confirm-ret-tab/confirm-ret-tab";
import { ConfirmImporterLicTab } from "../confirm-importer-lic-tab/confirm-importer-lic-tab";

declare var bootstrap: any;


@Component({
  selector: 'app-confirm-manufacturing-lic',
  standalone:true,
  imports: [MatProgressSpinnerModule, MatTableExporterModule, MatSortModule, DropdownModule, NgSelectModule, FormsModule, MatPaginatorModule, MatTableModule, CommonModule, NgSelectModule, ReactiveFormsModule, MatMenuModule, CollapseModule, NgbCollapseModule, ConfirmLicTab, ConfirmRetTab, ConfirmImporterLicTab],
  templateUrl: './confirm-manufacturing-lic.html',
  styleUrl: './confirm-manufacturing-lic.css'
})
export class ConfirmManufacturingLic {
  vregid: any;
  selectedTabIndex: number = 0;
  
  constructor(private router: Router, private api: ApiService) {}
  
  ngOnInit(): void {
    this.GetVendorDetailsID(sessionStorage.getItem('facilityid'));
  }
  
  onTabChanged(index: number) {
    this.selectedTabIndex = index;
  }
  
  GetVendorDetailsID(supplierId: any) {
    this.api.getVendorDetailsID(supplierId).subscribe({
      next: (res: any) => {
        if (Array.isArray(res) && res.length > 0) {
          this.vregid = res[0].vregid;
          console.log('Vendor vregid:', this.vregid);
          sessionStorage.setItem('vregid', this.vregid);
        } else {
          alert('⚠️ Please generate vendor registration number.');
          this.router.navigate(['generate-registration']);
        }
      },
      error: (err) => {
        console.error('Error fetching vendor details:', err);
      }
    });
  }
  }