import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/auth/login/login.component';
import { LogoutComponent } from './component/auth/logout/logout.component';
import { RouteGuardService } from './service/authentication/route-guard.service';
import { CategorySelectionComponent } from './component/category-selection/category-selection.component';
import { CollectorLoginComponent } from './component/auth/collector-login/collector-login.component';
import { OtpComponent } from './component/auth/otp/otp.component';
import { GenerateRegistrationComponent } from './component/generate-registration/generate-registration.component';
import { PersonalDetailComponent } from './component/VENDER_REG/personal-detail/personal-detail.component';
import { Registration } from './component/auth/registration/registration';
import { FinanceialDetails } from './component/financeial-details/financeial-details';
import { ManufacturingUnit } from './component/VENDER_REG/manufacturing-unit/manufacturing-unit';
import { ManufaturingUnitTabs } from './manufaturing-unit-tabs/manufaturing-unit-tabs';
import { Retention } from './component/VENDER_REG/retention/retention';
import { TechnicalDetails } from './component/technical-details/technical-details';
import { ComplianceDetails } from './component/compliance-details/compliance-details';
import { GlobalCompanyPrefix } from './component/global-company-prefix/global-company-prefix';
import { ManufacturingTabsUnder } from './component/VENDER_REG/manufacturing-tabs-under/manufacturing-tabs-under';
import { VendorRegistrationCompleted } from './component/vendor-registration-completed/vendor-registration-completed';
import { VendorRegistrationApproved } from './component/vendor-registration-approved/vendor-registration-approved';
import { ApprovalTechnicalCertificate } from './component/VENDER_REG/approval-technical-certificate/approval-technical-certificate';
import { ApprovalTechnicalSectionTabsUnder } from './component/VENDER_REG/TECHNICAL_APPROVAL/approval-technical-section-tabs-under/approval-technical-section-tabs-under';
import { ConfirmationService } from 'primeng/api';
import { Confirmation } from './component/VENDER_REG/confirmation/confirmation';
import { FinalConfirmation } from './component/CONFIRMATIONS/final-confirmation/final-confirmation';
import { Approvedvrf } from './component/approvedvrf/approvedvrf';
import { VRegistrationPending } from './component/vregistration-pending/vregistration-pending';

// import { ConversationHodCgmscComponent } from './component/tender-status /conversation-hod-cgmsc/conversation-hod-cgmsc.component';
// import { TenderStatusDashComponent } from './component/tender-status /tender-status-dash/tender-status-dash.component';





const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full' },
  {path:'login',component:LoginComponent},
  {path:'Registration',component:Registration},
  {path:'collector-login',component:CollectorLoginComponent},
  {path:'otp',component:OtpComponent},
  {path:'VendorRegistrationCompleted',component:VendorRegistrationCompleted},
  {path:'VRegistrationPending',component:VRegistrationPending},
  {path:'VendorRegistrationApproved',component:VendorRegistrationApproved},
  // {path:'ApprovalTechnicalCrt',component:ApprovalTechnicalCertificate},
  {path:'ApprovalTechnicalCrt',component:ApprovalTechnicalSectionTabsUnder},

  {path:'logout',component:LogoutComponent,canActivate:[RouteGuardService]},
  { path: 'home',component: CategorySelectionComponent,canActivate:[RouteGuardService]}, 
  { path: 'confirmation',component: Confirmation,canActivate:[RouteGuardService]}, 
  { path: 'final-confirmation',component: FinalConfirmation,canActivate:[RouteGuardService]}, 

// MD routes
{ path: 'welcome', component: HomeComponent, canActivate: [RouteGuardService],data: { allowedRoles: ['Suppliers','SEC1','DHS','CME','DME1','Collector','Warehouse','SE','HO_Infra','Division','DM PO','SSO','Logi Cell']} },



//vender portal


{path:'generate-registration',component:GenerateRegistrationComponent,canActivate:[RouteGuardService],data: { allowedRoles: ['Suppliers']}},
{path:'FinanceialDetails',component:FinanceialDetails,canActivate:[RouteGuardService],data: { allowedRoles: ['Suppliers']}},
{path:'manufacturingUnit',component:ManufaturingUnitTabs,canActivate:[RouteGuardService],data: { allowedRoles: ['Suppliers']}},
// {path:'manufacturingUnitTabsUnder',component:ManufacturingTabsUnder,canActivate:[RouteGuardService],data: { allowedRoles: ['Suppliers']}},
{path:'TechnicalDetails',component:TechnicalDetails,canActivate:[RouteGuardService],data: { allowedRoles: ['Suppliers']}},
{path:'ComplianceDetails',component:ComplianceDetails,canActivate:[RouteGuardService],data: { allowedRoles: ['Suppliers']}},
{path:'GlobalCompanyPrefix',component:GlobalCompanyPrefix,canActivate:[RouteGuardService],data: { allowedRoles: ['Suppliers']}},
{path:'personal-detail',component:PersonalDetailComponent,canActivate:[RouteGuardService],data: { allowedRoles: ['Suppliers']}},
{path:'import-Licence',component:Retention,canActivate:[RouteGuardService],data: { allowedRoles: ['Suppliers']}},
{path:'Approved',component:Approvedvrf,canActivate:[RouteGuardService],data: { allowedRoles: ['Suppliers']}},




//#endregion


{ path: '**', redirectTo: 'login' }


  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
