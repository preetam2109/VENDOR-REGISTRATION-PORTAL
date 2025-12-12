import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-approvedvrf',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './approvedvrf.html',
  styleUrl: './approvedvrf.css'
})
export class Approvedvrf implements OnInit {

  
  constructor(){

  }
  ngOnInit(): void {

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
