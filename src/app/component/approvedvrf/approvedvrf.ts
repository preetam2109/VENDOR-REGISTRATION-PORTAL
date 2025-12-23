import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import { ComplienceCertificateDetails,GetGCPDetails,GetAnnualTurnoverDetail,MassuppliergstDetails,GstReturnDetails,BankMandateDetail } from 'src/app/Model/VendorRegisDetail';
import { FormsModule, ReactiveFormsModule,FormBuilder } from '@angular/forms';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { QRCodeModule } from 'angularx-qrcode';
declare module 'qrcode';


@Component({
  selector: 'app-approvedvrf',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule,QRCodeModule],
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
  retentionList:any[]=[];
  SupID: any;
  vregid:any;
  panno:any;
  userAgent:any;
  ipAddress:any;
  today:any;
  qrData: string = '';
   vendorData = {
    vendorName: 'ABC Pharma',
    registrationNo: 'CGMSC/2025/234',
    panNo: 'ABCDE1234F',
    mobile: '9876543210',
    email: 'vendor@gmail.com',
    certificateType: 'Vendor Registration',
    issuedBy: 'CGMSC',
    issuedOn: new Date().toLocaleDateString(),
    verificationUrl: 'https://cgmsc.gov.in/vendor/verify/234'
  };
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
    this.GetPovLicenceDetails();

    
    this.qrData = JSON.stringify(this.vendorData);
    // console.log('qrdata=',this.qrData)
  }
//#region Api calling
  loadVendorDetails() {
  
    this.api.getVendorDetails(sessionStorage.getItem('facilityid')).subscribe({
      next: (res: any) => {
        if (res && res.length > 0) {
          this.vendor = res[0]; // since API returns an array
          // console.log('vender',this.vendor)
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
// ;
    this.spinner.show();
    this.api.getmANUFACLICDetails(this.SupID,this.vregid).subscribe((res: any) => {
        // console.log('Raw API response:', res);
  
        this.manufacturingLicList = res;
        this.spinner.hide();
        // console.log('With manuf lic:', this.manufacturingLicList);
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
        // console.log('With S.No:', this.importerLicenceList);
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
        // console.log('mSCDetailsList:', this.mSCDetailsList);
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
        // console.log('DDWith S.No:', this.PPCertificateList);
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
        // console.log('With S.No:', this.COPDetailsList);
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
          // console.log('Error fetching data:',JSON.stringify(error.message))
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
  //    GetTechnicalDetails() {
   
  //   this.spinner.show();
  
  //   this.api.GetTechnicalDetails(sessionStorage.getItem('vregid')).subscribe({
  //     next: (res: any) => {
  //   this.TechnicalDetails = res
  //             .filter((item: any) => item.mscid !== "6" && item.mscid !== "22")
  //             .map((item: any, index: number) => ({
  //               ...item,
  //               sno: index + 1,
  //             }));


  //       // this.TechnicalDetails = res;
  //       // console.log("res:", res);
  //       // console.log("Mapped:", this.TechnicalDetailsMapped);
  
  //       this.spinner.hide();
  //     },
  //     error: (err: any) => {
  //       this.spinner.hide();
  //       console.error(err);
  //     }
  //   });
  // }
  GetTechnicalDetails() {
    this.spinner.show();
  
    this.api.GetTechnicalDetails(sessionStorage.getItem('vregid')).subscribe({
      next: (res: any) => {
        const list = res
        .filter((item: any) => item.mscid !== "6" && item.mscid !== "22")
        .map((item: any, index: number) => ({
          ...item,
          sno: index + 1
        }));
      
      const msc19 = list.filter((x: any) => x.mscid == '19');
      const msc122 = list.filter((x: any) => x.mscid == '122');
      
      const others = list.filter(
        (x: any) => x.mscid != '19' && x.mscid != '122'
      );
      
      // Final arranged list
      this.TechnicalDetails = [
        ...others,
        ...msc19,
        ...msc122
      ];
      
        // this.TechnicalDetails = res
        //   // remove unwanted mscid
        //   // .filter(item:any => item.mscid !== '6' && item.mscid !== '22')
        //   .filter((item: any) => item.mscid !== "6" && item.mscid !== "22")
          // custom arrange: 19 before 122, 122 at last
          // .sort((a:any, b:any) => {
          //   if (a.mscid === '122') return 1;   // push 122 down
          //   if (b.mscid === '122') return -1;
  
          //   if (a.mscid === '19') return -1;   // bring 19 up
          //   if (b.mscid === '19') return 1;
  
          //   return 0; // keep original order for others
          // })
  
          // // add serial number
          // .map((item:any, index:any) => ({
          //   ...item,
          //   sno: index + 1
          // }));
  
        this.spinner.hide();
      },
      error: (err: any) => {
        this.spinner.hide();
        console.error(err);
      }
    });
  }
  

  GetPovLicenceDetails() {
    
    this.spinner.show();
    const supplierId = sessionStorage.getItem('facilityid');
    this.api.getPovLicenceDetails(supplierId, sessionStorage.getItem('vregid'),0).subscribe((res: any) => {
        // console.log('Raw API response retation:', res);
        this.retentionList = res;
        // console.log('With retention value :', this.retentionList);
      
        this.spinner.hide();
      
      },
      (error) => {
        console.error('API error:', error);
        this.spinner.hide();
      }
    );
    
  }
  //#region pdf 

  
  async downloadAsPDF() {
    this.spinner.show();
  
    const element = document.getElementById('certificate') as HTMLElement;
    if (!element) {
      this.spinner.hide();
      return;
    }
  
    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true,
      backgroundColor: '#ffffff'
    });
  
    const imgData = canvas.toDataURL('image/jpeg', 0.95);
  
    const pdf = new jsPDF('p', 'mm', 'a4');
  
    const pageWidth = pdf.internal.pageSize.getWidth();   // 210
    const pageHeight = pdf.internal.pageSize.getHeight(); // 297
  
    const margin = 5;
    const pdfWidth = pageWidth - margin * 2;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;
  
    let heightLeft = imgHeight;
    let position = margin;
    // FIRST PAGE
    pdf.addImage(imgData, 'JPEG', margin, position, pdfWidth, imgHeight);

    heightLeft -= pageHeight;
  
    // NEXT PAGES
    while (heightLeft > 0) {
      pdf.addPage();
      position = heightLeft - imgHeight + margin;
      pdf.addImage(imgData, 'JPEG', margin, position, pdfWidth, imgHeight);
    
      heightLeft -= pageHeight;
    }
  
    pdf.save('CGMSCL_Vendor_Certificate.pdf');
    this.spinner.hide();
  }
  
  
  
  // async downloadAsPDF() {
  //   this.spinner.show();
  //   const element = document.getElementById('certificate') as HTMLElement;
  
  //   if (!element) {
  //     console.error('Certificate element not found!');
  //     return;
  //   }
  
  //   // High-quality options
  //   const canvas = await html2canvas(element, {
  //     scale: 5,                    // 2x resolution = crisp text & borders
  //     useCORS: true,               // Allows external images (logo, QR)
  //     allowTaint: true,
  //     backgroundColor: '#ffffff',
  //     logging: false,
  //     windowWidth: element.scrollWidth,
  //     windowHeight: element.scrollHeight,
  //     scrollX: 0,
  //     scrollY: 0,
  //     onclone: (clonedDoc) => {
  //       // Fix any dynamic content or styles during clone
  //       const clonedEl = clonedDoc.getElementById('certificate');
  //       if (clonedEl) {
  //         clonedEl.style.padding = '5px';
  //         clonedEl.style.background = 'white';
  //       }
  //     }
  //   });
  
  //   const imgData = canvas.toDataURL('image/png');
  //   const pdf = new jsPDF({
  //     orientation: 'portrait',
  //     unit: 'mm',
  //     format: 'a4'
  //   });
  
  //   const pdfWidth = pdf.internal.pageSize.getWidth();
  //   const pdfHeight = pdf.internal.pageSize.getHeight();
  
  //   const canvasWidth = canvas.width;
  //   const canvasHeight = canvas.height;
  
  //   const ratio = canvasWidth / canvasHeight;
  //   let width = pdfWidth - 30;  // 10mm margin on each side
  //   let height = width / ratio;
  
  //   if (height > pdfHeight - 30) {
  //     height = pdfHeight - 30;
  //     width = height * ratio;
  //   }
  
  //   const x = (pdfWidth - width) / 2;
  //   const y = 20;
  
  //   pdf.addImage(imgData, 'PNG', x, y, width, height);
  //   pdf.save('CGMSCL_Vendor_Certificate.pdf');
  

  //     this.spinner.hide();
  // }


  //#endregion
}
