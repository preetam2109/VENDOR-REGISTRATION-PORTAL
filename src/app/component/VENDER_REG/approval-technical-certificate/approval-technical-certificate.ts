import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

import { ManufacturingUnit } from '../manufacturing-unit/manufacturing-unit';
import { ManufacturingUnitUntiTab } from "../manufacturing-unit-unti-tab/manufacturing-unit-unti-tab";

import { ManufacturingUnitRetentionTab } from "../manufacturing-unit-retention-tab/manufacturing-unit-retention-tab";
import { ManufacturingUnitLicenceTab } from '../manufacturing-unit-licence-tab/manufacturing-unit-licence-tab';
import { ManufacturingUnitLicenceTabApproval } from "../TECHNICAL_APPROVAL/manufacturing-unit-licence-tab-approval/manufacturing-unit-licence-tab-approval";
import { ManufacturingUnitRetentionTabApproval } from "../TECHNICAL_APPROVAL/manufacturing-unit-retention-tab-approval/manufacturing-unit-retention-tab-approval";
import { Retention } from "../retention/retention";
import { ImporterApproval } from "../TECHNICAL_APPROVAL/importer-approval/importer-approval";



@Component({
  selector: 'app-approval-technical-certificate',
  standalone:true,
  imports: [CommonModule, MatTabsModule, ManufacturingUnitUntiTab, ManufacturingUnitLicenceTab, ManufacturingUnitRetentionTab, ManufacturingUnitLicenceTabApproval, ManufacturingUnitRetentionTabApproval, Retention, ImporterApproval],
  templateUrl: './approval-technical-certificate.html',
  styleUrl: './approval-technical-certificate.css'
})
export class ApprovalTechnicalCertificate {
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