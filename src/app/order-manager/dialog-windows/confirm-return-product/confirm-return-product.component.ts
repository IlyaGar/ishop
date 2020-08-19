import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderListAnsw } from '../../models/order-list-answ';

@Component({
  selector: 'app-confirm-return-product',
  templateUrl: './confirm-return-product.component.html',
  styleUrls: ['./confirm-return-product.component.scss']
})
export class ConfirmReturnProductComponent implements OnInit {

  displayedColumns = ['status', 'name', 'client', 'collector', 'place', 'note'];
  dateSourse: Array<OrderListAnsw> = [];
  constructor(
    public dialogRef: MatDialogRef<ConfirmReturnProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.dateSourse = this.dateSourse.concat(this.data.element);
  }

  onOkClick(): void {
    this.dialogRef.close(true);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
