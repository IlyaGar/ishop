import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-barcode-input-count-form',
  templateUrl: './barcode-input-count-form.component.html',
  styleUrls: ['./barcode-input-count-form.component.scss']
})
export class BarcodeInputCountFormComponent implements OnInit {

  selectedVal: string = '';

  constructor(
    public dialogRef: MatDialogRef<BarcodeInputCountFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onOkClick() {
    if(+this.selectedVal >= 1 && +this.selectedVal <= 4)
      this.dialogRef.close(+this.selectedVal);
  }
}
