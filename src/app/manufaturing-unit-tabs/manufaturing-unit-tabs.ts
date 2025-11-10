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

@Component({
  selector: 'app-manufaturing-unit-tabs',
  standalone: true,
  imports: [CommonModule, MatTabsModule, ManufacturingUnit, ProductPermission, Confirmation, Retention, MarketStandingCertificate, CapaityOfProduction],
  templateUrl: './manufaturing-unit-tabs.html',
  styleUrl: './manufaturing-unit-tabs.css'
})
export class ManufaturingUnitTabs {
  selectedTabIndex: number = 0;

  constructor(private router:Router){
  
    }
    selectedTabValue(event: any): void {
      
      this.selectedTabIndex = event.index;
    }
   
  }