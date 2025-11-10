import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { InputComponent } from './input/input.component';
import { MaterialModule } from './material-module';
// import { AutocompleteComponent } from './component/autocomplete/autocomplete.component';
import { FormsModule } from '@angular/forms';
import {  ReactiveFormsModule } from '@angular/forms';

// import { SliderComponent } from './component/slider/slider.component';
// import { TableComponent } from './component/table/table.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

// import { PopupComponent } from './component/popup/popup.component';
// import { AssociateComponent } from './component/associate/associate.component';
// import { UserdetailComponent } from './component/userdetail/userdetail.component';
import {MatTabsModule} from '@angular/material/tabs';
import { NgApexchartsModule } from "ng-apexcharts";
import { MatTableExporterModule } from 'mat-table-exporter';

import { NgxSpinnerModule } from 'ngx-spinner';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { DatePipe } from '@angular/common';
import { LoginComponent } from './component/auth/login/login.component';
import { LogoutComponent } from './component/auth/logout/logout.component';
import { ToastrModule } from 'ngx-toastr';

import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import {APP_BASE_HREF} from '@angular/common';

import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatButtonModule } from '@angular/material/button';

// import { Stepper } from './component/stepper/stepper';

import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { Registration } from './component/auth/registration/registration';

@NgModule({ declarations: [
        AppComponent,

        // Stepper,
        // InputComponent,
        // AutocompleteComponent,
        MenubarComponent,
        HomeComponent,
        CardComponent,
        Registration,
        // SliderComponent,
        // TableComponent,
        FormdesignComponent,
        // PopupComponent,
        // AssociateComponent,
        // UserdetailComponent,
        // FooterComponent,
        RCDetailReportComponent,
        ComplaintsComponent,
        ApexChartComponent,
        DispatchPendingComponent,
        ReceiptPendingComponent,
        InstallationPendingComponent,
        DHSComponent,
        DispatchPendingOneComponent,
        LoginComponent,

        LogoutComponent,
    ],
    bootstrap: [AppComponent], 
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [
    NgSelectModule,
    // FormsModule,
    NgbCollapseModule,
    CommonModule,
    DatePipe,
    MatProgressSpinnerModule,
    FontAwesomeModule,
    NgxSpinnerModule.forRoot({ type: 'line-scale-party' }),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatTabsModule,
    NgApexchartsModule,
    MatDialogModule,
    MatTableModule,
    GoogleMapsModule,
    MatTableExporterModule, MatButtonModule,
    ToastrModule.forRoot({
        positionClass: 'toast-top-right' // Set the position to top right
    })
  
], providers: [DatePipe, 
      { provide: APP_BASE_HREF, useValue: '/vedang/' }, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
 }
