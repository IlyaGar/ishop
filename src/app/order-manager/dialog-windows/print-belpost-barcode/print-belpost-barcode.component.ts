import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  barcode: string,
  username: string,
  address: string,
  num: string,
}

@Component({
  selector: 'app-print-belpost-barcode',
  templateUrl: './print-belpost-barcode.component.html',
  styleUrls: ['./print-belpost-barcode.component.scss']
})
export class PrintBelpostBarcodeComponent implements OnInit {

  imgSource = 'https://barcode.tec-it.com/barcode.ashx?data=';
  // @Input() belpostData: DialogData;
  @Input() data: DialogData;

  constructor(
    // public dialogRef: MatDialogRef<PrintBelpostBarcodeComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit(): void {
    this.data;
  }
}
