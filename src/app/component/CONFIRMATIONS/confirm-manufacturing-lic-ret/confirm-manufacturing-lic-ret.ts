import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { ConfirmManufacturingLic } from "../confirm-manufacturing-lic/confirm-manufacturing-lic";
import { ConfirmProductPermissionTab } from "../confirm-product-permission-tab/confirm-product-permission-tab";
import { ConfirmMarketStandingCertificateTab } from "../confirm-market-standing-certificate-tab/confirm-market-standing-certificate-tab";
import { ConfirmCapaityOfProductionTab } from "../confirm-capaity-of-production-tab/confirm-capaity-of-production-tab";


@Component({
  selector: 'app-confirm-manufacturing-lic-ret',
  standalone:true,
  imports: [CommonModule, MatTabsModule, ConfirmManufacturingLic, ConfirmProductPermissionTab, ConfirmMarketStandingCertificateTab, ConfirmCapaityOfProductionTab],
  templateUrl: './confirm-manufacturing-lic-ret.html',
  styleUrl: './confirm-manufacturing-lic-ret.css'
})
export class ConfirmManufacturingLicRet {
  vregid:any
  selectedTabIndex: number = 0;
  SupID:any

  constructor(private router:Router,private api:ApiService,private route: ActivatedRoute){
  
    }

    ngOnInit(): void {
      this.vregid= sessionStorage.getItem('vregid');
      this.SupID=  sessionStorage.getItem('facilityid');
      this.GetVendorDetailsID(this.SupID);
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