import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-barcode-input-count-form',
  templateUrl: './barcode-input-count-form.component.html',
  styleUrls: ['./barcode-input-count-form.component.scss']
})
export class BarcodeInputCountFormComponent implements OnInit {

  count: number = 1;
  isInCorrect = false;

  constructor(
    public dialogRef: MatDialogRef<BarcodeInputCountFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onChange($event) {
    if(this.count < 1 || this.count > 4)
      this.isInCorrect = true;
    if(this.count >= 1 && this.count <= 4)
      this.isInCorrect = false;
  }

  onOkClick() {
    if(this.count >= 1 && this.count <= 4)
      this.dialogRef.close(this.count);
  }
}
