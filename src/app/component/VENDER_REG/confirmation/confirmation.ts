import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { ConfirmBankDetailsTab } from "../../CONFIRMATIONS/confirm-bank-details-tab/confirm-bank-details-tab";
import { ConfirmTechnicalDetailsTab } from "../../CONFIRMATIONS/confirm-technical-details-tab/confirm-technical-details-tab";



@Component({
  selector: 'app-confirmation',
  standalone:true,
  imports: [CommonModule, MatTabsModule, Confirmation, ConfirmBankDetailsTab, ConfirmTechnicalDetailsTab],
  templateUrl: './confirmation.html',
  styleUrl: './confirmation.css'
})
export class Confirmation {
  vregid:any
  selectedTabIndex: number = 0;
  SupID:any

  constructor(private router:Router,private api:ApiService,private route: ActivatedRoute){
  
    }

    ngOnInit(): void {
     this.vregid=sessionStorage.getItem('vregid')
     this.SupID=sessionStorage.getItem('facilityid')
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