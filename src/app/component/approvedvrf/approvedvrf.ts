import { CommonModule } from '@angular/common';



import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import { ComplienceCertificateDetails,GetGCPDetails,GetAnnualTurnoverDetail,MassuppliergstDetails,GstReturnDetails,BankMandateDetail } from 'src/app/Model/VendorRegisDetail';

import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule,FormBuilder } from '@angular/forms';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';



@Component({
  selector: 'app-approvedvrf',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './approvedvrf.html',
  styleUrl: './approvedvrf.css'
})

export class Approvedvrf {
  manufacturingLicList: any[] = [];
  importerLicenceList:any[]=[];
  mSCDetailsList:any[]=[];
  PPCertificateList:any[]=[];
  COPDetailsList:any[]=[];
  WHOGMPList: ComplienceCertificateDetails[] = [];
  AnnualTurnoverDetail: GetAnnualTurnoverDetail[] = [];
    GSTList: MassuppliergstDetails[] = [];
  GCPDetails: GetGCPDetails[] = [];
  GSTReturnDetails: GstReturnDetails[] = [];
  BankMandateDetails: BankMandateDetail[] = [];
  vendor: any = {}; // Holds vendor data
  TechnicalDetails:any[]=[];
  SupID: any;
  vregid:any;
  panno:any;
  userAgent:any;
  ipAddress:any;
  today:any;
  constructor(private sanitizer: DomSanitizer,private spinner: NgxSpinnerService,private api: ApiService,public toastr: ToastrService,private fb: FormBuilder){
    this.today = new Date();
   }
  ngOnInit() {
    this.vregid= sessionStorage.getItem('vregid');
    this.SupID=  sessionStorage.getItem('facilityid');
    this.panno=sessionStorage.getItem('panno');
    this.userAgent=sessionStorage.getItem('userAgent');
   this.ipAddress=sessionStorage.getItem('ipAddress');
    this.loadVendorDetails();
    this.GetmANUFACLICDetails();
    this.GETImporterLicenceDetails();
   this.GetmSCDetailsList();
   this.GETtPPCertificate();
    this.GetCOPDetailsList();
    this.GetComplienceCertificateDetails();
    this.GetGCPDetails();
    this.GetAnnualTurnover();
    this.GETMassuppliergstDetails();
    this.GETGstReturnDetails();
    this.GETBankMandateDetail();
    this.GetTechnicalDetails();
  }
//#region 
  loadVendorDetails() {
  
    this.api.getVendorDetails(sessionStorage.getItem('facilityid')).subscribe({
      next: (res: any) => {
        if (res && res.length > 0) {
          this.vendor = res[0]; // since API returns an array
          console.log('vender',this.vendor)
        }
      },
      error: (err) => {
        console.error("Error loading vendor details:", err);
        // alert("Failed to load vendor details");
      }
    });
  }
  // manuf lic
  GetmANUFACLICDetails() {
// debugger;
    this.spinner.show();
    this.api.getmANUFACLICDetails(this.SupID,this.vregid).subscribe((res: any) => {
        console.log('Raw API response:', res);
  
        this.manufacturingLicList = res;
        this.spinner.hide();
        console.log('With manuf lic:', this.manufacturingLicList);
      },
      (error) => {
        console.error('API error:', error);
        this.spinner.hide();
      }
    );
    
  }
  // import licens
  GETImporterLicenceDetails() {
    this.spinner.show();
    this.api.GetImporterLicenceDetails(sessionStorage.getItem('vregid'),sessionStorage.getItem('facilityid')).subscribe((res: any) => {
        this.importerLicenceList = res
        console.log('With S.No:', this.importerLicenceList);
        this.spinner.hide();
      },
      (error) => {
        console.error('API error:', error);
        this.spinner.hide();
      }
    );
    
  }
  // Market standing list
  GetmSCDetailsList() {
    this.spinner.show();
    this.api.getmSCDetailsList(sessionStorage.getItem('vregid'),sessionStorage.getItem('facilityid')).subscribe((res: any) => {
        this.mSCDetailsList = res
        console.log('IA With S.No:', this.mSCDetailsList);
        this.spinner.hide();
      },
      (error) => {
        console.error('API error:', error);
        this.spinner.hide();
      }
    );
    
    
  }
  // product parmetion
  
  GETtPPCertificate() {
    this.spinner.show();
    this.api.GetPPCertificate(sessionStorage.getItem('vregid')).subscribe((res: any) => {
        this.PPCertificateList = res
        console.log('DDWith S.No:', this.PPCertificateList);
        this.spinner.hide();
      },
      (error) => {
        console.error('API error:', error);
        this.spinner.hide();
      }
    );
    
  }
  // cpcity of producion 
  GetCOPDetailsList() {
    this.spinner.show();
    this.api.GetCOPDetails(sessionStorage.getItem('vregid'),sessionStorage.getItem('facilityid')).subscribe((res: any) => {
        this.COPDetailsList = res
        console.log('With S.No:', this.COPDetailsList);
        this.spinner.hide();
      },
      (error) => {
        console.error('API error:', error);
        this.spinner.hide();
      }
    );
    
    
  }


  // WHOGMPList
  
  GetComplienceCertificateDetails() {
    try {
      this.spinner.show();
      this.api
        .GetComplienceCertificateDetails(
          sessionStorage.getItem('vregid'),
          sessionStorage.getItem('facilityid')
        )
        // this.Service.get('GetDrugTenderList?n=0')
        .subscribe(
          (res: any) => {
            this.WHOGMPList = res;
            // console.log('GetComplienceCertificateDetails=:', this.dispatchData);
            this.spinner.hide();
          },
          (error: { message: any }) => {
            this.spinner.hide();
            console.log('Error fetching data:',JSON.stringify(error.message))
            // alert(`Error fetching data: ${JSON.stringify(error.message)}`);
          }
        );
    } catch (err: any) {
      this.spinner.hide();

      console.log(err);
      // throw err;
    }
  }

  // GCP Details
  GetGCPDetails(){
    try{
      this.spinner.show();
    this.api.GetGCPDetails(sessionStorage.getItem('vregid'))
      .subscribe(
        (res:any) => {
          this.GCPDetails = res;
          // console.log('GetGCPDetails=:', this.dispatchData);
          this.spinner.hide();
        },
        (error: { message: any; }) => {
          this.spinner.hide();
          console.log('Error fetching data:',JSON.stringify(error.message))
          // alert(`Error fetching data: ${JSON.stringify(error.message)}`);
        }
      );
      }
      catch(err:any){
        this.spinner.hide();

        console.log(err);
        // throw err;
      }
  }
  // Annual Turnover
   GetAnnualTurnover(){
    try{
  
      this.spinner.show();
    this.api.GetAnnualTurnover(sessionStorage.getItem('vregid'))
   
      .subscribe(
        (res:any) => {
          this.AnnualTurnoverDetail = res;
          // console.log('GetAnnualTurnoverDetail=:', this.dispatchData);
          this.spinner.hide();
        },
        (error: { message: any; }) => {
          this.spinner.hide();
          console.log('Error fetching data:',JSON.stringify(error.message))
          // alert(`Error fetching data: ${JSON.stringify(error.message)}`);
        }
      );
      }
      catch(err:any){
        this.spinner.hide();
  
        console.log(err);
        // throw err;
      }
  }
  // GST Details
  GETMassuppliergstDetails(){
    try{
        // this.spinner.show();
      this.api.MassuppliergstDetails(sessionStorage.getItem('facilityid'),sessionStorage.getItem('vregid'))
    
        .subscribe(
          (res:any) => {
            this.GSTList = res;
            // console.log('MassuppliergstDetails=:', this.dispatchData2);
            this.spinner.hide();
          },
          (error: { message: any; }) => {
          console.log('Error fetching data:',JSON.stringify(error.message))
            // alert(`Error fetching data: ${JSON.stringify(error.message)}`);
          }
        );
        }
        catch(err:any){
          this.spinner.hide();
  
          console.log(err);
          // throw err;
        }
  }
  // GSTReturnDetails
  GETGstReturnDetails(){
    try{
        // this.spinner.show();
      this.api.GstReturnDetails(sessionStorage.getItem('facilityid'),sessionStorage.getItem('vregid'))
        .subscribe(
          (res:any) => {
            this.GSTReturnDetails = res;
            // console.log('GstReturnDetails=:', this.dispatchData3);
            this.spinner.hide();
          },
          (error: { message: any; }) => {
            console.log('Error fetching data:',JSON.stringify(error.message))
            // alert(`Error fetching data: ${JSON.stringify(error.message)}`);
          }
        );
        }
        catch(err:any){
          this.spinner.hide();
  
          console.log(err);
          // throw err;
        }
  }
  // BankMandateDetail
  GETBankMandateDetail(){
      try{
        this.spinner.show();
      this.api.Massupplieraccnos(sessionStorage.getItem('facilityid'),sessionStorage.getItem('vregid'))
        .subscribe(
          (res:any) => {
            this.BankMandateDetails = res;
            // console.log('BankMandateDetail=:', this.dispatchData1);
            this.spinner.hide();
          },
          (error: { message: any; }) => {
            this.spinner.hide();
            console.log('Error fetching data:',JSON.stringify(error.message))
            // alert(`Error fetching data: ${JSON.stringify(error.message)}`);
          }
        );
        }
        catch(err:any){
          this.spinner.hide();
  
          console.log(err);
          // throw err;
        }
    }
    // TechnicalDetails
     GetTechnicalDetails() {
   
    this.spinner.show();
  
    this.api.GetTechnicalDetails(sessionStorage.getItem('vregid')).subscribe({
      next: (res: any) => {
  
        this.TechnicalDetails = res;
        // console.log("res:", res);
        // console.log("Mapped:", this.TechnicalDetailsMapped);
  
        this.spinner.hide();
      },
      error: (err: any) => {
        this.spinner.hide();
        console.error(err);
      }
    });
  }

  //#region 

  async downloadAsPDF() {
    const element = document.getElementById('certificate') as HTMLElement;
  
    if (!element) {
      console.error('Certificate element not found!');
      return;
    }
  
    // High-quality options
    const canvas = await html2canvas(element, {
      scale: 5,                    // 2x resolution = crisp text & borders
      useCORS: true,               // Allows external images (logo, QR)
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
      scrollX: 0,
      scrollY: 0,
      onclone: (clonedDoc) => {
        // Fix any dynamic content or styles during clone
        const clonedEl = clonedDoc.getElementById('certificate');
        if (clonedEl) {
          clonedEl.style.padding = '20px';
          clonedEl.style.background = 'white';
        }
      }
    });
  
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
  
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
  
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
  
    const ratio = canvasWidth / canvasHeight;
    let width = pdfWidth - 20;  // 10mm margin on each side
    let height = width / ratio;
  
    if (height > pdfHeight - 20) {
      height = pdfHeight - 20;
      width = height * ratio;
    }
  
    const x = (pdfWidth - width) / 2;
    const y = 10;
  
    pdf.addImage(imgData, 'PNG', x, y, width, height);
    pdf.save('CGMSC_Vendor_Certificate.pdf');
  }


  //#endregion
}
