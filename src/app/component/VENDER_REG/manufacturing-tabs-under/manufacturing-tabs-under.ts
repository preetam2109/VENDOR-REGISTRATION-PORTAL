import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

import { ManufacturingUnit } from '../manufacturing-unit/manufacturing-unit';
import { ManufacturingUnitUntiTab } from "../manufacturing-unit-unti-tab/manufacturing-unit-unti-tab";

import { ManufacturingUnitRetentionTab } from "../manufacturing-unit-retention-tab/manufacturing-unit-retention-tab";
import { ManufacturingUnitLicenceTab } from '../manufacturing-unit-licence-tab/manufacturing-unit-licence-tab';
import { Retention } from "../retention/retention";


@Component({
  selector: 'app-manufacturing-tabs-under',
  standalone:true,
  imports: [CommonModule, MatTabsModule, ManufacturingUnitUntiTab, ManufacturingUnitLicenceTab, ManufacturingUnitRetentionTab, Retention],
  templateUrl: './manufacturing-tabs-under.html',
  styleUrl: './manufacturing-tabs-under.css'
})
export class ManufacturingTabsUnder {
  vregid:any
  selectedTabIndex: number = 0;
  // selectedTabIndex = 0;

onTabChanged(index: number) {
  this.selectedTabIndex = index;
}


  constructor(private router:Router,private api:ApiService){
  
    }

    ngOnInit(): void {
      
      this.GetVendorDetailsID(sessionStorage.getItem('facilityid'));
    }
    GetVendorDetailsID(supplierId: any) {
      this.api.getVendorDetailsID(supplierId).subscribe({
        next: (res: any) => {
          if (Array.isArray(res) && res.length > 0) {
            this.vregid=res[0].vregid;
            console.log('Vendor vregid:', this.vregid);
            sessionStorage.setItem('vregid',this.vregid)
          
          } else {
            console.warn('No vendor details found.');
            alert('⚠️ Please generate vendor registration number.');
            this.router.navigate(['generate-registration']);
  
          }
        },
        error: (err) => {
          console.error('Error fetching vendor details:', err);
        }
      });
    }
    // selectedTabValue(event: any): void {
      
    //   this.selectedTabIndex = event.index;
    // }
   
  }