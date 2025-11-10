import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/auth/login/login.component';
import { LogoutComponent } from './component/auth/logout/logout.component';
import { RouteGuardService } from './service/authentication/route-guard.service';
import { CategorySelectionComponent } from './component/category-selection/category-selection.component';
import { EdlNonEdlIssuePercentSummary } from './Model/EdlNonEdlIssuePercentSummary';
import { CollectorLoginComponent } from './component/auth/collector-login/collector-login.component';
import { OtpComponent } from './component/auth/otp/otp.component';
import { GenerateRegistrationComponent } from './component/generate-registration/generate-registration.component';
import { PersonalDetailComponent } from './component/VENDER_REG/personal-detail/personal-detail.component';
import { Registration } from './component/auth/registration/registration';
import { FinanceialDetails } from './component/financeial-details/financeial-details';
import { ManufacturingUnit } from './component/VENDER_REG/manufacturing-unit/manufacturing-unit';
import { ManufaturingUnitTabs } from './manufaturing-unit-tabs/manufaturing-unit-tabs';
import { Retention } from './component/VENDER_REG/retention/retention';



const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full' },
  {path:'login',component:LoginComponent},
  {path:'Registration',component:Registration},
  {path:'collector-login',component:CollectorLoginComponent},
  {path:'otp',component:OtpComponent},

  {path:'logout',component:LogoutComponent,canActivate:[RouteGuardService]},
  { path: 'home',component: CategorySelectionComponent,canActivate:[RouteGuardService]}, 

// MD routes
{ path: 'welcome', component: HomeComponent, canActivate: [RouteGuardService],data: { allowedRoles: ['Suppliers','SEC1','DHS','CME','DME1','Collector','Warehouse','SE','HO_Infra','Division','DM PO','SSO','Logi Cell']} },



//vender portal


{path:'generate-registration',component:GenerateRegistrationComponent,canActivate:[RouteGuardService],data: { allowedRoles: ['Suppliers']}},
{path:'FinanceialDetails',component:FinanceialDetails,canActivate:[RouteGuardService],data: { allowedRoles: ['Suppliers']}},
{path:'manufacturingUnit',component:ManufaturingUnitTabs,canActivate:[RouteGuardService],data: { allowedRoles: ['Suppliers']}},
{path:'personal-detail',component:PersonalDetailComponent,canActivate:[RouteGuardService],data: { allowedRoles: ['Suppliers']}},
{path:'import-Licence',component:Retention,canActivate:[RouteGuardService],data: { allowedRoles: ['Suppliers']}},




//#endregion


{ path: '**', redirectTo: 'login' }


  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
