import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ManufacturingUnit } from "../component/VENDER_REG/manufacturing-unit/manufacturing-unit";
import { ProductPermission } from '../component/VENDER_REG/product-permission/product-permission';
import { Confirmation } from '../component/VENDER_REG/confirmation/confirmation';
import { Retention } from "../component/VENDER_REG/retention/retention";
import { MarketStandingCertificate } from "../component/VENDER_REG/market-standing-certificate/market-standing-certificate";
import { CapaityOfProduction } from "../component/VENDER_REG/capaity-of-production/capaity-of-production";
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-manufaturing-unit-tabs',
  standalone: true,
  imports: [CommonModule, MatTabsModule, ManufacturingUnit, ProductPermission, Confirmation, MarketStandingCertificate, CapaityOfProduction],
  templateUrl: './manufaturing-unit-tabs.html',
  styleUrl: './manufaturing-unit-tabs.css'
})
export class ManufaturingUnitTabs {
  vregid:any
  selectedTabIndex: number = 0;

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
    selectedTabValue(event: any): void {
      
      this.selectedTabIndex = event.index;
    }
   
  }