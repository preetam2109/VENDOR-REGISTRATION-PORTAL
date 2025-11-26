import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { CapaityOfProduction } from '../../capaity-of-production/capaity-of-production';
import { Confirmation } from '../../confirmation/confirmation';
import { ManufacturingUnit } from '../../manufacturing-unit/manufacturing-unit';
import { MarketStandingCertificate } from '../../market-standing-certificate/market-standing-certificate';
import { ProductPermission } from '../../product-permission/product-permission';
import { ApprovalTechnicalCertificate } from "../../approval-technical-certificate/approval-technical-certificate";
import { ApprovalProductPermission } from "../approval-product-permission/approval-product-permission";
import { ApprovalMarketStandingCertificate } from "../approval-market-standing-certificate/approval-market-standing-certificate";
import { ApprovalCapaityOfProduction } from "../approval-capaity-of-production/approval-capaity-of-production";


@Component({
  selector: 'app-approval-technical-section-tabs-under',
  standalone:true,
  imports: [CommonModule, MatTabsModule, ManufacturingUnit, ProductPermission, Confirmation, MarketStandingCertificate, CapaityOfProduction, ApprovalTechnicalCertificate, ApprovalProductPermission, ApprovalMarketStandingCertificate, ApprovalCapaityOfProduction],
  templateUrl: './approval-technical-section-tabs-under.html',
  styleUrl: './approval-technical-section-tabs-under.css'
})
export class ApprovalTechnicalSectionTabsUnder {
  vregid:any
  selectedTabIndex: number = 0;
  SupID:any

  constructor(private router:Router,private api:ApiService,private route: ActivatedRoute){
  
    }

    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.vregid= params['vregid'];
        this.SupID=  params['supid'];
    
        console.log("VRegID:",  this.vregid);
        console.log("SupID:",  this.SupID);
        // console.log("VRegID:", params['vregid']);
        // console.log("SupID:", params['supid']);
      });
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