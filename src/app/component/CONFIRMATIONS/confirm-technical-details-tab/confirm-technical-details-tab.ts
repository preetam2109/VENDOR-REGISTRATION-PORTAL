import { Component } from '@angular/core';
import { ConfirmManufacturingLicRet } from "../confirm-manufacturing-lic-ret/confirm-manufacturing-lic-ret";

@Component({
  selector: 'app-confirm-technical-details-tab',
  standalone:true,
  imports: [ConfirmManufacturingLicRet],
  templateUrl: './confirm-technical-details-tab.html',
  styleUrl: './confirm-technical-details-tab.css'
})
export class ConfirmTechnicalDetailsTab {

}
