import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { FormBuilder,FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
declare var bootstrap: any;
@Component({
  selector: 'app-personal-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './personal-detail.component.html',
  styleUrl: './personal-detail.component.css'
})
export class PersonalDetailComponent {


  vregId=sessionStorage.getItem('vregid')

  selectedPanFile: File | null = null;
  fileTouched = false;
  sanitizedPdfUrl!: SafeResourceUrl;

 
  onshowedit:boolean= false; // Toggle between list and form
  editMode:any;
  panno=sessionStorage.getItem('panno');

  constructor(private sanitizer: DomSanitizer,private spinner: NgxSpinnerService,private api: ApiService,public toastr: ToastrService,private fb: FormBuilder){
   
  }

  


  vendor: any = {}; // Holds vendor data

ngOnInit() {
  this.panno=sessionStorage.getItem('panno');

  this.vregId=sessionStorage.getItem('vregid');
  this.loadVendorDetails();
}


editVendor() {
  this.onshowedit=true;
  // Wait a bit for DOM updates, then scroll
  setTimeout(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }, 300); // 300ms delay ensures table or form is rendered
}



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
      alert("Failed to load vendor details");
    }
  });
}

saveVendor() {
  
  try {
    const formData = new FormData();

    // Append file if selected
    
    if (this.selectedPanFile) {
      formData.append('PanCardDocument', this.selectedPanFile);
    }

    
    this.fileTouched = true;

    // Append any extra form fields if required in DTO
    // formData.append('SomeField', this.vendor.someValue);

    // Prepare query params based on backend API
    const params = {
      authMobileNo: this.vendor.authmobileno,
      authEmail: this.vendor.authemail,
      authName: this.vendor.authname,
      authSigName: this.vendor.authsigname,
      authSigMobileNo: this.vendor.authsigmobileno,
      authSigEmailId: this.vendor.authsigemailid,
      pancardno: this.vendor.pancardno,
      vregId: this.vregId
    };

    // Use updated service method
    this.api.updateVendor(params, formData).subscribe({
      next: (res: any) => {
        console.log("Vendor saved:", res);
        this.toastr.success("Vendor details saved successfully!", "Success");
        this.onshowedit=false;
        this.loadVendorDetails();
      },
      error: (err: any) => {
        console.error("Error saving vendor:", err);

        if (err.status === 0) {
          this.toastr.error("Unable to connect to the server. Please try again later.", "Network Error");
        } else if (err.status >= 400 && err.status < 500) {
          this.toastr.warning("Invalid vendor data or request issue.", "Validation Error");
        } else if (err.status >= 500) {
          this.toastr.error("Server error occurred. Please contact support.", "Server Error");
        } else {
          this.toastr.error("An unknown error occurred.", "Error");
        }
      }
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    this.toastr.error("Something went wrong! Please try again.", "Error");
  }
}

onFileSelected(event: any) {
  const file = event.target.files[0];
  this.fileTouched = true; // Mark as touched for UI validation (e.g., show errors if empty on submit)

  if (!file) {
    this.selectedPanFile = null;
    return; // No file selected—clear and exit
  }

  // Enforce PDF only (common for PAN cards; adjust accept=".pdf" in HTML if needed)
  if (file.type !== 'application/pdf') {
    this.toastr.warning('Please select a valid PDF file for PAN card.', 'Invalid File Type');
    this.selectedPanFile = null;
    event.target.value = ''; // Clear the invalid selection from input
    return;
  }

  // Optional: Enforce file size (e.g., < 5MB for PAN scans)
  if (file.size > 5 * 1024 * 1024) { // 5MB limit
    this.toastr.warning('File size too large. Please select a file under 5MB.', 'File Too Large');
    this.selectedPanFile = null;
    event.target.value = '';
    return;
  }

  // Valid file—assign and log
  this.selectedPanFile = file;
  console.log('Selected PAN card file:', file.name, `(Size: ${file.size} bytes)`);
}
 



DownloadFileWithName(mFilePath: string, mFileName: string) {
  

  // Encode file path and file name to handle special characters (like spaces, \ etc.)
  const encodedPath = encodeURIComponent(mFilePath);
  const encodedName = encodeURIComponent(mFileName);

  // Build dynamic API URL
  const apiUrl = `/Registration/DownloadFileWithName?mFilePath=${encodedPath}&mFileName=${encodedName}`;

  this.api.DownloadFileWithName(apiUrl).subscribe({
    next: (res: Blob) => {
      const pdfURL = URL.createObjectURL(res);
      window.open(pdfURL, "_blank");
      // const blob = new Blob([res], { type: 'application/pdf' });
      // const url = window.URL.createObjectURL(blob);
      // this.openmarqModal(url);
      // Create a temporary link element for download
      // const a = document.createElement('a');
      // a.href = url;
      // a.download = mFileName;
      // a.click();

      // // Clean up URL object after use
      // window.URL.revokeObjectURL(url);
    },
    error: (err) => {
      if (err.status === 0 && err.statusText === 'Unknown Error') {
        // ✅ Show toaster or alert message
        this.toastr.error('File missing or network error. Please try again later.', 'Download Failed');
      } else if (err.status === 404) {
        this.toastr.warning('Requested file not found on the server.', 'File Not Found');
      } else {
        this.toastr.error('Something went wrong while downloading the file.', 'Error');
      }
      console.error('Download error:', err);
    }
  });
}

openmarqModal(pdfUrl: string): void {
  this.sanitizedPdfUrl =
    this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);

  // Remove any leftover backdrops (from previous opens)
  document.querySelectorAll('.modal-backdrop').forEach((el) => el.remove());

  const modalEl = document.getElementById('pdfModal')!;
  // ensure modal appended to body so it sits above other layout elements
  document.body.appendChild(modalEl);

  // Optional: force z-index higher than anything else on page
  (modalEl as HTMLElement).style.zIndex = '99999';

  const modal = new bootstrap.Modal(modalEl, {
    backdrop: false, // no backdrop
    keyboard: true,
    focus: true,
  });
  modal.show();
}






}
