import { Component, OnInit, Input } from '@angular/core';
import { BelPostAnsw } from '../../models/bel-post-answ';

@Component({
  selector: 'app-barcode-print-form',
  templateUrl: './barcode-print-form.component.html',
  styleUrls: ['./barcode-print-form.component.scss']
})
export class BarcodePrintFormComponent implements OnInit {

  @Input() data: BelPostAnsw;
  imgSource = 'https://barcode.tec-it.com/barcode.ashx?data=';

  constructor() { }

  ngOnInit(): void {
    this.data;
    // this.imgSource = this.imgSource + this.data.barcodes[0];
  }

}
